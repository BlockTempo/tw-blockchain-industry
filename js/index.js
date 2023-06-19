
// init
document.body.insertAdjacentHTML(
  "afterbegin", 
  Array.from(document.querySelectorAll("body > template"))
      .map(el => {
        const res = el.innerHTML.trim();
        el.remove();
        return _tApply(res);
      })
      .join("")
);

$(window).scroll(function(evt){
  if ($(window).scrollTop()>0)
    $(".navbar").addClass("navbar-top");
  else
      $(".navbar").removeClass("navbar-top");
});

/* go to hash offset control */
function gotoHash(id) {
  if ( !id || id.length < 2) return;
  setTimeout(function() {
    var $target = $(id),
        scrollOffset = 70,
        y = $target.offset().top - scrollOffset;

    if ($target.length) {
      window.scrollTo(0, y);
    }
  });
}

$('a[href^="#"]').on('click', function(e) {
  gotoHash($(e.target).attr('href'));
});

$(document).ready(function() {
  gotoHash(location.hash);
});

// slider
// var bg = document.querySelector('.item-bg');
let swiper;
var items = document.querySelectorAll('.news__item');
var item = document.querySelector('.news__item');

const widthOver800 = $(window).width() > 800;

if ( widthOver800 ) {
  $(document).on("mouseover", ".news__item", function (_event, _element) {

    var newsItem = document.querySelectorAll('.news__item');
    newsItem.forEach(function (element, index) {
      element.addEventListener('mouseover', function () {
        var x = this.getBoundingClientRect().left;
        var y = this.getBoundingClientRect().top;
        var width = this.getBoundingClientRect().width;
        var height = this.getBoundingClientRect().height;

        // $('.item-bg').addClass('active');
        $('.news__item').removeClass('active');
        // $('.news__item').removeClass('active');


        // bg.style.width = width + 'px';
        // bg.style.height = height + 'px';
        // bg.style.transform = 'translateX(' + x + 'px ) translateY(' + y + 'px)';
      });

      element.addEventListener('mouseleave', function () {
        $('.item-bg').removeClass('active');
        $('.news__item').removeClass('active');
      });

    });

  });
}

function clearSlider() {
  swiper && swiper.destroy();
  $("#news-slider .swiper-wrapper").empty();
  $("#news-slider .news-slider__pagination").empty();
}

function refreshSlider() {
  swiper = new Swiper('.news-slider', {
    effect: 'coverflow',
    grabCursor: true,
    loop: true,
    centeredSlides: true,
    keyboard: true,
    spaceBetween: 0,
    slidesPerView: 'auto',
    // initialSlide: 6,
    // slidesPerView: 6,
    speed: 300,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 0,
      modifier: 3,
      slideShadows: false
    },
    // breakpoints: {
    //   768: {
    //     slidesPerView: 6,
    //     spaceBetween: 0
    //     // centeredSlides: true
    //   }
    // },
    simulateTouch: true,
    navigation: {
      nextEl: '.news-slider-next',
      prevEl: '.news-slider-prev'
    },
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


        // $('.item-bg').addClass('active');

        // bg.style.width = width + 'px';
        // bg.style.height = height + 'px';
        // bg.style.transform = 'translateX(' + x + 'px ) translateY(' + y + 'px)';

        // $('.swiper-slide-active').addClass('active');
        // $('.swiper-slide-active').nextAll("*:lt(5)").addClass('active');
      }
    }
  });

  swiper.on('touchEnd', function () {
    $('.news__item').removeClass('active');
    $('.swiper-slide-active .news__item').addClass('active');
    
    // $('.news-slider__item').removeClass('active');
    // $('.swiper-slide-active').addClass('active');
    // $('.swiper-slide-active').nextAll("*:lt(5)").addClass('active');
  });

  swiper.on('slideChange', function () {
    $('.news__item').removeClass('active');
    // $('.news-slider__item').removeClass('active');
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


    // $('.item-bg').addClass('active');

    // bg.style.width = width + 'px';
    // bg.style.height = height + 'px';
    // bg.style.transform = 'translateX(' + x + 'px ) translateY(' + y + 'px)';
    
    // $('.news-slider__item').removeClass('active');

    // $('.swiper-slide-active').addClass('active');
    // $('.swiper-slide-active').nextAll("*:lt(5)").addClass('active');
  });
}

function loadingSlider() {
  clearSlider();
  const sliderWrap = $("#news-slider .swiper-wrapper");
  const newsLoadingTemp = $("#news-slider template[newloading]").html().trim();
  const newsLoadingItemTemp = $("#news-slider template[newloading-item]").html().trim();
  
  const items = widthOver800 ? 
    [newsLoadingItemTemp, newsLoadingItemTemp] :
    [newsLoadingItemTemp ];

  [1,2,3].forEach(n => {
    const newsLoadingWrap = $(newsLoadingTemp);
    newsLoadingWrap.append( items );
    sliderWrap.append( newsLoadingWrap );
  });
  
  refreshSlider();
}
// end: slider

