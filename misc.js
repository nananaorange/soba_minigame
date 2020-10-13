//
//misk.js その他
//
//キーボードが押されたとき
document.onkeydown = function(e){
  key[ e.keyCode ] = true;
}

//キーボードが離されたとき
document.onkeyup = function(e){
  key[ e.keyCode ] = false;
}

document.ontouchstart = function(e){
  //alert(e);
  const z = e.changedTouches[0];
  if( z.clientX <= 440 ){
    moveright = false;
    moveleft = true;
  } else {
    moveleft = false;
    moveright = true;
  }

  //console.log(e);
  //key[ e.keyCode ] = true;
}

//キーボードが離されたとき
document.ontouchend = function(e){
  //console.log("ok");
  moveleft = false;
  moveright = false;
}


//キャラクターのベースクラス
class CharaBase{
  constructor( snum,x,y,vx,vy,){
    this.sn = snum;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.kill = false;
    this.count = 0;
  }

  update(){
    this.count++;

    this.x += this.vx;
    this.y += this.vy;

    if( this.x+(100<<8)<10 || this.x-(100<<8) > FIELD_W-10<<8 ||
          this.y+(100<<8)<0 || this.y-(100<<8) > FIELD_H<<8 ) this.kill = true;
  }

  draw(){
    drawSprite( this.sn, this.x, this.y);
  }
}


//爆発のクラス
class Expl extends CharaBase{

  constructor( c,x,y,vx,vy ){
		super(0,x,y,vx,vy);
		this.timer = c;
	}

	update(){
		if(this.timer){
			this.timer--;
			return;
		}
		super.update();
	}

  draw(){

    if(this.timer)return;
    this.sn = 16 + (this.count>>2);
    if( this.sn==27 ){
      this.kill = true;
      return;
    }

    super.draw();

  }
}

//もっと派手な爆発
function explosion( x,y, vx,vy ){

  expl.push( new Expl( 0,x,y,vx,vy ) );
	for(let i=0;i<10;i++){

		let evx = vx+(rand(-10,10)<<6);
		let evy = vy+(rand(-10,10)<<6);
		expl.push( new Expl( i,x,y,evx,evy ) );
	}
}



//スプライトを描画する
function drawSprite( snum, x, y ){
  let sx = sprite[snum].x;
  let sy = sprite[snum].y;
  let sw = sprite[snum].w;
  let sh = sprite[snum].h;

  let px = (x>>8) - sw/2;
  let py = (y>>8) - sh/2;

  if( px + sw < camera_x || px >= camera_x + SCREEN_W ||
      py + sh < camera_y || py >= camera_y + SCREEN_H ) return;

  vcon.drawImage( spriteImage, sx, sy, sw, sh, px, py, sw, sh);
}


//ランダムを作る関数
function rand(min,max){
  return Math.floor( Math.random() * (max - min + 1) ) + min;
}


//あたり判定
function checkHit( x1,y1,r1, x2,y2,r2){

  //円形同士のあたり判定
  let a = (x2-x1)>>8;
  let b = (y2-y1)>>8;
  let r = r1+r2;

  return r*r >= a*a + b*b ;

}

function checkHit2(/*x1,y1,w1,h1,*/x2,y2,w2,h2){
  //矩形同士のあたり判定
  let left1   = 0;
  let right1  = 320;
  let top1    = 430;
  let bottom1 = 431;

  let left2   = x2>>8;
  let right2  = left2+w2;
  let top2    = y2>>8;
  let bottom2 = top2 +h2;

  return(  left1 <= left2 &&
       right1 >= right2 &&
       top1 <= bottom2 && bottom1 >= top2 );
}
