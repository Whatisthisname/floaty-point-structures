
let lastShuffle = 0

let indices = [...Array(state.num_p).keys()]

const updatePoints = (t) => {
    resetGrid()

    // if (lastShuffle - t > 1000) {
    //     lastShuffle = t
    //     indices = [...Array(state.num_p).keys()];
    //     shuffle(indices)
    // }

    for (let i = 0; i < state.num_p; i++) {
        let r = i
        let p = state.points[r]
        let pVel = state.velocities[r]



        for (let j = state.trailLength - 1; j > 0; j--) {
            state.pointTrails[r][j] = state.pointTrails[r][j - 1].add(new vec(uniform(-1, 1), uniform(-1, 1)).scale(0.0001));
            // state.pointTrails[r][j] = state.pointTrails[r][j - 1].add(0,0);
            // state.pointTrails[i][j] = state.pointTrails[i][j-1];
        }
        state.pointTrails[r][0] = p


        let gridX = state.gridDensity / ctx.canvas.width
        let gridY = gridX //state.gridDensity / ctx.canvas.height

        let pGridX = Math.max(0, Math.min(Math.round(p.x * gridX), state.gridDensity))
        let pGridY = Math.max(0, Math.min(Math.round(p.y * gridY), state.gridDensity))
        let force = state.grid[pGridX][pGridY]

        if (force == 0) {
            pVel._add(new vec(pGridX / gridX, pGridY / gridY).sub(p).scale(0.1))
        } else {
            pVel._add(new vec(pGridX / gridX, pGridY / gridY).sub(p).scale(force * 0.1).neg())
        }


        p._add(pVel)

        //new grid pos
        pGridX = Math.max(0, Math.min(Math.round(p.x * gridX), state.gridDensity))
        pGridY = Math.max(0, Math.min(Math.round(p.y * gridY), state.gridDensity))
        
        state.grid[pGridX][pGridY]++

        // wall bounce
        if (p.y >= ctx.canvas.height) {
            pVel.y *= -1
            p.y = ctx.canvas.height - 1
        } else
            if (p.y <= 0) {
                pVel.y *= -1
                p.y = 0
            }
        if (p.x >= ctx.canvas.width) {
            pVel.x *= -1
            p.x = ctx.canvas.width - 1
        } else
            if (p.x <= 0) {
                pVel.x *= -1
                p.x = 0
            }



        pVel.x += (mousePos.x - p.x) * 0.004
        pVel.y += (mousePos.y - p.y) * 0.004

        pVel.x *= 0.94
        pVel.y *= 0.94
        if (pVel.length() < 0.5) pVel = new vec(0, 0)

        state.points[r] = p
        state.velocities[r] = pVel
    }
}

var drawPoints = function (t) {


    const gridX = Math.round(ctx.canvas.width / state.gridDensity)
    const gridY = gridX // Math.round(ctx.canvas.height / state.gridDensity)
    ctx.strokeStyle = "#00ffff";
    for (let i = 0; i < state.gridDensity + 1; i++) {
        ctx.beginPath()
        ctx.moveTo(i * gridX, 0)
        ctx.lineWidth = 0.4
        ctx.lineTo(i * gridX, ctx.canvas.height)
        // ctx.closePath()
        ctx.stroke()
    }

    for (let j = 0; j < state.gridDensity + 1; j++) {
        
        ctx.beginPath()
        ctx.moveTo(0, j * gridY)
        ctx.lineWidth = 0.4
        ctx.lineTo(ctx.canvas.width, j * gridY)
        // ctx.closePath()
        ctx.stroke()
    }

    for (var i = 0; i < state.num_p; i++) {
        var p = state.points[i];

        var trailEnd = state.pointTrails[i][state.trailLength - 1]
        var gradient = ctx.createLinearGradient(p.x, p.y, trailEnd.x, trailEnd.y);
        gradient.addColorStop(0, "#0000FF");
        gradient.addColorStop(1, '#FFFF0000');
        ctx.strokeStyle = gradient;

        if (p.length() > 0.004 || true) {
            //draw trail
            // ctx.strokeStyle = "#000000";
            ctx.beginPath();
            ctx.lineWidth = 2
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(state.pointTrails[i][0].x, state.pointTrails[i][0].y)
            for (let j = 1; j < state.trailLength; j++) {
                let prev = state.pointTrails[i][j-1]
                let curr = state.pointTrails[i][j]

                if (prev.sub(curr).length() > 0.01||true) {
                    ctx.lineTo(state.pointTrails[i][j].x, state.pointTrails[i][j].y)
                }

            }
            ctx.stroke()
        }



        //draw point

        let pointSize = 3//state.velocities[i].length()

        ctx.beginPath();
        ctx.fillStyle = "#000000"; //red green blue
        ctx.arc(p.x, p.y, pointSize, 0, 2 * Math.PI); //
        ctx.fill();


    }
}

let pushAwayFromMean = () => {
    let meanPos = new vec(0, 0)
    state.points.forEach(p => {
        meanPos = meanPos.add(p)
    });
    meanPos = meanPos.scale(1.0 / state.num_p)


    for (let i = 0; i < state.num_p; i++) {
        let p = state.points[i]
        let pVel = state.velocities[i]
        let diff = p.sub(meanPos).unit()

        pVel = pVel.lerp(diff.unit().scale(30), 0.5)
        // state.points[i] = p.add(diff.unit())
        state.velocities[i] = pVel
    }
}