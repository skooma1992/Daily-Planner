// variables for functions
// also creating a time[] array and index[] array
var currentHour;
var time = [];
var hourEl;
var inputEl;
var saveBtn;
var saveEl;
var col;
var index = [];
var rowEl;
// number of work hours
var workDayHours = 9;
//Changing from the dom
var currentDay = $('.today');
var holdingContainer = $('.container')

// This is just  formating for the Today is "  " text.
currentDay.text("Today is " + moment().format('MM/DD/YYYY') + ".");

//This function is creating the new divs for each hour of the work day
// it uses a for loop to print out a row for each hour of the day
// Then appends new items that are created. 
var renderCalendar = () => {
    for (i = 0; i < workDayHours; i++) {
        rowEl = $('<div>').attr("class", "row");
        hourEl = $('<div>' + time[i] + '</div>').attr("class", "col-lg-1 hour");
        col = $('<div>').attr("class", "col-lg-10");
        inputEl = $('<textarea>').attr('value', "").attr("class", "description").attr("id", time[i]);
        index.push(inputEl.attr("id"));
        saveEl = $('<div>').attr("class", "col-lg-1")
        // Creates buttons
        saveBtn = $('<button>').attr("class", "saveBtn").attr("id", time[i]).attr("type", "submit").text("Save");
        clearBtn = $('<button>').attr("class", "clearBtn").attr("id", [i]).attr("type", "submit").text("Clear");
        // Append all items.
        col.append(inputEl)
        saveEl.append(saveBtn);
        saveEl.append(clearBtn);
        rowEl.append(hourEl);
        rowEl.append(col);
        rowEl.append(saveEl);
        holdingContainer.append(rowEl);
    }
    // button click events for save and clear
    $(document).on("click", ".saveBtn", saveSchedule);
    $(document).on("click", ".clearBtn", clearSchedule);
}
// Formats time of day
var timeOfDay = () => {
    var formattedTime = [];
    time = formattedTime;
    for (i = 0; i < workDayHours; i++) {
        var timePoint = (9 + i);
        formattedTime.push((moment().startOf('day').add(timePoint, 'hours').format("HH:mm A")));
    }

}

// This function is going to determine what color to shade the box based on past present or future
// Utilizes an if, else, else if statement and also a foreach method to refer to each timeSlot
// Also had to parseint the TimeSlot.id to compare single intergers
var currentTime = () => {
    currentHour = moment().format("HH:mm A");
    var timeStamp = $('textarea').get();
    var getSched;
    // For each method
    timeStamp.forEach(timeSlot => {
       var timeId = parseInt(timeSlot.id);
        // If time is greater than id then its in the past
        if (parseInt(currentHour) > timeId) {
            timeSlot.classList.value = "description past";
            getSched = localStorage.getItem(timeSlot.id)
             timeSlot.value = getSched;
        }
        //If time is less than id then its future
        else if (parseInt(currentHour) < timeId) {
            timeSlot.classList.value = "description future";
            getSched = localStorage.getItem(timeSlot.id)
            timeSlot.value = getSched;
        }
        //otherwise its the present.
        else { 
            console.log("future Time " + parseInt(timeSlot))
            timeSlot.classList.value = "description present";
            getSched = localStorage.getItem(timeSlot.id)
            timeSlot.value = getSched;
        } 
    });
};


// This function will save the items in the text area into local storage so that when you refresh the page it is still there.
function saveSchedule (event) {
    event.preventDefault()
    var input = $(this).parent().parent().find(".description", ['textarea'])[0].value
    var time = $(this).parent().parent().find(".description", ['textarea'])[0].id;
    localStorage.setItem(time, input)
}
// This function will clear the items in the text area so that when you refresh the page it will be gone and stay gone. 
function clearSchedule () {
    $(this).parent().parent().find(".description", ['textarea'])[0].value ="";
    var input = $(this).parent().parent().find(".description", ['textarea'])[0].value
    var time = $(this).parent().parent().find(".description", ['textarea'])[0].id;
    localStorage.setItem(time, input)
}




// Calling all functions

timeOfDay();
renderCalendar();
currentTime();