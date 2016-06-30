var tplIndex = require('../templates/index.string');

// 引用公共方法
var util = require('../utils/fn.js');
//document.body.innerHTML += tplIndex;
SPA.defineView('index', {
  html: tplIndex,
  plugins: ['delegated'],

  modules: [{
    name: 'content', // 子视图的名字，用作后边引用的句柄
    views: ['home', 'search','nail','my'], // 定义子视图的列表数组
    defaultTag: 'home', // 定义默认视图
    container: '.l-container' // 子视图的容器
  }],

  //绑定tab事件
  bindActions:{
    'switch.tabs': function(e,data){
      //console.log(1);
      //设置tab高亮
        util.setFocus(e.el);
        this.modules.content.launch(data.tag);
    },
    'exit': function(e){
        util.setFocus(e.el);
        //关闭当前视图
        this.hide();
    }
  },
  bindEvents: {
    show: function () {
    //  var myScroll = new IScroll('#home-scroll');
    //  console.log(0);
      var mySwiper = new Swiper('#oSwiper', {
        loop: true,
		    autoplay:1000,
		    pagination: '.swiper-pagination'

      });

    }
  }
});
