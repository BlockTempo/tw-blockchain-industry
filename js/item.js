
const feedUrlBase = "https://www.blocktempo.com/search/tag/{id}/feed/";

function mapping(html, pairs) {
    for (const [key, value] of Object.entries(pairs)) {
        var reg = new RegExp("{{" + key + "}}", "ig");
        html = html.replace(reg, value);
    }
    return html;
}

let swiper;

function refreshSlider( itemSize ) {
    swiper = new Swiper('.news-slider', {
        effect: 'coverflow',
        grabCursor: true,
        loop: (itemSize || 0) > 3,
        centeredSlides: false,
        keyboard: true,
        spaceBetween: 0,
        slidesPerView: 'auto',
        speed: 300,
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 0,
            modifier: 3,
            slideShadows: false
        },
        simulateTouch: true,
        pagination: {
            el: '.news-slider__pagination',
            clickable: true
        },
        on: {
            init: function () {
                var activeItem = document.querySelector('.swiper-slide-active');
        
                var sliderItem = activeItem.querySelector('.news__item');
        
                $('.swiper-slide-active .news__item').addClass('active');
        
                var x = sliderItem.getBoundingClientRect().left;
                var y = sliderItem.getBoundingClientRect().top;
                var width = sliderItem.getBoundingClientRect().width;
                var height = sliderItem.getBoundingClientRect().height;
            }
        }
    });
  
    swiper.on('touchEnd', function () {
      $('.news__item').removeClass('active');
      $('.swiper-slide-active .news__item').addClass('active');
    });
  
    swiper.on('slideChange', function () {
      $('.news__item').removeClass('active');
    });
  
    swiper.on('slideChangeTransitionEnd', function () {
        $('.news__item').removeClass('active');
        var activeItem = document.querySelector('.swiper-slide-active');

        var sliderItem = activeItem.querySelector('.news__item');

        $('.swiper-slide-active .news__item').addClass('active');

        var x = sliderItem.getBoundingClientRect().left;
        var y = sliderItem.getBoundingClientRect().top;
        var width = sliderItem.getBoundingClientRect().width;
        var height = sliderItem.getBoundingClientRect().height;
    });
}

function clearSlider() {
    swiper && swiper.destroy();
    $("#news-slider .swiper-wrapper").empty();
    $("#news-slider .news-slider__pagination").empty();
}

let sliderRenderHeight = 200;
const aspectRatio = 2 / 1.15;

function loadingSlider() {
    clearSlider();
    const sliderWrap = $("#news-slider .swiper-wrapper");
    const newsLoadingTemp = $("template[newloading]").html().trim();
    const newsLoadingItemTemp = $("template[newloading-item]").html().trim();

    const items = [ newsLoadingItemTemp ];

    [1,2,3].forEach(n => {
        const newsLoadingWrap = $(newsLoadingTemp);
        newsLoadingWrap.append( items );
        sliderWrap.append( newsLoadingWrap );
    });

    refreshSlider();
    
    // calculate height
    sliderRenderHeight = sliderWrap.find(".news__img").width() / aspectRatio;

    sliderWrap.find(".news__img").height(sliderRenderHeight);
}

var initialTitle = document.querySelector("head > title").textContent;
var itemsPromise = fetch("json/map.json?t=14").then(res => res.json());

var itemsPromise = Promise.all([
    fetch("json/map-group.json"),
    fetch("json/map-item.json")
]).then(results => Promise.all(results.map(res => res.json())))

itemsPromise.then(results => {
    var params = new URLSearchParams(location.search);
    var id = params.get("id");

    const groups = results[0];
    const items = results[1];

    let target;
    if ( id && (target = items.find(t => t.id === id)) ) {
        const title = target.title;
        const gs = target.group.split('-');
        const groupMajorId = gs[0];
        
        // set title
        document.querySelector("head > title").textContent = title + "｜" + initialTitle;

        groups.find(g => {
            if ( g.id === groupMajorId ) {
                target.group_major = g.title;
                target.group_major_id = g.id;
                if ( gs.length > 1 ) {
                    const minor = g.children.find(gc => gc.id === gs[1]);
                    target.group_minor = minor.title;
                }
                return true;
            }
        });

        const relatedItems = items.filter(t => {
            return target.id !== t.id && t.group.indexOf(groupMajorId) === 0;
        });

        const detailTemp = $("template[detail]").html().trim();
        const itemTemp = $("template[item]").html().trim();

        const detailDom = $(mapping(detailTemp, target));

        if ( !target.twitter ) {
            detailDom.find("span[twitter-link]").remove();
        }

        if ( gs.length == 1 ) {
            detailDom.find("span[group-minor]").remove();
        }

        detailDom.find("a[data-target-group]").click((e) => {
            sessionStorage.setItem('_active_group', $(e.target).data("target-group"));
        });
        
        $(document.body).append(detailDom);
        
        /*
         * load news start 
        */
        loadingSlider();

        const minInterval = 850;        
        const startStamp = (new Date()).getTime();
        const feedUrl = feedUrlBase.replace("{id}", id);
        fetch(feedUrl).then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(res => {
                const nowStamp = (new Date()).getTime();
                const returnInterval = nowStamp - startStamp;
                if ( returnInterval < minInterval ) {
                    return new Promise((rs, rj) => {
                    setTimeout(() => { rs(res); }, minInterval - returnInterval);
                    });
                } else return res;
            })
            .then(res => {
                clearSlider();
                const sliderWrap = $("#news-slider .swiper-wrapper");
                const newsTemp = $("template[newspost]").html().trim();
                const newsItemTemp = $("template[newspost-item]").html().trim();
                const items = res.querySelectorAll("item");
                const allObjects = [];
                Array.from(items).forEach(dom => {
                    const $dom = $(dom);
                    let applyObj = {
                        link: $dom.find('link').text(),
                        title: $dom.find('title').text(),
                        description: $($dom.find('description').text()).first().text(),
                        height: sliderRenderHeight
                    };
                    
                    Array.from(dom.children)
                        .forEach(a => {
                            if ( a.tagName === "dc:creator" ) {
                                applyObj.author = a.textContent;
                            } else if ( a.tagName === "media:content" ) {
                                applyObj.imgurl = a.getAttribute('url');
                            } else if ( a.tagName === "image" ) {
                                const imgUrlEl = a.querySelector("url");
                                if ( imgUrlEl ) {
                                    applyObj.imgurl = imgUrlEl.textContent;
                                }
                            }
                        });

                    allObjects.push(applyObj);
                });

                allObjects.forEach(o => {
                    const newsWrap = $(newsTemp);
                    newsWrap.append( mapping( newsItemTemp, o ) );
                    sliderWrap.append(newsWrap);
                });

                refreshSlider( allObjects.length );
            });
        /*
         * load news end
        */

        const itemsWrap = $("main div[related-items]");

        relatedItems.forEach(item => {
            itemsWrap.append( mapping(itemTemp, item) );
        });

        itemsWrap.find('[data-toggle="tooltip"]').tooltip({
            trigger: "hover",
            html: true
        });
    }
});
