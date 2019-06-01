var GameArea;
var myCanon;
var myBullets=[];
var myRocks=[];
var myScore;
var total;
var interval;
var myButton;
var pause=false;
var rate;
sessionStorage.setItem("Highscore",0);


function startGame()
{	
	GameArea.start();
	myRocks=[];
	rate=500;
	total=0;
	pause=false;
	
}

GameArea=
{
	canvas : document.createElement("canvas"),
	
	start: function()
	{
		
		this.canvas.width=480;
		this.canvas.height=720;
		this.context=this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);

		myCanon = new Canon(180,650,100,30, "red" );
		myScore=new Score(370,20);
		myButton= new Button(0,700,60,700,415,700);
		
		this.frameNo=0;
		interval=setInterval(updateGameArea,20);
		
				
		window.addEventListener("keydown",function(e){
			GameArea.keys = (GameArea.keys || []);
			GameArea.keys[e.keyCode] = true;
		})	;
		window.addEventListener("keyup",function(e){
			GameArea.keys[e.keyCode] = false;
		}) ;
		
		this.canvas.addEventListener("click" , function(event){
		if(event.x < myButton.x1 + 50 && event.x > myButton.x1 && 
		    event.y < myButton.y1 && event.y > myButton.y1 - 50)
		   pauseGame();
		
		else if(event.x < myButton.x2 + 50 && event.x > myButton.x2 && 
		    event.y < myButton.y2 + 20 && event.y > myButton.y2 - 20)
		   resumeGame();   
		   
		else if(event.x < myButton.x3 + 50 && event.x > myButton.x3 && 
		           event.y < myButton.y3 + 20  && event.y > myButton.y3 - 20)
		          restartGame();
		});
		
	},
	
	clear: function()
	{
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	},
	
	 resume: function()
	 {
		 interval=setInterval(updateGameArea,20);
	 },
	
	stop: function()
	{
		clearInterval(interval);
	}
}

function Canon(x,y,width,height,color)	
{
	this.x=x;
	this.y=y;
	this.speedX=0;
	this.height=height;
	this.width=width;
	this.color=color;
	
	this.update=function()
	{
		ctx=GameArea.context;
		ctx.fillStyle=this.color;
		ctx.fillRect(this.x,this.y,this.width,this.height);
		
		ctx.fillStyle="green";
		ctx.beginPath();
		ctx.moveTo(0,680);
		ctx.lineTo(GameArea.canvas.width,680);
		ctx.lineTo(GameArea.canvas.width,720);
		ctx.lineTo(0,720);
		ctx.fill();
		
	}
	
	this.newPos=function()
	{
		if(this.speedX>0)
		{
		if(this.x + this.width < GameArea.canvas.width)
		this.x += this.speedX;
		}
		
		else if(this.speedX<0)
		{
			if(this.x>0)
				this.x+=this.speedX;
		}
		
	}
	
	this.crashWith=function(object)
	{
		var crash=false;
		
		if (object.x < this.x + this.width + object.radius/1.4 && object.x > this.x - object.radius/1.4 &&
		   object.y < this.y + this.height + object.radius/1.4 && object.y > this.y - object.radius/1.4)
		   
		   crash=true;
		   
		   return crash;
	}
	
}

function Bullets(x,y,speedY,radius,color)
{
	this.x=x;
	this.y=y;
	this.speedY=speedY;
	this.radius=radius;
	this.color=color;
	this.status=1;
	
	this.update=function()
	{
		ctx=GameArea.context;
		ctx.fillStyle=color;
		ctx.beginPath();
		ctx.arc(this.x,this.y, this.radius, 0, Math.PI*2, true);
		ctx.fill();
			
	}
	
	this.newPos=function()
	{
		this.y+=this.speedY;
	}
}


function Rocks(x,y,speedX,speedY,radius,color)
{
	this.x=x;
	this.y=y;
	this.speedX=speedX;
	this.speedY=speedY;
	this.radius=radius;
	this.color=color;
	this.status=1;
	
	this.update=function()
	{
		text=(this.radius-19) *2;
		ctx=GameArea.context;
		ctx.fillStyle=color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius,0, Math.PI*2, true);
		ctx.fill();
		
		ctx.fillStyle="#00FFEC"
		ctx.font= this.radius+"px Arial";
		if(text>=10)
			ctx.fillText(text,this.x-this.radius/2,this.y+this.radius/2);
		else
			ctx.fillText(text,this.x-this.radius/4,this.y+this.radius/2);
		
	}
	
	this.newPos=function()
	{	
	    
		if(this.y >= 680-this.radius) {this.speedY = -1*this.speedY;}
		
		else this.speedY+=0.2;
		
		if(this.x > 480) {this.speedX = -1*this.speedX;}
		if(this.x < 0-this.radius) {this.speedX = -1*this.speedX;}
		
		
		this.x+=this.speedX;
		this.y+=this.speedY;
	}
	
	this.crashWith=function(object)
	{
		var diffx = object.x - this.x;
		var diffy = object.y - this.y;
		var sqdist;
		var dist;
		var crash=false;
		
		sqdist = (diffx * diffx) + (diffy * diffy);
		dist = Math.sqrt(sqdist);
		
		if(dist <= object.radius + this.radius)
			crash=true;
		
		return crash;
	}
	
	this.strike=function(object)
	{
		object.status=0;
		
		this.radius-=0.5;
		if(this.radius<20)
			this.status=0;
			
	}
}

