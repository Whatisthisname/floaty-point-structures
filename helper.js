

function uniform(start, end) {
    return Math.random() * (end - start) + start
}


function sigmoid(x, s = 1) {
    return 1 / (Math.exp(x * s) + 1)
}

// const random3Colors = () => {
//     return Please.make_color({
//         golden: false,
//         full_random: true,
//         colors_returned: 3,
//         value: 0.85
//     });
// }

function getMouseCoords(event, rect) {
    let scaleFactor = 1
    if (event == null) {
        event = window.event;
    }
    if (event == null) {
        return null;
    }
    if (event.pageX || event.pageY) {
        return {
            x: (event.pageX - rect.left) / scaleFactor,
            y: (event.pageY - rect.top) / scaleFactor
        };
    }
    return null;
}

const updateCanvasSize = () => {
    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = window.innerHeight
}

function handleRightClick() {
    if (state.showMenu) {
        tooltip.style.visibility = "hidden"
        state.showMenu = false
    } else {
        tooltip.style.visibility = "visible"
        state.showMenu = true
    }
}



