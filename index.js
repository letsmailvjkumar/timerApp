class Timer {
    constructor(endTime, bottomContainerElement) {
        this.endTime = endTime;
        this.interval = null;
    }

    start() {
        // Start the timer by calling update() every second
        this.interval = setInterval(() => this.update(), 1000);
    }

    stop() {
        // Stop the timer by clearing the interval
        clearInterval(this.interval);
    }

    update() {
        // Calculate the time remaining
        const timeRemaining = this.endTime - new Date();
        const textChange = document.querySelector('.show-time');
        if (timeRemaining <= 0) {
            // Timer has ended
            // Play audio alert
            // Change timer display to match Figma design
            // Stop the timer
            
            const audio = new Audio('./alert.mp3');
            audio.play();
            this.stop();
        } else {
            // Timer is still active
            // Update timer display with time remaining
            // Calculate the remaining hours, minutes, and seconds
            textChange.textContent = "Current timers";
            const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            // Format the remaining time as a string
            const timeLeftStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            // Update the time-left element with the remaining time
            const timeLeftElement = document.querySelector('.time-left');
            timeLeftElement.textContent = timeLeftStr;
        }
    }
}
let timers = [];


function addTimer() {
    const timeInput = document.getElementById('btn-set');
    timeInput.addEventListener('click', () => {
       
        const timeValue = document.getElementById('time').value; // Get the time input value

        // Split the time value into hours, minutes, and seconds
        const [hours, minutes, seconds] = timeValue.split(':').map(Number);

        // Calculate the end time as the current time plus the input hours, minutes, and seconds
        const endTime = new Date();
        endTime.setHours(endTime.getHours()+hours);
        endTime.setMinutes(endTime.getMinutes()+minutes);
        endTime.setSeconds(endTime.getSeconds()+seconds);


        
        // Create a new Timer object and start it
        const timer = new Timer(endTime);
        timer.start();
        

        timers.push(timer);
        
         // Update the timers display
         updateTimers();
    });
}
addTimer();

function updateTimers() {
    
    // Get the time-left-container element
    const timeLeftContainerElement = document.querySelector('#time-left-container');

    // Remove all existing bottom-container elements
    timeLeftContainerElement.innerHTML = '';

    // Iterate over the timers array and create a new bottom-container element for each timer
    for (const timer of timers) {
        // Create a new bottom-container element for the timer
        const bottomContainerElement = document.createElement('div');
        bottomContainerElement.classList.add('bottom-container');
        bottomContainerElement.innerHTML = `
            <div class="time-remaining">Time Left: </div>
            <div class="time-left">hh:mm:ss</div>
            <div class="time-button">
                <button class="btn-del">Delete</button>
            </div>
        `;

        // Add an event listener to the 'Delete' button
        const deleteButton = bottomContainerElement.querySelector('.btn-del');
        deleteButton.addEventListener('click', () => {
            // Stop the timer
            timer.stop();

            // Remove the timer from the timers array
            const index = timers.indexOf(timer);
            timers.splice(index, 1);

            // Remove the bottom-container element
            bottomContainerElement.remove();
        });

        // Append the new bottom-container element to the time-left-container element
        timeLeftContainerElement.appendChild(bottomContainerElement);
    }
}
