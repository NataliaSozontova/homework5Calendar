
var date = $("#currentDay");
var container = $(".container");

//assign current date value 
var today = moment().format('dddd, MMMM Do YYYY');
console.log(today);
date.text(today);

//create time blocks
function blocks() {

    var times = ["9AM", "10AM", "11AM", "12AM", "1PM", "2PM", "3PM", "4PM", "5PM"];

    for (var i = 0; i < times.length; i++) {
        var rowTimeBlock = $("<div>").attr({ class: "row time-block", id: i + 9 });

        var hourEl = $("<div>").attr({ for: "text-input", class: "col-2 hour" });
        hourEl.text(times[i]);
        rowTimeBlock.append(hourEl);

        var descriptionEl = $("<textarea>").attr({ class: "col-8 form-control description", type: "text", id: "hour-" + (i + 9) });

        rowTimeBlock.append(descriptionEl);

        var buttonEl = $("<button>").attr("class", "col-2 saveBtn");
        var icon = $("<i>").attr("class", "fa fa-save");
        buttonEl.append(icon);

        rowTimeBlock.append(buttonEl);

        container.append(rowTimeBlock);
    }
}

//change color of time block based on current time:
// grey - paste time
// red - current time
// green - future time
function timeBlockColor() {
    var currentHour = parseInt(moment().format('h')) + 12;
    console.log(currentHour);
    console.log(typeof (currentHour));

    for (var i = 0; i < 9; i++) {
        var time = parseInt(document.getElementsByClassName("row")[i].id);
        console.log(time);
        var textArea = document.getElementsByClassName("description")[i];
        console.log(textArea);

        if (time > currentHour) {
            textArea.className += " future";
        } else if (time < currentHour) {
            textArea.className += " past";
        } else if (time === currentHour) {
            textArea.className += " present";
        }
    }
    console.log($(this));
}

blocks();
timeBlockColor()

//store entered event it in the local storage when user clicks the save button
$(".saveBtn").on("click", function (event) {
    event.preventDefault();
    var hour = $(this)[0].previousElementSibling.id;
    console.log($(this)[0].previousElementSibling.value);
    localStorage.setItem(hour, $(this)[0].previousElementSibling.value.trim());
});

function readFromLocalStorage() {
    for (var i = 9; i < 18; i++) {
        $("#hour-" + i).val(localStorage.getItem("hour-" + i));
    }
}

readFromLocalStorage();

