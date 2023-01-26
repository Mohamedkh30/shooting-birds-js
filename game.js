const birds=[ {speed:10,imgPath:`./imgs/bird1.gif`,width:"100px",height:"120px",score:5}
            ,{speed:12,imgPath:`./imgs/bird2.gif`,width:"120px",height:"110px",score:10}
            ,{speed:8,imgPath:`./imgs/bird3.gif`,width:"150px",height:"210px",score:-10}];

let score=0;
let birdCount=0;



const spawnBird = function(){
    let birdProperties= birds[Math.floor(Math.random()*3)];                         //select a bird randomly

    let birdObject=document.createElement("img");                                   //creating the bird and setting its properties
    birdObject.classList.add("bird");
    birdObject.style.position="absolute";
    birdObject.style.top=Math.round(Math.random()*(window.innerHeight-parseInt(birdProperties.height)-57)+57)+"px";     //setting the a random suitable y 
    birdObject.style.left=-1*parseInt(birdProperties.width)+"px";                   //hiding the bird on the left on spawn
    birdObject.style.width=birdProperties.width;
    birdObject.src=birdProperties.imgPath;
    birdObject.draggable=false;
    birdObject.style.cursor="crosshair";
    birdObject.setAttribute("bird-score",birdProperties.score);                     //saving bird score to html attribute
//----------------moving--------------------------------
    document.querySelector("body").append(birdObject);
    let distance=-1*parseInt(birdProperties.width);                                 //setting the starting position out of the inner window                                            
    let timerId=setInterval(function(){                                             //bird moving function
        if(distance>window.innerWidth){                                             //remove bird when out of window    
            birdObject.remove();
            clearInterval(timerId);
        }else{
            distance+=birdProperties.speed;                                         //move bird by its speed
            birdObject.style.left=distance+"px";
        }
    },30);
//----------------onclick-------------------------------
    birdObject.onclick=function(event){                                             
        birdObject.style.visibility="hidden";                                       //hide bird (the bird is hidden not removed to decrease the number of operations done on DOM)
        score+=birdProperties.score;                                                //add bird score
        birdCount++;                                                                //add bird count
        document.querySelector("#nav-count-section").innerText=birdCount;           //display bird score
        document.querySelector("#nav-score-section").innerText=score;               //display bird count
        //console.log();
        fallingFeathers(event.clientX,event.clientY);                               //play animation
    }
};
//=========================================================================================================
const spawnBomb=function(){
    let bombObject=document.createElement("img");                                   //creating the bomb and setting its properties
    bombObject.src=`./imgs/bomb.gif`;
    bombObject.draggable=false;
    bombObject.style.position="absolute";
    bombObject.style.width="80px";
    bombObject.style.cursor="crosshair";
    bombObject.style.left=Math.round(Math.random()*(window.innerWidth-parseInt(bombObject.style.width)))+"px";  //setting the a random suitable x
    bombObject.style.top=-1*parseInt(bombObject.height)+"px";
    document.querySelector("body").append(bombObject);
//----------------moving--------------------------------
    let distance=-1*parseInt(bombObject.height);                                    //setting the starting position out of the inner window  
    let timerId=setInterval(function(){                                             //bomb falling function
        if(distance>window.innerHeight){                                            //remove bomb when out of window    
            bombObject.remove();
            clearInterval(timerId);
        }else{                                                 
            distance+=5;                                                            //move bomb by its speed
            bombObject.style.top=distance+"px";
        }
    },30);
//----------------onclick-------------------------------
    bombObject.onclick=function(){
        let range=500                                                               //set bomb range
        let bombX=parseInt(bombObject.style.left)+parseInt(bombObject.width);       //get & transform bomb x to its center
        let bombY=parseInt(bombObject.style.top)+parseInt(bombObject.height);       //get & transform bomb y to its center

        let detectedBirds=document.querySelectorAll(".bird");                       //select all birds
        detectedBirds.forEach(bird => {                                             //loop on each bird
            let birdX=parseInt(bird.style.left)+parseInt(bird.width);               //get & transform bird x to its center
            let birdY=parseInt(bird.style.top)+parseInt(bird.height);               //get & transform bird y to its center

            let distance = Math.sqrt(Math.pow((bombX-birdX),2)+Math.pow((bombY-birdY),2));  //calculate the distance between the bomb & the bird
            
            if(distance<range){                                                     //if the bird in range
                score+=parseInt(bird.getAttribute("bird-score"));                   //get and add the bird score 
                birdCount++;                                                        
                document.querySelector("#nav-count-section").innerText=birdCount;   //display to the user
                document.querySelector("#nav-score-section").innerText=score;
                bird.style.visibility="hidden";                                     //hide the bird untill it's removed                                                    
                
            }
        });
        createExplosion(range,bombX,bombY);                                         //explotion antimation
        bombObject.style.visibility="hidden";                                       //hide the bomb untill it's removed  
    }
};
//=========================================================================================================
const createExplosion=function(range,bombX,bombY){                                  //bomb click animation
    let explotion=document.createElement("img");                                    //creating the bomb animation and setting its properties
    explotion.src=`./imgs/explotion.gif`;
    explotion.style.position="absolute";
    explotion.style.width=explotion.style.height=range+"px";
    explotion.style.top=(bombY-range/2)+"px";
    explotion.style.left=(bombX-range/2)+"px";
    document.querySelector("body").append(explotion);
    let animationTimerId=setTimeout(function(){                                     //period of the animation
        document.querySelector(`img[src="./imgs/explotion.gif"]`).remove();
        clearTimeout(animationTimerId);
    },1000);
    let audio = new Audio(`./audio/boom.mp3`);                                      //play shooting sound
    audio.volume = 0.1;
    audio.play();
    
}
//=========================================================================================================
const fallingFeathers=function(birdX,birdY){                                        //bird click animation
    let feathers=document.createElement("img");                                     //creating the feathers animation and setting its properties
    feathers.src=`./imgs/feathers.gif`;
    feathers.style.position="absolute";
    feathers.style.width=100+"px";
    feathers.style.top=(birdY)+"px";
    feathers.style.left=(birdX)+"px";
    document.querySelector("body").append(feathers);
    let animationTimerId=setTimeout(function(){                                     //period of the animation
        document.querySelector(`img[src="./imgs/feathers.gif"]`).remove();
        clearTimeout(animationTimerId);
    },1000);
    let audio = new Audio(`./audio/shotgun.mp3`);                                   //play bomb sound
    audio.volume = 0.1;     
    audio.play();
}
//=========================================================================================================
const winPopUp= function(){                                                         //pop UPs
    document.querySelector("#pop-up").style.visibility="visible";                   //make the starting pop up visible
    document.querySelector("#pop-up").outerHTML=`
    <div id="pop-up">
            <div>
                <img src="./imgs/won.png" alt="">
                <span>You Won! play again?</span>
                <button>yes</button>
                <button>no</button>
            </div>
    </div>`;                                                                        //overriting the starting pop up
    document.querySelector("#pop-up > div > button").onclick=function(){            //reloading the page on playing again
        location.reload();
    }
    document.querySelector("#pop-up > div > button:last-child").onclick=function(){ //going to the main if not
        location.href="./index.html";
    }
}
//-----------------------------------------------
const losePopUp= function(){
    document.querySelector("#pop-up").style.visibility="visible";
    document.querySelector("#pop-up").outerHTML=`
    <div id="pop-up">
            <div>
                <img src="./imgs/lost.gif" alt="">
                <span>You lost! 
                (score more than 50 to win) ,play again?</span>
                <button>yes</button>
                <button>no</button>
            </div>
    </div>`;
    document.querySelector("#pop-up > div > button").onclick=function(){
        location.reload();
    }
    document.querySelector("#pop-up > div > button:last-child").onclick=function(){
        location.href="./index.html";
    }
}
//=========================================================================================================
window.addEventListener("load",function(){
    this.document.querySelector("#pop-up > div > button").onclick=function(){   //if the player started the game (pressed yes)

        document.querySelector("#pop-up").style.visibility="hidden";            //hide the starting pop up

        let Name=location.href.split("=")[1].replace("+"," ");                  //replace + in the player name (due to url) with space
        document.querySelector("#nav-name-section").innerText=Name;             //display player name

        let bombSpawnerId=setInterval(function(){                               //spawn a bomb every 5sec
            spawnBomb();
        },5000);

        
        let birdSpawnerId=setInterval(function(){                               //spawn a bire every 0.5sec
            spawnBird();
        },500);

        let remainingTime=60;                                                   //setting the level timer to 60sec
        let timeCounter = setInterval(function(){                               //countdown
            remainingTime--;
            document.querySelector("#nav-time-section").innerText=remainingTime;//update time to player
        },1000);

        let levelTimerId=setTimeout(function(){                                 //on timer
            localStorage.setItem("Name",Name);                                  //store player data on localstorage to be displayed
            localStorage.setItem("Score",score);
            localStorage.setItem("birdCount",birdCount);
            
            clearInterval(birdSpawnerId);                                       //clear all intervals
            clearInterval(bombSpawnerId);
            clearInterval(timeCounter);
            clearTimeout (levelTimerId);
            
            if(score>50){                                                       //check the win condition
                winPopUp();
            }else{
                losePopUp();
            }
        },60000);

    }
    document.querySelector("#pop-up > div > button:last-child").onclick=function(){
        location.href="./index.html";                                           //if the player ended the game (pressed no)
    }
});