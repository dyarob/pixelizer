var ctx;
var imageData;
var isLittleEndian;
var canvas;//just for shortness
var w;//--
var h;//--
var buf; //arraybuffer
var buf8;//-buffer aliases-
var data;//--
var buf64;//--

/*INIT ONLOAD*/window.onload = function() {
canvas	= document.getElementById('canvas');
w		= canvas.width;
h		= canvas.height;
ctx		= canvas.getContext('2d');
imageData = ctx.getImageData(0, 0, w, h);
buf		= new ArrayBuffer(imageData.data.length);
buf8	= new Uint8ClampedArray(buf);
data	= new Uint32Array(buf);
data[1] = 0x0a0b0c0d;
isLittleEndian = true;
if (buf[4] === 0x0a && buf[5] === 0x0b
		&& buf[6] === 0x0c && buf[7] === 0x0d) {
	isLittleEndian = false;
}/*!init*/

document.getElementById("putnlinesButton").onclick = function() {
	lines(document.getElementById("putnlinesN").value); };

document.getElementById("putnflinesButton").onclick = function() {
	flines(document.getElementById("putnflinesN").value); };
}/*!window.onload*/

function lines(N) {
if (isLittleEndian) {
	for (var n = 0; n < N; ++n) {
		y = myrand(h);
		for (var x = 0; x < w; ++x) {
			data[y * w + x] =
				(255   << 24) |    // alpha
				(40 << 16) |    // blue
				(40 <<  8) |    // green
				40;            // red
		}
	}
} else {}
refresh();
}

function flines(N) {
var W;
if (isLittleEndian) {
	for (var n = 0; n < N; ++n) {
		y = myrand(h);
		W = myrand(w);
		for (var x = 0; x < W; ++x) {
			data[y * w + x] =
				(255 << 24) |    // alpha
				(40 << 16) |    // blue
				(40 <<  8) |    // green
				40;            // red
		}
	}
} else {}
refresh();
}/*!draw funcs*/

/*HANDY DANDY FUNCS*/
function myrand(n) {
	return Math.floor(Math.random() * n); }

function refresh() {
	imageData.data.set(buf8);
	ctx.putImageData(imageData, 0, 0); }

function myclear() {
	ctx.clearRect(0, 0, w, h);
	for (var i = 0; i < data.length; ++i)
		data[i] = 0; }

function zoom() {
	alert('zoom');
	canvas.width *= 2;
	canvas.height *= 2;
	//
	w = canvas.width;
	h = canvas.height;
}/*!handy funcs*/
