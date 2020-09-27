//デバッグのフラグ
const DEBUG = false;

let drawCount = 0;
let fps = 0;
let lastTime = Date.now();

//スムージング
const SMOOTHING = false;

//ゲームスピード
const GAME_SPEED = 1000/60;

//画面サイズ
const SCREEN_W = 320;
const SCREEN_H = 460;

//キャンバスサイズ
const CANVAS_W = SCREEN_W*1.5;
const CANVAS_H = SCREEN_H*1.5;

//フィールドサイズ
const FIELD_W = SCREEN_W /*+ 120*/;
const FIELD_H = SCREEN_H + 40;
