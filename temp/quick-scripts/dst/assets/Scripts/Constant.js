
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