const PIXI = require('pixi.js');

let addSprite =(img, posx, posy, width, height) => {
  const elem = PIXI.Sprite.from(img);

  elem.x = posx;
  elem.y = posy;
  if (width) elem.width = width;
  if (height) elem.height = height;

  app.stage.addChild(elem);
}

  let onClickFinish = () => {
    addSprite ('/img/final.png', 0, 0, appWidth, appHeight);
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
  gsap.to(stair1, {
    alpha: 1, duration: 1
  });
  app.stage.addChild(stair2);
  gsap.to(stair2, {
    alpha: 1, duration: 1
  });
  app.stage.addChild(stair3);
  gsap.to(stair3, {
    alpha: 1, duration: 1
  });
}

let onClickStair1 = () => {
  stair1_active.visible = true;
  stair2_active.visible = false;
  stair3_active.visible = false;
  stair1.visible = false;
  stair2.visible = true;
  stair3.visible = true;
  btnOk.x = appWidth * 0.69 - 130;
  app.stage.addChild(btnOk);
  app.stage.removeChild(oldStairs);
  app.stage.removeChild(new_stair_2);
  app.stage.removeChild(new_stair_3);
  new_stair_1.y = -250;
  gsap.to(new_stair_1, {duration: 0.5, y: -50, ease: 'bounce.ease-in'});
  app.stage.addChild(new_stair_1);
}

let onClickStair2 = () => {
  stair1_active.visible = false;
  stair2_active.visible = true;
  stair3_active.visible = false;
  stair1.visible = true;
  stair2.visible = false;
  stair3.visible = true;

  btnOk.x = appWidth * 0.69;
  app.stage.addChild(btnOk);
  app.stage.removeChild(oldStairs);
  app.stage.removeChild(new_stair_1);
  app.stage.removeChild(new_stair_3);
  new_stair_2.y = -250;
  gsap.to(new_stair_2, {duration: 0.5, y: -50, ease: 'bounce.ease-in'});
  app.stage.addChild(new_stair_2);
}

let onClickStair3 = () => {
  stair1_active.visible = false;
  stair2_active.visible = false;
  stair3_active.visible = true;
  stair1.visible = true;
  stair2.visible = true;
  stair3.visible = false;
  btnOk.x = appWidth * 0.69 + 130;
  app.stage.addChild(btnOk);
  app.stage.removeChild(oldStairs);
  app.stage.removeChild(new_stair_1);
  app.stage.removeChild(new_stair_2);
  new_stair_3.y = -250;
  gsap.to(new_stair_3, {duration: 0.5, y: -50, ease: 'bounce.ease-in'});
  app.stage.addChild(new_stair_3);
}

const app = new PIXI.Application({
    width: window.innerWidth, 
    height: window.innerHeight, 
    autoResize: true,
    sortableChildren: true
});

app.stage.sortableChildren = true;

document.body.appendChild(app.view);

const appWidth = app.screen.width;
const appHeight = app.screen.height;

addSprite ('/img/back.png', 0, 0, appWidth, appHeight);
addSprite ('/img/dec_2.png', 0, 0, appWidth, appHeight);
addSprite ('/img/logo.png', 10, 10);
addSprite ('/img/austin.png', appWidth / 2, appHeight / 6,  appWidth / 12, appHeight / 2);
// relative values ​​of height and width for different screens
// addSprite ('/img/stair.png', appWidth * 0.55, appHeight * 0.1, appWidth * 0.7, appHeight);
// addSprite ('/img/new_stair_01.png', 950, -50, appWidth * 0.6, appHeight);

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
stair1.x = appWidth * 0.7 - 130;
stair1.y = 20;
stair1.interactive = true;
stair1.buttonMode = true;
stair1.alpha = 0;

const stair2 = PIXI.Sprite.from('/img/02_stair.png');
stair2.x = appWidth * 0.7;
stair2.y = 20;
stair2.interactive = true;
stair2.buttonMode = true;
stair2.alpha = 0;

const stair3 = PIXI.Sprite.from('/img/03_stair.png');
stair3.x = appWidth * 0.7 + 130;
stair3.y = 20;
stair3.interactive = true;
stair3.buttonMode = true;
stair3.alpha = 0;

const stair1_active = PIXI.Sprite.from('/img/01_stair_active.png');
stair1_active.x = appWidth * 0.7 - 130;
stair1_active.y = 20;
stair1_active.zIndex = 10;
// for small screen
app.stage.addChild(stair1_active);
stair1_active.visible = false;

const stair2_active = PIXI.Sprite.from('/img/02_stair_active.png');
stair2_active.x = appWidth * 0.7;
stair2_active.y = 20;
stair2_active.zIndex = 10;
app.stage.addChild(stair2_active);
stair2_active.visible = false;

const stair3_active = PIXI.Sprite.from('/img/03_stair_active.png');
stair3_active.x = appWidth * 0.7 + 130;
stair3_active.y = 20;
stair3_active.zIndex = 10;
app.stage.addChild(stair3_active);
stair3_active.visible = false;

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
btnOk.on('pointerdown', onClickFinish);

stair1.on('pointerdown', onClickStair1);
stair2.on('pointerdown', onClickStair2);
stair3.on('pointerdown', onClickStair3);

// addSprite ('/img/dec_1.png', appWidth * 0.8, appHeight * 0.68, appWidth * 0.2, appHeight * 0.4);

const brush = PIXI.Sprite.from('/img/dec_1.png');
brush.x = appWidth * 0.8;
brush.y = appHeight * 0.68;
brush.width = appWidth * 0.2;
brush.height = appHeight * 0.4;
brush.zIndex = 999;
app.stage.addChild(brush);