function mapping(html, pairs) {
  for (const [key, value] of Object.entries(pairs)) {
    var reg = new RegExp("{{" + key + "}}", "ig");
    html = html.replace(reg, value);
  }
  return html;
}

function loadMap(groups, items) {
  const wrap = $("#map .mapwrap");
  const cateTemp = $("#map div[layout=map] template[category]").html().trim();
  const subcateTemp = $("#map div[layout=map] template[subcategory]").html().trim();
  const emptySubcateTemp = $("#map div[layout=map] template[emptycategory]").html().trim();
  const itemTemp = $("#map div[layout=map] template[item]").html().trim();

  const groupsClone = groups.slice(0);

  groupsClone.sort((a, b) => {
    return a.order < b.order ? -1 : 1;
  });

  groupsClone.forEach(g => {
    const cateWrap = $( mapping( cateTemp, g ) );
    const cateItemWrap = cateWrap.find(".category-block");

    if ( !g.title_en ) {
      cateWrap.find(".category-header-en").addClass("opacity-0");
    }

    const emptySubcateWrap = $( mapping( emptySubcateTemp, { cols: g.selfcols } ) );
    const emptySubcateItemWrap = emptySubcateWrap.find(".row");

    items.filter(it => it.group === g.id)
      .forEach(it => {
        const itClone = { ...it, itemCols: g.itemCols };
        emptySubcateItemWrap.append(
          mapping( itemTemp, itClone )
        )
      });
    
    if ( emptySubcateItemWrap.children().length ) {
      cateItemWrap.append(emptySubcateWrap);
    }

    if ( g.children && g.children.length > 0 ) {
      cateItemWrap.addClass("with-child");
      const gChildClone = g.children.slice(0);
      
      gChildClone.sort((a, b) => {
        return a.order < b.order ? -1 : 1;
      });

      gChildClone.forEach(gc => {
        const nestedGroup = [g.id, gc.id].join('-');
        const subcateWrap = $( mapping( subcateTemp, gc ) );
        const subcateItemWrap = subcateWrap.find(".row");
        
        if ( !gc.title_en ) {
          subcateWrap.find(".subcategory-header-en").addClass("opacity-0");
        }

        items.filter(it => it.group === nestedGroup)
          .forEach(it => {
            const itClone = { ...it, itemCols: gc.itemCols };
            subcateItemWrap.append(
              mapping( itemTemp, itClone )
            );
          });

        cateItemWrap.append( subcateWrap );
      });
    }
    
    wrap.append( cateWrap );
  });

  wrap.find('[data-toggle="tooltip"]').tooltip({
    trigger: "hover",
    html: true
  });
}

function tuneMap() {
  const fillItemTemp = $("#map div[layout=map] template[fillitem]").html().trim();
  let heightTick = 0;
  let theRow = [];
  $(".mapwrap > .bt-col").each((idx, o) => {
    const maxHeight = parseInt( $(o).css("max-width") );
    heightTick += maxHeight;
    theRow.push(o);
    if ( 100 - heightTick <= 1 ) {
      const maxh = theRow
        .map(el => el.firstElementChild.clientHeight)
        .reduce((a,b) => Math.max(a,b), 0);
        
      theRow.forEach(el => {
        const diff = maxh - el.firstElementChild.clientHeight;
        // find last bt-col
        let subHeightTick = 0;
        let tuneItems = [];
        const subitems = Array.from($(el.firstElementChild).find(".bt-col"));
        while(subitems.length) {
          const item = subitems.pop();
          const subMaxHeight = parseFloat( $(item).css("max-width") );
          subHeightTick += subMaxHeight;
          tuneItems.push(item);
          if ( 100 - subHeightTick < 0.1 ) {
            break;
          }
        }
        const tuneItemMax = tuneItems
          .map(el => el.firstElementChild.clientHeight)
          .reduce((a,b) => Math.max(a,b), 0);
        
        tuneItems.forEach(el => {
          $(el).find(".row")
            .append(
              mapping( fillItemTemp, { height: diff + ( tuneItemMax - el.firstElementChild.clientHeight ) } )
            );
        });
      });
      // reset
      theRow = [];
      heightTick = 0;
    }
  });
}

