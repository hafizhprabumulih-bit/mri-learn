const $=(id)=>document.getElementById(id);
const AR3=(c,x0,y0,x1,y1,col,w)=>{c.strokeStyle=C3(col);c.fillStyle=C3(col);c.lineWidth=w;c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.stroke();const a=Math.atan2(y1-y0,x1-x0);c.beginPath();c.moveTo(x1,y1);c.lineTo(x1-8*Math.cos(a-.4),y1-8*Math.sin(a-.4));c.lineTo(x1-8*Math.cos(a+.4),y1-8*Math.sin(a+.4));c.fill();};
function C3(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim();}
