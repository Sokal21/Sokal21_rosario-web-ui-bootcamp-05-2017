function randomColor(){
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}


function drawing(){
  let c = document.querySelector(".myCanvas");
  let ctx = c.getContext("2d",{antialias: true});

  ctx.fillStyle = randomColor();
  ctx.fillRect(10,20,150,75);
  ctx.lineWidth=Math.random()*20;
  ctx.strokeStyle=randomColor();
  ctx.strokeRect(10,20,150,75);

  ctx.beginPath();
  ctx.arc(150,80,50,0,2*Math.PI);
  let grd=ctx.createLinearGradient(100,0,200,0);
  grd.addColorStop(0,randomColor());
  grd.addColorStop(1,randomColor());
  ctx.fillStyle = grd;
  ctx.fill();
  ctx.lineWidth=Math.random()*20;
  ctx.strokeStyle=randomColor();
  ctx.stroke();

}
