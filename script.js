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
    showPaceAfterRangeChange(pace.minutes, pace.seconds);

    // Updating the projected times section
    updateAvgProjectedTime(speed)
}

function updateAvgProjectedTime(selectedSpeed) {
    //let selectedSpeed = document.getElementById('basic-input-speed-range').value;

    // Looping over the distances, and calculating the average projected time from the speed and distance
    let listOfKMDistances = ['0.2km', '0.4km', '5km', '10km', '21.0975km', '42.195km'];

    for (const kmDistance of listOfKMDistances) {

        avgProjectedTime = calculateAvgProjectedTime(selectedSpeed, kmDistance);

        showAvgProjectedTimeAfterRangeChange(avgProjectedTime.minutes, avgProjectedTime.seconds, kmDistance)

    }

}


function showAvgProjectedTimeAfterRangeChange(minutes, seconds, kmDistance) {

    // Rewriting to double digits
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    let HTMLElementMinutes = `avg-pace-${kmDistance}-projected-time-result-minutes`;
    let HTMLElementSeconds = `avg-pace-${kmDistance}-projected-time-result-seconds`;


    document.getElementById(HTMLElementMinutes).textContent = minutes;
    document.getElementById(HTMLElementSeconds).textContent = seconds;

}

function showPaceAfterRangeChange(minutes, seconds) {

    // Rewriting to double digits
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;


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

    let minutes = Math.floor(rawConvertedMinutes);
    let seconds = Math.round((rawConvertedMinutes % 1) * 60, 2);

    // Handles situations where the rounding
    // protocol gives f.ex 04:60 instead of 05:00
    if (seconds === 60) {
        minutes = minutes + 1;
        seconds = 0;
    }
    
    // Uncomment for debugging
    // console.log("Minutes: " + minutes);
    // console.log("Seconds: " + seconds)
    return {minutes, seconds}
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


    let minutes = Math.floor(rawConvertedMinutesAvgProjected);
    let seconds = Math.round((rawConvertedMinutesAvgProjected % 1) * 60, 2);

    // Handles situations where the rounding
    // protocol gives f.ex 04:60 instead of 05:00
    if (seconds === 60) {
        minutes = minutes + 1;
        seconds = 0;
    }
    
    // Uncomment for debugging
    // console.log("Minutes: " + minutes);
    // console.log("Seconds: " + seconds)
    return {minutes, seconds}
}

// Adds event listener to the range input box.

// When one presses Enter, the range and calculation 
// should change

document.getElementById('basic-input-speed-range').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        updateInputFromRange(this.value);
    }
});

