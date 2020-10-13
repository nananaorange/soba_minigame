
document.oncontextmenu = function () {return false;}
document.getElementsByTagName('html')[0].oncontextmenu = function () {return false;}
document.body.oncontextmenu = function () {return false;}

//キャンバス
let can = document.getElementById("can");
let con = can.getContext("2d");
can.width = CANVAS_W;
can.height = CANVAS_H;

con.mozimageSmoothingEnabled = SMOOTHING;
con.webkitimageSmoothingEnabled = SMOOTHING;
con.msimageSmoothingEnabled = SMOOTHING;
con.imageSmoothingEnabled = SMOOTHING;
con.font = "16px 'Century Gothic'";

//フィールド（仮想画面）
let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");
vcan.width = FIELD_W;
vcan.height = FIELD_H;
vcon.font = "12px 'Century Gothic'";

//カメラの座標
let camera_x = 0;
let camera_y = 0;

//
let gameOver = false;
let score = 0;
let gameClear = false;
let gameClear1 = false;
let gameClear2 = false;
let gameClear3 = false;

let moveleft = false;
let moveright = false;

//
let bossHP = 0;
let bossMHP = 0;

//ダメージカウント
let damageCount = 0;

//星の実態
//let star=[];

//キーボードの状態
let key=[];

//オブジェクト
let teki=[];
let teta=[];
let tama=[];
//let expl=[];
let jiki = new Jiki();

//ファイル読み込み
let spriteImage = new Image();
spriteImage.src = "sprite1.png";

//ゲーム初期化
function gameInit(){
  //for( let i = 0; i<STAR_MAX; i++) star[i] = new Star();
  setInterval( openingGame, GAME_SPEED );

}

//オブジェクトをアップデート
function updateObj( obj ){
  for( let i = obj.length-1; i>=0; i--) {
    obj[i].update();
    //splite(配列, 何個消すか)
    if(obj[i].kill) obj.splice( i,1 );
  }
}

//オブジェクトを描画
function drawObj( obj ){
  for( let i = 0; i<obj.length; i++) obj[i].draw();
}


//移動の処理
function updateAll(){

  //updateObj(star);
  updateObj(tama);
  updateObj(teta);
  updateObj(teki);
  //updateObj(expl);
  if(!gameOver) jiki.update();
}

  let img = new Image();
  img.src = "hatake.jpg";


//描画の処理
function drawAll(){

  //vcon.fillStyle = (jiki.damage)?"red":"black";
  vcon.drawImage(img, 0, 0, 500, 500);
  //vcon.fillRect(camera_x,camera_y,SCREEN_W,SCREEN_H);

  //drawObj( star );
  drawObj( tama );
  if(!gameOver) jiki.draw();
  drawObj( teki );
  //drawObj( expl );
  drawObj( teta );

  //自機の範囲　０～FIELD_W
  //カメラの範囲　０～（FIELD_W　-　ZCREEN_W）
  camera_x = Math.floor((jiki.x>>8) / FIELD_W * (FIELD_W - SCREEN_W));
  camera_y = Math.floor((jiki.y>>8) / FIELD_H * (FIELD_H - SCREEN_H));

  //ボスのHPを表示する

  if( bossHP > 0){
    let sz = (SCREEN_W-20) * bossHP / bossMHP;
    let sz2 = (SCREEN_W-20);

    vcon.fillStyle="rgba(255,0,0,0.5)";
    vcon.fillRect(camera_x+10, camera_y+10, sz, 10);
    vcon.strokeStyle="rgba(255,0,0,0.9)";
    vcon.strokeRect(camera_x+10, camera_y+10, sz2, 10);

  }

  //スコア表示

  vcon.fillStyle = "white";
  vcon.fillText("守った回数　"+score,camera_x+10,camera_y+54 );
  vcon.fillText("荒らされた回数　"+damageCount,camera_x+10,camera_y+74 );


  //仮想画面から実際のキャンバスにコピー
  con.drawImage( vcan, camera_x, camera_y, SCREEN_W, SCREEN_H, 0, 0, CANVAS_W, CANVAS_H );

}

