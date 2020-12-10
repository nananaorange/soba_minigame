//
//jiki.js 自機関係
//
//弾クラス
class Tama extends CharaBase{
  constructor( sn,x,y,vx,vy ){
    super( sn,x,y,vx,vy );
    //this.w = 4;
		//this.h = 6;
    this.r = 4;
  }

  update(){
    super.update();

    for( let i=0; i<teki.length ;i++){

			if( !teki[i].kill ){

				if( checkHit( this.x, this.y, this.r,
					teki[i].x, teki[i].y, teki[i].r) ){

            this.kill=true;

            if( (teki[i].hp -= 10 ) <= 0 ){

					  teki[i].kill=true;
            /*explosion( teki[i].x, teki[i].y,
            teki[i].vx>>3, teki[i].vy>>3);*/
            score += teki[i].score;
          } else {
            //expl.push( new Expl( 0,this.x,this.y,0,0 ) );
          }

          if(teki[i].mhp >= 1000 ){
            bossHP = teki[i].hp;
            bossMHP = teki[i].mhp;
          }

					  break;
				}

			}

		}
  }
  draw(){
    super.draw();

  }
}


//自機のクラス
class Jiki{
  constructor(){
    this.x = (FIELD_W/2)<<8;
    this.y = (FIELD_H - 70)<<8;
    this.mhp = 200;
    this.hp = this.mhp;

    this.speed = 512;
    this.anime = 0;
    this.reload = 0;
    this.relo2 = 0;
    this.r      = 3;
    this.damage = 0;
    this.muteki = 0;
    this.count = 0;

    this.w = SCREEN_W;
    this.h = 1;
  }


  //自機の移動
  update(){
    this.count++;
    if(this.damage)this.damage--;
    if(this.muteki)this.muteki--;
    if( /*key[32] &&*/ this.count % 12 == 0){

      if(score>=0 && score<=49 )
      {
      //tama.push( new Tama(this.x+(6<<8), this.y-(10<<8), 0, -2000) );
      tama.push( new Tama(2,this.x-(6<<4), this.y-(10<<4), 0, -1100) );//2
      tama.push( new Tama(3,this.x+(8<<8), this.y-(5<<8), 200, -1100) );//3
      tama.push( new Tama(1,this.x-(8<<8), this.y-(5<<8), -200, -1100) );//1
      //tama.push( new Tama(this.x+(4<<8), this.y-(10<<8), 0, -2000) );
      }

      if(score>=50){
      tama.push( new Tama(9,this.x+(6<<4), this.y-(10<<8), 0, -1000) );//4
      //tama.push( new Tama(3,this.x-(6<<8), this.y-(10<<8), 0, -2000) );//3
      tama.push( new Tama(10,this.x+(8<<8), this.y-(5<<8), 200, -1000) );//5
      tama.push( new Tama(8,this.x-(8<<8), this.y-(5<<8), -200, -1000) );//2
      tama.push( new Tama(11,this.x+(12<<8), this.y-(0<<8), 400, -1000) );//6
      tama.push( new Tama(7,this.x-(12<<8), this.y-(0<<8), -400, -1000) );//1
      //tama.push( new Tama(this.x+(4<<8), this.y-(10<<8), 0, -2000) );
    }


      //12フレームごとに1発
      /*this.reload = 12;
      if( ++this.relo2 == 4 ){
        this.reload = 20;
        this.relo2 = 0;
      }*/
    }
    //if( !key[32] ) this.reload = this.relo2 = 0;

    //if( this.reload > 0) this.reload--;

    if( key[37] && this.x > this.speed ){
      this.x -= this.speed;
      if( this.anime > -8 ) this.anime--;
    }

    else if( key[39] && this.x <= (FIELD_W<<8) - this.speed ){
      this.x += this.speed;
      if( this.anime < 8 ) this.anime++;
    } else {
      if( this.anime > 0 ) this.anime--;
      if( this.anime < 0 ) this.anime++;
    }


    if(moveleft &&  this.x > this.speed ){
      this.x -= this.speed;
    }

    if(moveright && this.x <= (FIELD_W<<8) - this.speed){
      this.x += this.speed;
    }


    for(let i =0; i<teki.length; i++){
      if(!gameOver /*&&!this.muteki */&& checkHit2(/*0, 459, this.w, this.h,*/
  					teki[i].x, teki[i].y, teki[i].w, teki[i].h) ){


          if( this.mhp < 500 )  this.kill   =true;
          if( ( this.hp -= 1)<= 0 ){
            //console.log(damageCount);
            //gameOver = true;
          } else {
            damageCount++;
            //console.log(damageCount);
        	  //jiki.damage = 10;
        	//jiki.muteki = 60;
        }
      }
    }


  }

  //自機の描画
  draw(){
  	drawSprite(0, this.x, this.y );
  }

}
