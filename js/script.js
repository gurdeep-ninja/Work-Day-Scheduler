
let scheduleEl = $(".container")

// Loop through each item in the schedule array & create the html
schedule.forEach(function(element){
    //console.log(element.hour)

    //Create a html row using bootstrap class & ass data attribute called hour
    let row = $(`<div class="row" data-hour=${element.hour}>`)

    // div for time
    let divTime = $("<div>").addClass("col-2").addClass("my-auto")

    // Figure out if schedule time is am or pm
    let ampm

    if(element.hour < 12){
        ampm = 'am'

    } else if (element.hour >= 12 ){
        ampm = 'pm'
    }


    divTime.text(element.hour + ampm)

    // div for text area
    let divText= $("<div>").addClass("col-8").addClass("my-auto")    

    // div for text save
    let divSave= $("<div>").addClass("col-2").addClass("my-auto")
    
    row.append(divTime)
    row.append(divText)
    row.append(divSave)        
    scheduleEl.append(row)
    console.log(divTime)
})