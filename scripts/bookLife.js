/*******************************************************
 * The onLoad() function that runs at startup, settign data
 * and setting event listeners
 *******************************************************/
function onLoad() {
    // Set Event Listeners
}

/*********************************************************
 * Function to get user input and search books using 
 * our other predefined functions
 *********************************************************/
function searchBooks() {
    // Get our user input, the title of the book
    var title = document.getElementById('searchInput').value;

    // Run Search Function
    getBooks(title);
}

/********************************************************
 * A simple AJAX call to consume a JSON object
 ********************************************************/
function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);              
        }
    });
    req.send(null);
}

/***********************************************************
 * Function to search for books from Google Books API
 ***********************************************************/
function getBooks(title) {
    // Define URL for Book Search, we are also limiting the results to 10 results
    var url = "https://www.googleapis.com/books/v1/volumes?q=" + title + "&maxResults=10";
    //Use of AJAX call to get book results
    ajaxGet(url, function (response) {
        // Set data
        var data = JSON.parse(response);
        console.log(data);
    });
}