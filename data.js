//
// data.js
//

//敵マスター
class TekiMaster{
  constructor( tnum, r, hp, score ){
    this.tnum = tnum;
    this.r = r;
    this.hp = hp;
    this.score = score;
  }
}

let tekiMaster=[
  new TekiMaster( 0, 10, 10, 1), //0,いのしし
  new TekiMaster( 1, 10, 30, 1), //1,きじ
  new TekiMaster( 2, 70, 2400, 100), //1,くま
]

//スプライトクラス
class Sprite{
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}

//スプライト(xの開始座標,　yの開始座標, 横(x)の長さ, 縦(y)の長さ)
let sprite = [
  new Sprite(0,0,50,67), //0 ,ばあさん
  new Sprite(5,69,11,12),  //1 ,に
  new Sprite(19,68,8,12),  //2 ,し
  new Sprite(29,70,9,10),  //3 ,ゃ
  new Sprite(71,0,61,31), //4 ,いのしし
  new Sprite(74,38,45,34), //5 ,きじ
  new Sprite(122,0,136,156), //6 ,くま
  new Sprite(4,85,12,12), //7 ,わ
  new Sprite(18,85,10,11), //8 ,さ
  new Sprite(30,84,10,13), //9 ,す
  new Sprite(41,84,11,12), //10 ,ん
  new Sprite(54,83,12,13), //11 ,な
];
