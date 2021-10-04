
$(function(){

    var started = false;
    var time = 0;

    $("#reset").click(function(){
        deleteDisplay()
        calcTime()
    })

    $("#start").click(function(){
        if(started === false){
        timer();
        started = true;
        }
    })

    function vib() { 
        if(navigator){
            navigator.vibrate(1000);
        }
    }


    function calcTime() {  
        let minutes = Math.floor(time / 60);
        var seconds = Math.floor(time % 60);

        if(String(minutes).length<2){
            minutes = "0" + minutes;
        }
        if(String(seconds).length<2){
            seconds = "0" + seconds;
        }

        $("#text-minutes").html(minutes)
        $("#text-second").html(seconds)
    }

    calcTime();


    function timer() {
        
        let minutes = Math.abs(parseInt($("#input-minutes").val()));
        let second =  Math.abs(parseInt($("#input-second").val()));

        if($("input").length > 0 && typeof(minutes) ==='number' || typeof(second) === "number"){
            
            if(!isNaN(minutes) && !isNaN(second)){
                time = minutes * 60 + second ;
            }else if(!isNaN(minutes) && isNaN(second)){
                time = minutes * 60;
            }else if(isNaN(minutes) && !isNaN(second)){
                time = second ;
            }else{
                time = 0
            }

            //$("#audio")[0].play();
            $("#input-minutes").remove();
            $("#input-second").remove();
            
            if(time>0){
                if(time > 5999){
                    time = 5999
                }
                calcTime()
            }
        }
        if(time > 0){
            --time ; 
            let x = setInterval(function(){
                if(started){
                    calcTime();
                    --time;

                    if(time<0){
                        vib();
                        $("#audio")[0].play();
                        time = 0
                        started = false
                        clearInterval(x);
                    }
                } else{
                    clearInterval(x);
                }
            }, 1000)
        }
    }

  
    
    function deleteDisplay() {  
        time = 0 ;
        started = false ;
    }   



})




