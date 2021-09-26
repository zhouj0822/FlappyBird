
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
    this._size = cc.winSize; // 获取地板图片的宽度, getRect(): 获取 SpriteFrame 的纹理矩形区域

    this._width = this.groundImg.spriteFrame.getRect().width; // 启动“地板移动控制”计时器

    this.schedule(this.onGroundMove, Constant.GROUND_MOVE_INTERVAL);
  },
  onGroundMove: function onGroundMove() {
    this.groundNode[0].x += Constant.GROUND_VX; // GROUND_VX：单位时间地板移动速度

    this.groundNode[1].x += Constant.GROUND_VX; // 一块地板出画后移动到第二块地板后，交替进行，避免因为地板移动而出画

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL0JhY2tncm91bmQuanMiXSwibmFtZXMiOlsiQ29uc3RhbnQiLCJyZXF1aXJlIiwiQmFja2dyb3VuZCIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiZ3JvdW5kTm9kZSIsInR5cGUiLCJOb2RlIiwiZ3JvdW5kSW1nIiwiU3ByaXRlIiwib25Mb2FkIiwiX3NpemUiLCJ3aW5TaXplIiwiX3dpZHRoIiwic3ByaXRlRnJhbWUiLCJnZXRSZWN0Iiwid2lkdGgiLCJzY2hlZHVsZSIsIm9uR3JvdW5kTW92ZSIsIkdST1VORF9NT1ZFX0lOVEVSVkFMIiwieCIsIkdST1VORF9WWCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxRQUFRLEdBQUdDLE9BQU8sQ0FBQyxVQUFELENBQXRCOztBQUVBLElBQUlDLFVBQVUsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDdEIsYUFBU0QsRUFBRSxDQUFDRSxTQURVO0FBR3RCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBQyxJQUFBQSxVQUFVLEVBQUU7QUFDUixpQkFBUyxFQUREO0FBRVJDLE1BQUFBLElBQUksRUFBRSxDQUFDTCxFQUFFLENBQUNNLElBQUo7QUFGRSxLQUZKO0FBTVI7QUFDQUMsSUFBQUEsU0FBUyxFQUFFO0FBQ1AsaUJBQVMsSUFERjtBQUVQRixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1E7QUFGRjtBQVBILEdBSFU7QUFnQnRCO0FBQ0FDLEVBQUFBLE1BQU0sRUFBRSxrQkFBWTtBQUNoQjtBQUNBLFNBQUtDLEtBQUwsR0FBYVYsRUFBRSxDQUFDVyxPQUFoQixDQUZnQixDQUdoQjs7QUFDQSxTQUFLQyxNQUFMLEdBQWMsS0FBS0wsU0FBTCxDQUFlTSxXQUFmLENBQTJCQyxPQUEzQixHQUFxQ0MsS0FBbkQsQ0FKZ0IsQ0FLaEI7O0FBQ0EsU0FBS0MsUUFBTCxDQUFjLEtBQUtDLFlBQW5CLEVBQWlDcEIsUUFBUSxDQUFDcUIsb0JBQTFDO0FBQ0gsR0F4QnFCO0FBMEJ0QkQsRUFBQUEsWUFBWSxFQUFFLHdCQUFXO0FBQ3JCLFNBQUtiLFVBQUwsQ0FBZ0IsQ0FBaEIsRUFBbUJlLENBQW5CLElBQXdCdEIsUUFBUSxDQUFDdUIsU0FBakMsQ0FEcUIsQ0FDdUI7O0FBQzVDLFNBQUtoQixVQUFMLENBQWdCLENBQWhCLEVBQW1CZSxDQUFuQixJQUF3QnRCLFFBQVEsQ0FBQ3VCLFNBQWpDLENBRnFCLENBR3JCOztBQUNBLFFBQUksS0FBS2hCLFVBQUwsQ0FBZ0IsQ0FBaEIsRUFBbUJlLENBQW5CLEdBQXVCLEtBQUtQLE1BQUwsR0FBWSxDQUFuQyxHQUF1QyxDQUFFLEtBQUtGLEtBQUwsQ0FBV0ssS0FBYixHQUFtQixDQUE5RCxFQUFpRTtBQUM3RCxXQUFLWCxVQUFMLENBQWdCLENBQWhCLEVBQW1CZSxDQUFuQixHQUF1QixLQUFLZixVQUFMLENBQWdCLENBQWhCLEVBQW1CZSxDQUFuQixHQUF1QixLQUFLUCxNQUE1QixHQUFxQyxDQUE1RDtBQUNIOztBQUNELFFBQUksS0FBS1IsVUFBTCxDQUFnQixDQUFoQixFQUFtQmUsQ0FBbkIsR0FBdUIsS0FBS1AsTUFBTCxHQUFZLENBQW5DLEdBQXVDLENBQUUsS0FBS0YsS0FBTCxDQUFXSyxLQUFiLEdBQW1CLENBQTlELEVBQWlFO0FBQzdELFdBQUtYLFVBQUwsQ0FBZ0IsQ0FBaEIsRUFBbUJlLENBQW5CLEdBQXVCLEtBQUtmLFVBQUwsQ0FBZ0IsQ0FBaEIsRUFBbUJlLENBQW5CLEdBQXVCLEtBQUtQLE1BQTVCLEdBQXFDLENBQTVEO0FBQ0g7QUFDSixHQXBDcUIsQ0FxQ3RCO0FBQ0E7QUFFQTs7QUF4Q3NCLENBQVQsQ0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBDb25zdGFudCA9IHJlcXVpcmUoJ0NvbnN0YW50Jyk7XHJcblxyXG52YXIgQmFja2dyb3VuZCA9IGNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgLy8g5Zyw5p2/6IqC54K55pWw57uEXHJcbiAgICAgICAgZ3JvdW5kTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogW2NjLk5vZGVdXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyDlnLDmnb/lm77niYflr7nosaFcclxuICAgICAgICBncm91bmRJbWc6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDojrflj5blsY/luZXlsLrlr7hcclxuICAgICAgICB0aGlzLl9zaXplID0gY2Mud2luU2l6ZTtcclxuICAgICAgICAvLyDojrflj5blnLDmnb/lm77niYfnmoTlrr3luqYsIGdldFJlY3QoKTog6I635Y+WIFNwcml0ZUZyYW1lIOeahOe6ueeQhuefqeW9ouWMuuWfn1xyXG4gICAgICAgIHRoaXMuX3dpZHRoID0gdGhpcy5ncm91bmRJbWcuc3ByaXRlRnJhbWUuZ2V0UmVjdCgpLndpZHRoO1xyXG4gICAgICAgIC8vIOWQr+WKqOKAnOWcsOadv+enu+WKqOaOp+WItuKAneiuoeaXtuWZqFxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5vbkdyb3VuZE1vdmUsIENvbnN0YW50LkdST1VORF9NT1ZFX0lOVEVSVkFMKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25Hcm91bmRNb3ZlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLmdyb3VuZE5vZGVbMF0ueCArPSBDb25zdGFudC5HUk9VTkRfVlg7IC8vIEdST1VORF9WWO+8muWNleS9jeaXtumXtOWcsOadv+enu+WKqOmAn+W6plxyXG4gICAgICAgIHRoaXMuZ3JvdW5kTm9kZVsxXS54ICs9IENvbnN0YW50LkdST1VORF9WWDtcclxuICAgICAgICAvLyDkuIDlnZflnLDmnb/lh7rnlLvlkI7np7vliqjliLDnrKzkuozlnZflnLDmnb/lkI7vvIzkuqTmm7/ov5vooYzvvIzpgb/lhY3lm6DkuLrlnLDmnb/np7vliqjogIzlh7rnlLtcclxuICAgICAgICBpZiAodGhpcy5ncm91bmROb2RlWzBdLnggKyB0aGlzLl93aWR0aC8yIDwgLSB0aGlzLl9zaXplLndpZHRoLzIpIHtcclxuICAgICAgICAgICAgdGhpcy5ncm91bmROb2RlWzBdLnggPSB0aGlzLmdyb3VuZE5vZGVbMV0ueCArIHRoaXMuX3dpZHRoIC0gNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZ3JvdW5kTm9kZVsxXS54ICsgdGhpcy5fd2lkdGgvMiA8IC0gdGhpcy5fc2l6ZS53aWR0aC8yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JvdW5kTm9kZVsxXS54ID0gdGhpcy5ncm91bmROb2RlWzBdLnggKyB0aGlzLl93aWR0aCAtIDU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXHJcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG5cclxuICAgIC8vIH0sXHJcbn0pO1xyXG4iXX0=