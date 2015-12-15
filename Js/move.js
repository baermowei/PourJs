	window.onload=function(){
	var oUl=document.getElementById("nav_ul");
	var aa=oUl.getElementsByTagName('a');
	var oLi=document.getElementById('move_li');
	for (var i = 0; i < aa.length; i++) {

		aa[i].onmouseover=function(){
			oLi_Move(oLi,this.offsetLeft);
			this.style.color='#111';
		}
		aa[i].onmouseout=function(){
			this.style.color='#777';
		}
	}

	}
		
var ispeed=0;


		function oLi_Move(obj,itarget){

			clearInterval(obj.timer)
			obj.timer=setInterval(function(){
				ispeed+=(itarget-obj.offsetLeft)/5;
				ispeed*=0.7;

				if (Math.abs(ispeed)<1 && Math.abs(itarget-obj.offsetLeft)<1) {
					clearInterval(obj.timer);
					obj.offsetLeft=itarget;//这个是为了关闭定时器时候有一个像素的误差的
				} 
					else {
					obj.style.left=obj.offsetLeft+ispeed+"px";
				}
				
			},30)

		}