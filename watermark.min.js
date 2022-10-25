/* 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * watermark.js - Create watermarked images with Canvas and JS
 *
 * Version: 1 (2011-04-04)
 * Copyright (c) 2011	Patrick Wied ( http://www.patrick-wied.at )
 * This code is licensed under the terms of the MIT LICENSE
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 */
(function(e){var l=function(e){var k=e.document,c={},f={},m="watermark",b=!1,n="bottom-right",o="watermark.png?"+ +new Date,j=127.5,l=function(){b=new Image;b.src="";b.src=o;j!=255?b.complete?p():b.onload=function(){p()}:applyWatermarks()},p=function(){var a=b.width||b.offsetWidth,g=b.height||b.offsetHeight;setCanvasSize(a,g);f.drawImage(b,0,0);for(var h=f.getImageData(0,0,a,g),d=h.data,e=d.length,i=3;i<e;i+=4)d[i]=d[i]<j?d[i]:j;h.data=d;f.putImageData(h,0,0);b.onload=null;b.src="";b.src=c.toDataURL(); b.width=a;b.height=g;applyWatermarks()};setCanvasSize=function(a,b){c.width=a;c.height=b};applyWatermark=function(a){c.width=a.width||a.offsetWidth;c.height=a.height||a.offsetHeight;f.drawImage(a,0,0);var g=n,h=0,d=0;d=g.indexOf("top")!=-1?10:c.height-b.height-10;h=g.indexOf("left")!=-1?10:c.width-b.width-10;f.drawImage(b,h,d);a.onload=null;a.src=c.toDataURL()};applyWatermarks=function(){setTimeout(function(){for(var a=k.getElementsByClassName(m),b=a.length;b--;){var c=a[b];if(c.tagName.toUpperCase()== "IMG")c.complete?applyWatermark(c):c.onload=function(){applyWatermark(this)}}},10)};return{init:function(a){a.watermark&&(b=a.watermark);a.path&&(o=a.path);a.position&&(n=a.position);a.opacity&&(j=255/(100/a.opacity));a.className&&(m=a.className);c=k.createElement("canvas");c.style.cssText="display:none;";f=c.getContext("2d");k.body.appendChild(c);l()}}}(e);e.wmark=l})(window);