function Score(x,y)
{
	this.x=x;
	this.y=y;
	
	this.update=function()
	{
		ctx=GameArea.context;
		ctx.fillStyle="black";
		 ctx.font = "20px Trebuchet MS";
		ctx.fillText(this.text1, this.x, this.y);
		ctx.fillText(this.text2,this.x,this.y+20);
	}
}

function Button(x1,y1,x2,y2,x3,y3)
{
	
	this.x1=x1;
	this.x2=x2;
	this.x3=x3;
	this.y1=y1;
	this.y2=y2;
	this.y3=y3;
	
	this.update=function()
	{
	ctx=GameArea.context;

	
	ctx.fillStyle="white";
	ctx.font = "20px Trebuchet MS";
	ctx.fillText("Pause",this.x1,this.y1);
	
    ctx.fillStyle="white";
	ctx.font = "20px Trebuchet MS";
	ctx.fillText("Resume",this.x2,this.y2);
	
	ctx.fillStyle="white";
	ctx.font = "20px Trebuchet MS";
	ctx.fillText("Restart",this.x3,this.y3);
	
	}
}

function updateGameArea()
{
	//crash
	for(var i=0 ; i<myRocks.length; i++)
	{
		if(myRocks[i].status==1)
		{
		if(myCanon.crashWith(myRocks[i]))
		{
			GameArea.stop();
			
			if(total>sessionStorage.getItem("Highscore"))
				sessionStorage.setItem("Highscore",total);
			return;
		}
		}
	}
	
	for(var i=0 ; i<myRocks.length; i++)
	{
		for(var j=0;j<myBullets.length;j++)
		{
			if(myRocks[i].status==1 && myBullets[j].status==1)
			{
				if(myRocks[i].crashWith(myBullets[j]))
				{					
					myRocks[i].strike(myBullets[j]);
					total++;
				}
			}
		}
	}
	GameArea.clear();
	
	
	GameArea.frameNo+=1;
	
	//left right shoot
	myCanon.speedX=0;
		  if (GameArea.keys && GameArea.keys[37] == true) {goleft(); }
    if (GameArea.keys && GameArea.keys[39] == true) {goright(); } 
	
	if (GameArea.keys && GameArea.keys[32] == true && GameArea.frameNo%5==1) 
	{
		myBullets.push(new Bullets(myCanon.x + myCanon.width/2,myCanon.y,-10,10,"orange"));
	} 
	
	//new rocks
	if(GameArea.frameNo == 1 || GameArea.frameNo % rate==1)
	{
		var speed;
		var x1 = Math.floor( Math.random() * 2 ) * GameArea.canvas.width;
		var rad = 20 + Math.floor( Math.random() * 30 );
			if(x1==0)
				speed=2;
			else
				speed=-2;
		myRocks.push(new Rocks(x1,300,speed,2,rad,"blue"));
		
		if(rate>200)
		rate-=30;
		
	}

	//update all
	
	for(i=0 ; i<myRocks.length ; i++)
	{
		if(myRocks[i].status==1)
		{
		myRocks[i].newPos();
		myRocks[i].update();
		}
	}
	
	for(j=0 ; j<myBullets.length ; j++)
	{
		if(myBullets[j].status==1)
		{
		myBullets[j].newPos();
		myBullets[j].update();
		}
	}
	
	myScore.text1 = "SCORE: " + total ;
	myScore.text2 = "HIGH  : " + sessionStorage.getItem("Highscore");
	myScore.update();
	
	myCanon.newPos();
	myCanon.update();
	
	myButton.update();
	

	

}

function goleft()
{
	myCanon.speedX=-10;
}

function goright()
{
	myCanon.speedX=+10;
}

 function restartGame()
 {	
 	 pause=false;
	 GameArea.stop();
	
	 GameArea.clear();

	 startGame();
 }
 
 function pauseGame()
 {
	 
	 if (!pause)
	 {
		  pause=true;
		  
		  
	 GameArea.stop();
		return;
	 }
 }

function resumeGame()
{ 
	 if(pause)
	 {    pause=false;

		  GameArea.resume();
		  return;
		 
	 }
 
 }
 