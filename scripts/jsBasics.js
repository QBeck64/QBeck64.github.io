// Get all user values
function getParams() {
    var start = document.getElementById("startNum").value;
    var count = document.getElementById("addBy").value;
    var stop = document.getElementById("stopAt").value;

    // Loop through and set result field
    startLoop(start, count, stop);
}

// Loop through values
function startLoop(start, count, stop) {
    var x = Number(start);
    var i = 0;
    alert("starting")
    do {
        countArray[i] = x;
        x += count;
        i++;
    } while (x < Number(stop));

    // Two arrays, one has state abbreviations, the other has the full state names. Correspond them by "key" value
    // Make page an info page. Create one person object, name, address, phone, email, etc. Then have "children"
    // be inherited, address etc. except for names and personal info. Methods can be part of the object to combine data, same for
    //creating the new children. 
}