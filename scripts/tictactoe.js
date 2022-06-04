// MACROS
const cases_props = 3;
let canvas, ctx;
let line_width = 15;
const nb_player = 2;
const require_to_win = 3;

// GAME VARIABLES
let grid = new Array(cases_props);
for (var i = 0; i < cases_props; i++) {
	grid[i] = new Array(cases_props).fill(0);
}

let player_turn = 1;

function init() {
	canvas = document.getElementById("canvas");
	canvas.addEventListener("click", click_handler);
	ctx = canvas.getContext("2d");
	game_loop();
}

function game_loop() {
	render();
	check_win();
	requestAnimationFrame(game_loop);
}

function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	draw_grid();
	draw_all_markers();
}

function draw_grid() {
	for (let index = 1; index <= cases_props; index++) {
		ctx.beginPath();
		ctx.moveTo((index / cases_props) * canvas.width, 0);
		ctx.lineTo((index / cases_props) * canvas.width, canvas.height);
		ctx.stroke();
	}
	for (let index = 1; index <= cases_props; index++) {
		ctx.beginPath();
		ctx.moveTo(0, (index / cases_props) * canvas.height);
		ctx.lineTo(canvas.width, (index / cases_props) * canvas.height);
		ctx.stroke();
	}
}

function draw_all_markers() {
	for (let x = 0; x < cases_props; x++) {
		for (let y = 0; y < cases_props; y++) {
			draw_marker(grid[x][y], x, y);
		}
	}
}

function draw_marker(marker, x, y) {
	switch (marker) {
		case 1:
			draw_cross(x, y);
			break;
		case 2:
			draw_circle(x, y);
		default:
			break;
	}
}

function draw_cross(x, y) {
	beginX = (x / cases_props) * canvas.width;
	beginY = (y / cases_props) * canvas.height;
	endX = ((x + 1) / cases_props) * canvas.width;
	endY = ((y + 1) / cases_props) * canvas.height;
	ctx.beginPath();
	ctx.moveTo(beginX, beginY);
	ctx.lineTo(endX, endY);
	ctx.stroke();
	beginX = ((x + 1) / cases_props) * canvas.width;
	beginY = (y / cases_props) * canvas.height;
	endX = (x / cases_props) * canvas.width;
	endY = ((y + 1) / cases_props) * canvas.height;
	ctx.beginPath();
	ctx.moveTo(beginX, beginY);
	ctx.lineTo(endX, endY);
	ctx.stroke();
}

function draw_circle(x, y) {
	ray = ((1 / cases_props) * canvas.width) / 2;
	beginX = ((x + 0.5) / cases_props) * canvas.width;
	beginY = ((y + 0.5) / cases_props) * canvas.height;
	ctx.beginPath();
	ctx.arc(beginX, beginY, ray, 0, 2 * Math.PI, false);
	ctx.stroke();
}

function click_handler(event) {
	let x = event.offsetX;
	let y = event.offsetY;
	let x_case = Math.floor(x / (canvas.width / cases_props));
	let y_case = Math.floor(y / (canvas.height / cases_props));
	if (grid[x_case][y_case] == 0) {
		grid[x_case][y_case] = player_turn;
		player_turn = player_turn == 1 ? 2 : 1;
	}
}

function check_win() {
	check_win_horizontal();
	check_win_vertical();
	check_win_diag();
}

function check_win_horizontal() {
	let count1 = 0;
	let count2 = 0;
	for (let y = 0; y < cases_props; y++) {
		for (let x = 0; x < cases_props; x++) {
			if (grid[x][y] == 1) {
				count1++;
				count2 = 0;
			}
			if (grid[x][y] == 2) {
				count1 = 0;
				count2++;
			}
		}
		if (count1 >= require_to_win) {
			alert("1 won");
		}
		if (count2 >= require_to_win) {
			alert("2 won");
		}
		count1 = 0;
		count2 = 0;
	}
}

