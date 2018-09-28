var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");
var number_of_circles = 50;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//alert("width:" + window.innerWidth + ", height:" + window.innerHeight);

window.addEventListener("resize", resize_handler);
function resize_handler() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	advance_time();
}

var circles = [];

var slider = document.getElementById("myRange");
var circles_number = document.getElementById("number_of_circles");

slider.oninput = function() {
	number_of_circles = this.value;
	draw_circles();
	circles_number.textContent = this.value;

	console.log(number_of_circles);
}


var dropdown = document.getElementById("dropdown");
dropdown.oninput = function() {
	console.log(dropdown.value);
	draw_circles();
}

function draw_circles() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	circles = [];
	colors = ["white", "red", "yellow", "green", "blue", "gray", "black"];

	for (var i = 0; i < number_of_circles; i++) {
		var circle = {
			x:Math.round(Math.random() * window.innerWidth),
			y:Math.round(Math.random() * window.innerHeight),
			size:1,
			direction:[0, 0],//vector nul de directie
			speed:0,//viteza nula la inceputa
			color:colors[Math.round(Math.random() * colors.length)]
		};

		switch (dropdown.value) {
			default:
				circle.direction = [Math.random() - 0.5, Math.random() - 0.5];
				circle.speed = Math.round(Math.random() * 2 + 5);
				break;
			case "random":
				circle.direction = [Math.random() - 0.5, Math.random() - 0.5];
				circle.speed = Math.round(Math.random() * 2 + 5);
				break;
			case "snow":
				circle.direction = [Math.random() - 0.5, Math.random() + 0.5];
				circle.speed = Math.round(Math.random() + 1);
				break;
		}

		circles.push(circle);

		ctx.beginPath();
		ctx.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI, false);
		ctx.fillStyle = circles[i].color;
		ctx.strokeStyle = circles[i].color;
		ctx.fill();
		ctx.stroke();
	}	
}

async function advance_time() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (var i = circles.length - 1; i >= 0; i--) {
	 	circles[i].x = circles[i].x + circles[i].speed * circles[i].direction[0];
	 	circles[i].y = circles[i].y + circles[i].speed * circles[i].direction[1];

 		ctx.beginPath();
		ctx.arc(circles[i].x, circles[i].y, circles[i].size, 0, 2 * Math.PI, false);
		ctx.fillStyle = circles[i].color;
		ctx.strokeStyle = circles[i].color;
		ctx.fill();
		ctx.stroke();

		if (circles[i].x < 0 || circles[i].x > canvas.width) 
			circles[i].direction[0] = -circles[i].direction[0];

		if (circles[i].y < 0 || circles[i].y > canvas.height) 
			switch (dropdown.value) {
				default:
					circles[i].direction[1] = -circles[i].direction[1];
					break;
				case "random":
					circles[i].direction[1] = -circles[i].direction[1];
					break;		
				case "snow":
					circles[i].y = 0;
					break;
			}
			
	}
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
	draw_circles();

	while (true) {
		advance_time();
		await sleep(1000/60);
	}
}

main();