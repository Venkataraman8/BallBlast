var GameArea;
var myCanon;
var myBullets=[];
var myRocks=[];
var myScore;
var total;
var interval;
var myButton;
var pause=false;
var bulletframe;
var power;
var keycode;
var keycode1;
var keycode2;
 var highscores;
 var oldscores;
 var mySound1;
 var mySound2;
 var mySound3;
localStorage.setItem("Highscore",0);




function startScreen()
{
	 document.getElementById("scorecard").style.display="none";
	 
	var canvas=document.getElementById("canvas");
	var context=canvas.getContext("2d");
	context.clearRect(0,0,canvas.width,canvas.height);
	image=document.getElementById("back");
		context.drawImage(image,0,0,canvas.width,canvas.height);
	
	context.font="70px Trebuchet MS";
	context.fillStyle="red";
	context.fillText("Ball Blast",100,200);
	
	context.font="40px Arial";
	context.fillStyle="black";
	context.fillText("1.Play",150,380);
	context.fillText("2.Instructions",150,430);
	
	context.fillStyle="green";
		context.beginPath();
		context.moveTo(0,680);
		context.lineTo(canvas.width,680);
		context.lineTo(canvas.width,720);
		context.lineTo(0,720);
		context.fill();
	keycode=0;
	
	document.addEventListener("keydown",options);
	
	function options(e)
	{
		keycode=e.keyCode;
		if(keycode==98 || keycode==50)
		{instructions();
	document.removeEventListener("keydown",options);
		}
		else if (keycode==97 || keycode==49)
		{	
	document.getElementById("scorecard").style.display="block";
	startGame();
	document.removeEventListener("keydown",options);
		}
		keycode=0;
		
	}
	
}

function instructions()
{
	context=canvas.getContext("2d");
	context.clearRect(0,0,canvas.width,canvas.height);
	image=document.getElementById("back");
		context.drawImage(image,0,0,canvas.width,canvas.height);
	
	context.fillStyle="red";
	context.font="50px Trebuchet MS";
	context.fillText("INSTRUCTIONS",90,200);
	
	context.fillStyle="DarkBlue";
	context.font="20px Verdana";
	context.fillText("> Left and Right Arrow keys to move",80,400);
	
	
	context.fillStyle="DarkBlue";
	context.font="20px Verdana";
	context.fillText("> Space to shoot",80,450);
	
	context.fillStyle="DarkBlue";
	context.font="20px Verdana";
	context.fillText("'Shoot down the rocks and protect your canon' ",4,500);
	
	context.fillStyle="black";
	context.font="20px Arial";
	context.fillText("Press B to go back ",310,600);
	
	context.fillStyle="green";
		context.beginPath();
		context.moveTo(0,680);
		context.lineTo(canvas.width,680);
		context.lineTo(canvas.width,720);
		context.lineTo(0,720);
		context.fill();
	
	document.addEventListener("keydown",back);
	
	 keycode1=0;
	function back(e)
	{
		keycode=e.keyCode;
		if(keycode==66)
		{startScreen();
	document.removeEventListener("keydown",back);
		}
		keycode=0;
		
	}
	
	
}


function startGame()
{	
		mySound1=new Sound("Assets/rock1.mp3");
		mySound2=new Sound("Assets/canon.mp3");
		mySound3=new Sound("Assets/bullet.mp3");
	context=canvas.getContext("2d");
	context.clearRect(0,0,canvas.width,canvas.height);
	image=document.getElementById("back");
		context.drawImage(image,0,0,canvas.width,canvas.height);
	GameArea.start();
	myBullets=[];
	myRocks=[];
	rate=1000;
	total=0;
	bulletframe=5;
	power=1;
	pause=false;
	
}

GameArea=
{
	
	
	start: function()
	{
		

		context=canvas.getContext("2d");
	/*context.clearRect(0,0,canvas.width,canvas.height);
	image=document.getElementById("back");
		context.drawImage(image,0,0,canvas.width,canvas.height);*/

		myCanon = new Canon(190,590,80,100,);
		myScore=new Score(370,20);
		
		myButton= new Button(0,700,60,700,415,700);
		myHighScore=new highscore();
		myHighScore.initialize();
		
		this.frameNo=0;
		interval=requestAnimationFrame(updateGameArea);
		
		
				
		window.addEventListener("keydown",function(e){
			GameArea.keys = (GameArea.keys || []);
			GameArea.keys[e.keyCode] = true;
		})	;
		window.addEventListener("keyup",function(e){
			GameArea.keys[e.keyCode] = false;
		}) ;
		
		canvas.addEventListener("click" , function(event){
		if(event.x < myButton.x1 + 50 && event.x > myButton.x1 && 
		    event.y < myButton.y1 + 50 && event.y > myButton.y1 - 50)
		   pauseGame();
		
		else if(event.x < myButton.x2 + 50 && event.x > myButton.x2 && 
		    event.y < myButton.y2 + 50 && event.y > myButton.y2 - 50)
		   resumeGame();   
		   
		else if(event.x < myButton.x3 + 50 && event.x > myButton.x3 && 
		           event.y < myButton.y3 +50  && event.y > myButton.y3 - 50)
		          restartGame();
		});
		
	},
	
	clear: function()
	{
		context.clearRect(0,0,canvas.width,canvas.height);
	},
	
	 resume: function()
	 {
		 interval=requestAnimationFrame(updateGameArea);
	 },
	
	stop: function()
	{
		cancelAnimationFrame(interval);
	}
}

