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
// var bg = document.querySelector('.item-bg');
var items = document.querySelectorAll('.news__item');
var item = document.querySelector('.news__item');

function cLog(content) {
  console.log(content)
}

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

// function loadTreemapChart(groups, items) {

//   let data = [];

//   groups.forEach(g => {
//     data.push({
//       id: g.id,
//       name: g.title,
//       // borderColor: 'blue'
//     });
//     if ( g.children && g.children.length > 0 ) {
//       g.children.forEach(gc => {
//         data.push({
//           id: [g.id, gc.id].join('-'),
//           name: gc.title
//         });
//       });
//     }
//   });

//   items.forEach(it => {
//     data.push({
//       name: it.title,
//       parent: it.group,
//       value: 1,
//       logo_icon: it.logo_icon,
//       description: it.description
//     });
//   });

//   Highcharts.chart('map-container', {
//     chart: {
//       height: 800,
//       events: {
//         load: function() {
//           var chart = this,
//             d = chart.series[0].data;

//           for (var i = 0, len = d.length; i < len; i++) {
//             var p = d[i];
//             if (p.shapeArgs) {
//               var w = Math.min(p.shapeArgs.width, p.shapeArgs.height) * 0.75;
//               var x = p.shapeArgs.x + chart.plotLeft + ( ( p.shapeArgs.width - w ) / 2 ),
//                   y = p.shapeArgs.y + chart.plotTop + ( ( p.shapeArgs.height - w ) / 2 );
//               chart.renderer.image(p.logo_icon, x, y, w, w).add();
//             }
//           }
//         }
//       }
//     },
//     series: [{
//         color: 'none',
//         type: 'treemap',
//         // layoutAlgorithm: 'stripes',
//         layoutAlgorithm: 'squarified',
//         // alternateStartingDirection: true,
//         // borderColor: '#fff',
//         // dataLabels: {
//         //     style: {
//         //         textOutline: 'none'
//         //     }
//         // },
//         levels: [{
//             level: 1,
//             layoutAlgorithm: 'squarified',
//             // borderColor: 'yellow',
//             borderRadius: 10,
//             borderWidth: 6,
//             dataLabels: {
//                 // backgroundColor: '#3c3c3c',
//                 enabled: true,
//                 align: 'left',
//                 verticalAlign: 'top',
//                 style: {
//                     fontSize: '15px',
//                     fontWeight: 'bold'
//                 }
//             }
//         },{
//             level: 2,
//             // borderColor: 'green',
//             borderWidth: 1,
//             dataLabels: {
//               style: {
//                 fontSize: '50px',
//                 // fontSize: '100%',
//                 fontWeight: 'bold',
//                 opacity: 0
//               }
//             }
//         }
//       ],
//         data: data
//         // data: [{
//         //     id: 'A',
//         //     name: 'Nord-Norge',
//         //     color: '#50FFB1'
//         // }, {
//         //     id: 'B',
//         //     name: 'Trøndelag',
//         //     color: '#F5FBEF'
//         // }, {
//         //     id: 'C',
//         //     name: 'Vestlandet',
//         //     color: '#A09FA8'
//         // }, {
//         //     id: 'D',
//         //     name: 'Østlandet',
//         //     color: '#E7ECEF'
//         // }, {
//         //     id: 'E',
//         //     name: 'Sørlandet',
//         //     color: '#A9B4C2'
//         // }, {
//         //     name: 'Troms og Finnmark',
//         //     parent: 'A',
//         //     value: 70923
//         // }, {
//         //     name: 'Nordland',
//         //     parent: 'A',
//         //     value: 35759
//         // }, {
//         //     name: 'Trøndelag',
//         //     parent: 'B',
//         //     value: 39494
//         // }, {
//         //     name: 'Møre og Romsdal',
//         //     parent: 'C',
//         //     value: 13840
//         // }, {
//         //     name: 'Vestland',
//         //     parent: 'C',
//         //     value: 31969
//         // }, {
//         //     name: 'Rogaland',
//         //     parent: 'C',
//         //     value: 8576
//         // }, {
//         //     name: 'Viken',
//         //     parent: 'D',
//         //     value: 22768
//         // }, {
//         //     name: 'Innlandet',
//         //     parent: 'D',
//         //     value: 49391
//         // },
//         // {
//         //     name: 'Oslo',
//         //     parent: 'D',
//         //     value: 454
//         // },
//         // {
//         //     name: 'Vestfold og Telemark',
//         //     parent: 'D',
//         //     value: 15925
//         // },
//         // {
//         //     name: 'Agder',
//         //     parent: 'E',
//         //     value: 14981
//         // }]
//     }],
//     // title: {
//     //     text: 'Norwegian regions and counties by area',
//     //     align: 'left'
//     // },
//     // subtitle: {
//     //     text:
//     //         'Source: <a href="https://snl.no/Norge" target="_blank">SNL</a>',
//     //     align: 'left'
//     // },
//     tooltip: {
//         useHTML: true,
//         pointFormat: '<div class="map-tooltip">{point.description}</div>',
//         formatter: function (tooltip) {
//           return this.point.node.level !== 1
//               ? tooltip.defaultFormatter.call(this, tooltip)
//               : false;
//        }
//     }
//   });  
// }

