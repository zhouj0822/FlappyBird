
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Scripts/Background');
require('./assets/Scripts/Bird');
require('./assets/Scripts/Constant');
require('./assets/Scripts/Game');
require('./assets/Scripts/Pipe');
require('./assets/Scripts/Storage');
require('./assets/migration/use_v2.0.x_cc.Toggle_event');

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Game.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6bb266V8atHdb56fl6sfmwu', 'Game');
// Scripts/Game.js

"use strict";

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var Bird = require('Bird');

var Background = require('Background');

var Constant = require('Constant');

var Storage = require('Storage');

var Game = cc.Class({
  "extends": cc.Component,
  properties: {
    // 管道纵向最大偏移值
    pipeMaxOffsetY: 150,
    // 上下管道间最小间隙
    pipeMinGap: 100,
    // 上下管道间最大间隙
    pipeMaxGap: 200,
    // 管道生成时间间隔
    pipeSpawnInterval: 4.5,
    // 管道生成时，屏幕外横向偏移位置
    pipeSpawnOffsetX: 30,
    // 重新刷新时间
    gameReflashTime: 1,
    // 形变动画播放间隔
    scoreScaleDuration: 0.2,
    // 游戏菜单节点
    gameMenu: {
      "default": null,
      type: cc.Node
    },
    // 小鸟对象
    bird: {
      "default": null,
      type: Bird
    },
    // 管道创建节点
    pipesNode: {
      "default": null,
      type: cc.Node
    },
    // 管道预制数组
    pipePrefabs: {
      "default": [],
      type: [cc.Prefab]
    },
    // 地板对象
    background: {
      "default": null,
      type: Background
    },
    // 游戏失败文字标签
    gameOverText: {
      "default": null,
      type: cc.Label
    },
    // 当前分数标签
    scoreText: {
      "default": null,
      type: cc.Label
    },
    // 最高分标签
    highScoreText: {
      "default": null,
      type: cc.Label
    }
  },
  // use this for initialization
  onLoad: function onLoad() {
    // 初始化触摸事件
    this.setInputControl(); // 初始化管道数组

    this.pipes = []; // 获取屏幕尺寸

    this.size = cc.winSize; // 获取地板的包围盒

    var groundBox = this.background.groundNode[0].getBoundingBox(); // 获取地板顶部的纵坐标

    this.groundTop = groundBox.y + groundBox.height / 2; // 初始化游戏失败标志位

    this.isGameOver = false; // 初始化当前分数

    this.curScore = 0; // 开始游戏界面，如有历史最高分则显示该成绩

    if (Storage.getHighScore() > 0) {
      this.highScoreText.string = Constant.HIGHSCORE_TXT + Storage.getHighScore();
    }
  },
  setInputControl: function setInputControl() {
    var self = this;
    self.node.on(cc.Node.EventType.TOUCH_START, self._onTouchBegan.bind(self), self);
  },
  _onTouchBegan: function _onTouchBegan(touch, event) {
    if (this.isGameOver === true) return;
    this.bird.onJump();
  },
  onStartGame: function onStartGame() {
    // 关闭菜单节点显示
    this.gameMenu.active = false; // 小鸟开始下落

    this.bird.onStartDrop(); // 从0开始显示分数

    this.scoreText.string = "" + this.curScore; // 启动管道生成定时器

    this.schedule(this.spawnPipes, this.pipeSpawnInterval); // 启动游戏逻辑更新定时器

    this.schedule(this.gameUpdate, Constant.GROUND_MOVE_INTERVAL);
  },
  spawnPipes: function spawnPipes() {
    // 从管道预制（上端），生成管道实例
    var pipeUp = cc.instantiate(this.pipePrefabs[Constant.PIPE_UP]); // 定义为上端类型, 并调用Pipe绑定的init函数

    pipeUp.getComponent('Pipe').init(Constant.PIPE_UP); // 获取管道的高度（上端与上端的相同）

    var pipeHeight = pipeUp.getComponent('cc.Sprite').spriteFrame.getRect().height; // 设置上端管道的横向起始位置（屏幕右端另加一定偏移）

    pipeUp.x = this.size.width / 2 + this.pipeSpawnOffsetX; // 设置上端管道的纵向起始位置（随机取偏移量）

    pipeUp.y = Math.floor(Math.random() * this.pipeMaxOffsetY) + pipeHeight / 2; // 下端生成逻辑基本与上端相同

    var pipeDown = cc.instantiate(this.pipePrefabs[Constant.PIPE_DOWN]);
    pipeDown.getComponent('Pipe').init(Constant.PIPE_DOWN);
    pipeDown.x = this.size.width / 2 + this.pipeSpawnOffsetX; // 随机生成上端与下端管道之间的间隙值（pipeMinGap与pipeMaxGap之间）

    var pipeGap = Math.floor(Math.random() * (this.pipeMaxGap - this.pipeMinGap)) + this.pipeMinGap;
    pipeDown.y = pipeUp.y - pipeGap - pipeHeight; // 添加管道到pipes节点上

    this.pipesNode.addChild(pipeUp);
    this.pipesNode.addChild(pipeDown); // 添加管道到管道数组中

    this.pipes.push(pipeUp);
    this.pipes.push(pipeDown);
  },
  gameUpdate: function gameUpdate() {
    for (var _iterator = _createForOfIteratorHelperLoose(this.pipes), _step; !(_step = _iterator()).done;) {
      pipe = _step.value;
      // 对管道进行移动操作
      pipe.x += Constant.GROUND_VX; // 获取小鸟的包围盒

      var birdBox = this.bird.node.getBoundingBox(); // 获取当前管道的包围盒

      var pipeBox = pipe.getBoundingBox(); // var birdRect = new cc.Rect(birdBox.x - birdBox.width / 2, birdBox.y - birdBox.height / 2,
      //     birdBox.width, birdBox.height);
      // var pipeRect = new cc.Rect(pipeBox.x - pipeBox.width / 2, pipeBox.y - pipeBox.height / 2,
      //     pipeBox.width, pipeBox.height);
      // 根据两个矩形范围判断是否相交

      if (cc.Intersection.rectRect(birdBox, pipeBox)) {
        this.onGameOver();
        return;
      } // 获取当前管道对象


      var curPipe = pipe.getComponent('Pipe'); // 判断小鸟是否顺利通过管道，是则加分

      if (pipe.x < this.bird.node.x && curPipe.isPassed === false && curPipe.type === Constant.PIPE_UP) {
        curPipe.isPassed = true;
        this.addScore();
      } // 超出屏幕范围的管道，从数组中移除，并从节点上删除


      if (pipe.x < -(this.size.width / 2 + Constant.PIPE_SPAWN_OFFSET_X)) {
        this.pipes.splice(i, 1);
        this.pipesNode.removeChild(pipe, true);
      }
    } // 小鸟触地，则死亡


    if (this.bird.node.y < this.groundTop) {
      this.onGameOver();
    }
  },
  addScore: function addScore() {
    // 加分
    this.curScore++; // 显示当前分数

    this.scoreText.string = "" + this.curScore;
    var action1 = cc.scaleTo(this.scoreScaleDuration, 1.1, 0.6);
    var action2 = cc.scaleTo(this.scoreScaleDuration, 0.8, 1.2);
    var action3 = cc.scaleTo(this.scoreScaleDuration, 1, 1); // 播放形变动画

    this.scoreText.node.runAction(cc.sequence(action1, action2, action3));
  },
  onGameOver: function onGameOver() {
    // 设置游戏失败标志位
    this.isGameOver = true; // 游戏失败，如超过最高分则成绩

    if (this.curScore > Storage.getHighScore()) {
      Storage.setHighScore(this.curScore);
    } // 死亡时，显示“Game Over”


    this.gameOverText.string = Constant.GAMEOVER_TXT; // 关闭所有定时器

    this.bird.unscheduleAllCallbacks();
    this.background.unscheduleAllCallbacks();
    this.unscheduleAllCallbacks(); // 一定时间后，重新刷新游戏到开始状态

    this.schedule(function () {
      cc.director.loadScene('game');
    }, this.gameReflashTime);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL0dhbWUuanMiXSwibmFtZXMiOlsiQmlyZCIsInJlcXVpcmUiLCJCYWNrZ3JvdW5kIiwiQ29uc3RhbnQiLCJTdG9yYWdlIiwiR2FtZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwicGlwZU1heE9mZnNldFkiLCJwaXBlTWluR2FwIiwicGlwZU1heEdhcCIsInBpcGVTcGF3bkludGVydmFsIiwicGlwZVNwYXduT2Zmc2V0WCIsImdhbWVSZWZsYXNoVGltZSIsInNjb3JlU2NhbGVEdXJhdGlvbiIsImdhbWVNZW51IiwidHlwZSIsIk5vZGUiLCJiaXJkIiwicGlwZXNOb2RlIiwicGlwZVByZWZhYnMiLCJQcmVmYWIiLCJiYWNrZ3JvdW5kIiwiZ2FtZU92ZXJUZXh0IiwiTGFiZWwiLCJzY29yZVRleHQiLCJoaWdoU2NvcmVUZXh0Iiwib25Mb2FkIiwic2V0SW5wdXRDb250cm9sIiwicGlwZXMiLCJzaXplIiwid2luU2l6ZSIsImdyb3VuZEJveCIsImdyb3VuZE5vZGUiLCJnZXRCb3VuZGluZ0JveCIsImdyb3VuZFRvcCIsInkiLCJoZWlnaHQiLCJpc0dhbWVPdmVyIiwiY3VyU2NvcmUiLCJnZXRIaWdoU2NvcmUiLCJzdHJpbmciLCJISUdIU0NPUkVfVFhUIiwic2VsZiIsIm5vZGUiLCJvbiIsIkV2ZW50VHlwZSIsIlRPVUNIX1NUQVJUIiwiX29uVG91Y2hCZWdhbiIsImJpbmQiLCJ0b3VjaCIsImV2ZW50Iiwib25KdW1wIiwib25TdGFydEdhbWUiLCJhY3RpdmUiLCJvblN0YXJ0RHJvcCIsInNjaGVkdWxlIiwic3Bhd25QaXBlcyIsImdhbWVVcGRhdGUiLCJHUk9VTkRfTU9WRV9JTlRFUlZBTCIsInBpcGVVcCIsImluc3RhbnRpYXRlIiwiUElQRV9VUCIsImdldENvbXBvbmVudCIsImluaXQiLCJwaXBlSGVpZ2h0Iiwic3ByaXRlRnJhbWUiLCJnZXRSZWN0IiwieCIsIndpZHRoIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicGlwZURvd24iLCJQSVBFX0RPV04iLCJwaXBlR2FwIiwiYWRkQ2hpbGQiLCJwdXNoIiwicGlwZSIsIkdST1VORF9WWCIsImJpcmRCb3giLCJwaXBlQm94IiwiSW50ZXJzZWN0aW9uIiwicmVjdFJlY3QiLCJvbkdhbWVPdmVyIiwiY3VyUGlwZSIsImlzUGFzc2VkIiwiYWRkU2NvcmUiLCJQSVBFX1NQQVdOX09GRlNFVF9YIiwic3BsaWNlIiwiaSIsInJlbW92ZUNoaWxkIiwiYWN0aW9uMSIsInNjYWxlVG8iLCJhY3Rpb24yIiwiYWN0aW9uMyIsInJ1bkFjdGlvbiIsInNlcXVlbmNlIiwic2V0SGlnaFNjb3JlIiwiR0FNRU9WRVJfVFhUIiwidW5zY2hlZHVsZUFsbENhbGxiYWNrcyIsImRpcmVjdG9yIiwibG9hZFNjZW5lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLElBQUksR0FBR0MsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0FBQ0EsSUFBTUMsVUFBVSxHQUFHRCxPQUFPLENBQUMsWUFBRCxDQUExQjs7QUFDQSxJQUFNRSxRQUFRLEdBQUdGLE9BQU8sQ0FBQyxVQUFELENBQXhCOztBQUVBLElBQUlHLE9BQU8sR0FBR0gsT0FBTyxDQUFDLFNBQUQsQ0FBckI7O0FBRUEsSUFBSUksSUFBSSxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNoQixhQUFTRCxFQUFFLENBQUNFLFNBREk7QUFHaEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSO0FBQ0FDLElBQUFBLGNBQWMsRUFBRSxHQUZSO0FBR1I7QUFDQUMsSUFBQUEsVUFBVSxFQUFFLEdBSko7QUFLUjtBQUNBQyxJQUFBQSxVQUFVLEVBQUUsR0FOSjtBQU9SO0FBQ0FDLElBQUFBLGlCQUFpQixFQUFFLEdBUlg7QUFTUjtBQUNBQyxJQUFBQSxnQkFBZ0IsRUFBRSxFQVZWO0FBV1I7QUFDQUMsSUFBQUEsZUFBZSxFQUFFLENBWlQ7QUFhUjtBQUNBQyxJQUFBQSxrQkFBa0IsRUFBRSxHQWRaO0FBZVI7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dWlyZSgnQmlyZCcpO1xyXG5jb25zdCBCYWNrZ3JvdW5kID0gcmVxdWlyZSgnQmFja2dyb3VuZCcpO1xyXG5jb25zdCBDb25zdGFudCA9IHJlcXVpcmUoJ0NvbnN0YW50Jyk7IFxyXG5cclxudmFyIFN0b3JhZ2UgPSByZXF1aXJlKCdTdG9yYWdlJyk7XHJcblxyXG52YXIgR2FtZSA9IGNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgLy8g566h6YGT57q15ZCR5pyA5aSn5YGP56e75YC8XHJcbiAgICAgICAgcGlwZU1heE9mZnNldFk6IDE1MCxcclxuICAgICAgICAvLyDkuIrkuIvnrqHpgZPpl7TmnIDlsI/pl7TpmplcclxuICAgICAgICBwaXBlTWluR2FwOiAxMDAsXHJcbiAgICAgICAgLy8g5LiK5LiL566h6YGT6Ze05pyA5aSn6Ze06ZqZXHJcbiAgICAgICAgcGlwZU1heEdhcDogMjAwLFxyXG4gICAgICAgIC8vIOeuoemBk+eUn+aIkOaXtumXtOmXtOmalFxyXG4gICAgICAgIHBpcGVTcGF3bkludGVydmFsOiA0LjUsXHJcbiAgICAgICAgLy8g566h6YGT55Sf5oiQ5pe277yM5bGP5bmV5aSW5qiq5ZCR5YGP56e75L2N572uXHJcbiAgICAgICAgcGlwZVNwYXduT2Zmc2V0WDogMzAsXHJcbiAgICAgICAgLy8g6YeN5paw5Yi35paw5pe26Ze0XHJcbiAgICAgICAgZ2FtZVJlZmxhc2hUaW1lOiAxLFxyXG4gICAgICAgIC8vIOW9ouWPmOWKqOeUu+aSreaUvumXtOmalFxyXG4gICAgICAgIHNjb3JlU2NhbGVEdXJhdGlvbjogMC4yLFxyXG4gICAgICAgIC8vIOa4uOaIj+iPnOWNleiKgueCuVxyXG4gICAgICAgIGdhbWVNZW51OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIOWwj+m4n+WvueixoVxyXG4gICAgICAgIGJpcmQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogQmlyZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8g566h6YGT5Yib5bu66IqC54K5XHJcbiAgICAgICAgcGlwZXNOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIOeuoemBk+mihOWItuaVsOe7hFxyXG4gICAgICAgIHBpcGVQcmVmYWJzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBbY2MuUHJlZmFiXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8g5Zyw5p2/5a+56LGhXHJcbiAgICAgICAgYmFja2dyb3VuZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBCYWNrZ3JvdW5kXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyDmuLjmiI/lpLHotKXmloflrZfmoIfnrb5cclxuICAgICAgICBnYW1lT3ZlclRleHQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIOW9k+WJjeWIhuaVsOagh+etvlxyXG4gICAgICAgIHNjb3JlVGV4dDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8g5pyA6auY5YiG5qCH562+XHJcbiAgICAgICAgaGlnaFNjb3JlVGV4dDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g5Yid5aeL5YyW6Kem5pG45LqL5Lu2XHJcbiAgICAgICAgdGhpcy5zZXRJbnB1dENvbnRyb2woKTtcclxuICAgICAgICAvLyDliJ3lp4vljJbnrqHpgZPmlbDnu4RcclxuICAgICAgICB0aGlzLnBpcGVzID0gW107XHJcbiAgICAgICAgLy8g6I635Y+W5bGP5bmV5bC65a+4XHJcbiAgICAgICAgdGhpcy5zaXplID0gY2Mud2luU2l6ZTtcclxuICAgICAgICAvLyDojrflj5blnLDmnb/nmoTljIXlm7Tnm5JcclxuICAgICAgICB2YXIgZ3JvdW5kQm94ID0gdGhpcy5iYWNrZ3JvdW5kLmdyb3VuZE5vZGVbMF0uZ2V0Qm91bmRpbmdCb3goKTtcclxuICAgICAgICAvLyDojrflj5blnLDmnb/pobbpg6jnmoTnurXlnZDmoIdcclxuICAgICAgICB0aGlzLmdyb3VuZFRvcCA9IGdyb3VuZEJveC55ICsgZ3JvdW5kQm94LmhlaWdodC8yO1xyXG4gICAgICAgIC8vIOWIneWni+WMlua4uOaIj+Wksei0peagh+W/l+S9jVxyXG4gICAgICAgIHRoaXMuaXNHYW1lT3ZlciA9IGZhbHNlO1xyXG4gICAgICAgIC8vIOWIneWni+WMluW9k+WJjeWIhuaVsFxyXG4gICAgICAgIHRoaXMuY3VyU2NvcmUgPSAwO1xyXG4gICAgICAgIC8vIOW8gOWni+a4uOaIj+eVjOmdou+8jOWmguacieWOhuWPsuacgOmrmOWIhuWImeaYvuekuuivpeaIkOe7qVxyXG4gICAgICAgIGlmICggU3RvcmFnZS5nZXRIaWdoU2NvcmUoKSA+IDAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaFNjb3JlVGV4dC5zdHJpbmcgPSBDb25zdGFudC5ISUdIU0NPUkVfVFhUICsgU3RvcmFnZS5nZXRIaWdoU2NvcmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNldElucHV0Q29udHJvbDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgc2VsZi5fb25Ub3VjaEJlZ2FuLmJpbmQoc2VsZiksIHNlbGYpO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgX29uVG91Y2hCZWdhbjogZnVuY3Rpb24oIHRvdWNoLCBldmVudCApIHtcclxuICAgICAgICBpZiAoIHRoaXMuaXNHYW1lT3ZlciA9PT0gdHJ1ZSApXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLmJpcmQub25KdW1wKCk7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBvblN0YXJ0R2FtZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIOWFs+mXreiPnOWNleiKgueCueaYvuekulxyXG4gICAgICAgIHRoaXMuZ2FtZU1lbnUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8g5bCP6bif5byA5aeL5LiL6JC9XHJcbiAgICAgICAgdGhpcy5iaXJkLm9uU3RhcnREcm9wKCk7XHJcbiAgICAgICAgLy8g5LuOMOW8gOWni+aYvuekuuWIhuaVsFxyXG4gICAgICAgIHRoaXMuc2NvcmVUZXh0LnN0cmluZyA9IFwiXCIgKyB0aGlzLmN1clNjb3JlO1xyXG4gICAgICAgIC8vIOWQr+WKqOeuoemBk+eUn+aIkOWumuaXtuWZqFxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zcGF3blBpcGVzLCB0aGlzLnBpcGVTcGF3bkludGVydmFsKTtcclxuICAgICAgICAvLyDlkK/liqjmuLjmiI/pgLvovpHmm7TmlrDlrprml7blmahcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuZ2FtZVVwZGF0ZSwgQ29uc3RhbnQuR1JPVU5EX01PVkVfSU5URVJWQUwpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzcGF3blBpcGVzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDku47nrqHpgZPpooTliLbvvIjkuIrnq6/vvInvvIznlJ/miJDnrqHpgZPlrp7kvotcclxuICAgICAgICB2YXIgcGlwZVVwID0gY2MuaW5zdGFudGlhdGUodGhpcy5waXBlUHJlZmFic1tDb25zdGFudC5QSVBFX1VQXSk7XHJcbiAgICAgICAgLy8g5a6a5LmJ5Li65LiK56uv57G75Z6LLCDlubbosIPnlKhQaXBl57uR5a6a55qEaW5pdOWHveaVsFxyXG4gICAgICAgIHBpcGVVcC5nZXRDb21wb25lbnQoJ1BpcGUnKS5pbml0KENvbnN0YW50LlBJUEVfVVApO1xyXG4gICAgICAgIC8vIOiOt+WPlueuoemBk+eahOmrmOW6pu+8iOS4iuerr+S4juS4iuerr+eahOebuOWQjO+8iVxyXG4gICAgICAgIHZhciBwaXBlSGVpZ2h0ID0gcGlwZVVwLmdldENvbXBvbmVudCgnY2MuU3ByaXRlJykuc3ByaXRlRnJhbWUuZ2V0UmVjdCgpLmhlaWdodDtcclxuICAgICAgICAvLyDorr7nva7kuIrnq6/nrqHpgZPnmoTmqKrlkJHotbflp4vkvY3nva7vvIjlsY/luZXlj7Pnq6/lj6bliqDkuIDlrprlgY/np7vvvIlcclxuICAgICAgICBwaXBlVXAueCA9IHRoaXMuc2l6ZS53aWR0aCAvIDIgKyB0aGlzLnBpcGVTcGF3bk9mZnNldFg7XHJcbiAgICAgICAgLy8g6K6+572u5LiK56uv566h6YGT55qE57q15ZCR6LW35aeL5L2N572u77yI6ZqP5py65Y+W5YGP56e76YeP77yJXHJcbiAgICAgICAgcGlwZVVwLnkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLnBpcGVNYXhPZmZzZXRZKSArIHBpcGVIZWlnaHQvMjtcclxuICAgICAgICAvLyDkuIvnq6/nlJ/miJDpgLvovpHln7rmnKzkuI7kuIrnq6/nm7jlkIxcclxuICAgICAgICB2YXIgcGlwZURvd24gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBpcGVQcmVmYWJzW0NvbnN0YW50LlBJUEVfRE9XTl0pO1xyXG4gICAgICAgIHBpcGVEb3duLmdldENvbXBvbmVudCgnUGlwZScpLmluaXQoQ29uc3RhbnQuUElQRV9ET1dOKTtcclxuICAgICAgICBwaXBlRG93bi54ID0gdGhpcy5zaXplLndpZHRoIC8gMiArIHRoaXMucGlwZVNwYXduT2Zmc2V0WDtcclxuICAgICAgICAvLyDpmo/mnLrnlJ/miJDkuIrnq6/kuI7kuIvnq6/nrqHpgZPkuYvpl7TnmoTpl7TpmpnlgLzvvIhwaXBlTWluR2Fw5LiOcGlwZU1heEdhcOS5i+mXtO+8iVxyXG4gICAgICAgIHZhciBwaXBlR2FwID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHRoaXMucGlwZU1heEdhcCAtIHRoaXMucGlwZU1pbkdhcCkpICsgdGhpcy5waXBlTWluR2FwO1xyXG4gICAgICAgIHBpcGVEb3duLnkgPSBwaXBlVXAueSAtIHBpcGVHYXAgLSBwaXBlSGVpZ2h0O1xyXG4gICAgICAgIC8vIOa3u+WKoOeuoemBk+WIsHBpcGVz6IqC54K55LiKXHJcbiAgICAgICAgdGhpcy5waXBlc05vZGUuYWRkQ2hpbGQocGlwZVVwKTtcclxuICAgICAgICB0aGlzLnBpcGVzTm9kZS5hZGRDaGlsZChwaXBlRG93bik7XHJcbiAgICAgICAgLy8g5re75Yqg566h6YGT5Yiw566h6YGT5pWw57uE5LitXHJcbiAgICAgICAgdGhpcy5waXBlcy5wdXNoKHBpcGVVcCk7XHJcbiAgICAgICAgdGhpcy5waXBlcy5wdXNoKHBpcGVEb3duKTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2FtZVVwZGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZm9yIChwaXBlIG9mIHRoaXMucGlwZXMpIHtcclxuICAgICAgICAgICAgLy8g5a+5566h6YGT6L+b6KGM56e75Yqo5pON5L2cXHJcbiAgICAgICAgICAgIHBpcGUueCArPSBDb25zdGFudC5HUk9VTkRfVlg7XHJcbiAgICAgICAgICAgIC8vIOiOt+WPluWwj+m4n+eahOWMheWbtOebklxyXG4gICAgICAgICAgICB2YXIgYmlyZEJveCA9IHRoaXMuYmlyZC5ub2RlLmdldEJvdW5kaW5nQm94KCk7XHJcbiAgICAgICAgICAgIC8vIOiOt+WPluW9k+WJjeeuoemBk+eahOWMheWbtOebklxyXG4gICAgICAgICAgICB2YXIgcGlwZUJveCA9IHBpcGUuZ2V0Qm91bmRpbmdCb3goKTtcclxuICAgICAgICAgICAgLy8gdmFyIGJpcmRSZWN0ID0gbmV3IGNjLlJlY3QoYmlyZEJveC54IC0gYmlyZEJveC53aWR0aCAvIDIsIGJpcmRCb3gueSAtIGJpcmRCb3guaGVpZ2h0IC8gMixcclxuICAgICAgICAgICAgLy8gICAgIGJpcmRCb3gud2lkdGgsIGJpcmRCb3guaGVpZ2h0KTtcclxuICAgICAgICAgICAgLy8gdmFyIHBpcGVSZWN0ID0gbmV3IGNjLlJlY3QocGlwZUJveC54IC0gcGlwZUJveC53aWR0aCAvIDIsIHBpcGVCb3gueSAtIHBpcGVCb3guaGVpZ2h0IC8gMixcclxuICAgICAgICAgICAgLy8gICAgIHBpcGVCb3gud2lkdGgsIHBpcGVCb3guaGVpZ2h0KTtcclxuICAgICAgICAgICAgLy8g5qC55o2u5Lik5Liq55+p5b2i6IyD5Zu05Yik5pat5piv5ZCm55u45LqkXHJcbiAgICAgICAgICAgIGlmIChjYy5JbnRlcnNlY3Rpb24ucmVjdFJlY3QoYmlyZEJveCwgcGlwZUJveCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25HYW1lT3ZlcigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyDojrflj5blvZPliY3nrqHpgZPlr7nosaFcclxuICAgICAgICAgICAgdmFyIGN1clBpcGUgPSBwaXBlLmdldENvbXBvbmVudCgnUGlwZScpO1xyXG4gICAgICAgICAgICAvLyDliKTmlq3lsI/puJ/mmK/lkKbpobrliKnpgJrov4fnrqHpgZPvvIzmmK/liJnliqDliIZcclxuICAgICAgICAgICAgaWYgKCBwaXBlLnggPCB0aGlzLmJpcmQubm9kZS54ICYmIGN1clBpcGUuaXNQYXNzZWQgPT09IGZhbHNlICYmIGN1clBpcGUudHlwZSA9PT0gQ29uc3RhbnQuUElQRV9VUCkge1xyXG4gICAgICAgICAgICAgICAgY3VyUGlwZS5pc1Bhc3NlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFNjb3JlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIOi2heWHuuWxj+W5leiMg+WbtOeahOeuoemBk++8jOS7juaVsOe7hOS4reenu+mZpO+8jOW5tuS7juiKgueCueS4iuWIoOmZpFxyXG4gICAgICAgICAgICBpZiAoIHBpcGUueCA8IC0odGhpcy5zaXplLndpZHRoLzIgKyBDb25zdGFudC5QSVBFX1NQQVdOX09GRlNFVF9YKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5waXBlcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpcGVzTm9kZS5yZW1vdmVDaGlsZChwaXBlLCB0cnVlKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8g5bCP6bif6Kem5Zyw77yM5YiZ5q275LqhXHJcbiAgICAgICAgaWYgKHRoaXMuYmlyZC5ub2RlLnkgPCB0aGlzLmdyb3VuZFRvcCApIHtcclxuICAgICAgICAgICAgdGhpcy5vbkdhbWVPdmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgYWRkU2NvcmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIOWKoOWIhlxyXG4gICAgICAgIHRoaXMuY3VyU2NvcmUgKys7XHJcbiAgICAgICAgLy8g5pi+56S65b2T5YmN5YiG5pWwXHJcbiAgICAgICAgdGhpcy5zY29yZVRleHQuc3RyaW5nID0gXCJcIiArIHRoaXMuY3VyU2NvcmU7XHJcbiAgICAgICAgdmFyIGFjdGlvbjEgPSBjYy5zY2FsZVRvKHRoaXMuc2NvcmVTY2FsZUR1cmF0aW9uLCAxLjEsIDAuNik7XHJcbiAgICAgICAgdmFyIGFjdGlvbjIgPSBjYy5zY2FsZVRvKHRoaXMuc2NvcmVTY2FsZUR1cmF0aW9uLCAwLjgsIDEuMik7XHJcbiAgICAgICAgdmFyIGFjdGlvbjMgPSBjYy5zY2FsZVRvKHRoaXMuc2NvcmVTY2FsZUR1cmF0aW9uLCAxLCAxKTtcclxuICAgICAgICAvLyDmkq3mlL7lvaLlj5jliqjnlLtcclxuICAgICAgICB0aGlzLnNjb3JlVGV4dC5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShhY3Rpb24xLCBhY3Rpb24yLCBhY3Rpb24zKSk7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBvbkdhbWVPdmVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDorr7nva7muLjmiI/lpLHotKXmoIflv5fkvY1cclxuICAgICAgICB0aGlzLmlzR2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICAgIC8vIOa4uOaIj+Wksei0pe+8jOWmgui2hei/h+acgOmrmOWIhuWImeaIkOe7qVxyXG4gICAgICAgIGlmICggdGhpcy5jdXJTY29yZSA+IFN0b3JhZ2UuZ2V0SGlnaFNjb3JlKCkgKSB7XHJcbiAgICAgICAgICAgIFN0b3JhZ2Uuc2V0SGlnaFNjb3JlKHRoaXMuY3VyU2NvcmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDmrbvkuqHml7bvvIzmmL7npLrigJxHYW1lIE92ZXLigJ1cclxuICAgICAgICB0aGlzLmdhbWVPdmVyVGV4dC5zdHJpbmcgPSBDb25zdGFudC5HQU1FT1ZFUl9UWFQ7XHJcbiAgICAgICAgLy8g5YWz6Zet5omA5pyJ5a6a5pe25ZmoXHJcbiAgICAgICAgdGhpcy5iaXJkLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIC8vIOS4gOWumuaXtumXtOWQju+8jOmHjeaWsOWIt+aWsOa4uOaIj+WIsOW8gOWni+eKtuaAgVxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnZ2FtZScpO1xyXG4gICAgICAgIH0sIHRoaXMuZ2FtZVJlZmxhc2hUaW1lKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcclxuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XHJcblxyXG4gICAgLy8gfSxcclxufSk7XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pipe.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fc122qToQhByr8kag01h1T3', 'Pipe');
// Scripts/Pipe.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    // 小鸟通过管道与否的标志位
    isPassed: false
  },
  // use this for initialization
  onLoad: function onLoad() {},
  init: function init(type) {
    // 设置管道的类型（上或下）
    this.type = type;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL1BpcGUuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJpc1Bhc3NlZCIsIm9uTG9hZCIsImluaXQiLCJ0eXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBQyxJQUFBQSxRQUFRLEVBQUU7QUFGRixHQUhQO0FBUUw7QUFDQUMsRUFBQUEsTUFBTSxFQUFFLGtCQUFZLENBRW5CLENBWEk7QUFhTEMsRUFBQUEsSUFBSSxFQUFFLGNBQVVDLElBQVYsRUFBZ0I7QUFDbEI7QUFDQSxTQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDSCxHQWhCSSxDQWtCTDtBQUNBO0FBRUE7O0FBckJLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgLy8g5bCP6bif6YCa6L+H566h6YGT5LiO5ZCm55qE5qCH5b+X5L2NXHJcbiAgICAgICAgaXNQYXNzZWQ6IGZhbHNlLFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24gKHR5cGUpIHtcclxuICAgICAgICAvLyDorr7nva7nrqHpgZPnmoTnsbvlnovvvIjkuIrmiJbkuIvvvIlcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXHJcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG5cclxuICAgIC8vIH0sXHJcbn0pO1xyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Storage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '66102528YBJXJl8YVn9PiMH', 'Storage');
// Scripts/Storage.js

"use strict";

var Storage = {
  getHighScore: function getHighScore() {
    var score = cc.sys.localStorage.getItem('HighScore') || 0;
    return parseInt(score);
  },
  setHighScore: function setHighScore(score) {
    cc.sys.localStorage.setItem('HighScore', score);
  }
};
module.exports = Storage;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL1N0b3JhZ2UuanMiXSwibmFtZXMiOlsiU3RvcmFnZSIsImdldEhpZ2hTY29yZSIsInNjb3JlIiwiY2MiLCJzeXMiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwicGFyc2VJbnQiLCJzZXRIaWdoU2NvcmUiLCJzZXRJdGVtIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxPQUFPLEdBQUc7QUFDVkMsRUFBQUEsWUFBWSxFQUFFLHdCQUFXO0FBQ3JCLFFBQUlDLEtBQUssR0FBR0MsRUFBRSxDQUFDQyxHQUFILENBQU9DLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLFdBQTVCLEtBQTRDLENBQXhEO0FBQ0EsV0FBT0MsUUFBUSxDQUFDTCxLQUFELENBQWY7QUFDSCxHQUpTO0FBTVZNLEVBQUFBLFlBQVksRUFBRSxzQkFBU04sS0FBVCxFQUFnQjtBQUMxQkMsSUFBQUEsRUFBRSxDQUFDQyxHQUFILENBQU9DLFlBQVAsQ0FBb0JJLE9BQXBCLENBQTRCLFdBQTVCLEVBQXlDUCxLQUF6QztBQUNIO0FBUlMsQ0FBZDtBQVdBUSxNQUFNLENBQUNDLE9BQVAsR0FBaUJYLE9BQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgU3RvcmFnZSA9IHtcclxuICAgIGdldEhpZ2hTY29yZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHNjb3JlID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdIaWdoU2NvcmUnKSB8fCAwO1xyXG4gICAgICAgIHJldHVybiBwYXJzZUludChzY29yZSk7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBzZXRIaWdoU2NvcmU6IGZ1bmN0aW9uKHNjb3JlKSB7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdIaWdoU2NvcmUnLCBzY29yZSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFN0b3JhZ2U7XHJcblxyXG4iXX0=
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/migration/use_v2.0.x_cc.Toggle_event.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'de035RvaXNLMrQ1X7yeVKqh', 'use_v2.0.x_cc.Toggle_event');
// migration/use_v2.0.x_cc.Toggle_event.js

"use strict";

/*
 * This script is automatically generated by Cocos Creator and is only compatible with projects prior to v2.1.0.
 * You do not need to manually add this script in any other project.
 * If you don't use cc.Toggle in your project, you can delete this script directly.
 * If your project is hosted in VCS such as git, submit this script together.
 *
 * 此脚本由 Cocos Creator 自动生成，仅用于兼容 v2.1.0 之前版本的工程，
 * 你无需在任何其它项目中手动添加此脚本。
 * 如果你的项目中没用到 Toggle，可直接删除该脚本。
 * 如果你的项目有托管于 git 等版本库，请将此脚本一并上传。
 */
if (cc.Toggle) {
  // Whether the 'toggle' and 'checkEvents' events are fired when 'toggle.check() / toggle.uncheck()' is called in the code
  // 在代码中调用 'toggle.check() / toggle.uncheck()' 时是否触发 'toggle' 与 'checkEvents' 事件
  cc.Toggle._triggerEventInScript_check = true;
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9taWdyYXRpb24vdXNlX3YyLjAueF9jYy5Ub2dnbGVfZXZlbnQuanMiXSwibmFtZXMiOlsiY2MiLCJUb2dnbGUiLCJfdHJpZ2dlckV2ZW50SW5TY3JpcHRfY2hlY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7O0FBWUEsSUFBSUEsRUFBRSxDQUFDQyxNQUFQLEVBQWU7QUFDWDtBQUNBO0FBQ0FELEVBQUFBLEVBQUUsQ0FBQ0MsTUFBSCxDQUFVQywyQkFBVixHQUF3QyxJQUF4QztBQUNIIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogVGhpcyBzY3JpcHQgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgQ29jb3MgQ3JlYXRvciBhbmQgaXMgb25seSBjb21wYXRpYmxlIHdpdGggcHJvamVjdHMgcHJpb3IgdG8gdjIuMS4wLlxuICogWW91IGRvIG5vdCBuZWVkIHRvIG1hbnVhbGx5IGFkZCB0aGlzIHNjcmlwdCBpbiBhbnkgb3RoZXIgcHJvamVjdC5cbiAqIElmIHlvdSBkb24ndCB1c2UgY2MuVG9nZ2xlIGluIHlvdXIgcHJvamVjdCwgeW91IGNhbiBkZWxldGUgdGhpcyBzY3JpcHQgZGlyZWN0bHkuXG4gKiBJZiB5b3VyIHByb2plY3QgaXMgaG9zdGVkIGluIFZDUyBzdWNoIGFzIGdpdCwgc3VibWl0IHRoaXMgc2NyaXB0IHRvZ2V0aGVyLlxuICpcbiAqIOatpOiEmuacrOeUsSBDb2NvcyBDcmVhdG9yIOiHquWKqOeUn+aIkO+8jOS7heeUqOS6juWFvOWuuSB2Mi4xLjAg5LmL5YmN54mI5pys55qE5bel56iL77yMXG4gKiDkvaDml6DpnIDlnKjku7vkvZXlhbblroPpobnnm67kuK3miYvliqjmt7vliqDmraTohJrmnKzjgIJcbiAqIOWmguaenOS9oOeahOmhueebruS4reayoeeUqOWIsCBUb2dnbGXvvIzlj6/nm7TmjqXliKDpmaTor6XohJrmnKzjgIJcbiAqIOWmguaenOS9oOeahOmhueebruacieaJmOeuoeS6jiBnaXQg562J54mI5pys5bqT77yM6K+35bCG5q2k6ISa5pys5LiA5bm25LiK5Lyg44CCXG4gKi9cblxuaWYgKGNjLlRvZ2dsZSkge1xuICAgIC8vIFdoZXRoZXIgdGhlICd0b2dnbGUnIGFuZCAnY2hlY2tFdmVudHMnIGV2ZW50cyBhcmUgZmlyZWQgd2hlbiAndG9nZ2xlLmNoZWNrKCkgLyB0b2dnbGUudW5jaGVjaygpJyBpcyBjYWxsZWQgaW4gdGhlIGNvZGVcbiAgICAvLyDlnKjku6PnoIHkuK3osIPnlKggJ3RvZ2dsZS5jaGVjaygpIC8gdG9nZ2xlLnVuY2hlY2soKScg5pe25piv5ZCm6Kem5Y+RICd0b2dnbGUnIOS4jiAnY2hlY2tFdmVudHMnIOS6i+S7tlxuICAgIGNjLlRvZ2dsZS5fdHJpZ2dlckV2ZW50SW5TY3JpcHRfY2hlY2sgPSB0cnVlO1xufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Constant.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1f331Khw8ZPUpFSgo3Y95tw', 'Constant');
// Scripts/Constant.js

"use strict";

var Constant = cc.Enum({
  // 地板移动时间间隔
  GROUND_MOVE_INTERVAL: 0.05,
  // 单位时间地板移动速度
  GROUND_VX: -5,
  // 上端管道序号为0
  PIPE_UP: 0,
  // 下端管道序号为1
  PIPE_DOWN: 1,
  // 游戏失败文字
  GAMEOVER_TXT: 'GAME OVER',
  // 最高分文字
  HIGHSCORE_TXT: 'HighScore: '
});
module.exports = Constant;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL0NvbnN0YW50LmpzIl0sIm5hbWVzIjpbIkNvbnN0YW50IiwiY2MiLCJFbnVtIiwiR1JPVU5EX01PVkVfSU5URVJWQUwiLCJHUk9VTkRfVlgiLCJQSVBFX1VQIiwiUElQRV9ET1dOIiwiR0FNRU9WRVJfVFhUIiwiSElHSFNDT1JFX1RYVCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsUUFBUSxHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUNuQjtBQUNBQyxFQUFBQSxvQkFBb0IsRUFBRSxJQUZIO0FBR25CO0FBQ0FDLEVBQUFBLFNBQVMsRUFBRSxDQUFDLENBSk87QUFLbkI7QUFDQUMsRUFBQUEsT0FBTyxFQUFFLENBTlU7QUFPbkI7QUFDQUMsRUFBQUEsU0FBUyxFQUFFLENBUlE7QUFTbkI7QUFDQUMsRUFBQUEsWUFBWSxFQUFFLFdBVks7QUFXbkI7QUFDQUMsRUFBQUEsYUFBYSxFQUFFO0FBWkksQ0FBUixDQUFmO0FBZUFDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQlYsUUFBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBDb25zdGFudCA9IGNjLkVudW0oe1xyXG4gICAgLy8g5Zyw5p2/56e75Yqo5pe26Ze06Ze06ZqUXHJcbiAgICBHUk9VTkRfTU9WRV9JTlRFUlZBTDogMC4wNSxcclxuICAgIC8vIOWNleS9jeaXtumXtOWcsOadv+enu+WKqOmAn+W6plxyXG4gICAgR1JPVU5EX1ZYOiAtNSxcclxuICAgIC8vIOS4iuerr+euoemBk+W6j+WPt+S4ujBcclxuICAgIFBJUEVfVVA6IDAsXHJcbiAgICAvLyDkuIvnq6/nrqHpgZPluo/lj7fkuLoxXHJcbiAgICBQSVBFX0RPV046IDEsXHJcbiAgICAvLyDmuLjmiI/lpLHotKXmloflrZdcclxuICAgIEdBTUVPVkVSX1RYVDogJ0dBTUUgT1ZFUicsXHJcbiAgICAvLyDmnIDpq5jliIbmloflrZdcclxuICAgIEhJR0hTQ09SRV9UWFQ6ICdIaWdoU2NvcmU6ICcsXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb25zdGFudDtcclxuXHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------
