const touchArea = document.getElementById('touchArea');

touchArea.addEventListener('touchstart', (e) => {
    touchArea.style.backgroundColor = 'lightgreen';
    touchArea.innerText = 'Touch Start';
    console.log('Touch Start', e);
});

touchArea.addEventListener('touchmove', (e) => {
    touchArea.style.backgroundColor = 'yellow';
    touchArea.innerText = 'Touch Move';
    console.log('Touch Move', e);
});

touchArea.addEventListener('touchend', (e) => {
    touchArea.style.backgroundColor = 'lightblue';
    touchArea.innerText = 'Touch End';
    console.log('Touch End', e);
});

touchArea.addEventListener('touchcancel', (e) => {
    touchArea.style.backgroundColor = 'red';
    touchArea.innerText = 'Touch Cancel';
    console.log('Touch Cancel', e);
});