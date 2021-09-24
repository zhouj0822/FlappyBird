
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Background.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4a8a8g8fIlLSZ5xoRWc4YRl', 'Background');
// Scripts/Background.js

"use strict";

var Constant = require('Constant');

var Background = cc.Class({
  "extends": cc.Component,
  properties: {
    // 地板节点数组
    groundNode: {
      "default": [],
      type: [cc.Node]
    },
    // 地板图片对象
    groundImg: {
      "default": null,
      type: cc.Sprite
    }
  },
  // use this for initialization
  onLoad: function onLoad() {
    // 获取屏幕尺寸
    this._size = cc.winSize; // 获取地板图片的宽度

    this._width = this.groundImg.spriteFrame.getRect().width; // 启动“地板移动控制”计时器

    this.schedule(this.onGroundMove, Constant.GROUND_MOVE_INTERVAL);
  },
  onGroundMove: function onGroundMove() {
    this.groundNode[0].x += Constant.GROUND_VX;
    this.groundNode[1].x += Constant.GROUND_VX;

    if (this.groundNode[0].x + this._width / 2 < -this._size.width / 2) {
      this.groundNode[0].x = this.groundNode[1].x + this._width - 5;
    }

    if (this.groundNode[1].x + this._width / 2 < -this._size.width / 2) {
      this.groundNode[1].x = this.groundNode[0].x + this._width - 5;
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL0JhY2tncm91bmQuanMiXSwibmFtZXMiOlsiQ29uc3RhbnQiLCJyZXF1aXJlIiwiQmFja2dyb3VuZCIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiZ3JvdW5kTm9kZSIsInR5cGUiLCJOb2RlIiwiZ3JvdW5kSW1nIiwiU3ByaXRlIiwib25Mb2FkIiwiX3NpemUiLCJ3aW5TaXplIiwiX3dpZHRoIiwic3ByaXRlRnJhbWUiLCJnZXRSZWN0Iiwid2lkdGgiLCJzY2hlZHVsZSIsIm9uR3JvdW5kTW92ZSIsIkdST1VORF9NT1ZFX0lOVEVSVkFMIiwieCIsIkdST1VORF9WWCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxRQUFRLEdBQUdDLE9BQU8sQ0FBQyxVQUFELENBQXRCOztBQUVBLElBQUlDLFVBQVUsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDdEIsYUFBU0QsRUFBRSxDQUFDRSxTQURVO0FBR3RCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBQyxJQUFBQSxVQUFVLEVBQUU7QUFDUixpQkFBUyxFQUREO0FBRVJDLE1BQUFBLElBQUksRUFBRSxDQUFDTCxFQUFFLENBQUNNLElBQUo7QUFGRSxLQUZKO0FBTVI7QUFDQUMsSUFBQUEsU0FBUyxFQUFFO0FBQ1AsaUJBQVMsSUFERjtBQUVQRixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1E7QUFGRjtBQVBILEdBSFU7QUFnQnRCO0FBQ0FDLEVBQUFBLE1BQU0sRUFBRSxrQkFBWTtBQUNoQjtBQUNBLFNBQUtDLEtBQUwsR0FBYVYsRUFBRSxDQUFDVyxPQUFoQixDQUZnQixDQUdoQjs7QUFDQSxTQUFLQyxNQUFMLEdBQWMsS0FBS0wsU0FBTCxDQUFlTSxXQUFmLENBQTJCQyxPQUEzQixHQUFxQ0MsS0FBbkQsQ0FKZ0IsQ0FLaEI7O0FBQ0EsU0FBS0MsUUFBTCxDQUFjLEtBQUtDLFlBQW5CLEVBQWlDcEIsUUFBUSxDQUFDcUIsb0JBQTFDO0FBQ0gsR0F4QnFCO0FBMEJ0QkQsRUFBQUEsWUFBWSxFQUFFLHdCQUFXO0FBQ3JCLFNBQUtiLFVBQUwsQ0FBZ0IsQ0FBaEIsRUFBbUJlLENBQW5CLElBQXdCdEIsUUFBUSxDQUFDdUIsU0FBakM7QUFDQSxTQUFLaEIsVUFBTCxDQUFnQixDQUFoQixFQUFtQmUsQ0FBbkIsSUFBd0J0QixRQUFRLENBQUN1QixTQUFqQzs7QUFDQSxRQUFJLEtBQUtoQixVQUFMLENBQWdCLENBQWhCLEVBQW1CZSxDQUFuQixHQUF1QixLQUFLUCxNQUFMLEdBQVksQ0FBbkMsR0FBdUMsQ0FBRSxLQUFLRixLQUFMLENBQVdLLEtBQWIsR0FBbUIsQ0FBOUQsRUFBaUU7QUFDN0QsV0FBS1gsVUFBTCxDQUFnQixDQUFoQixFQUFtQmUsQ0FBbkIsR0FBdUIsS0FBS2YsVUFBTCxDQUFnQixDQUFoQixFQUFtQmUsQ0FBbkIsR0FBdUIsS0FBS1AsTUFBNUIsR0FBcUMsQ0FBNUQ7QUFDSDs7QUFDRCxRQUFJLEtBQUtSLFVBQUwsQ0FBZ0IsQ0FBaEIsRUFBbUJlLENBQW5CLEdBQXVCLEtBQUtQLE1BQUwsR0FBWSxDQUFuQyxHQUF1QyxDQUFFLEtBQUtGLEtBQUwsQ0FBV0ssS0FBYixHQUFtQixDQUE5RCxFQUFpRTtBQUM3RCxXQUFLWCxVQUFMLENBQWdCLENBQWhCLEVBQW1CZSxDQUFuQixHQUF1QixLQUFLZixVQUFMLENBQWdCLENBQWhCLEVBQW1CZSxDQUFuQixHQUF1QixLQUFLUCxNQUE1QixHQUFxQyxDQUE1RDtBQUNIO0FBQ0osR0FuQ3FCLENBb0N0QjtBQUNBO0FBRUE7O0FBdkNzQixDQUFULENBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQ29uc3RhbnQgPSByZXF1aXJlKCdDb25zdGFudCcpO1xyXG5cclxudmFyIEJhY2tncm91bmQgPSBjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8vIOWcsOadv+iKgueCueaVsOe7hFxyXG4gICAgICAgIGdyb3VuZE5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IFtjYy5Ob2RlXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8g5Zyw5p2/5Zu+54mH5a+56LGhXHJcbiAgICAgICAgZ3JvdW5kSW1nOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZVxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g6I635Y+W5bGP5bmV5bC65a+4XHJcbiAgICAgICAgdGhpcy5fc2l6ZSA9IGNjLndpblNpemU7XHJcbiAgICAgICAgLy8g6I635Y+W5Zyw5p2/5Zu+54mH55qE5a695bqmXHJcbiAgICAgICAgdGhpcy5fd2lkdGggPSB0aGlzLmdyb3VuZEltZy5zcHJpdGVGcmFtZS5nZXRSZWN0KCkud2lkdGg7XHJcbiAgICAgICAgLy8g5ZCv5Yqo4oCc5Zyw5p2/56e75Yqo5o6n5Yi24oCd6K6h5pe25ZmoXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLm9uR3JvdW5kTW92ZSwgQ29uc3RhbnQuR1JPVU5EX01PVkVfSU5URVJWQUwpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkdyb3VuZE1vdmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuZ3JvdW5kTm9kZVswXS54ICs9IENvbnN0YW50LkdST1VORF9WWDtcclxuICAgICAgICB0aGlzLmdyb3VuZE5vZGVbMV0ueCArPSBDb25zdGFudC5HUk9VTkRfVlg7XHJcbiAgICAgICAgaWYgKHRoaXMuZ3JvdW5kTm9kZVswXS54ICsgdGhpcy5fd2lkdGgvMiA8IC0gdGhpcy5fc2l6ZS53aWR0aC8yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JvdW5kTm9kZVswXS54ID0gdGhpcy5ncm91bmROb2RlWzFdLnggKyB0aGlzLl93aWR0aCAtIDU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmdyb3VuZE5vZGVbMV0ueCArIHRoaXMuX3dpZHRoLzIgPCAtIHRoaXMuX3NpemUud2lkdGgvMikge1xyXG4gICAgICAgICAgICB0aGlzLmdyb3VuZE5vZGVbMV0ueCA9IHRoaXMuZ3JvdW5kTm9kZVswXS54ICsgdGhpcy5fd2lkdGggLSA1O1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xyXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcclxuXHJcbiAgICAvLyB9LFxyXG59KTtcclxuIl19