	var zidong=null;
	var inow=0;
	window.onload=function(){
	
	var oUl=document.getElementById("nav_ul");
	var aa=oUl.getElementsByTagName('a');
	var oLi=document.getElementById('move_li');
	var obar=document.getElementById('bar');
	var obig_ul=document.getElementById('big_pic');
	var abig_li=obig_ul.getElementsByTagName('li');
	var osmall_ul=document.getElementById('samll_ul');
	var asmall_li=osmall_ul.getElementsByTagName('li');
	var bar_bg=['rgb(34,34,34)','#fff','#000','rgb(15,25,25)','rgb(25,25,25)'];

		for (var i = 0; i < aa.length; i++) {

				aa[i].onmouseover=function(){
					oLi_Move(oLi,this.offsetLeft);
					this.style.color='#111';
				}
				aa[i].onmouseout=function(){
					this.style.color='#777';
				}
			}

		
	for (var i = 0; i < asmall_li.length; i++) {
		asmall_li[i].index=i;
		asmall_li[i].onclick=function(){

				for (var j = 0; j < abig_li.length; j++) 
				{
				moveStart(abig_li[j],{"opacity":0})
				asmall_li[j].className='';
				}
			moveStart(abig_li[this.index],{"opacity":100});
			this.className='active';
			obar.style.backgroundColor=bar_bg[this.index];
		};
			
	};

	function autoMove(){
		
		if (inow==asmall_li.length-1) {
			inow=0;
		}
		else{
			inow++;
		}

		for (var i = 0; i < asmall_li.length; i++) {
			asmall_li[i].className='';
			moveStart(abig_li[i],{"opacity":0})
		}

		asmall_li[inow].className='active';
		moveStart(abig_li[inow],{"opacity":100});
		obar.style.backgroundColor=bar_bg[inow];

	}	 
			
		
 zidong=setInterval(autoMove,3000);	

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


function getByClass(Oparent,iName )
	{
		var oall=document.getElementsByTagName('*')
		var arr=[];
		for (var i = 0; i < oall.length; i++)
		 {
			if (oall[i].className==iName)
			 {
				arr.push(oall[i])
			}

		}
		return arr;
	}

		function getStyle(obj,attr) 
		{
					if (obj.currentStyle) 
					{
						return obj.currentStyle[attr];
					} else {
						return getComputedStyle(obj,false)[attr];
					}
		}



		function moveStart(obj,json,fn) 
		{
			clearInterval(obj.timer);

		obj.timer=setInterval(function()
			{	var istop=true;
				for(attr in json)
				{

					var icurrent=0;											
					if (attr=="opacity")									//因为透明度比较特殊，所以特别判断
					 {
						icurrent=parseInt(parseFloat(getStyle(obj,attr))*100);
					} else
					 {
						icurrent=parseInt(getStyle(obj,attr));
					}

					var itarget=json[attr];
					var ispeed=(itarget- icurrent)/8;
					ispeed=ispeed>0?Math.ceil(ispeed):Math.floor(ispeed);


					if (icurrent!=itarget) 
					{
						istop=false;
					}
				
						if (attr=="opacity") 
						{
							obj.style.opacity=(icurrent+ispeed)/100;
							obj.style.fliter="alpha(opacity:"+icurrent+ispeed+")";
						} else 
						{
							obj.style[attr]=icurrent+ispeed+"px";
						}

				}
				
				if (istop) 
				{
					clearInterval(obj.timer);
					if (fn) 
					{
						fn();
					}
				}
			},30)	
		}