// function loadAmTreemapChart(groups, items) {
//     /**
//    * ---------------------------------------
//    * This demo was created using amCharts 4.
//    *
//    * For more information visit:
//    * https://www.amcharts.com/
//    *
//    * Documentation is available at:
//    * https://www.amcharts.com/docs/v4/
//    * ---------------------------------------
//    */

//   am4core.useTheme(am4themes_animated);

//   var data = [];

//   groups.forEach(g => {
//     var o = {
//       name: g.title,
//       children: []
//     };

//     items.filter(it => it.group === g.id)
//       .forEach(it => {
//         o.children.push({
//           name: it.title,
//           value: 1
//         });
//       });

//     if ( g.children && g.children.length > 0 ) {
//       g.children.forEach(gc => {
//         var nesto = {
//           name: gc.title,
//           children: []
//         };

//         items.filter(it => it.group === [g.id, gc.id].join('-'))
//           .forEach(it => {
//             nesto.children.push({
//               name: it.title,
//               value: 1
//             });
//           });

//         o.children.push(nesto);
//       }); 
//     }

//     data.push(o);
//   });

//   // var data = {
//   //   Acura: {
//   //     ILX: 11757,
//   //     MDX: 54886,
//   //     NSX: 581,
//   //     RDX: 51295,
//   //     RLX: 1237,
//   //     TLX: 34846
//   //   },
//   //   "Alfa Romeo": { "4C": 407, Giulia: 8903, Stelvio: 2721 },
//   //   Audi: {
//   //     A3: 20733,
//   //     "A3 e-tron": 2877,
//   //     A4: 37674,
//   //     A5: 21301,
//   //     A6: 16304,
//   //     A7: 4810,
//   //     A8: 3127,
//   //     Q3: 20633,
//   //     Q5: 57640,
//   //     Q7: 38346,
//   //     R8: 772,
//   //     TT: 2294
//   //   },
//   //   Bentley: {
//   //     Bentayga: 1152,
//   //     "Continental GT": 898,
//   //     "Flying Spur": 257,
//   //     Mulsanne: 98
//   //   },
//   //   BMW: {
//   //     "2-Series": 11737,
//   //     "3-Series": 59449,
//   //     "4-Series": 39634,
//   //     "5-Series": 40658,
//   //     "6-Series": 3355,
//   //     "7-Series": 9276,
//   //     i3: 6276,
//   //     i8: 488,
//   //     X1: 30826,
//   //     X3: 40691,
//   //     X4: 5198,
//   //     X5: 50815,
//   //     X6: 6780,
//   //     Z4: 502
//   //   },
//   //   Buick: {
//   //     Cascada: 5595,
//   //     Enclave: 48564,
//   //     Encore: 88035,
//   //     Envision: 41040,
//   //     LaCrosse: 20161,
//   //     Regal: 11559,
//   //     Verano: 4277
//   //   },
//   //   Cadillac: {
//   //     ATS: 13100,
//   //     CT6: 10542,
//   //     CTS: 10344,
//   //     ELR: 17,
//   //     Escalade: 37694,
//   //     SRX: 156,
//   //     XT5: 68312,
//   //     XTS: 16275
//   //   },
//   //   Chevrolet: {
//   //     Bolt: 23297,
//   //     Camaro: 67940,
//   //     "Caprice PPV": 693,
//   //     "City Express": 8348,
//   //     Colorado: 112996,
//   //     Corvette: 25079,
//   //     Cruze: 184751,
//   //     Equinox: 290458,
//   //     Express: 69164,
//   //     Impala: 75877,
//   //     Malibu: 185857,
//   //     Silverado: 585864,
//   //     Sonic: 30290,
//   //     Spark: 22589,
//   //     SS: 4055,
//   //     Suburban: 56516,
//   //     Tahoe: 98961,
//   //     Traverse: 123506,
//   //     Trax: 79289,
//   //     Volt: 20349
//   //   },
//   //   Chrysler: {
//   //     "200": 18457,
//   //     "300": 51237,
//   //     Pacifica: 118274,
//   //     "Town & Country": 577
//   //   },
//   //   Dodge: {
//   //     Avenger: 14,
//   //     Challenger: 64537,
//   //     Charger: 88351,
//   //     Dart: 10082,
//   //     Durango: 68761,
//   //     "Grand Caravan": 125196,
//   //     Journey: 89470,
//   //     Viper: 585,
//   //     "RAM P/U": 500723,
//   //     "RAM ProMaster": 40483,
//   //     "RAM ProMaster City": 15584
//   //   },
//   //   Fiat: { "124 Spider": 4478, "500": 12685, "500L": 1664, "500X": 7665 },
//   //   Ford: {
//   //     "C-Max": 18390,
//   //     Edge: 142603,
//   //     Escape: 308296,
//   //     "E-Series": 53304,
//   //     Expedition: 51883,
//   //     Explorer: 271131,
//   //     Fiesta: 46249,
//   //     Flex: 22389,
//   //     Focus: 158385,
//   //     "F-Series": 896764,
//   //     Fusion: 209623,
//   //     GT: 89,
//   //     Mustang: 81866,
//   //     Taurus: 41236,
//   //     Transit: 127360,
//   //     "Transit Connect": 34473
//   //   },
//   //   Genesis: { G80: 16196, G90: 4398 },
//   //   GMC: {
//   //     Acadia: 111276,
//   //     Canyon: 32106,
//   //     Savana: 29679,
//   //     Sierra: 217943,
//   //     Terrain: 85441,
//   //     Yukon: 49183,
//   //     "Yukon XL": 35059
//   //   },
//   //   Honda: {
//   //     Accord: 322655,
//   //     Civic: 377286,
//   //     "Clarity FCV": 2455,
//   //     Crosstour: 5,
//   //     "CR-V": 377895,
//   //     "CR-Z": 705,
//   //     Fit: 49454,
//   //     "HR-V": 94034,
//   //     Insight: 3,
//   //     Odyssey: 100307,
//   //     Pilot: 127279,
//   //     Ridgeline: 34749
//   //   },
//   //   Hyundai: {
//   //     Accent: 58955,
//   //     Azera: 3060,
//   //     Elantra: 198210,
//   //     Equus: 20,
//   //     Genesis: 1152,
//   //     Ioniq: 11197,
//   //     "Santa Fe": 133171,
//   //     Sonata: 131803,
//   //     Tucson: 114735,
//   //     Veloster: 12658
//   //   },
//   //   Infiniti: {
//   //     Q50: 40739,
//   //     Q60: 10751,
//   //     Q70: 5772,
//   //     QX30: 14093,
//   //     QX50: 16857,
//   //     QX60: 40444,
//   //     QX70: 6878,
//   //     QX80: 17881
//   //   },
//   //   Jaguar: { "F-Pace": 18946, "F-Type": 4108, XE: 9278, XF: 4541, XJ: 2721 },
//   //   Jeep: {
//   //     Cherokee: 169882,
//   //     Compass: 83253,
//   //     "Grand Cherokee": 240696,
//   //     Patriot: 10735,
//   //     Renegade: 103434,
//   //     Wrangler: 190522
//   //   },
//   //   Kia: {
//   //     Cadenza: 7249,
//   //     Forte: 117596,
//   //     K900: 455,
//   //     Niro: 27237,
//   //     Optima: 107493,
//   //     Rio: 16760,
//   //     Sedona: 23815,
//   //     Sorento: 99684,
//   //     Soul: 115712,
//   //     Sportage: 72824,
//   //     Stinger: 843
//   //   },
//   //   "Land Rover": {
//   //     "Discovery / LR4": 6398,
//   //     "Discovery Sport": 14187,
//   //     "Range Rover": 16869,
//   //     "Range Rover Evoque": 11979,
//   //     "Range Rover Sport": 19153,
//   //     "Range Rover Velar": 6153
//   //   },
//   //   Lexus: {
//   //     CT: 4690,
//   //     ES: 51398,
//   //     GS: 7773,
//   //     GX: 27190,
//   //     IS: 26482,
//   //     LC: 2487,
//   //     LFA: 3,
//   //     LS: 4094,
//   //     LX: 6004,
//   //     NX: 59341,
//   //     RC: 7363,
//   //     RX: 108307
//   //   },
//   //   Lincoln: {
//   //     Continental: 12012,
//   //     MKC: 27048,
//   //     MKS: 153,
//   //     MKT: 3005,
//   //     MKX: 31031,
//   //     MKZ: 27387,
//   //     Navigator: 10523
//   //   },
//   //   Maserati: {
//   //     Ghibli: 5531,
//   //     GranTurismo: 1018,
//   //     Levante: 5448,
//   //     Quattroporte: 1700
//   //   },
//   //   Mazda: {
//   //     "3": 75018,
//   //     "5": 10,
//   //     "6": 33402,
//   //     "CX-3": 16355,
//   //     "CX-5": 127563,
//   //     "CX-9": 25828,
//   //     "MX-5 Miata": 11294
//   //   },
//   //   "Mercedes-Benz": {
//   //     "B-Class": 744,
//   //     "C-Class": 77447,
//   //     "CLA-Class": 20669,
//   //     "E / CLS-Class": 51312,
//   //     "G-Class": 4188,
//   //     "GLA-Class": 24104,
//   //     "GLC-Class": 48643,
//   //     "GLE-Class": 54595,
//   //     "GLS-Class": 32248,
//   //     Metris: 7579,
//   //     "S-Class": 15888,
//   //     "SLC-Class": 2860,
//   //     "SL-Class": 2940,
//   //     Sprinter: 27415
//   //   },
//   //   Mini: { Cooper: 32232, Countryman: 14864, Paceman: 9 },
//   //   Mitsubishi: {
//   //     "i MiEV": 6,
//   //     Lancer: 12725,
//   //     Mirage: 22386,
//   //     Outlander: 35310,
//   //     "Outlander PHEV": 99,
//   //     "Outlander Sport": 33160
//   //   },
//   //   Nissan: {
//   //     "370Z": 4614,
//   //     Altima: 254996,
//   //     Armada: 35667,
//   //     Frontier: 74360,
//   //     "GT-R": 578,
//   //     Juke: 10157,
//   //     Leaf: 11230,
//   //     Maxima: 67627,
//   //     Murano: 76732,
//   //     NV: 17858,
//   //     NV200: 18602,
//   //     Pathfinder: 81065,
//   //     Quest: 4950,
//   //     Rogue: 403465,
//   //     Sentra: 218451,
//   //     Titan: 52924,
//   //     Versa: 106772,
//   //     Xterra: 1
//   //   },
//   //   Porsche: {
//   //     "911": 8970,
//   //     Boxster: 2287,
//   //     Cayenne: 13203,
//   //     Cayman: 2800,
//   //     Macan: 21429,
//   //     Panamera: 6431
//   //   },
//   //   Smart: { Fortwo: 3071 },
//   //   Subaru: {
//   //     BRZ: 4131,
//   //     Crosstrek: 110138,
//   //     Forester: 177563,
//   //     Impreza: 117401,
//   //     Legacy: 49837,
//   //     Outback: 188886
//   //   },
//   //   Tesla: { "Model 3": 2320, "Model S †": 28800, "Model X †": 24000 },
//   //   Toyota: {
//   //     "4Runner": 128296,
//   //     "86/Scion FR-S": 6846,
//   //     Avalon: 32583,
//   //     Camry: 387081,
//   //     "C-HR": 25755,
//   //     Corolla: 329196,
//   //     "FJ Cruiser": 4,
//   //     Highlander: 215775,
//   //     "Land Cruiser": 3100,
//   //     Mirai: 1838,
//   //     Prius: 108662,
//   //     RAV4: 407594,
//   //     Sequoia: 12156,
//   //     Sienna: 111489,
//   //     Tacoma: 198124,
//   //     Tundra: 116285,
//   //     Venza: 14,
//   //     Yaris: 44380
//   //   },
//   //   Volkswagen: {
//   //     Atlas: 27119,
//   //     Beetle: 15166,
//   //     CC: 1355,
//   //     Eos: 1,
//   //     Golf: 68978,
//   //     Jetta: 115807,
//   //     Passat: 60722,
//   //     Tiguan: 46983,
//   //     Touareg: 3545
//   //   },
//   //   Volvo: { S60: 16825, S80: 7, S90: 11090, XC60: 22516, XC90: 30996 }
//   // };

