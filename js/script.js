
let scheduleEl = $(".container")

// Loop through each item in the schedule array & create the html
schedule.forEach(function(element){
    //console.log(element.hour)

    //Create a html row using bootstrap class & ass data attribute called hour
    let row = $(`<div class="row" data-hour=${element.hour}>`)

    // column for time
    let divTime = $("<div>").addClass("col-2").addClass("my-auto")

    // append ampm to the element.hour so it appears like "12pm etc"
    divTime.text(element.hour12)

    // column for text area
    let divText= $("<div>").addClass("col-8").addClass("my-auto")    

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