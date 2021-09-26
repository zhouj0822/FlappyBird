"use strict";
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