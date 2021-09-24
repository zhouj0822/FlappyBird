
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Bird.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dba40+MKV5FjpALbo9uDYLc', 'Bird');
// Scripts/Bird.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    // 小鸟重力值
    gravity: 0.5,
    // 小鸟弹跳值
    birdJump: 6.6,
    // 动画名称
    AnimName: '',
    // 弹跳音效
    jumpAudio: {
      "default": null,
      url: cc.AudioClip
    }
  },
  // use this for initialization
  onLoad: function onLoad() {
    // 获取本身的cc.Animation对象，并播放AnimName动画
    this.getComponent(cc.Animation).play(this.AnimName); // 初始化速度为0

    this.velocity = 0;
  },
  onStartDrop: function onStartDrop() {
    this.schedule(this.onDrop, 0.01);
  },
  onDrop: function onDrop() {
    this.node.y += this.velocity;
    this.velocity -= this.gravity;
  },
  onJump: function onJump() {
    // 弹跳时，重设向上的速度
    this.velocity = this.birdJump; // 播放弹跳音效

    cc.audioEngine.playEffect(this.jumpAudio, false);
  } // called every frame, uncomment this function to activate update callback
  // update: function (dt) {
  // },

});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL0JpcmQuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJncmF2aXR5IiwiYmlyZEp1bXAiLCJBbmltTmFtZSIsImp1bXBBdWRpbyIsInVybCIsIkF1ZGlvQ2xpcCIsIm9uTG9hZCIsImdldENvbXBvbmVudCIsIkFuaW1hdGlvbiIsInBsYXkiLCJ2ZWxvY2l0eSIsIm9uU3RhcnREcm9wIiwic2NoZWR1bGUiLCJvbkRyb3AiLCJub2RlIiwieSIsIm9uSnVtcCIsImF1ZGlvRW5naW5lIiwicGxheUVmZmVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDQUMsSUFBQUEsT0FBTyxFQUFFLEdBRkQ7QUFHUjtBQUNBQyxJQUFBQSxRQUFRLEVBQUUsR0FKRjtBQUtSO0FBQ0FDLElBQUFBLFFBQVEsRUFBRSxFQU5GO0FBT1I7QUFDQUMsSUFBQUEsU0FBUyxFQUFFO0FBQ1AsaUJBQVMsSUFERjtBQUVQQyxNQUFBQSxHQUFHLEVBQUVSLEVBQUUsQ0FBQ1M7QUFGRDtBQVJILEdBSFA7QUFpQkw7QUFDQUMsRUFBQUEsTUFBTSxFQUFFLGtCQUFZO0FBQ2hCO0FBQ0EsU0FBS0MsWUFBTCxDQUFrQlgsRUFBRSxDQUFDWSxTQUFyQixFQUFnQ0MsSUFBaEMsQ0FBcUMsS0FBS1AsUUFBMUMsRUFGZ0IsQ0FHaEI7O0FBQ0EsU0FBS1EsUUFBTCxHQUFnQixDQUFoQjtBQUNILEdBdkJJO0FBeUJMQyxFQUFBQSxXQUFXLEVBQUUsdUJBQVk7QUFDckIsU0FBS0MsUUFBTCxDQUFjLEtBQUtDLE1BQW5CLEVBQTBCLElBQTFCO0FBQ0gsR0EzQkk7QUE2QkxBLEVBQUFBLE1BQU0sRUFBRSxrQkFBVztBQUNmLFNBQUtDLElBQUwsQ0FBVUMsQ0FBVixJQUFlLEtBQUtMLFFBQXBCO0FBQ0EsU0FBS0EsUUFBTCxJQUFpQixLQUFLVixPQUF0QjtBQUNILEdBaENJO0FBa0NMZ0IsRUFBQUEsTUFBTSxFQUFFLGtCQUFXO0FBQ2Y7QUFDQSxTQUFLTixRQUFMLEdBQWdCLEtBQUtULFFBQXJCLENBRmUsQ0FHZjs7QUFDQUwsSUFBQUEsRUFBRSxDQUFDcUIsV0FBSCxDQUFlQyxVQUFmLENBQTBCLEtBQUtmLFNBQS9CLEVBQTBDLEtBQTFDO0FBQ0gsR0F2Q0ksQ0EwQ0w7QUFDQTtBQUVBOztBQTdDSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8vIOWwj+m4n+mHjeWKm+WAvFxyXG4gICAgICAgIGdyYXZpdHk6IDAuNSxcclxuICAgICAgICAvLyDlsI/puJ/lvLnot7PlgLxcclxuICAgICAgICBiaXJkSnVtcDogNi42LFxyXG4gICAgICAgIC8vIOWKqOeUu+WQjeensFxyXG4gICAgICAgIEFuaW1OYW1lOiAnJyxcclxuICAgICAgICAvLyDlvLnot7Ppn7PmlYhcclxuICAgICAgICBqdW1wQXVkaW86IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdXJsOiBjYy5BdWRpb0NsaXBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g6I635Y+W5pys6Lqr55qEY2MuQW5pbWF0aW9u5a+56LGh77yM5bm25pKt5pS+QW5pbU5hbWXliqjnlLtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkodGhpcy5BbmltTmFtZSk7XHJcbiAgICAgICAgLy8g5Yid5aeL5YyW6YCf5bqm5Li6MFxyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSAwO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgb25TdGFydERyb3A6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMub25Ecm9wLDAuMDEpO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgb25Ecm9wOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLm5vZGUueSArPSB0aGlzLnZlbG9jaXR5O1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgLT0gdGhpcy5ncmF2aXR5O1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgb25KdW1wOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDlvLnot7Pml7bvvIzph43orr7lkJHkuIrnmoTpgJ/luqZcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdGhpcy5iaXJkSnVtcDtcclxuICAgICAgICAvLyDmkq3mlL7lvLnot7Ppn7PmlYhcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuanVtcEF1ZGlvLCBmYWxzZSk7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBcclxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXHJcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG5cclxuICAgIC8vIH0sXHJcbn0pO1xyXG4iXX0=