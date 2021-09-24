
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