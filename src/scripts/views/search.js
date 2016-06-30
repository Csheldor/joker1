var tplSearch = require('../templates/search.string');
var util = require('../utils/fn.js');

SPA.defineView('search', {
  html: tplSearch,
  plugins: ['delegated',{
    name:'avalon',
    options: function (vm) {
      vm.searchlist = [];
    }
  }],
  init:{
    vm: null,
    formatData:function (arr) {
      var tempArr = [];
      for (var i = 0; i < Math.ceil(arr.length); i++) {
          tempArr[i] = [];
        //  tempArr[i].push(arr[2*i]);
        //  tempArr[i].push(arr[2*i+1]);
        for (var j = 0; j < Math.ceil(arr[i].length/3); j++) {

        }
      }
      return tempArr;
    }
  },

  bindActions:{
    'search.switch.tabs':function(e){
        var index = $(e.el).index();
        util.setFocus(e.el);
        util.setFocus($(".search-scroll ul").eq(index));
    }
  },
  bindEvents:{
    //注意beforeShow大小写
    'beforeShow': function(){
      var that = this;
      //获得vm对象
      that.vm = that.getVM();
      //  console.log(vm);

      //通过ajax加载数据
        $.ajax({
          //url:'/joker/mock/homepbllist.json',
          url:'/api/getsearchlist.php',
          type:'get',
          data: {
            rtype:"origin"
          },
          success: function(rs){
            //that.homepbllistArray = rs.data;
            that.vm.searchlist = rs.data;
            //console.log(that.formatData(rs.data));
            //console.log(rs.data);
            $(".search-scroll ul").eq(0).addClass("active");
          }
        });

      // <ul ms-repeat-value="searchlist">
      //   <li ms-repeat-tags="value.tags">
      //       <div class="search-proshow">
      //         <img alt="" ms-src="tags.picUrl">
      //         <p ms-text="tags.name"></p>
      //       </div>
      //   </li>
      // </ul>





      // //通过ajax加载数据
      //   $.ajax({
      //     //url:'/joker/mock/homepbllist.json',
      //     url:'/api/getsearchlist.php',
      //     type:'get',
      //     data: {
      //       rtype:"origin"
      //     },
      //     success: function(rs){
      //         var arr = rs.data
      //     //  console.log(rs.data[0].tags.length/3);
      //
      //       var tempArr = [];
      //       for (var i = 0; i < Math.ceil(arr.length); i++) {
      //           //tempArr[i] = [];
      //           var arr1 = arr[i];
      //         //  tempArr[i].push(arr[2*i]);
      //         //  tempArr[i].push(arr[2*i+1]);
      //         for (var j = 0; j < Math.ceil(arr1.tags.length/3); j++) {
      //           //console.log(Math.ceil(arr[i].tags.length/3));
      //           tempArr[j] = [];
      //           tempArr[j].push(arr1.tags[3*j]);
      //           tempArr[j].push(arr1.tags[3*j+1]);
      //           tempArr[j].push(arr1.tags[3*j+2]);
      //           //console.log(tempArr2);
      //         }
      //
      //       }
      //     //  console.log(tempArr);
      //       console.log(tempArr);
      //       // that.vm.searchlist = ;
      //       //console.log(that.formatData(rs.data));
      //     }
      //   });



    }
  }

});
