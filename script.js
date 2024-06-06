// Updates the the input when the range slider is adjusted
function updateInputFromRange(input) {
    document.getElementById('basic-input-speed-range').value = input;

    // Collects the input value from the basic-box
    var inputHTMLObject = document.getElementById("basic-input-speed-range");


    // Calculating the pace from the speed
    pace = calculateSpeed(inputHTMLObject.value);
    
    // Logging the output to the console for debugging purposes
    // console.log("The calculated pace is: " + pace.minutes + ":" + pace.seconds);


    // Showing the pace after the user clicks the button
    showPaceAfterRangeChange(pace.minutes, pace.seconds);
}


function showPaceAfterRangeChange(minutes, seconds) {

    // Rewriting to double digits
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;


    document.getElementById("basic-range-result-minutes").textContent = minutes;
    document.getElementById("basic-range-result-seconds").textContent = seconds;
}



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
    

    // console.log("Minutes: " + minutes);
    // console.log("Seconds: " + seconds)
    return {minutes, seconds}
};

// Adds event listener to the range input box.

// When one presses Enter, the range and calculation 
// should change

document.getElementById('basic-input-speed-range').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        updateInputFromRange(this.value);
    }
});