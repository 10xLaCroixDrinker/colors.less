/* DHTML Color Picker : v2.0 : 17/04/2007 */
/* dhtml+color+picker+2.html */

function $(v,o) { return((typeof(o)=='object'?o:document).getElementById(v)); }
function $S(o) { o=$(o); if(o) return(o.style); }
function $2D(o) { o=$(o); if(o) return(o.getContext('2d')); }
function abPos(o) { var o=(typeof(o)=='object'?o:$(o)), z={X:0,Y:0}; while(o!=null) { z.X+=o.offsetLeft; z.Y+=o.offsetTop; o=o.offsetParent; }; return(z); }
function agent(v) { return(Math.max(navigator.userAgent.toLowerCase().indexOf(v),0)); }
function getTime() { return((new Date()).getTime()); }
function noMove() { if(core.stop) { core.stop=0; document.onmouseup=function(){ document.onmouseup=''; core.stop=1; }; } return false; }
function ob2r(r) { var z=[], j=0; for(var i in r) { z[j++]=Math.round(r[i],2); } return(z); }
function XY(e,v) { var o=agent('msie')?{'X':e.clientX+document.body.scrollLeft,'Y':e.clientY+document.body.scrollTop}:{'X':e.pageX,'Y':e.pageY}; return(v?o[v]:o); }
function zero(n) { return(!isNaN(n=parseFloat(n))?n:0); }
function zindex(d) { d.style.zIndex=zINDEX++; }


/* COLOR PICKER */

Picker={};

/* Mouse */

Picker.core=function(o,e,fu) {

	core.fu(o,e,{fu:core.X, oX:-13.5, X1:0, X2:121, oY:0},fu);

};

Picker.cur=function(n,v,i,m) { var b=Picker[v.toUpperCase()][i], n=Math.max(0,n)/121;

	Picker[v.toLowerCase()][i[0]]=Math.round((1-n)*b);

	Picker.run(i);

};

Picker.pos=function(r,v,i) { var n=r[i[0]]; n=n;

	$S(i+'Cur').left=parseInt((121-(n/Picker[v][i])*121)+10)+'px';

	$(i+'Me').innerHTML=Math.round(n);

};

/* Create */

Picker.mk=function() { var z='', o=$('colorMM');

	var R={'Hue':'HSV', 'Saturation':'HSV', 'Value':'HSV', 'Red':'RGB', 'Green':'RGB', 'Blue':'RGB'};

	for(var i in R) { var v='Picker.core(\''+i+'Cur\',event,function(a,b,m) { Picker.cur(b.X,\''+R[i]+'\',\''+i+'\',m); })';

		z+='<div title="'+i[0].toUpperCase()+i.substr(1)+'">'+
		   ' <div class="west" id="'+i+'T">'+i.substr(0,1).toUpperCase()+"<\/div>"+
		   ' <span class="east" id="'+i+'Me">'+"<\/span>"+
		   ' <div onmousedown="'+v+'" id="'+i+'Cur" class="cur">'+"<\/div>"+
		   ' <canvas id="'+i+'" onmousedown="'+v+'" height="18" width="120">'+"<\/canvas><br>"+
		   "<\/div>";

	};

	o.innerHTML='<div class="z">'+z+"<\/div>";
	
};

/* Visualizer */

Picker.run=function(m,r) {

	var hsv2rgb=color.HSV_RGB, rgb2hsv=color.RGB_HSV, rgb2hex=color.RGB_HEX, rgba=color.rgba_old;

	if(r) { var r=Picker.rgb={R:r[0], G:r[1], B:r[2], A:r[3]}, h=Picker.hsv=rgb2hsv(Picker.rgb); } else { var r=Picker.rgb, h=Picker.hsv; }

	if(Picker.HSV[m]) { var t=hsv2rgb(h); t.A=r.A; r=Picker.rgb=t; } else if(Picker.RGB[m]) { h=Picker.hsv=rgb2hsv(r); }

	var R={'Hue':[[0,[0,h.S,h.V]], [0.15,[300,h.S,h.V]], [0.30,[240,h.S,h.V]], [0.50,[180,h.S,h.V]], [0.65,[120,h.S,h.V]], [0.85,[60,h.S,h.V]], [1,[0,h.S,h.V]]],
		   'Saturation':[[0,[h.H,100,h.V]], [1,[h.H,0,h.V]]],
		   'Value':[[0,[h.H,h.S,100]], [1,[h.H,h.S,0]]],
		   'Red':[[0,[255,r.G,r.B,r.A]], [1,[0,r.G,r.B,r.A]]],
		   'Green':[[0,[r.R,255,r.B,r.A]], [1,[r.R,0,r.B,r.A]]],
		   'Blue':[[0,[r.R,r.G,255,r.A]], [1,[r.R,r.G,0,r.A]]]};

	for(var i in R) { var c=$2D(i), g=c.createLinearGradient(0,0,120,18);

		for(var j in R[i]) { var j=R[i][j], k=j[1];
		
			if(Picker.HSV[i]) { k=hsv2rgb({H:k[0], S:k[1], V:k[2]}); }

			g.addColorStop(j[0], 'rgba('+ob2r(Picker.mode(k,isNaN(k.A)?1:0))+')');
			
		};

		var a={X:0,Y:0}, b={X:120,Y:18}; c.beginPath();
		
		c.clearRect(a.X,a.Y,b.X,b.Y);
		
		c.moveTo(a.X,a.Y); c.lineTo(a.X,b.Y); c.lineTo(b.X,b.Y); c.lineTo(b.X,a.Y);

		c.closePath(); c.fillStyle=g; c.fill();

		if(Picker.HSV[i]) { Picker.pos(h,'HSV',i); }
		
		else { Picker.pos(r,'RGB',i); }

	};

	$('HEX').innerHTML=rgb2hex(r);
	
    $S('plugID').background='#'+rgb2hex(r);

};

