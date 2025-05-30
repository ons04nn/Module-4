
const blocksData = [
  {
    type: 'large',
    image: 'images/1.jpg',
    tag: 'Категория',
    date: '2023-11-15',
    title: 'Заголовок'
  }
  // ...
];





$(document).ready(function(){
  $('.items').slick({
      centerMode: true,
      centerPadding: '400px',
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      autoplay: true,
      autoplaySpeed: 2000,
      speed: 2000,
      cssEase: 'ease-in-out',



      responsive: [{
          breakpoint: 1400,
          settings: {
                  centerPadding: '250px',
              }
          },
          {
          breakpoint: 900,
          settings: {
                  centerPadding: '80px',
                  
              }
          },
      ]
      
  });
});


$(document).ready(function(){
  $('.navbar').slick({
      centerPadding: '200px',
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      arrows: false,
      dots: false,
      speed: 20,
      cssEase: 'ease-in-out',



      responsive: [{
          breakpoint: 1400,
          settings: {
                  centerPadding: '50px',
              }
          },
          {
          breakpoint: 900,
          settings: {
                  centerPadding: '30px',
                  
              }
          },
      ]
      
  });
});