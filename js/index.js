$(window).scroll(function(evt){
  if ($(window).scrollTop()>0)
    $(".navbar").addClass("navbar-top");
  else
      $(".navbar").removeClass("navbar-top");
});

// $(document).ready(function () {

//   (function ($) {
//     $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');

//     $('.tab ul.tabs li a').click(function (g) {
//       var tab = $(this).closest('.tab'),
//         index = $(this).closest('li').index();

//       tab.find('ul.tabs > li').removeClass('current');
//       $(this).closest('li').addClass('current');

//       tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
//       tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();

//       g.preventDefault();
//     });
//   })(jQuery);

// });

let swiper;

// slider
var bg = document.querySelector('.item-bg');
var items = document.querySelectorAll('.news__item');
var item = document.querySelector('.news__item');

function cLog(content) {
  console.log(content)
}

if ($(window).width() > 800) {
  $(document).on("mouseover", ".news__item", function (_event, _element) {

    var newsItem = document.querySelectorAll('.news__item');
    newsItem.forEach(function (element, index) {
      element.addEventListener('mouseover', function () {
        var x = this.getBoundingClientRect().left;
        var y = this.getBoundingClientRect().top;
        var width = this.getBoundingClientRect().width;
        var height = this.getBoundingClientRect().height;

        $('.item-bg').addClass('active');
        $('.news__item').removeClass('active');
        // $('.news__item').removeClass('active');


        bg.style.width = width + 'px';
        bg.style.height = height + 'px';
        bg.style.transform = 'translateX(' + x + 'px ) translateY(' + y + 'px)';
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
    speed: 300,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 0,
      modifier: 3,
      slideShadows: false
    },
    breakpoints: {
      480: {
        spaceBetween: 0,
        centeredSlides: true
      }
    },
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


        $('.item-bg').addClass('active');

        bg.style.width = width + 'px';
        bg.style.height = height + 'px';
        bg.style.transform = 'translateX(' + x + 'px ) translateY(' + y + 'px)';
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


    $('.item-bg').addClass('active');

    bg.style.width = width + 'px';
    bg.style.height = height + 'px';
    bg.style.transform = 'translateX(' + x + 'px ) translateY(' + y + 'px)';
  });
}

function loadingSlider() {
  clearSlider();
  const sliderWrap = $("#news-slider .swiper-wrapper");
  const newsLoadingTemp = $("#news-slider template[newloading]").html().trim();
  sliderWrap.append(newsLoadingTemp);
  sliderWrap.append(newsLoadingTemp);
  sliderWrap.append(newsLoadingTemp);
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

var domloaded = false;
var jsonloaded = false;

var itemsPromise = fetch("json/map.json").then(res => res.json());

itemsPromise.then(data => {
  const gridWrap = $("#map .grid");
  const groupWrap = $("#map .sidebar-menu ul");
  const itemTemp = $("#map template[item]").html().trim();
  const groups = data.groups;
  const items = data.items;
  
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
    gridWrap.empty();
    var selectedOption = $(this).data("id");

    var targets = items.filter(t => {
      return t.group.indexOf(selectedOption) === 0;
    });
    
    // style
    groupWrap.find("a").removeClass("btn-light");
    $(this).find("a").addClass("btn-light");

    targets.forEach(item => {
      gridWrap.append( mapping(itemTemp, item) );
    });

    gridWrap.find('[data-toggle="tooltip"]').tooltip({
      trigger: "hover"
    });
  });

  jsonloaded = true;

  if ( domloaded ) {
    groupWrap.find(".sidebar-item").first().trigger('click');
  }
});

$(document).ready(function() {
  $("#map button[data-layout]").click(function(){
    if ( !$(this).hasClass("active") ) {
      $("#map div[layout]").hide();
      $("#map button[data-layout]").removeClass("active");

      var layoutType = $(this).data("layout");
      $(`#map div[layout=${layoutType}]`).show();
      $(this).addClass("active");
    }
  });

  $("#map button[data-layout='list']").trigger('click');

  domloaded = true;

  if ( jsonloaded ) {
    const groupWrap = $("#map .sidebar-menu ul");
    groupWrap.find(".sidebar-item").first().trigger('click');
  }
});

// rss feeds
const rssFeeds = [
  "https://www.blocktempo.com/category/business/feed/",
  "https://www.blocktempo.com/category/cryptocurrency-market/feed/",
  "https://www.blocktempo.com/category/exclusive-interview/feed/",
  "https://www.blocktempo.com/category/insight/feed/",
  "https://www.blocktempo.com/category/crypto-guide/feed/"
];

const sliderLinks = $("#news-slider .tab .nav-link");

sliderLinks.on('click', function(e){
  e.preventDefault();
  sliderLinks.removeClass('active');
  $(this).addClass('active');

  const feedUrl = rssFeeds[ parseInt($(this).data("feed")) ];
  
  fetch(feedUrl).then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(res => {
      clearSlider();
      const sliderWrap = $("#news-slider .swiper-wrapper");
      const newsTemp = $("#news-slider template[newspost]").html().trim();
      const items = res.querySelectorAll("item");
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

        const news = mapping( newsTemp, applyObj );
        sliderWrap.append(news);
      });

      refreshSlider();
    });
});

loadingSlider();

sliderLinks.first().trigger('click');