//情報の表示
function putInfo(){
  con.fillStyle = "white";

  if( gameOver ){
    let s = "畑を荒らされちゃった　．．．";
    let w = con.measureText(s).width;
    let x = CANVAS_W/2 - w/2;
    let y = CANVAS_H/2 - 20;
    con.fillText(s,x,y);


    s = "あなたが畑を守ったのは、"+score+" 回です!";
    w = con.measureText(s).width;
    x = CANVAS_W/2 - w/2;
    y = CANVAS_H/2 - 20+30;
    con.fillText(s,x,y);


  countup(); //1秒毎にcountup()を呼び出し

  }

  if( gameClear ){
    let s = "あなたは "+score+" 回畑を守れました ♡";
    let w = con.measureText(s).width;
    let x = CANVAS_W/2 - w/2;
    let y = CANVAS_H/2 - 20;
    con.fillText(s,x,y);
    //con.fillText("あなたは "+score+" 回畑を守れました ♡",CANVAS_W/2,CANVAS_H/2);
  }


  if( gameClear1 ){
    //countTimer++;
    //ここに荒らされた数が3以下のクリア画面
    let s = "たくさんそばの実がなりました～！！";
    let w = con.measureText(s).width;
    let x = CANVAS_W/2 - w/2;
    let y = CANVAS_H/2 - 20 + 40;
    con.fillText(s,x,y);

    let s1 = "☆キーワード☆";
    let w1 = con.measureText(s1).width;
    let x1 = CANVAS_W/2 - w1/2;
    let y1 = CANVAS_H/2 - 20 + 80;
    con.fillText(s1,x1,y1);

    let s2 = "【 へいほういし 】";
    let w2 = con.measureText(s2).width;
    let x2 = CANVAS_W/2 - w2/2;
    let y2 = CANVAS_H/2 - 20 + 120;
    con.fillText(s2,x2,y2);
    //if(countTimer==60*5)location.href = "https://www.yahoo.co.jp/";
    //console.log(countTimer);
  }

  if( gameClear2 ){
    //countTimer++;
    //ここに６以下のクリア画面
    let s = "ほぼ守れました！ステキ！";
    let w = con.measureText(s).width;
    let x = CANVAS_W/2 - w/2;
    let y = CANVAS_H/2 - 20 + 40;
    con.fillText(s,x,y);
    //if(countTimer==60*5)location.href = "https://www.goo.ne.jp/";
    //console.log(countTimer);
  }

  if ( gameClear3 ){
    //countTimer++;
    //ここに７以上のクリア画面
    let s = "ギリギリ守れました、、！危なかった～、！";
    let w = con.measureText(s).width;
    let x = CANVAS_W/2 - w/2;
    let y = CANVAS_H/2 - 20 + 40;
    con.fillText(s,x,y);
    //if(countTimer==60*5)location.href = "https://www.biglobe.ne.jp/";
    //console.log(countTimer);
  }

  if(DEBUG){
    drawCount++;
    if( lastTime +1000 <= Date.now()){
      fps = drawCount;
      drawCount = 0;
      lastTime = Date.now();
    }

    con.fillText("FPS:"+fps,20,20);
    con.fillText("Tama:"+tama.length,20,40);
    con.fillText("Teki:"+teki.length,20,60);
    con.fillText("Teta:"+teta.length,20,80);
    //con.fillText("Expl:"+expl.length,20,100);
    con.fillText("X:"+(jiki.x>>8),20,120);
    con.fillText("Y:"+(jiki.y>>8),20,140);
    con.fillText("HP:"+jiki.hp,20,160);
    con.fillText("SCORE:"+score,20,180);
    con.fillText("COUNT:"+gameCount,20,200);
    con.fillText("WAVE:"+gameWave,20,220);
    con.fillText("Timer:"+countTimer,20,240);
    con.fillText("Count:"+damageCount,20,260);
    con.fillText("BOSS:"+bossHP,20,280);
  }
}

var countTimer = 0;

function countup(){
  countTimer++;
  //ここにクリア画面
  if(countTimer==60*8) location.reload();
  //console.log(countTimer);
}

/*function clear1(){
  //countTimer++;
  //ここに荒らされた数が3以下のクリア画面
  let s = "たくさんそばの実がなりました～！！";
  let w = con.measureText(s).width;
  let x = CANVAS_W/2 - w/2;
  let y = CANVAS_H/2 - 20 + 30;
  con.fillText(s,x,y);
  //if(countTimer==60*5)location.href = "https://www.yahoo.co.jp/";
  //console.log(countTimer);
}

function clear2(){
  //countTimer++;
  //ここに６以下のクリア画面
  let s = "ほぼ守れました！ステキ！";
  let w = con.measureText(s).width;
  let x = CANVAS_W/2 - w/2;
  let y = CANVAS_H/2 - 20 + 30;
  con.fillText(s,x,y);
  //if(countTimer==60*5)location.href = "https://www.goo.ne.jp/";
  //console.log(countTimer);
}

function clear3(){
  //countTimer++;
  //ここに７以上のクリア画面
  let s = "ギリギリ守れました、、！危なかった～、！";
  let w = con.measureText(s).width;
  let x = CANVAS_W/2 - w/2;
  let y = CANVAS_H/2 - 20 + 30;
  con.fillText(s,x,y);
  //if(countTimer==60*5)location.href = "https://www.biglobe.ne.jp/";
  //console.log(countTimer);
}*/


