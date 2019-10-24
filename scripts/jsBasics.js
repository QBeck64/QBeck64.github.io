// Event listeners, when checkbox is selected
function displaySelect(checkbox) {
    // Show duplicate selector when checkbox is selected
    if (checkbox.checked == true) {
        document.getElementById("duplicates").style.display = "block";
    } else {
        // When the checkbox is not selected, hide select and set value to 1
        document.getElementById("duplicates").style.display = "none";
        document.getElementById("duplicates").value = "1";
    }
}

function getBaseCar() {
    // Get all input values
    var make = document.getElementById("make").value;
    var model = document.getElementById("model").value;
    var year = document.getElementById("year").value;
    var count = document.getElementById("duplicates").value;

    for (var i = 0; i < count; i++) {
        //  create car object
        var baseCar = new baseCarObject(make, model, year);
        // Send car object to be made into array and saved to local storage
        storeObject(baseCar);
        loadStorage();
    }
}

// Create a base car object
function baseCarObject(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.production = localStorage.length;
}

//Store Base object to Local Storage
function storeObject(baseCarObject) {
    var carArray = { make: baseCarObject.make, model: baseCarObject.model, year: baseCarObject.year, production:baseCarObject.production };
    console.log(carArray);

    // Set array in localstorage
    localStorage.setItem('baseCar' + baseCarObject.production, JSON.stringify(carArray));
}

//On page load or when called, display data from localstorage
function loadStorage() {
    for (var i = 0; i < localStorage.length; i++) {
        var localData = localStorage.getItem(localStorage.key(i));

        var divText = "<p>" + localData + "</p>";
        document.getElementById("newFeatures").innerHTML += divText;
    }
} 

// Clear local storage data
function clearStorage() {
    localStorage.clear();
    loadStorage();
}

// Add image to body
function addImage() {
    document.getElementById("mainDiv").className = 'backImage';
}

// Remove image from body
function removeImage() {
    document.getElementById("mainDiv").classList.remove('backImage');
}

function toggleDiv() {
    document.getElementById("centerDiv").classList.toggle('center');
}










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