/* Data */

Picker.mode=function(r,s) { return(s?r:[r.R,r.G,r.B,r.A]); };

Picker.RGB={Red:255, Green:255, Blue:255};

Picker.HSV={Hue:360, Saturation:100, Value:100};

Picker.rgb={R:255, G:0, B:0, A:1};

Picker.hsv={H:0, S:100, V:100};


/* CORE MOVEMENT */

var oXY={}, cXY={}, zINDEX=2;

core={};

core.stop=1;

core.X=function(o,m,a,x) { a.X=Math.max(x.X1, x.X2?Math.min(x.X2, a.X+x.X1):a.X+x.X1); return(a); };

core.fu=function(o,e,C,F) { if(core.stop) { var oX=abPos($(o)).X, oY=abPos($(o)).Y, r=XY(e);

	function c(e,m) { r=XY(e); if(C) r=C.fu(o, m, {'X':r.X-oX, 'Y':r.Y-oY}, C); return(r); }
	function f(e,m) { c(e,m); if(F) F(oXY, r, m, e); return(r); }

	if(isNaN(C.oX)) oX=r.X-oX; else oX=oX-C.oX-zero($S(o).left);
	if(isNaN(C.oY)) oY=r.Y-oY; else oY=oY-C.oY-zero($S(o).top);

	core.stop=0; oXY=c(e); cXY=f(e, mXY='down'); core.time=getTime();

	document.onmousemove=function(e){ if(!core.stop) { cXY=f(e, 'move'); } }
	document.onmouseup=function(e){ core.stop=1; document.onmousemove=''; document.onmouseup=''; cXY=f(e, mXY='up'); }; 
	document.onselectstart=function(){ return false; }

} };

core.win=function(o,m,a,x) { a.X=(x.X1?Math.max(a.X,x.X1):a.X); a.Y=(x.Y1?Math.max(a.Y,x.Y1):a.Y);

	if(m=='down') { if(x.z) { zindex($(o)); }; }

	$S(o).left=a.X+'px'; $S(o).top=a.Y+'px';

	return(a);

};


/* COLOR LIBRARY */

color={};

color.HEX=function(o) { o=Math.round(Math.min(Math.max(0,o),255));

	return("0123456789ABCDEF".charAt((o-o%16)/16)+"0123456789ABCDEF".charAt(o%16));
	
};

color.RGB_HEX=function(o) { var fu=color.HEX; return(fu(o.R)+fu(o.G)+fu(o.B)); };

color.RGB_HSV=function(o) { var M=Math.max(o.R,o.G,o.B), delta=M-Math.min(o.R,o.G,o.B), H, S, V;

	if(M!=0) { S=Math.round(delta/M*100);

		if(o.R==M) H=(o.G-o.B)/delta; else if(o.G==M) H=2+(o.B-o.R)/delta; else if(o.B==M) H=4+(o.R-o.G)/delta;

		var H=Math.min(Math.round(H*60),360); if(H<0) H+=360;

	}

	return({'H':H?H:0, 'S':S?S:0, 'V':Math.round((M/255)*100)});

};

color.HSV_RGB=function(o) {
	
	var R, G, A, B, C, S=o.S/100, V=o.V/100, H=o.H/360;

	if(S>0) { if(H>=1) H=0;

		H=6*H; F=H-Math.floor(H);
		A=Math.round(255*V*(1-S));
		B=Math.round(255*V*(1-(S*F)));
		C=Math.round(255*V*(1-(S*(1-F))));
		V=Math.round(255*V); 

		switch(Math.floor(H)) {

			case 0: R=V; G=C; B=A; break;
			case 1: R=B; G=V; B=A; break;
			case 2: R=A; G=V; B=C; break;
			case 3: R=A; G=B; B=V; break;
			case 4: R=C; G=A; B=V; break;
			case 5: R=V; G=A; B=B; break;

		}

		return({'R':R?R:0, 'G':G?G:0, 'B':B?B:0, 'A':1});

	}
	else return({'R':(V=Math.round(V*255)), 'G':V, 'B':V, 'A':1});

};

Picker.mk();
Picker.run('Red');

$S('color').left='25px';
$S('color').top='25px';
