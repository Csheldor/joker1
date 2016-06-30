var tplHome = require('../templates/home.string');

// 引用公共方法
var util = require('../utils/fn.js');

SPA.defineView('home', {
  html: tplHome,

  plugins: ['delegated',{
    name:'avalon',
    options: function (vm) {
      vm.homepbllist = [];
      vm.homebanner = [];
      vm.homehotlist2 = [];
      vm.homehotlist3 = [];
      vm.homehotlist4 = [];
    }
  }],

  init:{
    vm: null,
    proId: 0,
    homepbllistArray: [],
    homehotlist2Array:[],
    homehotlist3Array:[],
    homehotlist4Array:[],
    homenavSwiper: null,
    formatData:function (arr) {
      var tempArr = [];
      for (var i = 0; i < Math.ceil(arr.length/2); i++) {
          tempArr[i] = [];
          tempArr[i].push(arr[2*i]);
          tempArr[i].push(arr[2*i+1]);
      }
      return tempArr;
    }
  },
  bindActions:{
    'switch.taps.homehot': function(e,data){//点击30元封顶等，下面的pbl向左滑动
        this.homenavSwiper.slideTo($(e.el).index());
    },
    'goto.details': function(e,data){
      proId = $(e.el).attr("data-id");
        SPA.open('details',{
          param: {
            data: proId
          }
        });
    }
  },
  bindEvents:{
    //注意beforeShow大小写
    'beforeShow': function(){
      var that = this;
      //获得vm对象
      that.vm = that.getVM();
      //  console.log(vm);


      //通过ajax加载banner和nav
      $.ajax({
        //url:'/joker/mock/homepbllist.json',
        url:'/api/gethomebanner.php',
        type:'get',
        data: {
          rtype:"origin"
        },
        success: function(rs){
          that.vm.homebanner = rs.data[0].themes;
        }
      });


    //  homeAjax('/api/gethomepbllist.php',homepbllistArray,homepbllist);
      //函数封装
      function homeAjax (oUrl,homearr,homepro) {
        //通过ajax加载产品数据
          $.ajax({
            //url:'/joker/mock/homepbllist.json',
            url: oUrl,
            type:'get',
            data: {
              rtype:"origin"
            },
            success: function(rs){
              that.homearr = rs.data;
              //console.log(rs);
              that.vm.homepro = that.formatData(rs.data);
              //console.log(that.formatData(rs.data));
            }
          });
      }
      //通过ajax加载产品数据
        $.ajax({
          //url:'/joker/mock/homepbllist.json',
          url:'/api/gethomepbllist.php',
          type:'get',
          data: {
            rtype:"origin"
          },
          success: function(rs){
            that.homepbllistArray = rs.data;
            //console.log(rs);
            that.vm.homepbllist = that.formatData(rs.data);
            //console.log(that.formatData(rs.data));
          }
        });


        //30元封顶通过ajax加载数据
          $.ajax({
            //url:'/joker/mock/homepbllist.json',
            url:'/api/gethomehotlist2.php',
            type:'get',
            data: {
              rtype:"origin"
            },
            success: function(rs){
              that.homehotlist2Array = rs.data;
              //console.log(rs);
              that.vm.homehotlist2 = that.formatData(rs.data);
              //console.log(that.formatData(rs.data));
            }
          });


          //超性价比通过ajax加载数据
            $.ajax({
              //url:'/joker/mock/homepbllist.json',
              url:'/api/gethomehotlist3.php',
              type:'get',
              data: {
                rtype:"origin"
              },
              success: function(rs){
                that.homehotlist3Array = rs.data;
                //console.log(rs);
                that.vm.homehotlist3 = that.formatData(rs.data);
                //console.log(that.formatData(rs.data));
              }
            });

            //超性价比通过ajax加载数据
              $.ajax({
                //url:'/joker/mock/homepbllist.json',
                url:'/api/gethomehotlist4.php',
                type:'get',
                data: {
                  rtype:"origin"
                },
                success: function(rs){
                  that.homehotlist4Array = rs.data;
                  //console.log(rs);
                  that.vm.homehotlist4 = that.formatData(rs.data);
                  //console.log(that.formatData(rs.data));
                }
              });
    },
    'show': function() {
        var that = this;
        //that.vm = that.getVM();
        that.homenavSwiper = new Swiper('#homenav-swiper',{
          loop:false
        });




        //下拉刷新。上拉加载更多；
        var scrollSize = 50;
        var homeScroll = that.widgets.homeScroll;
        homeScroll.scrollBy(0,-scrollSize);

        var homeRefresh = $('.home-refresh img');
            topImgHasClass = homeRefresh.hasClass('up');
        var loading = $('.loading img');
            bottomImgHasClass = loading.hasClass('down');
        homeScroll.on('scroll',function(){
          var y = this.y,
              maxY = this.maxScrollY - y;
            //  console.log(this.maxScrollY);
          if (y >= 0) {
            !topImgHasClass && homeRefresh.addClass('up');
            return '';
          }
          if (maxY >=0) {
            !bottomImgHasClass && loading.addClass('down');
            return '';
          }
        });

        //滑动结束后的页面状态
        homeScroll.on('scrollEnd',function(){
          if(this.y >= -scrollSize && this.y < 0){
            //如果scroll滚动高度y，大于-50，小于0，
            //整个可滚动部分滚动到-50处，并且移除up
            homeScroll.scrollTo(0,-scrollSize);
            homeRefresh.removeClass('up');
          }else if (this.y >= 0) {
            //延时1s后执行，页面滚动至-50处，同时移除up
            //homeScroll.refresh();
            setTimeout(function(){
              homeScroll.scrollTo(0,-scrollSize);
              homeRefresh.removeClass('up');
            },1000);
          }

          //maxY=最大可滚动距离-当前位置
          var maxY = this.maxScrollY - this.y;
          var self = this;
          if (maxY > -scrollSize && maxY < 0) {

            homeScroll.scrollTo(0, self.maxScrollY + scrollSize);
            loading.removeClass('down');
          }else if (maxY >=0 ) {
            //ajax加载数据
            $.ajax({
              url: '/api/gethomepbllist.php',
              data: {
                rtype: 'more'
              },
              success: function (rs) {
                //合并两个数组that.homepbllistArray和rs.data，顺序决定前后
                var newArray = that.homepbllistArray.concat(rs.data);
              //  var newArray = rs.data.concat(that.livelistArray);
                that.vm.homepbllist = that.formatData(newArray);
                that.homepbllistArray = newArray;
                //console.log(that.vm.homeScroll);
                //数据加载完成后执行
                homeScroll.refresh();
                homeScroll.scrollTo(0,self.y + scrollSize);
                loading.removeClass('down');
              }
            });
            // setTimeout(function () {
            //   homeScroll.refresh();
            //   homeScroll.scrollTo(0,self.y + scrollSize);
            //   loading.removeClass('down');
            // },1000);
          }
        });
    }
  }


});
