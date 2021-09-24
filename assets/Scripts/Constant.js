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
    HIGHSCORE_TXT: 'HighScore: ',
});

module.exports = Constant;

