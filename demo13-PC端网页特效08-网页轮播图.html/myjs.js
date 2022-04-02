window.addEventListener('load',function(){
    focus = document.querySelector(".focus");
    arrowL = document.querySelector(".arrow-l");
    arrowR = document.querySelector('.arrow-r');
    pic = document.querySelector('.pic');
    spot = document.querySelector('.spot');
    var num = 0;
    var circle = 0;
    var timer;
    var flag = true;//节流阀
    focus.addEventListener("mouseenter",function(){
        arrowL.style.display = "block";
        arrowR.style.display = "block";
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener("mouseleave",function(){
        arrowL.style.display = "none";
        arrowR.style.display = "none";
        timer = setInterval(function(){
            arrowR.click();
        },1500);
    }); 
    for (var i = 0; i < pic.children.length; i++){
        var li = document.createElement("li");
        spot.appendChild(li);
        li.setAttribute("data-index",i);
        li.addEventListener("mouseover",function(){
            for (var i = 0; i < spot.children.length; i++){
                spot.children[i].className = "";
            }
            this.className = "current";
            var index = this.getAttribute("data-index");
            num = index;
            circle = index;
            animate(pic,-index*focus.offsetWidth); 
        });
    }
    spot.children[0].className = "current";

    var img = pic.children[0].cloneNode(true);
    pic.append(img);
    // var num = 0;移动到最前面
    // var circle = 0;移动到最前面
    arrowR.addEventListener("click",function(){ 
        if(flag){
            flag = true;
            if(num == pic.children.length-1){
                num = 0;
                pic.style.left = 0 + "px";
            }
            num++;
            animate(pic,-focus.offsetWidth*num,function(){
                flag = true;
            });
            circle++;
            if(circle == spot.children.length){
                circle = 0;
                spot.children[0].className = "current";
            }
            for(var i = 0; i < spot.children.length; i++){
                spot.children[i].className = "";
            }
            spot.children[circle].className = "current";
        }
    });

    arrowL.addEventListener("click",function(){ 
        if(flag){
            flag = false;
            if(num == 0){
                num = pic.children.length-1;
                pic.style.left = -num*focus.offsetWidth + "px";
            }
            num--;
            animate(pic,-focus.offsetWidth*num,function(){
                flag = true;
            });
            circle--;
            if(circle == -1){
                circle = spot.children.length-1;
            }
            for(var i = 0; i < spot.children.length; i++){
                spot.children[i].className = "";
            }
            spot.children[circle].className = "current";
        }
    });

    timer = setInterval(function(){
        arrowR.click();
    },1500);
    
});