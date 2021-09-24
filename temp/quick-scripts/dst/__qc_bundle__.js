
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
    pipeMinGap: 80,
    // 上下管道间最大间隙
    pipeMaxGap: 150,
    // 管道生成时间间隔
    pipeSpawnInterval: 4.5,
    // 管道生成时，屏幕外横向偏移位置
    pipeSpawnOffsetX: 30,
    // 重新刷新时间
    gameReflashTime: 5,
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
    var pipeUp = cc.instantiate(this.pipePrefabs[Constant.PIPE_UP]); // 定义为上端类型

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
    for (var i = 0; i < this.pipes.length; i++) {
      // 获取当前管道对象节点
      var curPipeNode = this.pipes[i]; // 对管道进行移动操作

      curPipeNode.x += Constant.GROUND_VX; // 获取小鸟的包围盒

      var birdBox = this.bird.node.getBoundingBox(); // 获取当前管道的包围盒

      var pipeBox = curPipeNode.getBoundingBox(); // var birdRect = new cc.Rect(birdBox.x - birdBox.width / 2, birdBox.y - birdBox.height / 2,
      //     birdBox.width, birdBox.height);
      // var pipeRect = new cc.Rect(pipeBox.x - pipeBox.width / 2, pipeBox.y - pipeBox.height / 2,
      //     pipeBox.width, pipeBox.height);
      // 根据两个矩形范围判断是否相交

      if (cc.Intersection.rectRect(birdBox, pipeBox)) {
        this.onGameOver();
        return;
      } // 获取当前管道对象


      var curPipe = curPipeNode.getComponent('Pipe'); // 判断小鸟是否顺利通过管道，是则加分

      if (curPipeNode.x < this.bird.node.x && curPipe.isPassed === false && curPipe.type === Constant.PIPE_UP) {
        curPipe.isPassed = true;
        this.addScore();
      } // 超出屏幕范围的管道，从数组中移除，并从节点上删除


      if (curPipeNode.x < -(this.size.width / 2 + Constant.PIPE_SPAWN_OFFSET_X)) {
        this.pipes.splice(i, 1);
        this.pipesNode.removeChild(curPipeNode, true);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL0dhbWUuanMiXSwibmFtZXMiOlsiQmlyZCIsInJlcXVpcmUiLCJCYWNrZ3JvdW5kIiwiQ29uc3RhbnQiLCJTdG9yYWdlIiwiR2FtZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwicGlwZU1heE9mZnNldFkiLCJwaXBlTWluR2FwIiwicGlwZU1heEdhcCIsInBpcGVTcGF3bkludGVydmFsIiwicGlwZVNwYXduT2Zmc2V0WCIsImdhbWVSZWZsYXNoVGltZSIsInNjb3JlU2NhbGVEdXJhdGlvbiIsImdhbWVNZW51IiwidHlwZSIsIk5vZGUiLCJiaXJkIiwicGlwZXNOb2RlIiwicGlwZVByZWZhYnMiLCJQcmVmYWIiLCJiYWNrZ3JvdW5kIiwiZ2FtZU92ZXJUZXh0IiwiTGFiZWwiLCJzY29yZVRleHQiLCJoaWdoU2NvcmVUZXh0Iiwib25Mb2FkIiwic2V0SW5wdXRDb250cm9sIiwicGlwZXMiLCJzaXplIiwid2luU2l6ZSIsImdyb3VuZEJveCIsImdyb3VuZE5vZGUiLCJnZXRCb3VuZGluZ0JveCIsImdyb3VuZFRvcCIsInkiLCJoZWlnaHQiLCJpc0dhbWVPdmVyIiwiY3VyU2NvcmUiLCJnZXRIaWdoU2NvcmUiLCJzdHJpbmciLCJISUdIU0NPUkVfVFhUIiwic2VsZiIsIm5vZGUiLCJvbiIsIkV2ZW50VHlwZSIsIlRPVUNIX1NUQVJUIiwiX29uVG91Y2hCZWdhbiIsImJpbmQiLCJ0b3VjaCIsImV2ZW50Iiwib25KdW1wIiwib25TdGFydEdhbWUiLCJhY3RpdmUiLCJvblN0YXJ0RHJvcCIsInNjaGVkdWxlIiwic3Bhd25QaXBlcyIsImdhbWVVcGRhdGUiLCJHUk9VTkRfTU9WRV9JTlRFUlZBTCIsInBpcGVVcCIsImluc3RhbnRpYXRlIiwiUElQRV9VUCIsImdldENvbXBvbmVudCIsImluaXQiLCJwaXBlSGVpZ2h0Iiwic3ByaXRlRnJhbWUiLCJnZXRSZWN0IiwieCIsIndpZHRoIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicGlwZURvd24iLCJQSVBFX0RPV04iLCJwaXBlR2FwIiwiYWRkQ2hpbGQiLCJwdXNoIiwiaSIsImxlbmd0aCIsImN1clBpcGVOb2RlIiwiR1JPVU5EX1ZYIiwiYmlyZEJveCIsInBpcGVCb3giLCJJbnRlcnNlY3Rpb24iLCJyZWN0UmVjdCIsIm9uR2FtZU92ZXIiLCJjdXJQaXBlIiwiaXNQYXNzZWQiLCJhZGRTY29yZSIsIlBJUEVfU1BBV05fT0ZGU0VUX1giLCJzcGxpY2UiLCJyZW1vdmVDaGlsZCIsImFjdGlvbjEiLCJzY2FsZVRvIiwiYWN0aW9uMiIsImFjdGlvbjMiLCJydW5BY3Rpb24iLCJzZXF1ZW5jZSIsInNldEhpZ2hTY29yZSIsIkdBTUVPVkVSX1RYVCIsInVuc2NoZWR1bGVBbGxDYWxsYmFja3MiLCJkaXJlY3RvciIsImxvYWRTY2VuZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxNQUFELENBQXBCOztBQUNBLElBQU1DLFVBQVUsR0FBR0QsT0FBTyxDQUFDLFlBQUQsQ0FBMUI7O0FBQ0EsSUFBTUUsUUFBUSxHQUFHRixPQUFPLENBQUMsVUFBRCxDQUF4Qjs7QUFFQSxJQUFJRyxPQUFPLEdBQUdILE9BQU8sQ0FBQyxTQUFELENBQXJCOztBQUVBLElBQUlJLElBQUksR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDaEIsYUFBU0QsRUFBRSxDQUFDRSxTQURJO0FBR2hCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBQyxJQUFBQSxjQUFjLEVBQUUsR0FGUjtBQUdSO0FBQ0FDLElBQUFBLFVBQVUsRUFBRSxFQUpKO0FBS1I7QUFDQUMsSUFBQUEsVUFBVSxFQUFFLEdBTko7QUFPUjtBQUNBQyxJQUFBQSxpQkFBaUIsRUFBRSxHQVJYO0FBU1I7QUFDQUMsSUFBQUEsZ0JBQWdCLEVBQUUsRUFWVjtBQVdSO0FBQ0FDLElBQUFBLGVBQWUsRUFBRSxDQVpUO0FBYVI7QUFDQUMsSUFBQUEsa0JBQWtCLEVBQUUs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O0FBQ0gsS0FGRCxFQUVHLEtBQUsxRixlQUZSO0FBR0gsR0E1TWUsQ0E4TWhCO0FBQ0E7QUFFQTs7QUFqTmdCLENBQVQsQ0FBWCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQmlyZCA9IHJlcXVpcmUoJ0JpcmQnKTtcclxuY29uc3QgQmFja2dyb3VuZCA9IHJlcXVpcmUoJ0JhY2tncm91bmQnKTtcclxuY29uc3QgQ29uc3RhbnQgPSByZXF1aXJlKCdDb25zdGFudCcpOyBcclxuXHJcbnZhciBTdG9yYWdlID0gcmVxdWlyZSgnU3RvcmFnZScpO1xyXG5cclxudmFyIEdhbWUgPSBjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8vIOeuoemBk+e6teWQkeacgOWkp+WBj+enu+WAvFxyXG4gICAgICAgIHBpcGVNYXhPZmZzZXRZOiAxNTAsXHJcbiAgICAgICAgLy8g5LiK5LiL566h6YGT6Ze05pyA5bCP6Ze06ZqZXHJcbiAgICAgICAgcGlwZU1pbkdhcDogODAsXHJcbiAgICAgICAgLy8g5LiK5LiL566h6YGT6Ze05pyA5aSn6Ze06ZqZXHJcbiAgICAgICAgcGlwZU1heEdhcDogMTUwLFxyXG4gICAgICAgIC8vIOeuoemBk+eUn+aIkOaXtumXtOmXtOmalFxyXG4gICAgICAgIHBpcGVTcGF3bkludGVydmFsOiA0LjUsXHJcbiAgICAgICAgLy8g566h6YGT55Sf5oiQ5pe277yM5bGP5bmV5aSW5qiq5ZCR5YGP56e75L2N572uXHJcbiAgICAgICAgcGlwZVNwYXduT2Zmc2V0WDogMzAsXHJcbiAgICAgICAgLy8g6YeN5paw5Yi35paw5pe26Ze0XHJcbiAgICAgICAgZ2FtZVJlZmxhc2hUaW1lOiA1LFxyXG4gICAgICAgIC8vIOW9ouWPmOWKqOeUu+aSreaUvumXtOmalFxyXG4gICAgICAgIHNjb3JlU2NhbGVEdXJhdGlvbjogMC4yLFxyXG4gICAgICAgIC8vIOa4uOaIj+iPnOWNleiKgueCuVxyXG4gICAgICAgIGdhbWVNZW51OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIOWwj+m4n+WvueixoVxyXG4gICAgICAgIGJpcmQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogQmlyZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8g566h6YGT5Yib5bu66IqC54K5XHJcbiAgICAgICAgcGlwZXNOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIOeuoemBk+mihOWItuaVsOe7hFxyXG4gICAgICAgIHBpcGVQcmVmYWJzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBbY2MuUHJlZmFiXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8g5Zyw5p2/5a+56LGhXHJcbiAgICAgICAgYmFja2dyb3VuZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBCYWNrZ3JvdW5kXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyDmuLjmiI/lpLHotKXmloflrZfmoIfnrb5cclxuICAgICAgICBnYW1lT3ZlclRleHQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIOW9k+WJjeWIhuaVsOagh+etvlxyXG4gICAgICAgIHNjb3JlVGV4dDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8g5pyA6auY5YiG5qCH562+XHJcbiAgICAgICAgaGlnaFNjb3JlVGV4dDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g5Yid5aeL5YyW6Kem5pG45LqL5Lu2XHJcbiAgICAgICAgdGhpcy5zZXRJbnB1dENvbnRyb2woKTtcclxuICAgICAgICAvLyDliJ3lp4vljJbnrqHpgZPmlbDnu4RcclxuICAgICAgICB0aGlzLnBpcGVzID0gW107XHJcbiAgICAgICAgLy8g6I635Y+W5bGP5bmV5bC65a+4XHJcbiAgICAgICAgdGhpcy5zaXplID0gY2Mud2luU2l6ZTtcclxuICAgICAgICAvLyDojrflj5blnLDmnb/nmoTljIXlm7Tnm5JcclxuICAgICAgICB2YXIgZ3JvdW5kQm94ID0gdGhpcy5iYWNrZ3JvdW5kLmdyb3VuZE5vZGVbMF0uZ2V0Qm91bmRpbmdCb3goKTtcclxuICAgICAgICAvLyDojrflj5blnLDmnb/pobbpg6jnmoTnurXlnZDmoIdcclxuICAgICAgICB0aGlzLmdyb3VuZFRvcCA9IGdyb3VuZEJveC55ICsgZ3JvdW5kQm94LmhlaWdodC8yO1xyXG4gICAgICAgIC8vIOWIneWni+WMlua4uOaIj+Wksei0peagh+W/l+S9jVxyXG4gICAgICAgIHRoaXMuaXNHYW1lT3ZlciA9IGZhbHNlO1xyXG4gICAgICAgIC8vIOWIneWni+WMluW9k+WJjeWIhuaVsFxyXG4gICAgICAgIHRoaXMuY3VyU2NvcmUgPSAwO1xyXG4gICAgICAgIC8vIOW8gOWni+a4uOaIj+eVjOmdou+8jOWmguacieWOhuWPsuacgOmrmOWIhuWImeaYvuekuuivpeaIkOe7qVxyXG4gICAgICAgIGlmICggU3RvcmFnZS5nZXRIaWdoU2NvcmUoKSA+IDAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaFNjb3JlVGV4dC5zdHJpbmcgPSBDb25zdGFudC5ISUdIU0NPUkVfVFhUICsgU3RvcmFnZS5nZXRIaWdoU2NvcmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNldElucHV0Q29udHJvbDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgc2VsZi5fb25Ub3VjaEJlZ2FuLmJpbmQoc2VsZiksIHNlbGYpO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgX29uVG91Y2hCZWdhbjogZnVuY3Rpb24oIHRvdWNoLCBldmVudCApIHtcclxuICAgICAgICBpZiAoIHRoaXMuaXNHYW1lT3ZlciA9PT0gdHJ1ZSApXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLmJpcmQub25KdW1wKCk7XHJcbiAgICB9LCAgICBcclxuICAgIFxyXG4gICAgb25TdGFydEdhbWU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDlhbPpl63oj5zljZXoioLngrnmmL7npLpcclxuICAgICAgICB0aGlzLmdhbWVNZW51LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIOWwj+m4n+W8gOWni+S4i+iQvVxyXG4gICAgICAgIHRoaXMuYmlyZC5vblN0YXJ0RHJvcCgpO1xyXG4gICAgICAgIC8vIOS7jjDlvIDlp4vmmL7npLrliIbmlbBcclxuICAgICAgICB0aGlzLnNjb3JlVGV4dC5zdHJpbmcgPSBcIlwiICsgdGhpcy5jdXJTY29yZTtcclxuICAgICAgICAvLyDlkK/liqjnrqHpgZPnlJ/miJDlrprml7blmahcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuc3Bhd25QaXBlcywgdGhpcy5waXBlU3Bhd25JbnRlcnZhbCk7XHJcbiAgICAgICAgLy8g5ZCv5Yqo5ri45oiP6YC76L6R5pu05paw5a6a5pe25ZmoXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmdhbWVVcGRhdGUsIENvbnN0YW50LkdST1VORF9NT1ZFX0lOVEVSVkFMKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3Bhd25QaXBlczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g5LuO566h6YGT6aKE5Yi277yI5LiK56uv77yJ77yM55Sf5oiQ566h6YGT5a6e5L6LXHJcbiAgICAgICAgdmFyIHBpcGVVcCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGlwZVByZWZhYnNbQ29uc3RhbnQuUElQRV9VUF0pO1xyXG4gICAgICAgIC8vIOWumuS5ieS4uuS4iuerr+exu+Wei1xyXG4gICAgICAgIHBpcGVVcC5nZXRDb21wb25lbnQoJ1BpcGUnKS5pbml0KENvbnN0YW50LlBJUEVfVVApO1xyXG4gICAgICAgIC8vIOiOt+WPlueuoemBk+eahOmrmOW6pu+8iOS4iuerr+S4juS4iuerr+eahOebuOWQjO+8iVxyXG4gICAgICAgIHZhciBwaXBlSGVpZ2h0ID0gcGlwZVVwLmdldENvbXBvbmVudCgnY2MuU3ByaXRlJykuc3ByaXRlRnJhbWUuZ2V0UmVjdCgpLmhlaWdodDtcclxuICAgICAgICAvLyDorr7nva7kuIrnq6/nrqHpgZPnmoTmqKrlkJHotbflp4vkvY3nva7vvIjlsY/luZXlj7Pnq6/lj6bliqDkuIDlrprlgY/np7vvvIlcclxuICAgICAgICBwaXBlVXAueCA9IHRoaXMuc2l6ZS53aWR0aCAvIDIgKyB0aGlzLnBpcGVTcGF3bk9mZnNldFg7XHJcbiAgICAgICAgLy8g6K6+572u5LiK56uv566h6YGT55qE57q15ZCR6LW35aeL5L2N572u77yI6ZqP5py65Y+W5YGP56e76YeP77yJXHJcbiAgICAgICAgcGlwZVVwLnkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLnBpcGVNYXhPZmZzZXRZKSArIHBpcGVIZWlnaHQvMjtcclxuICAgICAgICAvLyDkuIvnq6/nlJ/miJDpgLvovpHln7rmnKzkuI7kuIrnq6/nm7jlkIxcclxuICAgICAgICB2YXIgcGlwZURvd24gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBpcGVQcmVmYWJzW0NvbnN0YW50LlBJUEVfRE9XTl0pO1xyXG4gICAgICAgIHBpcGVEb3duLmdldENvbXBvbmVudCgnUGlwZScpLmluaXQoQ29uc3RhbnQuUElQRV9ET1dOKTtcclxuICAgICAgICBwaXBlRG93bi54ID0gdGhpcy5zaXplLndpZHRoIC8gMiArIHRoaXMucGlwZVNwYXduT2Zmc2V0WDtcclxuICAgICAgICAvLyDpmo/mnLrnlJ/miJDkuIrnq6/kuI7kuIvnq6/nrqHpgZPkuYvpl7TnmoTpl7TpmpnlgLzvvIhwaXBlTWluR2Fw5LiOcGlwZU1heEdhcOS5i+mXtO+8iVxyXG4gICAgICAgIHZhciBwaXBlR2FwID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHRoaXMucGlwZU1heEdhcCAtIHRoaXMucGlwZU1pbkdhcCkpICsgdGhpcy5waXBlTWluR2FwO1xyXG4gICAgICAgIHBpcGVEb3duLnkgPSBwaXBlVXAueSAtIHBpcGVHYXAgLSBwaXBlSGVpZ2h0O1xyXG4gICAgICAgIC8vIOa3u+WKoOeuoemBk+WIsHBpcGVz6IqC54K55LiKXHJcbiAgICAgICAgdGhpcy5waXBlc05vZGUuYWRkQ2hpbGQocGlwZVVwKTtcclxuICAgICAgICB0aGlzLnBpcGVzTm9kZS5hZGRDaGlsZChwaXBlRG93bik7XHJcbiAgICAgICAgLy8g5re75Yqg566h6YGT5Yiw566h6YGT5pWw57uE5LitXHJcbiAgICAgICAgdGhpcy5waXBlcy5wdXNoKHBpcGVVcCk7XHJcbiAgICAgICAgdGhpcy5waXBlcy5wdXNoKHBpcGVEb3duKTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2FtZVVwZGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgdGhpcy5waXBlcy5sZW5ndGg7IGkgKysgKSB7XHJcbiAgICAgICAgICAgIC8vIOiOt+WPluW9k+WJjeeuoemBk+WvueixoeiKgueCuVxyXG4gICAgICAgICAgICB2YXIgY3VyUGlwZU5vZGUgPSB0aGlzLnBpcGVzW2ldO1xyXG4gICAgICAgICAgICAvLyDlr7nnrqHpgZPov5vooYznp7vliqjmk43kvZxcclxuICAgICAgICAgICAgY3VyUGlwZU5vZGUueCArPSBDb25zdGFudC5HUk9VTkRfVlg7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyDojrflj5blsI/puJ/nmoTljIXlm7Tnm5JcclxuICAgICAgICAgICAgdmFyIGJpcmRCb3ggPSB0aGlzLmJpcmQubm9kZS5nZXRCb3VuZGluZ0JveCgpO1xyXG4gICAgICAgICAgICAvLyDojrflj5blvZPliY3nrqHpgZPnmoTljIXlm7Tnm5JcclxuICAgICAgICAgICAgdmFyIHBpcGVCb3ggPSBjdXJQaXBlTm9kZS5nZXRCb3VuZGluZ0JveCgpO1xyXG4gICAgICAgICAgICAvLyB2YXIgYmlyZFJlY3QgPSBuZXcgY2MuUmVjdChiaXJkQm94LnggLSBiaXJkQm94LndpZHRoIC8gMiwgYmlyZEJveC55IC0gYmlyZEJveC5oZWlnaHQgLyAyLFxyXG4gICAgICAgICAgICAvLyAgICAgYmlyZEJveC53aWR0aCwgYmlyZEJveC5oZWlnaHQpO1xyXG4gICAgICAgICAgICAvLyB2YXIgcGlwZVJlY3QgPSBuZXcgY2MuUmVjdChwaXBlQm94LnggLSBwaXBlQm94LndpZHRoIC8gMiwgcGlwZUJveC55IC0gcGlwZUJveC5oZWlnaHQgLyAyLFxyXG4gICAgICAgICAgICAvLyAgICAgcGlwZUJveC53aWR0aCwgcGlwZUJveC5oZWlnaHQpO1xyXG4gICAgICAgICAgICAvLyDmoLnmja7kuKTkuKrnn6nlvaLojIPlm7TliKTmlq3mmK/lkKbnm7jkuqRcclxuICAgICAgICAgICAgaWYgKGNjLkludGVyc2VjdGlvbi5yZWN0UmVjdChiaXJkQm94LCBwaXBlQm94KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkdhbWVPdmVyKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIOiOt+WPluW9k+WJjeeuoemBk+WvueixoVxyXG4gICAgICAgICAgICB2YXIgY3VyUGlwZSA9IGN1clBpcGVOb2RlLmdldENvbXBvbmVudCgnUGlwZScpO1xyXG4gICAgICAgICAgICAvLyDliKTmlq3lsI/puJ/mmK/lkKbpobrliKnpgJrov4fnrqHpgZPvvIzmmK/liJnliqDliIZcclxuICAgICAgICAgICAgaWYgKCBjdXJQaXBlTm9kZS54IDwgdGhpcy5iaXJkLm5vZGUueCAmJiBjdXJQaXBlLmlzUGFzc2VkID09PSBmYWxzZSBcclxuICAgICAgICAgICAgICAgICYmIGN1clBpcGUudHlwZSA9PT0gQ29uc3RhbnQuUElQRV9VUCkge1xyXG4gICAgICAgICAgICAgICAgY3VyUGlwZS5pc1Bhc3NlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFNjb3JlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIOi2heWHuuWxj+W5leiMg+WbtOeahOeuoemBk++8jOS7juaVsOe7hOS4reenu+mZpO+8jOW5tuS7juiKgueCueS4iuWIoOmZpFxyXG4gICAgICAgICAgICBpZiAoIGN1clBpcGVOb2RlLnggPCAtKHRoaXMuc2l6ZS53aWR0aC8yICsgQ29uc3RhbnQuUElQRV9TUEFXTl9PRkZTRVRfWCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGlwZXMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5waXBlc05vZGUucmVtb3ZlQ2hpbGQoY3VyUGlwZU5vZGUsIHRydWUpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyDlsI/puJ/op6blnLDvvIzliJnmrbvkuqFcclxuICAgICAgICBpZiAodGhpcy5iaXJkLm5vZGUueSA8IHRoaXMuZ3JvdW5kVG9wICkge1xyXG4gICAgICAgICAgICB0aGlzLm9uR2FtZU92ZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBhZGRTY29yZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g5Yqg5YiGXHJcbiAgICAgICAgdGhpcy5jdXJTY29yZSArKztcclxuICAgICAgICAvLyDmmL7npLrlvZPliY3liIbmlbBcclxuICAgICAgICB0aGlzLnNjb3JlVGV4dC5zdHJpbmcgPSBcIlwiICsgdGhpcy5jdXJTY29yZTtcclxuICAgICAgICB2YXIgYWN0aW9uMSA9IGNjLnNjYWxlVG8odGhpcy5zY29yZVNjYWxlRHVyYXRpb24sIDEuMSwgMC42KTtcclxuICAgICAgICB2YXIgYWN0aW9uMiA9IGNjLnNjYWxlVG8odGhpcy5zY29yZVNjYWxlRHVyYXRpb24sIDAuOCwgMS4yKTtcclxuICAgICAgICB2YXIgYWN0aW9uMyA9IGNjLnNjYWxlVG8odGhpcy5zY29yZVNjYWxlRHVyYXRpb24sIDEsIDEpO1xyXG4gICAgICAgIC8vIOaSreaUvuW9ouWPmOWKqOeUu1xyXG4gICAgICAgIHRoaXMuc2NvcmVUZXh0Lm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGFjdGlvbjEsIGFjdGlvbjIsIGFjdGlvbjMpKTtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIG9uR2FtZU92ZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIOiuvue9rua4uOaIj+Wksei0peagh+W/l+S9jVxyXG4gICAgICAgIHRoaXMuaXNHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgICAgLy8g5ri45oiP5aSx6LSl77yM5aaC6LaF6L+H5pyA6auY5YiG5YiZ5oiQ57upXHJcbiAgICAgICAgaWYgKCB0aGlzLmN1clNjb3JlID4gU3RvcmFnZS5nZXRIaWdoU2NvcmUoKSApIHtcclxuICAgICAgICAgICAgU3RvcmFnZS5zZXRIaWdoU2NvcmUodGhpcy5jdXJTY29yZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOatu+S6oeaXtu+8jOaYvuekuuKAnEdhbWUgT3ZlcuKAnVxyXG4gICAgICAgIHRoaXMuZ2FtZU92ZXJUZXh0LnN0cmluZyA9IENvbnN0YW50LkdBTUVPVkVSX1RYVDtcclxuICAgICAgICAvLyDlhbPpl63miYDmnInlrprml7blmahcclxuICAgICAgICB0aGlzLmJpcmQudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZC51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgLy8g5LiA5a6a5pe26Ze05ZCO77yM6YeN5paw5Yi35paw5ri45oiP5Yiw5byA5aeL54q25oCBXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdnYW1lJyk7XHJcbiAgICAgICAgfSwgdGhpcy5nYW1lUmVmbGFzaFRpbWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xyXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcclxuXHJcbiAgICAvLyB9LFxyXG59KTtcclxuIl19
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
//------QC-SOURCE-SPLIT------