let gameCount = 0;
let gameWave  = 0;
let gameRound = 0;
let state=0;

function openingGame(){

    if(state==0){

      can.style.backgroundColor = "pink";
      con.fillStyle = "#444444";

      let x = CANVAS_W/2;
      //let y = 140;
      con.fillText("⋆そば畑ゲーム⋆",x - 90,140);
      con.fillText("－ 操作方法 －",x - 80,280);
      con.fillText("PCの場合は → ← で左右に方言ばあさんが動きます",x - 230,320);
      con.fillText("スマホの場合は、画面の右と左を触ると動きます",x - 220,360);
      con.fillText("方言ばあさんが叫んで畑を守ります",x - 160,400);
      con.fillText("クリック　または　タップ　ではじまります",x - 200,480);

      document.getElementById("can").onclick = function() {
        state=1;
      };
    }else if(state==1){
        gameLoop();
    }

}


//ゲームループ
function gameLoop(){

  gameCount++;


  if( gameWave == 0 ){

    if( rand(0,40)==1 ){
      // 1/30で敵をだす
      teki.push( new Teki( 0, rand(0, FIELD_W)<<8, 0, 0, rand(300, 1200) ) )
    }

    if( gameCount > 60 * 10){
      /*if(score>=100){
        gameWave=4;
        gameCount=0;
        teki.push( new Teki( 2, (FIELD_W/2)<<8, -(70<<8), 0, 200 ) );
      } else {*/
        gameWave++;
        gameCount = 0;
      //}
    }
  }else if( gameWave == 1 ){

    if( rand(0,20)==1 ){
      // 1/30で敵をだす
      teki.push( new Teki( 0, rand(0, FIELD_W)<<8, 0, 0, rand(300, 1200) ) )
    }

    if( gameCount > 60 * 10){
      /*if(score>=100){
        gameWave=4;
        gameCount=0;
        teki.push( new Teki( 2, (FIELD_W/2)<<8, -(70<<8), 0, 200 ) );
      } else {*/
        gameWave++;
        gameCount = 0;
      //}
    }

  }else if( gameWave == 2 ){

    if( rand(0,15)==1 ){
      // 1/30で敵をだす
      teki.push( new Teki( 1, rand(0, FIELD_W)<<8, 0, 0, rand(300, 1200) ) )
    }

    if( gameCount > 60 * 10){
      /*if(score>=100){
        gameWave=4;
        gameCount=0;
        teki.push( new Teki( 2, (FIELD_W/2)<<8, -(70<<8), 0, 200 ) );
      } else {*/
        gameWave++;
        gameCount = 0;
      //}
    }

  }else if( gameWave == 3 ){

    if( rand(0,10)==1 ){
      // 1/30で敵をだす
      let r = rand(0,1);
      teki.push( new Teki( r, rand(0, FIELD_W)<<8, 0, 0, rand(300, 1200) ) )
    }

    if( gameCount > 60 * 10){
      gameWave++;
      gameCount = 0;

      if(!gameOver && score<100){
        gameOver = true;
      } else if (!gameOver){
        teki.push( new Teki( 2, (FIELD_W/2)<<8, -(70<<8), 0, 200 ) );
      }
    }

  }else if( gameWave == 4 ){

    if( rand(0,15)==1 ){
    }

    if( teki.length == 0 ){
      gameWave++;
      gameCount = 0;

    }
  }else if( gameWave == 5){

    if( !gameOver && (bossHP!=0 || score==0 || damageCount>=100)){
      gameOver = true;
    } else if (!gameOver){
      gameClear = true;

      if(!gameOver && damageCount<=3){
        gameClear1 = true;
        setInterval(countup(), GAME_SPEED);
        //clear1();
      } else if(!gameOver && damageCount>3 && damageCount<=7){
        gameClear2 = true;
        setInterval(countup(), GAME_SPEED);
        //clear2();
      } else if(!gameOver){
        gameClear3 = true;
        setInterval(countup(), GAME_SPEED);
        //clear3();
      }
    }

    countup();

    // location.href = "https://www.google.com";

  }

  updateAll();
  drawAll();
  putInfo();

}

//オンロードでゲーム開始
window.onload = function(){
  gameInit();
}
