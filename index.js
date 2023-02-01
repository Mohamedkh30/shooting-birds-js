window.addEventListener("load",function(){
    
    let Name=localStorage.getItem("Name");                                              //get player data from
    let score=localStorage.getItem("Score");
    let birdCount=localStorage.getItem("birdCount");
    console.log(Name)
    if (Name=="undefined"||Name==null){                                                 //if no data found
        this.document.querySelector("#last-score-div").style.visibility="hidden";       //hide the scores div
        
    }else{
        this.document.querySelector("#last-score-div").style.visibility="visible";      //else display data
        this.document.querySelector("#last-score-name-section").innerText=Name;
        this.document.querySelector("#last-score-score-section").innerText=score;
        this.document.querySelector("#last-score-count-section").innerText=birdCount;
    }
});
