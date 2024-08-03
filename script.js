
// Updates the the input when the range slider is adjusted
function updateInputFromRange(input) {
    document.getElementById('basic-input-speed-range').value = input;

    // Collects the input value from the basic-box
    let speed = document.getElementById("basic-input-speed-range").value;


    // Calculating the pace from the speed
    pace = calculateSpeed(speed);
    
    // Uncomment to log the output to the console for debugging purposes
    // console.log("The calculated pace is: " + pace.minutes + ":" + pace.seconds);


    // Showing the pace after the user clicks the button
    showPaceAfterRangeChange(pace.hours, pace.minutes, pace.seconds);

    // Updating the projected times section
    updateAvgProjectedTime(speed)
}

function updateAvgProjectedTime(selectedSpeed) {
    //let selectedSpeed = document.getElementById('basic-input-speed-range').value;

    // Looping over the distances, and calculating the average projected time from the speed and distance
    let listOfKMDistances = ['0.2km', '0.4km', '1.5km', '1.609km', '5km', '10km', '21.0975km', '42.195km'];

    for (let kmDistance of listOfKMDistances) {

        avgProjectedTime = calculateAvgProjectedTime(selectedSpeed, kmDistance);

        showAvgProjectedTimeAfterRangeChange(hours=avgProjectedTime.hours, minutes=avgProjectedTime.minutes, seconds=avgProjectedTime.seconds, kmDistance=kmDistance);

    }

}


function showAvgProjectedTimeAfterRangeChange(hours, minutes, seconds, kmDistance) {

    // Rewriting to double digits
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    let HTMLElementHours = `avg-pace-${kmDistance}-projected-time-result-hours`;
    let HTMLElementMinutes = `avg-pace-${kmDistance}-projected-time-result-minutes`;
    let HTMLElementSeconds = `avg-pace-${kmDistance}-projected-time-result-seconds`;

    /*
    if (hours >= 1) {
        let listOfp = document.getElementById(HTMLElementHours)
        .parentElement
        .getElementsByTagName('p');

        let newHTML = `avg-pace-${kmDistance}-projected-time-result-hours></p><p>:</p>`;

        listOfp[1].insertAdjacentHTML('afterend', newHTML)

    }
    */

    document.getElementById(HTMLElementHours).textContent = hours;
    document.getElementById(HTMLElementMinutes).textContent = minutes;
    document.getElementById(HTMLElementSeconds).textContent = seconds;

}

function showPaceAfterRangeChange(hours, minutes, seconds) {

    // Rewriting to double digits
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("basic-range-result-hours").textContent = hours;
    document.getElementById("basic-range-result-minutes").textContent = minutes;
    document.getElementById("basic-range-result-seconds").textContent = seconds;
}


/* function changeAttributeOnRangeChange() {
TODO - Function to adjust an attribute placeholder (emoji/image/whatever) based on the speed in the box
}
*/

function calculateSpeed(inputValue) {

    let speed = Number(inputValue);
    let rawConvertedMinutes;

    // Example: 10 km/t -> (10/60)**(-1)

    // Defining minutes and seconds
    if (speed === 0) {
        rawConvertedMinutes = 0;
    } else {
    rawConvertedMinutes = (speed/60)**(-1);
    }

    let hours = Math.floor(rawConvertedMinutes / 60);
    let minutes;

    if (hours <= 0) {
        minutes = Math.floor(rawConvertedMinutes);
    } else {
        minutes = Math.floor(((rawConvertedMinutes / 60) % 1) * 60, 2)
    };
    let seconds = Math.round(((((rawConvertedMinutes / 60) % 1) * 60) % 1) * 60, 2);

    // Handles situations where the rounding
    // protocol gives f.ex. 00:60:00 instead of 01:00:00
    if (minutes === 60) {
        hours = hours + 1;
        minutes = 0;
        console.log("Possible bug");
    }

    // Handles situations where the rounding
    // protocol gives f.ex 04:60 instead of 05:00
    if (seconds === 60) {
        minutes = minutes + 1;
        seconds = 0;
    }
    
    
    return {hours, minutes, seconds}
};

// Function to calculate average projected time for 
function calculateAvgProjectedTime(speed, kmDistance) {

    let rawConvertedMinutesAvgProjected;

    // Rewriting the km values to integers
    kmDistance = parseFloat(kmDistance.replace('km', ''));


    // Defining minutes and seconds
    if (speed === 0) {
        rawConvertedMinutesAvgProjected = 0;
    } else {
    rawConvertedMinutesAvgProjected = (kmDistance / speed) * 60;
    }


    // rawConvertedMinutesAvgProjected is used for every calculation
    // of hours-minutes-seconds.
    let hours = Math.floor(rawConvertedMinutesAvgProjected / 60);
    let minutes;
    if (hours <= 0) {
        minutes = Math.floor(rawConvertedMinutesAvgProjected);
    } else {
        minutes = Math.floor(((rawConvertedMinutesAvgProjected / 60) % 1) * 60, 2)
    };
    let seconds = Math.round(((((rawConvertedMinutesAvgProjected / 60) % 1) * 60) % 1) * 60, 2);


    // Handles situations where the rounding
    // protocol gives f.ex. 00:60:00 instead of 01:00:00
    if (minutes === 60) {
        hours = hours + 1;
        minutes = 0;
    }


    // Handles situations where the rounding
    // protocol gives f.ex 04:60 instead of 05:00
    if (seconds === 60) {
        minutes = minutes + 1;
        seconds = 0;
    }
    

    return {hours, minutes, seconds}
}

// Adds event listener to the range input box.

// When one presses Enter, the range and calculation 
// should change

document.getElementById('basic-input-speed-range').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        updateInputFromRange(this.value);
    }
});




/*Here is JavaScript code for the Swiper*/
let swipeData = {
    value: parseFloat(document.getElementById("basic-input-speed-range").value),
    startX: 0,
    incrementStep: 120, // distance in pixels to increment value
    incrementValue: 0.1,
    valueDisplay: document.getElementById('value'),
    draggable: document.getElementById('swiper')
}


// Event listener for mouse
swipeData.draggable.addEventListener('mousedown', (event) => {
    swipeData.startX = event.clientX;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});




// Event listener for touch
swipeData.draggable.addEventListener('touchstart', (event) => {
    swipeData.startX = event.touches[0].clientX;
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchup', onTouchUp);
});


// Prevent default behavior to avoid scrolling
document.draggable.addEventListener('touchmove', function(event) {
    event.preventDefault();
}, { passive: false });



function onMouseMove(event) {

    swipeData.value = parseFloat(document.getElementById("basic-input-speed-range").value);

    const currentX = event.clientX;
    const distance = currentX - swipeData.startX;

    if (Math.abs(distance) >= swipeData.incrementStep) {
        swipeData.value += swipeData.incrementValue * Math.sign(distance);
        swipeData.startX = currentX; // reset startX to current position to track next increment
        updateSpeedDisplay();
    }
}

function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}

function onTouchMove () {
    swipeData.value = parseFloat(document.getElementById("basic-input-speed-range").value);

    const currentX = event.touches[0].clientX;
    const distance = currentX - swipeData.startX;

    if (Math.abs(distance) >= swipeData.incrementStep) {
        swipeData.value += swipeData.incrementValue * Math.sign(distance);
        swipeData.startX = currentX; // reset startX to current position to track next increment
        updateSpeedDisplay();
    }
}

function onTouchUp () {
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchup', onTouchUp)
}


function updateSpeedDisplay() {
    document.getElementById("basic-input-speed-range").value = swipeData.value.toFixed(1);
    updateInputFromRange(swipeData.value.toFixed(1));
}