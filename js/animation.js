function randomColor(){
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

function init(){
  window.requestAnimationFrame(drawing);
};

function drawing(){
  let c = document.querySelector(".myCanvas");
  let ctx = c.getContext("2d",{antialias: true});

  ctx.clearRect(0, 0, 500, 200);

  var time = new Date();

  ctx.fillStyle = randomColor();
  ctx.fillRect(100,100,80,80);

//  ctx.translate(90 ,90);
  ctx.rotate(((2 * Math.PI) / 6000) * time.getSeconds());

  window.requestAnimationFrame(drawing);
}
