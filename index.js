const PIXI = require('pixi.js');

let addSprite = (sprite, posx, posy, width, height) => {
  const elem = PIXI.Sprite.from(sprite);

  elem.x = posx;
  elem.y = posy;
  if (width) elem.width = width;
  if (height) elem.height = height;

  app.stage.addChild(elem);
}

let onClickFinish = () => {
  addSprite ('/img/final.png', 0, 0, appWidth, appHeight);
  brush.zIndex = 0;
  app.stage.removeChild(hammer);
  app.stage.removeChild(stair1);
  app.stage.removeChild(stair2);
  app.stage.removeChild(stair3);    
  app.stage.removeChild(stair1_active);
  app.stage.removeChild(stair2_active);
  app.stage.removeChild(stair3_active);
  app.stage.removeChild(btnOk);
  app.stage.removeChild(btnContinue);
}

let onClickHammer = () => {
  app.stage.removeChild(hammer);

  app.stage.addChild(stair1);
  app.stage.addChild(stair2);
  app.stage.addChild(stair3);

  gsap.to(stair1, {alpha: 1, duration: 1});
  gsap.to(stair2, {alpha: 1, duration: 1});
  gsap.to(stair3, {alpha: 1, duration: 1});
}

let clearStair = (new_stair) => {
  stair1_active.visible = false;
  stair2_active.visible = false;
  stair3_active.visible = false;
  
  stair1.visible = true;
  stair2.visible = true;
  stair3.visible = true;

  app.stage.removeChild(new_stair_1);
  app.stage.removeChild(new_stair_2);
  app.stage.removeChild(new_stair_3);

  app.stage.addChild(btnOk);
  app.stage.removeChild(oldStairs);

  new_stair.y = -350;
  gsap.to(new_stair, {duration: 0.5, y: -50, ease: 'bounce.ease-in'});
  app.stage.addChild(new_stair);
}

let stairParams = (stair, posx) => {
  stair.x = appWidth * 0.7 + posx;
  stair.y = 20;
  stair.interactive = true;
  stair.buttonMode = true;
  stair.alpha = 0;
  stair.zIndex = 20;
}

let onClickStair1 = () => {
  btnOk.x = appWidth * 0.69 - 128;
  clearStair(new_stair_1);

  stair1_active.visible = true;
  stair1.visible = false;
}

let onClickStair2 = () => {
  btnOk.x = appWidth * 0.69 + 2;
  clearStair(new_stair_2);

  stair2_active.visible = true;
  stair2.visible = false;
}

let onClickStair3 = () => {
  btnOk.x = appWidth * 0.69 + 127;
  clearStair(new_stair_3);

  stair3_active.visible = true;
  stair3.visible = false;
}

let activeStairParams = (stair, posx) => {
  stair.x = appWidth * 0.7 + posx;
  stair.y = 20;
  stair.zIndex = 10;
  app.stage.addChild(stair);
  stair.visible = false;
}

const app = new PIXI.Application({
  width: window.innerWidth, 
  height: window.innerHeight, 
  autoResize: true
});
app.stage.sortableChildren = true;

document.body.appendChild(app.view);

const appWidth = app.screen.width;
const appHeight = app.screen.height;

addSprite ('/img/back.png', 0, 0, appWidth, appHeight);
addSprite ('/img/dec_2.png', 0, 0, appWidth, appHeight);
addSprite ('/img/logo.png', 10, 10);
addSprite ('/img/austin.png', appWidth * 0.5, appHeight * 0.16,  appWidth * 0.08, appHeight * 0.5);
// relative values ​​of height and width for different screens

const oldStairs = PIXI.Sprite.from('/img/stair.png');
oldStairs.x = appWidth * 0.55;
oldStairs.y = appHeight * 0.1;
oldStairs.width = appWidth * 0.7;
oldStairs.height = appHeight;
app.stage.addChild(oldStairs);

const btnContinue = PIXI.Sprite.from('/img/btn.png');
btnContinue.x = appWidth * 0.36;
btnContinue.y = appHeight * 0.73;
btnContinue.width = appWidth * 0.25;
btnContinue.height = appHeight * 0.2;
btnContinue.interactive = true;
btnContinue.buttonMode = true;
btnContinue.scale.x = btnContinue.scale.y = 1;
btnContinue.zIndex = 20;
// for small screen
btnContinue.on('pointerdown', onClickFinish);
gsap.to(btnContinue.scale, 2, {duration: 0.5, x:1.1, y: 1.1,  ease: 'bounce.ease-in', repeat:-1, yoyo:true});
app.stage.addChild(btnContinue);

const hammer = new PIXI.Sprite.from('/img/icon_hammer.png');
hammer.y = appHeight * 0.47;
hammer.x = appWidth * 0.77;
hammer.interactive = true;
hammer.buttonMode = true;
hammer.alpha = 0.0;
hammer.on('pointerdown', onClickHammer);

window.setTimeout(function() {
  app.stage.addChild(hammer);
  gsap.to(hammer, {
    alpha: 1, duration: 1
  });
}, 3000);

const stair1 = PIXI.Sprite.from('/img/01_stair.png');
stairParams(stair1, -130);
stair1.on('pointerdown', onClickStair1);

const stair2 = PIXI.Sprite.from('/img/02_stair.png');
stairParams(stair2, 0);
stair2.on('pointerdown', onClickStair2);

const stair3 = PIXI.Sprite.from('/img/03_stair.png');
stairParams(stair3, 130);
stair3.on('pointerdown', onClickStair3);

const stair1_active = PIXI.Sprite.from('/img/01_stair_active.png');
activeStairParams(stair1_active, -130);

const stair2_active = PIXI.Sprite.from('/img/02_stair_active.png');
activeStairParams(stair2_active, 0);

const stair3_active = PIXI.Sprite.from('/img/03_stair_active.png');
activeStairParams(stair3_active, 130);

const new_stair_1 = PIXI.Sprite.from('/img/new_stair_01.png');
new_stair_1.x = appWidth * 0.45;
new_stair_1.width = appWidth * 0.7; 
new_stair_1.height = appHeight;

const new_stair_2 = PIXI.Sprite.from('/img/new_stair_02.png');
new_stair_2.x = appWidth * 0.47;
new_stair_2.width = appWidth * 0.7; 
new_stair_2.height = appHeight;

const new_stair_3 = PIXI.Sprite.from('/img/new_stair_03.png');
new_stair_3.x = appWidth * 0.5;
new_stair_3.width = appWidth * 0.7; 
new_stair_3.height = appHeight;

const btnOk = PIXI.Sprite.from('/img/ok.png');
btnOk.interactive = true;
btnOk.buttonMode = true;
btnOk.y = 130;
btnOk.zIndex = 20;
btnOk.on('pointerdown', onClickFinish);

const brush = PIXI.Sprite.from('/img/dec_1.png');
brush.x = appWidth * 0.8;
brush.y = appHeight * 0.68;
brush.width = appWidth * 0.2;
brush.height = appHeight * 0.4;
brush.zIndex = 99;
app.stage.addChild(brush);