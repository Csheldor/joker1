var tplDetails = require('../templates/details.string');

// 引用公共方法
var util = require('../utils/fn.js');

SPA.defineView('details', {
  html: tplDetails,
  plugins: ['delegated',{
    name: 'avalon',
    options: function (vm) {
      vm.img = "";
      vm.title = "";
      vm.detail = "";
      vm.price = "";
      vm.sname = "";
      vm.isShowLoading = true;
    }
  }],
  init: {
    detailsSwiper: null,
    detailsnavSwiper:null
  },
  bindActions: {
    'back': function () {
      this.hide();
    },
    'details.switch.tabs': function (e) {
      util.setFocus(e.el);
      this.detailsnavSwiper.slideTo($(e.el).index());
    }
  },
  bindEvents: {
      'show': function() {
        var that = this;

        //打开详情页获取产品数据
        var vm = that.getVM();
        var d = that.param.data;
      //  console.log(d);
        oAjax('/api/gethomepbllist.php');
        oAjax('/api/gethomehotlist2.php');
        oAjax('/api/gethomehotlist3.php');
        oAjax('/api/gethomehotlist4.php');
        function oAjax(oUrl){
          $.ajax({
            url: oUrl,
            data: {
              rtype:"origin"
            },
            success: function (rs) {
            //  setTimeout(function () {
                for(var i = 0; i < rs.data.length; i++){
                //  console.log(rs.data[i].iid);
                  if (rs.data[i].iid == d) {
                    //console.log(1);
                    //vm.title = rs.data[i].title;
                    vm.img = rs.data[i].img;
                  //  vm.detail = rs.data[i].detail;
                    vm.price = rs.data[i].price;
                    vm.sname = rs.data[i].sName;
                  //  vm.isShowLoading = false;
                  }
                };
                that.detailsSwiper = new Swiper('#details-swiper',{
                  loop:false,
                  pagination: '.swiper-pagination'
                });
                that.detailsnavSwiper = new Swiper('#details-nav-swiper',{
                  loop:false,
                  pagination: '.swiper-pagination',
                  onSlideChangeStart: function (swiper) {
                    var index = swiper.activeIndex;
                    var $lis = $('.details-nav ul li');
                    util.setFocus($lis.eq(index));
                  }
                });

            //  }, 3000);

            }
          })
        }

      }
  }


});