function check_win_vertical() {
	let count1 = 0;
	let count2 = 0;
	for (let x = 0; x < cases_props; x++) {
		for (let y = 0; y < cases_props; y++) {
			if (grid[x][y] == 1) {
				count1++;
				count2 = 0;
			}
			if (grid[x][y] == 2) {
				count1 = 0;
				count2++;
			}
		}
		if (count1 >= require_to_win) {
			alert("1 won");
		}
		if (count2 >= require_to_win) {
			alert("2 won");
		}
		count1 = 0;
		count2 = 0;
	}
}

function check_win_diag() {
	if (cases_props == require_to_win) {
		check_win_large_diags();
	} else {
		check_win_all_diags_tl_to_br();
		check_win_all_diags_tr_to_bl();
	}
}

function check_win_all_diags_tl_to_br() {
	let count1 = 0;
	let count2 = 0;
	for (let i = 0; i < cases_props; i++) {
		for (let k = i; k < cases_props; k++) {
			if (grid[k][k - i] == 1) {
				count1++;
				count2 = 0;
			}
			if (grid[k][k - i] == 2) {
				count1 = 0;
				count2++;
			}
		}
		if (count1 >= require_to_win) {
			alert("1 won");
		}
		if (count2 >= require_to_win) {
			alert("2 won");
		}
		count1 = 0;
		count2 = 0;

		for (let k = i; k < cases_props; k++) {
			if (grid[k - i][k] == 1) {
				count1++;
				count2 = 0;
			}
			if (grid[k - i][k] == 2) {
				count1 = 0;
				count2++;
			}
		}
		if (count1 >= require_to_win) {
			alert("1 won");
		}
		if (count2 >= require_to_win) {
			alert("2 won");
		}
		count1 = 0;
		count2 = 0;
	}
}

function check_win_all_diags_tr_to_bl() {
	let count1 = 0;
	let count2 = 0;
	for (let i = 0; i < cases_props; i++) {
		for (let k = i; k < cases_props; k++) {
			if (grid[k][cases_props - 1 - k + i] == 1) {
				count1++;
				count2 = 0;
			}
			if (grid[k][cases_props - 1 - k + i] == 2) {
				count1 = 0;
				count2++;
			}
		}
		if (count1 >= require_to_win) {
			alert("1 won");
		}
		if (count2 >= require_to_win) {
			alert("2 won");
		}
		count1 = 0;
		count2 = 0;

		for (let k = i; k < cases_props; k++) {
			if (grid[cases_props - 1 - k + i][k] == 1) {
				count1++;
				count2 = 0;
			}
			if (grid[cases_props - 1 - k + i][k] == 2) {
				count1 = 0;
				count2++;
			}
		}
		if (count1 >= require_to_win) {
			alert("1 won");
		}
		if (count2 >= require_to_win) {
			alert("2 won");
		}
		count1 = 0;
		count2 = 0;
	}
}

function check_win_large_diags() {
	let count1 = 0,
		count2 = 0;
	for (let k = 0; k < cases_props; k++) {
		if (grid[k][k] == 1) {
			count1++;
			count2 = 0;
		}
		if (grid[k][k] == 2) {
			count1 = 0;
			count2++;
		}
	}
	if (count1 >= require_to_win) {
		alert("1 won");
	}
	if (count2 >= require_to_win) {
		alert("2 won");
	}
	count1 = 0;
	count2 = 0;
	for (let l = 0; l < cases_props; l++) {
		if (grid[l][cases_props - 1 - l] == 1) {
			count1++;
			count2 = 0;
		}
		if (grid[l][cases_props - 1 - l] == 2) {
			count1 = 0;
			count2++;
		}
	}
	if (count1 >= require_to_win) {
		alert("1 won");
	}
	if (count2 >= require_to_win) {
		alert("2 won");
	}
	count1 = 0;
	count2 = 0;
}
