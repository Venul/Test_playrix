const PIXI = require('pixi.js');

function addSprite (img, posx, posy, width, height) {
  const elem = PIXI.Sprite.from(img);

  elem.x = posx;
  elem.y = posy;
  if (width || width != 0) elem.width = width;
  if (height || height != 0) elem.height = height;

  app.stage.addChild(elem);
}

function onClickFinish() {
  addSprite ('/img/final.png', 0, 0, appWidth, appHeight);
}

function onClickHammer() {
  app.stage.removeChild(hammer);
  addSprite ('/img/01_stair.png', appWidth * 0.63, 20);
  addSprite ('/img/02_stair.png', appWidth * 0.7, 20);
  addSprite ('/img/03_stair.png', appWidth * 0.77, 20);
}

const app = new PIXI.Application({
    width: window.innerWidth, 
    height: window.innerHeight, 
    autoResize: true
});

document.body.appendChild(app.view);

const appWidth = app.screen.width;
const appHeight = app.screen.height;

addSprite ('/img/back.png', 0, 0, appWidth, appHeight);
addSprite ('/img/dec_2.png', 0, 0, appWidth, appHeight);
addSprite ('/img/logo.png', 10, 10);
addSprite ('/img/austin.png', appWidth / 2, appHeight / 6,  appWidth / 12, appHeight / 2);
addSprite ('/img/stair.png', appWidth * 0.55, appHeight * 0.1, appWidth * 0.7, appHeight);
addSprite ('/img/dec_1.png', appWidth * 0.8, appHeight * 0.68, appWidth * 0.2, appHeight * 0.4);

const btn = PIXI.Sprite.from('/img/btn.png');
btn.x = appWidth * 0.36;
btn.y = appHeight * 0.73;
btn.width = appWidth * 0.25;
btn.height = appHeight * 0.2;
btn.interactive = true;
btn.buttonMode = true;
btn.scale.x = btn.scale.y = 1;
btn.on('pointerdown', onClickFinish);

gsap.to(btn.scale, 2, {duration: 0.5, x:1.1, y: 1.1,  ease: 'bounce.ease-in', repeat:-1, yoyo:true});
app.stage.addChild(btn);

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
}, 50);