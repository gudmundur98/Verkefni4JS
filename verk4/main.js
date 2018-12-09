// define variable for ball count paragraph

var para = document.querySelector('p');
var count = 0;

// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth-20;
var height = canvas.height = window.innerHeight-80;

var background = new Image();
//background.src = "verk4/mynd.jpg";

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

// define shape constructor

function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}

// define Ball constructor, inheriting from Shape

function Ball(x, y, velX, velY, exists, color, size) {
  Shape.call(this, x, y, velX, velY, exists);

  this.color = "gray";
  this.size = size;
};

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

// define ball draw method

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.moveTo(this.x + this.size * Math.cos(0), this.y + this.size * Math.sin(0));
  for (var side = 0; side < 7; side++) {
    ctx.lineTo(this.x + this.size * Math.cos(side * 2 * Math.PI / 6), this.y + this.size * Math.sin(side * 2 * Math.PI / 6));
  }
  ctx.fillStyle = this.color;
  ctx.fill();
};

// define ball update method

Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

// define ball collision detection

Ball.prototype.collisionDetect = function() {
  for(var j = 0; j < balls.length; j++) {
    if(!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);
    }
  }
};

function Shape2(x, y, w, h, exists) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.exists = exists;
}

function Diamond(x, y, w, h, exists, size){
  Shape2.call(this, x, y, w, h, exists);

  this.color =['#00ffff','#ffff66','#ff33cc'];
  this.size = size;
}

Diamond.prototype = Object.create(Shape2.prototype);
Diamond.prototype.constructor = Diamond;

Diamond.prototype.draw = function(){
  ctx.fillStyle= this.color[0];
  ctx.beginPath();
  ctx.moveTo(this.x,this.y);
  ctx.lineTo(this.x+this.w/2,this.y+0.7*this.h);
  ctx.lineTo(this.x+this.w/2,this.y);
  ctx.fill();

  ctx.fillStyle=this.color[1];
  ctx.beginPath();
  ctx.moveTo(this.x+this.w/2, this.y);
  ctx.lineTo(this.x+this.w/2,this.y+0.7*this.h);
  ctx.lineTo(this.x+this.w,this.y);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(this.x+this.w/4,this.y-0.3*this.h);
  ctx.lineTo(this.x,this.y);
  ctx.lineTo(this.x+this.w/2,this.y);
  ctx.fill();

  ctx.fillStyle=this.color[2];
  ctx.beginPath();
  ctx.moveTo(this.x+this.w/4,this.y-0.3*this.h);
  ctx.lineTo(this.x+this.w/2,this.y);
  ctx.lineTo(this.x+0.75*this.w,this.y-0.3*this.h);
  ctx.fill();

  ctx.fillStyle=this.color[0];
  ctx.beginPath();
  ctx.moveTo(this.x+0.75*this.w,this.y-0.3*this.h);
  ctx.lineTo(this.x+this.w/2,this.y);
  ctx.lineTo(this.x+this.w,this.y);
  ctx.fill();
};


Diamond.prototype.collisionDetect = function() {
  for(var j = 0; j < diamonds.length; j++) {
    if(!(this === diamonds[j])) {
      var dx = this.x - diamonds[j].x;
      var dy = this.y - diamonds[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);
    }
  }
};
// define EvilCircle constructor, inheriting from Shape

function EvilCircle(x, y, exists) {
  Shape.call(this, x, y, 20, 20, exists);

  this.color = 'white';
  this.size = 10;
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;


// define EvilCircle draw method

EvilCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 3;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
};

// define EvilCircle checkBounds method

EvilCircle.prototype.checkBounds = function() {
  if((this.x + this.size) >= width) {
    this.x -= this.size;
  }

  if((this.x - this.size) <= 0) {
    this.x += this.size;
  }

  if((this.y + this.size) >= height) {
    this.y -= this.size;
  }

  if((this.y - this.size) <= 0) {
    this.y += this.size;
  }
};

// define EvilCircle setControls method
EvilCircle.prototype.setControls = function() {
  var _this = this;
  window.onkeydown = function(e) {
    if(e.keyCode === 65) { // a
      _this.x -= _this.velX;
    } else if(e.keyCode === 68) { // d
      _this.x += _this.velX;
    } else if(e.keyCode === 87) { // w
      _this.y -= _this.velY;
    } else if(e.keyCode === 83) { // s
      _this.y += _this.velY;
    }
  };
};

// define EvilCircle collision detection

EvilCircle.prototype.collisionDetect = function() {
  for(var j = 0; j < balls.length; j++) {
    if( balls[j].exists ) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists = false;
        if(evil.color == "red"){
          YouLost();
        }
        else
        {
          evil.color = "red";
        }
      }
    }
  }
  for(var j = 0; j < diamonds.length; j++) {
    if(diamonds[j].exists ) {
      var dx = this.x - diamonds[j].x;
      var dy = this.y - diamonds[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + diamonds[j].size) {
        diamonds[j].exists = false;
        evil.color = "White";
        count++;
        para.textContent = 'Stig: ' + count;
      }
    }
    if (count == 10)
    {
      YouWon();
    }
  }
};

function YouLost(){
  ctx.fillStyle = "Red";
  ctx.fillRect(0,0,width,height);
  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle = "Gray";
  ctx.textAlign = "center";
  ctx.fillText("WASTED!!!", canvas.width/2, canvas.height/2); 
  ctx.delete();
}
function YouWon(){
  ctx.fillStyle = "Black";
  ctx.fillRect(0,0,width,height);
  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle = "Orange";
  ctx.textAlign = "center";
  ctx.fillText("Winner Winner chicken dinner!", canvas.width/2, canvas.height/2); 
  ctx.delete()
}


// define arrayto store balls

var balls = [];
var diamonds = [];

// define loop that keeps drawing the scene constantly
var evil = new EvilCircle(random(0,width), random(0,height), true);
evil.setControls();

function loop() {
  ctx.fillRect(0,0,width,height);
  ctx.drawImage(background, 0, 0);

  while(diamonds.length < 10){
    var size = random(20, 30);
    var diamond = new Diamond(
      random(0 + size,width - size),
      random(0 + size,height - size), 
      45,
      60,
      true,
      size
    );
    diamonds.push(diamond);
  }
  while(balls.length < 10) {
    var size = random(10,20);
    var ball = new Ball(
      // ball position always drawn at least one ball width
      // away from the adge of the canvas, to avoid drawing errors
      random(0 + size,width - size),
      random(0 + size,height - size),
      random(-7,7),
      random(-7,7),
      true,
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      size
    );
    balls.push(ball);
  }

  for(var i = 0; i < balls.length; i++) {
    if(balls[i].exists) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  }
  for(var i = 0; i < diamonds.length; i++) {
    if(diamonds[i].exists) {
      diamonds[i].draw();
      diamonds[i].collisionDetect();
    }
  }
  if(evil.exists){
    evil.draw();
    evil.checkBounds();
    evil.collisionDetect();
  }
  requestAnimationFrame(loop);
}



loop();