//   function processData(data) {
//     var treeData = [];

//     var smallBrands = { name: "Other", children: [] };

//     for (var brand in data) {
//       var brandData = { name: brand, children: [] };
//       var brandTotal = 0;
//       for (var model in data[brand]) {
//         brandTotal += data[brand][model];
//       }

//       for (var model in data[brand]) {
//         // do not add very small
//         if (data[brand][model] > 100) {
//           brandData.children.push({ name: model, count: data[brand][model] });
//         }
//       }

//       // add to small brands if total number less than
//       if (brandTotal > 100000) {
//         treeData.push(brandData);
//       } else {
//         smallBrands.children.push(brandData);
//       }
//     }
//     treeData.push(smallBrands);
//     return treeData;
//   }

//   // create chart
//   var chart = am4core.create("map-container-am", am4charts.TreeMap);
//   chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

//   chart.padding(0, 0, 0, 0);
//   chart.data = data;
//   // only one level visible initially
//   chart.maxLevels = 1;
//   // define data fields
//   chart.dataFields.value = "count";
//   chart.dataFields.name = "name";
//   chart.dataFields.children = "children";
//   chart.homeText = "US Car Sales 2017";

//   // enable navigation
//   chart.navigationBar = new am4charts.NavigationBar();

//   // level 0 series template
//   var level0SeriesTemplate = chart.seriesTemplates.create("0");
//   level0SeriesTemplate.strokeWidth = 2;

