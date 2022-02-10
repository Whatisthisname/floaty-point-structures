var _a;
var header = document.getElementById("header");
var cvs = document.getElementById("canvas");
var ctx = (_a = document.getElementById("canvas")) === null || _a === void 0 ? void 0 : _a.getContext("2d");


document.addEventListener("mousemove", function (event) {
    mousePos = getMouseCoords(event, cvs.getBoundingClientRect());
});




var tooltip = document.getElementById("tooltip");
var updateTooltip = function () {
    if (state.showMenu == false) {   
        tooltip.style.left = (mousePos.x).toString() + "px";
        tooltip.style.top = mousePos.y.toString() + "px";
    }
};

var resetGrid = () => {
    //init grid
    state.grid = []

    let cellLength = state.gridDensity / ctx.canvas.width
    let num_yCells = Math.floor(ctx.canvas.width / cellLength)

    for (let x = 0; x < state.gridDensity+1; x++) {
        state.grid[x] = []
        // console.log(JSON.stringify(grid[x]))
        for (let y = 0; y < num_yCells; y++) {
            state.grid[x][y] = 0
        }
    }
}

var start = function () {

    updateTooltip();
    updateCanvasSize();

    // initialize objects
    for (var i = 0; i < state.num_p; i++) {
        state.points[i] = new vec(uniform(0, ctx.canvas.width), uniform(0, ctx.canvas.height));
        state.velocities[i] = new vec(uniform(-1, 1) * uniform(1, 3), uniform(-1, 1) * uniform(1, 3))
        state.pointTrails[i] = []
        for (let j = 0; j < state.trailLength; j++) {
            state.pointTrails[i][j] = state.points[i].lerp(state.points[i].add(state.velocities[i]), i)
            // state.pointTrails[i][j] = state.points[i].lerp(new vec(0,0), j*0.01)
        }
    }
    update(0);
};

let time = 0

var update = function (t) {
    // if (t - time > 1000) {
    //     time = t
    // }
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    updatePoints(t);
    updateTooltip();
    drawPoints(t);
    window.requestAnimationFrame(update);
};



document.getElementById("boomButton").onclick = pushAwayFromMean


document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    handleRightClick();
}, false);


window.onresize = () => {
    updateCanvasSize();
}
    
var mousePos = { x: 0, y: 0 };
start();

