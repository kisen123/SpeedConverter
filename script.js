let speed = document.querySelector("basic-input-box");
console.log(speed);






// This function calculates the speed inside the basic input box
/*
function calculateSpeed() {
    outputHTML = document.querySelector("basic-box-result");
    console.log(outputHTML)
    output.innerHTML = "RESULT"
};
*/

function showPaceAfterClick(minutes, seconds) {

    // Rewriting to double digits
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;


    document.getElementById("basic-box-result-minutes").textContent = minutes;
    document.getElementById("basic-box-result-seconds").textContent = seconds;
}


function showPaceAfterRangeChange(minutes, seconds) {

    // Rewriting to double digits
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;


    document.getElementById("basic-range-result-minutes").textContent = minutes;
    document.getElementById("basic-range-result-seconds").textContent = seconds;
}



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





// Function to handle button click .
function handleCalculateSpeedClick() {
    
    // Collects the input value from the basic-box
    var inputHTMLObject = document.getElementById("basic-input-speed-box");


    // Calculating the pace from the speed
    pace = calculateSpeed(inputHTMLObject.value);
    
    // Logging the output to the console for debugging purposes
    // console.log("The calculated pace is: " + pace.minutes + ":" + pace.seconds);


    // Showing the pace after the user clicks the button
    showPaceAfterClick(pace.minutes, pace.seconds);

};





function calculateSpeed(inputValue) {

    let speed = Number(inputValue);


    // Example: 10 km/t -> (10/60)**(-1)

    // Defining minutes and seconds
    let rawConvertedMinutes = (speed/60)**(-1);

    let minutes = Math.floor(rawConvertedMinutes);
    let seconds = Math.floor((rawConvertedMinutes % 1) * 60, 2);


    // console.log("Minutes: " + minutes);
    // console.log("Seconds: " + seconds)
    return {minutes, seconds}
};

// Adds event listener to the 'calculate result' button
document.getElementById('basic-box-submit-number').addEventListener('click', handleCalculateSpeedClick);