var viewpointPromise = fetch("json/viewpoint.json?t=5").then(res => res.json());
viewpointPromise.then(data => {
  const gridWrap = $("#viewpoints .features-block");
  const itemTemp = $("#viewpoints template[item]").html().trim();

  // change ordering
  data.push(data.shift());

  data.forEach(it => {
    gridWrap.append(mapping( itemTemp, it ));
  });

  const maxHeight = Array.from(gridWrap.find(".bubble"))
    .map(o => o.clientHeight)
    .reduce((a, b) => Math.max(a, b), 0);
  
  gridWrap.find(".bubble").each((idx, o) => {
    $(o).css("height", maxHeight + "px");
  });

  const viewsSwiper = new Swiper('.view-swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    loop: true,
    centeredSlides: true,
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
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev'
    // },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    autoplay: {
      delay: 3000,
    }
  });
});


function handleMapShows() {
  const groupWrap = $("#map .sidebar-menu ul");

  var ag = sessionStorage.getItem('_active_group');
  if ( ag ) {
    sessionStorage.removeItem('_active_group');
    $("#map button[data-layout='list']").trigger('click');
    haveClicked = true;
    groupWrap.find(".sidebar-item[data-id='" + ag + "']").trigger('click');
  } else {
    // groupWrap.find(".sidebar-item").first().trigger('click');
    $("#map button[data-layout='map']").trigger('click');
  }
}

var domloaded = false;
var jsonloaded = false;
var mapLastMod = "";

var itemsPromise = Promise.all([
  fetch("json/map-group.json"),
  fetch("json/map-item.json")
]).then(results => {
  const dates = results.map(res => {
    return new Date(res.headers.get('Last-Modified'));
  });
  dates.sort((a, b) => a.getTime() > b.getTime() ? -1 : 1);
  mapLastMod = dates[0].toLocaleDateString()
      .split("/")
      .map(s => s.length == 1 ? ("0" + s) : s)
      .join("");
  return Promise.all(results.map(res => res.json()))
});

itemsPromise.then(results => {
  const data = {
    groups: results[0],
    items: results[1]
  };
  const gridWrap = $("#map .grid");
  const groupWrap = $("#map .sidebar-menu ul");
  const itemTemp = $("#map div[layout=list] template[item]").html().trim();
  const updateDateTemp = $("#map template[updatedate]").html().trim();
  const groups = data.groups;
  const items = data.items;
  
  // for integrate tools
  groups.forEach(g => {
    g.order && (g.order = parseInt(g.order));
    if ( g.children && g.children.length ) {
      g.children.forEach(gc => {
        gc.order && (gc.order = parseInt(gc.order));
      });
    }
  });

  // loadTreemapChart( groups, items );
  // loadAmTreemapChart( groups, items );
  loadMap( groups, items );
  
  groupWrap.append(
    `<li class="sidebar-item" data-id="__all">` + 
      '<a href="" class="smooth">' + 
        '<i class="io io-caozuoshili icon-fw icon-lg"></i>' + 
        `<span>All</span>` + 
      '</a>' + 
    '</li>'
  )

  groups.forEach(g => {
    groupWrap.append(
      `<li class="sidebar-item" data-id="${g.id}">` + 
        '<a href="" class="smooth">' + 
          '<i class="io io-caozuoshili icon-fw icon-lg"></i>' + 
          `<span>${g.title}</span>` + 
        '</a>' + 
      '</li>'
    );
  });

  groupWrap.find(".sidebar-item").on('click', function(e){
    e.preventDefault();
    
    // reset
    gridWrap.empty();
    gridWrap.css("height", "" );
    
    var selectedOption = $(this).data("id");

    var targets = items.filter(t => {
      return selectedOption === "__all" || t.group.indexOf(selectedOption) === 0;
    });
    
    // style
    groupWrap.find("a").removeClass("btn-light");
    $(this).find("a").addClass("btn-light");

    targets.forEach(item => {
      gridWrap.append( mapping(itemTemp, item) );
    });

    const fitHeight = groupWrap.height() + 15;    
    if ( gridWrap.get(0).scrollHeight > fitHeight ) {
      gridWrap.css("height", fitHeight + "px" );
    } 

    gridWrap.find('[data-toggle="tooltip"]').tooltip({
      trigger: "hover",
      html: true
    });
  });

  $("#map .container").append( mapping( updateDateTemp, { mapLastMod }) );

  jsonloaded = true;

  if ( domloaded ) handleMapShows();
});

let haveClicked = false;
let mapHasTuned = false;