//   // by default only current level series bullets are visible, but as we need brand bullets to be visible all the time, we modify it's hidden state
//   level0SeriesTemplate.bulletsContainer.hiddenState.properties.opacity = 1;
//   level0SeriesTemplate.bulletsContainer.hiddenState.properties.visible = true;
//   // create hover state
//   var hoverState = level0SeriesTemplate.columns.template.states.create("hover");

//   // darken
//   hoverState.adapter.add("fill", (fill, target) => {
//     return am4core.color(am4core.colors.brighten(fill.rgb, -0.2));
//   });

//   // add logo
//   var image = level0SeriesTemplate.columns.template.createChild(
//     am4core.Image
//   );
//   image.opacity = 0.15;
//   image.align = "center";
//   image.valign = "middle";
//   image.width = am4core.percent(80);
//   image.height = am4core.percent(80);

//   // add adapter for href to load correct image
//   image.adapter.add("href", (href, target) => {
//     var dataItem = target.parent.dataItem;
//     if (dataItem) {
//       return (
//         "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/" +
//         dataItem.treeMapDataItem.name.toLowerCase() +
//         ".png"
//       );
//     }
//   });

//   // level1 series template
//   var level1SeriesTemplate = chart.seriesTemplates.create("1");
//   var bullet1 = level1SeriesTemplate.bullets.push(
//     new am4charts.LabelBullet()
//   );
//   bullet1.locationX = 0.5;
//   bullet1.locationY = 0.5;
//   bullet1.label.text = "{name}";
//   bullet1.label.fill = am4core.color("#ffffff");
//   level1SeriesTemplate.columns.template.fillOpacity = 0;

