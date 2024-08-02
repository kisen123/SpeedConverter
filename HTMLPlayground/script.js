let swipeData = {
    value: 0.0,
    startX: 0,
    incrementStep: 120, // distance in pixels to increment value
    incrementValue: 0.1,
    valueDisplay: document.getElementById('value'),
    draggable: document.getElementById('draggable')
}



draggable.addEventListener('mousedown', (event) => {
    swipeData.startX = event.clientX;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

function onMouseMove(event) {
    const currentX = event.clientX;
    const distance = currentX - swipeData.startX;

    if (Math.abs(distance) >= swipeData.incrementStep) {
        swipeData.value += swipeData.incrementValue * Math.sign(distance);
        swipeData.startX = currentX; // reset startX to current position to track next increment
        updateValueDisplay();
    }
}

function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}

function updateValueDisplay() {
    swipeData.valueDisplay.textContent = `Value: ${swipeData.value.toFixed(1)}`;
}

// hei opå deg