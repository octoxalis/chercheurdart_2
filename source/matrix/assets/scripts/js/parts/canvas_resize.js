var img= new Image();
img.src= "http://www.onekind.org/uploads/a-z/az_zebras.jpg";
img.onload= drawImage;
var but= document.querySelector('button');
but.onclick= resizeCanvas;

var can= document.querySelector('canvas');
var c= can.getContext('2d');

function drawImage(){
	c.drawImage(img, 0,0);
}

// below here to resize canvas
function resizeCanvas(){
	var w2= can.width/2, h2= can.height/2;
	can.width= w2;
  can.height= h2;
  c.drawImage(img, 0,0, w2, h2);
}