//   // level2 series template
//   var level2SeriesTemplate = chart.seriesTemplates.create("2");
//   var bullet2 = level2SeriesTemplate.bullets.push(
//     new am4charts.LabelBullet()
//   );
//   bullet2.locationX = 0.5;
//   bullet2.locationY = 0.5;
//   bullet2.label.text = "{name}";
//   bullet2.label.fill = am4core.color("#ffffff");

// }

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
    trigger: "hover"
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
    if ( heightTick >= 100 ) {
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

var viewpointPromise = fetch("json/viewpoint.json?t=1").then(res => res.json());
viewpointPromise.then(data => {
  const gridWrap = $("#viewpoints .features-block");
  const itemTemp = $("#viewpoints template[item]").html().trim();
  data.forEach(it => {
    gridWrap.append(mapping( itemTemp, it ));
  });

  const viewsSwiper = new Swiper('.view-swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    loop: true,
    centeredSlides: true,
    keyboard: true,
    spaceBetween: 0,
    slidesPerView: 'auto',
    speed: 100,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 0,
      modifier: 3,
      slideShadows: false
    },
    simulateTouch: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  });
});

var domloaded = false;
var jsonloaded = false;

var itemsPromise = fetch("json/map.json?t=6").then(res => res.json());

itemsPromise.then(data => {
  const gridWrap = $("#map .grid");
  const groupWrap = $("#map .sidebar-menu ul");
  const itemTemp = $("#map div[layout=list] template[item]").html().trim();
  const groups = data.groups;
  const items = data.items;
  
  // loadTreemapChart( groups, items );
  // loadAmTreemapChart( groups, items );
  loadMap( groups, items );
  
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
      return t.group.indexOf(selectedOption) === 0;
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
      trigger: "hover"
    });
  });

  jsonloaded = true;

  if ( domloaded ) {
    groupWrap.find(".sidebar-item").first().trigger('click');
  }
});

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
var toConvertPromise = fetch("json/converted.json?t=1").then(res => res.json());
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