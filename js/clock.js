var cx  =128;
var cy  =128;
var slen=120;
var mlen=116;
var hlen= 80;
var selem;
var melem;
var helem;
function setvars() {
    console.log("asd");
    selem=document.getElementById("seconds");
    melem=document.getElementById("minutes");
    helem=document.getElementById("hours");
    drawtime();
};
function drawtime() {
    var now=new Date();
    var nows=now.getTime()%60000;
    var nowm=now.getMinutes()*1.0+1.0*nows/60000;
    var nowh=now.getHours()*1.0+1.0*nowm/60;
    var sposx=cx + slen * Math.sin( nows / 30000 * Math.PI );
    var sposy=cy - slen * Math.cos( nows / 30000 * Math.PI );
    var mposx=cx + mlen * Math.sin( nowm / 30 * Math.PI );
    var mposy=cy - mlen * Math.cos( nowm / 30 * Math.PI );
    var hposx=cx + hlen * Math.sin( nowh / 6 * Math.PI );
    var hposy=cy - hlen * Math.cos( nowh / 6 * Math.PI );
   console.log(sposx)
    selem.setAttribute("x1",sposx);
    selem.setAttribute("y1",sposy);
    selem.setAttribute("x2",sposx);
    selem.setAttribute("y2",sposy);
    melem.setAttribute("x2",mposx);
    melem.setAttribute("y2",mposy);
    helem.setAttribute("x2",hposx);
    helem.setAttribute("y2",hposy);
    window.setTimeout(drawtime,80)
};
setvars();