$(document).ready(function() {
  $("#map button[data-layout]").click(function(){
    if ( !$(this).hasClass("active") ) {
      $("#map div[layout]").hide();
      $("#map button[data-layout]").removeClass("active");

      var layoutType = $(this).data("layout");
      $(`#map div[layout=${layoutType}]`).show();
      $(this).addClass("active");

      if ( widthOver800 && layoutType == "map" && !mapHasTuned ) {
        var ratio = 35 / 135;
        $("#map .mapwrap img").each((idx, o) => {
          o.height = o.width * ratio;
        });
        tuneMap();
        mapHasTuned = true;
      }
      if ( layoutType == "list" && !haveClicked ) {
        const groupWrap = $("#map .sidebar-menu ul");
        groupWrap.find(".sidebar-item").first().trigger('click');
        haveClicked = true;
      }
    }
  });

  domloaded = true;

  if ( jsonloaded ) handleMapShows();
});

// rss feeds
const rssFeeds = [
  "https://www.blocktempo.com/search/tag/%E5%8F%B0%E7%81%A3%E5%8A%A0%E5%AF%86%E8%B2%A8%E5%B9%A3%E6%B3%95%E8%A6%8F/feed/",
  "https://www.blocktempo.com/category/business/feed/",
  "https://www.blocktempo.com/category/cryptocurrency-market/feed/",
  "https://www.blocktempo.com/category/exclusive-interview/feed/",
  "https://www.blocktempo.com/category/insight/feed/",
  "https://www.blocktempo.com/category/crypto-guide/feed/"
];

const sliderLinks = $("#news-slider .tab .nav-link");

const minInterval = 850;

sliderLinks.on('click', function(e){
  e.preventDefault();
  sliderLinks.removeClass('active');
  $(this).addClass('active');

  loadingSlider();

  const startStamp = (new Date()).getTime();
  const feedUrl = rssFeeds[ parseInt($(this).data("feed")) ];
  
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
      const newsTemp = $("#news-slider template[newspost]").html().trim();
      const newsItemTemp = $("#news-slider template[newspost-item]").html().trim();
      const items = res.querySelectorAll("item");
      const allObjects = [];
      Array.from(items).forEach(dom => {
        const $dom = $(dom);
        let applyObj = {
          link: $dom.find('link').text(),
          title: $dom.find('title').text(),
          description: $($dom.find('description').text()).first().text()
        };
        
        Array.from(dom.children)
          .forEach(a => {
            if ( a.tagName === "dc:creator" ) {
              applyObj.author = a.textContent;
            } else if ( a.tagName === "media:content" ) {
              applyObj.imgurl = a.getAttribute('url');
            }
          });

        allObjects.push(applyObj);
      });

      if ( widthOver800 ) {
        while (allObjects.length) {
          const applyEls = [];
          if ( allObjects.length >= 2 ) {
            applyEls.push( mapping( newsItemTemp, allObjects.shift() ) );
            applyEls.push( mapping( newsItemTemp, allObjects.shift() ) );
          } else {
            applyEls.push( mapping( newsItemTemp, allObjects.shift() ) );
          }
          const newsWrap = $(newsTemp);
          newsWrap.append( applyEls );
          sliderWrap.append(newsWrap);
        }
      } else {
        allObjects.forEach(o => {
          const newsWrap = $(newsTemp);
          newsWrap.append( mapping( newsItemTemp, o ) );
          sliderWrap.append(newsWrap);
        });
      }

      refreshSlider();
    });
});

sliderLinks.first().trigger('click');

/* auto convertions */
/*
var toConvertPromise = fetch("json/converted.json?t=2").then(res => res.json());
toConvertPromise.then(data => {
  const groupsCollection = [];
  const itemsCollection = [];
  data.forEach(it => {
    let applyGroups = [];
    let targetGroup = groupsCollection.find(g => g.id == it.group_major);
    if ( !targetGroup ) {
      targetGroup = {
        id: it.group_major,
        title: it.group_major,
        order: groupsCollection.length + 1,
        cols: 4,
        itemCols: 3,
        children: []
      };
      groupsCollection.push( targetGroup );
    }
    
    applyGroups.push( it.group_major );

    if ( it.group_minor ) {
      let childGroup = targetGroup.children.find(gc => gc.id == it.group_minor);
      if ( !childGroup ) {
        childGroup = {
          id: it.group_minor,
          title: it.group_minor,
          order: targetGroup.children.length + 1,
          cols: 4,
          itemCols: 3
        };
        targetGroup.children.push(childGroup);
      }

      applyGroups.push( it.group_minor );
    }

    itemsCollection.push({
      group: applyGroups.join("-"),
      title: it.title,
      logo_icon: it.logo_icon,
      logo_banner: it.logo_banner,
      briefly: it.briefly,
      description: it.description,
      website: it.website,
      twitter: it.twitter,
      id: it.title.replaceAll(" ", "-").toLowerCase()
    });
  });

  let finalobj = {
    groups: groupsCollection,
    items: itemsCollection
  };

  // trigger download
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent( JSON.stringify(finalobj) ));
  element.setAttribute('download', "map.json");

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
});
*/