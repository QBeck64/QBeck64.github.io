// Establish all our variables
var canv = document.getElementById("my_canvas").getContext('2d');
var al = 0; // amount loaded
var start = 4.72; // Start point of canvas circle
var cw = canv.canvas.width; // current width
var ch = canv.canvas.height; // current height
var diff; // Diff of percentage to amount loaded, relative to 6.28 (math.pie * 2) ?

function progressSim() {
	// Whats the difference? (diff)
	diff = ((al / 100) * Math.PI * 2 * 10).toFixed(2); // Make sure has 2 decimals
	canv.clearRect(0, 0, cw, ch);
	canv.lineWidth = 10;
	canv.fillStyle = 'black';
	canv.strokeStyle = "#09F";
	canv.textAlign = 'center';
	canv.fillText(al + '%', cw * .5, ch * .5, cw);
	canv.beginPath();
	canv.arc(45, 45, 40, start, diff / 10 + start, false);
	canv.stroke();
	if (al >= 65) {
		clearTimeout(sim);
	}
	al++;
}

var sim = setInterval(progressSim, 50);
	

// Html5 Video Tag
function playPause() {
	var video = document.getElementById('nature');
	if (video.paused)
		video.play();
	else
		video.pause();
}



