
// Loop through each item in the schedule array & create the html
schedule.forEach(function(element){
    //console.log(element.hour)

    //Create a html row using bootstrap class & ass data attribute called hour
    let row = $(`<div class="row" data-hour=${element.hour}>`)
    
    // div for time
    let divTime = $("<div>").addClass("col-2").addClass("my-auto")
    console.log(divTime)
})