function Canon(x,y,width,height)	
{
	this.x=x;
	this.y=y;
	this.speedX=0;
	this.height=height;
	this.width=width;
	this.status=1;
	
	
	this.update=function()
	{ 
	context=context;
	
	
		if(this.status==1)
		{
		image=document.getElementById("canon");
		context.drawImage(image,this.x,this.y,this.width,this.height);
		}
		else
		{
		image=document.getElementById("redcanon");
		context.drawImage(image,this.x,this.y,this.width,this.height);
		}
			
		
		context.fillStyle="green";
		context.beginPath();
		context.moveTo(0,680);
		context.lineTo(canvas.width,680);
		context.lineTo(canvas.width,720);
		context.lineTo(0,720);
		context.fill();
		
	}
	
	this.newPos=function()
	{
		if(this.speedX>0)
		{
		if(this.x + this.width < canvas.width+1)
		this.x += this.speedX;
		}
		
		else if(this.speedX<0)
		{
			if(this.x>-1)
				this.x+=this.speedX;
		}
		
	}
	
	this.crashWith=function(object)
	{
		var crash=false;
		
		if (object.x < this.x + this.width + object.radius/1.4 && object.x > this.x - object.radius/1.4 &&
		   object.y < this.y + this.height + object.radius/1.4 && object.y > this.y - object.radius/1.4 + 50)
		   
		   crash=true;
		   
		   return crash;
	}
	
}

