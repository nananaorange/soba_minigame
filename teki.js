//
//teki.js 敵
//

//敵弾クラス
class Teta extends CharaBase{
  constructor(sn,x,y,vx,vy,t){

		super(sn,x,y,vx,vy);
		this.r = 3;
    if( t == undefined)this.timer = 0;
    else this.timer = t;

	}

	update(){
    if( this.timer ){
      this.timer --;
      return;
    }

		super.update();

    this.sn=14 + ((this.count>>3)&1);
	}

}

//敵クラス
class Teki extends CharaBase{
  constructor( t,x,y,vx,vy ){
    super( 0,x,y,vx,vy );
    this.tnum = tekiMaster[t].tnum;
    this.r = tekiMaster[t].r;
    this.mhp = tekiMaster[t].hp
    this.hp = this.mhp
    this.score = tekiMaster[t].score;
    this.flag = false;

    this.dr = 90;
    this.relo = 0;

    this.w = 1;
    this.h = 1;
  }

  update(){
    //共通のアップデート
    if(this.relo)this.relo--;
    super.update();

    //個別のアップ(デート
    tekiFunc[this.tnum](this);

  }
}


//ピンクひよこ
function tekiMove01(obj){

  //スプライトの変更

    const ptn = [4, 4, 4, 4];
    obj.sn = ptn[ (obj.count>>3)&3 ];

}

//黄色ひよこ
function tekiMove02(obj){
  if( !obj.flag ){
    if( jiki.x > obj.x && obj.vx<600 ) obj.vx+= 30;
    else if( jiki.x < obj.x && obj.vx>-600) obj.vx-= 30;
  }else{
    if( jiki.x < obj.x && obj.vx<600 ) obj.vx+= 30;
    else if( jiki.x > obj.x && obj.vx>-4600) obj.vx-= 30;
　}

  if( Math.abs( jiki.y-obj.y ) < (100<<8) && !obj.flag){
    obj.flag = true;
    //tekiShot(obj,600);
　}

  //スプライトの変更
  const ptn = [5, 5, 5, 5];
  obj.sn = ptn[ (obj.count>>3)&3 ];
}

//ボス黄色ひよこ
function tekiMove03(obj){

  if(!obj.flag && (obj.y>>8)>=60 )obj.flag = 1;

  if(obj.flag == 1){
    if((obj.vy-=2)<= 0){
      obj.flag = 2;
      obj.vy = 0;

    }
  } else if(obj.flag == 2){
    if( obj.vx < 300){ obj.vx +=10; obj.vy += 1;}
    if((obj.x>>8) > (FIELD_W - 100)) obj.flag = 3;
  } else if(obj.flag == 3){
    if( obj.vx > -300) obj.vx -=10;
    if((obj.x>>8) < 100) obj.flag = 2;
  }

  //スプライトの変更
obj.sn = 6;
}



let tekiFunc = [
  tekiMove01,
  tekiMove02,
  tekiMove03,
];
