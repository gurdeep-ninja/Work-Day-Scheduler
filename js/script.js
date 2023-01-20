
// Select the HTML element .container
let scheduleEl = $(".container")

// Select the HTML element #currentDay
let elCurrentDay = $('#currentDay')

// Get & store the current date using moment.js
var currentDay = moment()

// change the text of elCurrentDay to the value of currentDay and format it like "Thursday, Jan 5th ""
elCurrentDay.text(currentDay.format("dddd, MMM Do"))


// Loop through each item in the schedule array & create the html content
schedule.forEach(function(element){

    // get the hour from the schedule task
    var hour = element.hour

    //Create a html row using bootstrap class & ass data attribute called hour
    let row = $(`<div class="row" data-hour=${hour}>`)

    // column for time
    let divTime = $("<div>").addClass("col-2").addClass("my-auto")

    // append schedule task time using key hour12 (i.e 4pm,5pm etc)
    divTime.text(element.hour12)

    // column for text area
    let divText= $("<div>").addClass("col-8").addClass("my-auto")
    
    // append textarea form input
    divText.append(`<textarea class="form-control" rows="3">${element.hour12}</textarea>`)  

    // column for save button
    let divSave= $("<div>").addClass("col-2").addClass("my-auto")

    // Create save button
    let saveButton = '<button class="saveBtn">Save</button>'
    
    // Append the saveButton to divSave
    divSave.append(saveButton)

    // format the divText colour according to the time
    formatColour(divText, hour)

    // append div* elements to the row
    row.append(divTime)
    row.append(divText)
    row.append(divSave)
    
    // Append the row to scheduleEl (".container")
    scheduleEl.append(row)
})

// A function to format the textArea element according to the current hour
function formatColour(divText, hour){

    //console.log(divText)
    // Get the current Hour
    var thisHour = parseInt(currentDay.format("H"))

    //console.log(`Hour: ${hour} thisHour: ${thisHour}`)

    // if the task has expired add class task-expired
    if (hour < thisHour) {
        $(divText).find("textarea").addClass("task-expired")
        // if its the current task add class task-current
    } else if (hour == thisHour) {
        $(divText).find("textarea").addClass("task-current")
        // if its the next task add class task-next
    } else {
        $(divText).find("textarea").addClass("task-next")
    }
}


// Add an event listener to the save buttons (.saveBtn)
$(".row").on("click",'.saveBtn',function(){

    // Find out task's save button was clicked (stored as data attribute 'data-hour')
    let task = $(event.target).parent().parent().attr("data-hour")

    // get the value of the textarea in the same row as the save button (.saveBtn)

    //let scheduleTaskText = $(event.target).parent().parent().children().eq(1).children(0).val()
    let taskText = $(event.target).parent().prev().find("textarea").val()

    console.log(`task: ${task} text: ${taskText}`)

    let taskObject = {
        hour: task,
        content: taskText
    }
    saveTask(taskObject)
})

// A function to save the schedule task in localStorage
function saveTask(taskObject) {

    // We are going to push an array of objects to our localStorage
    let tasks = []

    // Push task to tasks array
    tasks.push(taskObject)

    localStorage.setItem("tasks", JSON.stringify(taskObject))

}