function Bullets(x,y,speedY,radius)
{
	this.x=x;
	this.y=y;
	this.speedY=speedY;
	this.radius=radius;
	
	this.status=1;
	
	this.update=function()
	{
		context=context;
		image=document.getElementById("bullet");
		context.drawImage(image,this.x,this.y,this.radius*5,this.radius*5);
			
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
	this.strength=Math.floor(radius);
	
	this.update=function()
	{
		
		text=(this.strength>0) ? this.strength : 0;
		context=context;
		context.fillStyle=color;
		context.beginPath();
		context.arc(this.x, this.y, this.radius,0, Math.PI*2, true);
		context.fill();
		
		context.strokeStyle="black";
		context.lineWidth=this.radius/8;
		context.beginPath();
		context.arc(this.x, this.y, this.radius+1,0, Math.PI*2, true);
		context.stroke();
		
		
		context.fillStyle="#00FFDC"
		context.font= this.radius+"px Arial";
		

		if(text>=10)
			context.fillText(text,this.x-this.radius/2,this.y+this.radius/2);
		else
			context.fillText(text,this.x-this.radius/4,this.y+this.radius/2);
		
	}
	
	this.newPos=function()
	{	
	    
		if(this.y >= 680-this.radius) {this.speedY = -1*this.speedY;}
		
		else this.speedY+=0.5;
		
		if(this.x > 480) {this.speedX = -Math.abs(this.speedX);}
		if(this.x < 0-this.radius) {this.speedX = Math.abs(this.speedX);}
		
		
		this.x+=this.speedX;
		this.y+=this.speedY;
	}
	
	this.crashWith=function(object)
	{
		var crash=false;
		/* //circular bullet
		var diffx = object.x - this.x;
		var diffy = object.y - this.y;
		var sqdist;
		var dist;
		
		
		sqdist = (diffx * diffx) + (diffy * diffy);
		dist = Math.sqrt(sqdist);
		
		if(dist <= object.radius + this.radius)
			crash=true;
		
		return crash;
		*/
		
		//image bullet
		
		if((object.x < this.x + this.radius/2) && ( object.x >this.x - this.radius/2 - object.radius*5 ) &&
			(object.y < this.y + this.radius/2) && ( object.y >this.y -this.radius ))
			crash=true;
			
			return crash;
		
		
		
	}
	
	this.strike=function(object)
	{
		
		object.status=0;
		this.y-=5;
		if(object.x<this.x  && this.x<480)
			this.x+=5;
		else if(object.x>this.x && this.x>0-this.radius)
			this.x-=5;
		
		this.strength-=power;
		
		if(this.strength<=0)
		{
			this.status=0;
			mySound1.stop();
			mySound1.play();
			if(this.radius>40)
			{
			myRocks.push(new Rocks(this.x+10,(this.y>0)?this.y:0,+1,-5,this.radius/2,"blue"));
			myRocks.push(new Rocks(this.x-10,(this.y>0)?this.y:0,-1,-5,this.radius/2,"blue"));
			}	
		}
	}
}

function Score(x,y)
{
	this.x=x;
	this.y=y;
	
	this.update=function()
	{
		context=context;
		context.fillStyle="black";
		 context.font = "20px Trebuchet MS";
		context.fillText(this.text1, this.x, this.y);
		context.fillText(this.text2,this.x,this.y+20);
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
	

	
	context.fillStyle="white";
	context.font = "20px Trebuchet MS";
	context.fillText("Pause",this.x1,this.y1);
	
    context.fillStyle="white";
	context.font = "20px Trebuchet MS";
	context.fillText("Resume",this.x2,this.y2);
	
	context.fillStyle="white";
	context.font = "20px Trebuchet MS";
	context.fillText("Replay",this.x3,this.y3);
	
	}
}

function updateGameArea()
{
	
	
	//crash
	for(var i=0 ; i<myRocks.length; i++)
	{
		
		if(myCanon.status==0)
			{
			GameArea.stop();
			
			if(total>localStorage.getItem("Highscore"))
				localStorage.setItem("Highscore",total);
			myHighScore.trial();
			gameover();
			return;
			}
		
		if(myRocks[i].status==1)
		{
		if(myCanon.crashWith(myRocks[i]))
		{
			
			myCanon.status=0;
			mySound2.play();
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
	context.clearRect(0,0,canvas.width,canvas.height);
	image=document.getElementById("back");
		context.drawImage(image,0,0,canvas.width,canvas.height);
	
	
	GameArea.frameNo+=1;
	myHighScore.update(total);
	power=Math.floor(total/200)+1;
	
	if(bulletframe>2)
	bulletframe= 5 - Math.floor(total/100);
	//left right shoot
	myCanon.speedX=0;
		  if (GameArea.keys && GameArea.keys[37] == true) {goleft(); }
    if (GameArea.keys && GameArea.keys[39] == true) {goright(); } 
	
	if (GameArea.keys && GameArea.keys[32] == true && GameArea.frameNo%bulletframe==1) 
	{
		mySound3.stop();
		mySound3.play();
		myBullets.push(new Bullets(myCanon.x ,myCanon.y,-20,15));
	} 
	
	//new rocks
	if(GameArea.frameNo == 1 || GameArea.frameNo % rate==1)
	{
		var speed;
		var x1 = Math.floor( Math.random() * 1.9 ) * canvas.width;
		var rad = 40 + Math.floor( Math.random() * 30 );
			if(x1==0)
				speed=2;
			else
				speed=-2;
		myRocks.push(new Rocks(x1,300,speed,0,rad,"blue"));
		
		if(rate>200)
		rate-=20;
		
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
	myScore.text2 = "HIGH  : " + localStorage.getItem("Highscore");
	myScore.update();
	
	myCanon.newPos();
	myCanon.update();
	
	myButton.update();
	

	interval=requestAnimationFrame(updateGameArea);

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
	
	 myHighScore.trial();
 	 pause=false;
	 mySound1.stop();
     mySound2.stop();
	 mySound3.stop();
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
 
 
 function gameover()
 {
	 context=canvas.getContext("2d");
	 //context.clearRect(0,0,canvas.width,canvas.height);
	 
	 
	 context.font="50px Trebuchet MS";
	 context.fillStyle="red";
	 context.fillText("Game Over", 120,200);
	 
	 context.font="20px Trebuchet MS";
	 context.fillStyle="DarkRed";
	 context.fillText("Score : "+total, 160,250);
	 
	 context.font="20px Arial";
	 context.fillStyle="black";
	 context.fillText("Press R to restart", 150,300);
	 
	 document.addEventListener("keydown",rerun);
	 
	 keycode2=0;
	 
	 function rerun(e)
	 {
		 keycode2=e.keyCode;
		 
		 if(keycode2==82)
		 {
			 mySound1.stop();
			 mySound2.stop();
			 mySound3.stop();
			 startScreen();
			 document.removeEventListener("keydown",rerun);
		 }
		 keycode2=0;
		 
	 }
	 
 }
 
 function highscore( )
 {
	this.initialize=function()
	 {
		 oldscores= JSON.parse(localStorage.getItem("high1")) || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		 highscores=JSON.parse(localStorage.getItem("high1")) || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		 
		 
		 for(var i=0;i<10;i++)
		 {
			 document.getElementById("scorecard").rows[i+1].cells[1].innerHTML=oldscores[i];
		 }
	 }
	 
	 
	 this.update=function(score)
	 {
		 
	 pos=10;
	 	 var table=document.getElementById("scorecard");
		 
	 for( var i=0;i<=9;i++)
	 {
			if(score>oldscores[i])
			{
				pos=i;
				break;
				
			}
	 }
	 
	 if(pos!=10)
	 {
	 for( var j=pos+1;j<10;j++)
					{
						highscores[j]=oldscores[j-1];

					}
				
	highscores[pos]=score;
	 }
	 
	for( var i=0;i<10;i++)
	{
		document.getElementById("scorecard").rows[i+1].cells[1].innerHTML=highscores[i];
	}
	 }
	 
this.trial=function()
{
	
	localStorage.setItem("high1",JSON.stringify(highscores));
	 
 }
 }
 
 function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
	
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
		this.sound.currentTime=0;
    }    
}
