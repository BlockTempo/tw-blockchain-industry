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


var swiper = new Swiper('.news-slider', {
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
// end: slider

function mapping(html, pairs) {
  for (const [key, value] of Object.entries(pairs)) {
    var reg = new RegExp("{{" + key + "}}", "ig");
    html = html.replace(reg, value);
  }
  return html;
}

var itemsPromise = fetch("/json/map.json").then(res => res.json());

itemsPromise.then(data => {
  const gridWrap = $("#map .grid");
  const groupWrap = $("#map .list-group");
  const itemTemp = $("#map div[item-template]").html().trim();
  const groups = data.groups;
  const items = data.items;
  
  groups.forEach(g => {
    groupWrap.append(
      '<label class="list-group-item">' + 
        `<input type="radio" name="group-item" value="${g.id}"> ${g.title}` + 
      '</label>'
    );
  });

  groupWrap.find(".list-group-item input").on('click', function(){
    gridWrap.empty();
    var selectedOption = $(this).val();

    var targets = items.filter(t => {
      return t.group.indexOf(selectedOption) === 0;
    });
    
    targets.forEach(item => {
      gridWrap.append( mapping(itemTemp, item) );
    });

    gridWrap.find('[data-toggle="tooltip"]').tooltip({
      trigger: "hover"
    });
  });
});

$(document).ready(function() {
  // Handle menu item click event
  $('input[name="menu-option"]').on('click', function() {
    var selectedOption = $(this).val();
    // Generate grid items based on selected option
    generateGridItems(selectedOption);
  });

  // Function to generate grid items
  function generateGridItems(option) {
    // Clear existing grid items
    $('#grid').empty();

    // Generate new grid items based on selected option
    for (var i = 1; i <= 8; i++) {
      var card = $('<div class="col-md-3"><div class="card"><div class="card-body">Item ' + i + ' (' + option + ')</div></div></div>');
      $('#grid').append(card);
    }
  }

  // Initialize with default option
  generateGridItems('option1');
});
