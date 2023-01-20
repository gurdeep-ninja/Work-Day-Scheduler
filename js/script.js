
let scheduleEl = $(".container")

// Select the HTML element #currentDay
let elCurrentDay = $('#currentDay')
// Get the current date and format it like "Thursday, Jan 5th ""
var currentDay = moment().format("dddd, MMM Do");

// change the text of elCurrentDay to the value of currentDay
elCurrentDay.text(currentDay);


// Loop through each item in the schedule array & create the html content
schedule.forEach(function(element){
    //console.log(element.hour)

    //Create a html row using bootstrap class & ass data attribute called hour
    let row = $(`<div class="row" data-hour=${element.hour}>`)

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
    let saveButton = "<button>Save</button>"
    
    // Append the saveButton to divSave
    divSave.append(saveButton)

    // append div* elements to the row
    row.append(divTime)
    row.append(divText)
    row.append(divSave)
    
    // Append the row to scheduleEl (".container")
    scheduleEl.append(row)
    console.log(divTime)
})