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



function handleCalculateSpeedClick() {
    
    // Collects the input value from the basic-box
    var inputHTMLObject = document.getElementById("basic-input-speed");
    

    // Outputs result


    // UNCOMMENT FOR TESTING AN OUTPUT
    //document.getElementById("basic-box-result").textContent = inputHTMLObject.value;
    
    // Calculating the pace from the speed
    pace = calculateSpeed(inputHTMLObject.value);
    
    // Logging the output to the console for debugging purposes
    console.log("The calculated pace is: " + pace.minutes + ":" + pace.seconds);


    // Adding the calculated values 
    document.getElementById("basic-box-result-minutes").textContent = pace.minutes;
    document.getElementById("basic-box-result-seconds").textContent = pace.seconds;
    

};

function calculateSpeed(inputValue) {

    let speed = Number(inputValue);


    // Example: 10 km/t -> (10/60)**(-1)

    // Defining minutes and seconds
    let rawConvertedMinutes = (speed/60)**(-1);

    let minutes = Math.floor(rawConvertedMinutes);
    let seconds = Math.floor((rawConvertedMinutes % 1) * 60, 2);


    console.log("Minutes: " + minutes);
    console.log("Seconds: " + seconds)
    return {minutes, seconds}
};

// Adds event listener to the 'calculate result' button
document.getElementById('basic-box-submit-number').addEventListener('click', handleCalculateSpeedClick);