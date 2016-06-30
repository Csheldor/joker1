var tplGuide = require('../templates/guide.string');
//document.body.innerHTML += tplIndex;
SPA.defineView('guide', {
  html: tplGuide,
  plugins: ['delegated'],
  bindActions:{
    'goto.index': function() {
      SPA.open('index');
    }
  },
  bindEvents: {
    'show': function(){
      var guideSwiper = new Swiper('#guide-swiper',{
        loop:false
      });
    }
  }
});
