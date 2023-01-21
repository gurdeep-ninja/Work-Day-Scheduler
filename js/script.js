
// Select the HTML element .container
// this element is populated with bootstrap rows for each task
let elSchedule = $("#schedule")

// Select the HTML element #currentDay
let elCurrentDay = $('#currentDay')

let elSaveMessage = $("#save-message p")

// Get & store the current date using moment.js
let currentDay = moment()

// change the text of elCurrentDay to the value of currentDay and format it like "Thursday, Jan 5th ""
elCurrentDay.text(currentDay.format("dddd, MMM Do"))

// schedule[] is an array of scheduled task objects in schedule.js
// Loop through each item in the schedule array & create the html content
schedule.forEach(function (element) {

    // get the hour from the schedule task
    let hour = element.hour

    //Create a html row using bootstrap class & ass data attribute called hour
    let row = $(`<div class="row g-0" data-hour=${hour}>`)

    // column for time
    let divTime = $("<div>").addClass("col-2 time")

    // append schedule task time using key hour12 (i.e 4pm,5pm etc)
    divTime.text(element.hour12)

    // column for text area
    let divText = $("<div>").addClass("col-8 p-0")

    // create a variable to store a textarea element html
    let textAreaContent = $("<textarea>").addClass("form-control").attr("rows", "3")

    // access any tasks stored in localStorage item 'tasks'
    let storedTasks = JSON.parse(localStorage.getItem('tasks'))

    if (storedTasks !== null) {

        // Find out if an existing task details exist against the task being populated in the schedule
        let existingTask = storedTasks.findIndex((task => task.hour === element.hour))


        // append textarea form input
        // If the task already has content in localStorage, populate the textAreaContent with existing content
        if (existingTask != -1) {
            //textAreaContent = (`<textarea class="form-control" rows="3">${}</textarea>`)
            textAreaContent.text(storedTasks[existingTask].content)

        }
    } else {
        // If the task does not already exist in localStorage, populate textAreaContent with empty value
        //textAreaContent = (`<textarea class="form-control" rows="3"></textarea>`)
        textAreaContent.text("")
    }

    // append the textarea to the divText column
    divText.append(textAreaContent)

    // column for save button
    let divSave = $("<div>").addClass("col-2 p-0")

    // Create save button
    let saveButton = '<button class="saveBtn"><i class="fa-solid fa-floppy-disk"></i></button>'

    // Append the saveButton to divSave
    divSave.append(saveButton)

    // format the divText colour according to the time
    formatColour(divText, hour)

    // append div* elements to the row
    row.append(divTime)
    row.append(divText)
    row.append(divSave)

    // Append the row to elSchedule (".container")
    elSchedule.append(row)
})

// A function to format the textArea element according to the current hour
function formatColour(divText, hour) {

    //console.log(divText)
    // Get the current Hour
    let thisHour = parseInt(currentDay.format("H"))

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
$(".row").on("click", '.saveBtn', function () {

    // Find out task's save button was clicked (stored as data attribute 'data-hour')
    let task = parseInt($(event.target).parent().parent().attr("data-hour"))

    // get the value of the textarea in the same row as the save button (.saveBtn)

    //let scheduleTaskText = $(event.target).parent().parent().children().eq(1).children(0).val()
    let taskText = $(event.target).parent().prev().find("textarea").val()

    //console.log(`task: ${task} text: ${taskText}`)

    // format the new task as an object
    let taskToSave = {
        hour: task,
        content: taskText
    }

    // Call the saveTask function and pass the taskToSave{} object
    saveTask(taskToSave)
})

/* A function to save the schedule task in localStorage.
 This also checks if an existing task exists and will overwrite it if needed */
function saveTask(taskToSave) {

    // We are going to push an array of objects to our localStorage
    // create empty array
    let storedTasks = []

    // If the local storage is not empty, then we want to update the existing task being saved
    if (localStorage.getItem("tasks") !== null) {

        /// get the current tasks from localStorage and store in storedTasks variable
        storedTasks = JSON.parse(localStorage.getItem('tasks'))

        //console.log(storedTasks)
        //console.log(tasks)

        /* Using findIndex array method to check if the task already has content
         this is to ensure we are not adding extra objects that will have the same 
         hour key */
        let existingTask = storedTasks.findIndex((task => task.hour === taskToSave.hour))

        // If the task already has content, update it with the new content
        if (existingTask != -1) {

            storedTasks[existingTask].content = taskToSave.content

            //console.log(storedTasks)

            // If the task is new then push it to the storedTasks array[]
        } else {
            storedTasks.push(taskToSave)
        }

        //console.log(existingTask)
        //console.log(storedTasks)

        /* If there is no localStorage item 'tasks', then we will create it by 
        pushing our first task to be saved to the storedTasks[] array */
    } else {

        storedTasks.push(taskToSave)

    }

    // save the schedule tasks in localStorage item 'tasks'
    localStorage.setItem('tasks', JSON.stringify(storedTasks))

    // display save message
    elSaveMessage.css({visibility:"visible", opacity: 0.0}).animate({opacity: 1.0},1000);
}