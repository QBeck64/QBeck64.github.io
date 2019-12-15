/*******************************************************
 * The onLoad() function that runs at startup, settign data
 * and setting event listeners
 *******************************************************/
function onLoad() {
    // Display Library shelf contents from local storage
    getLibrary();

    // Set Account Details
    setAccount();

}

/*********************************************************
 * Function to show/hide div depending on which Button is 
 * clicked
 *********************************************************/
function setNavigation(Btn) {
    var searchBar = document.getElementById('searchBar');
    var search = document.getElementById('search');
    var account = document.getElementById('account');
    var arrow = document.getElementById('arrow');
    var bookShelf = document.getElementById('library');
    if (Btn == "account") {
        if (account.style.display == "block")
            account.style.display = "none";
        else
            account.style.display = "block";

        // Change arrow on Account
        arrow.classList.toggle('down');
        // No need to hide any others for this one
    }
    
    if (Btn == 'bookSearch') {
        // Show search content
        searchBar.style.display = "block";
        search.style.display = "block";
        // Hide the rest
        bookShelf.style.display = "none";
    }

    if (Btn == 'bookShelf') {
         // Show BookShelf content
        bookShelf.style.display = "block";
           // Hide the rest
        search.style.display = "none";     
        searchBar.style.display = "none";
    }
}

/*********************************************************
 * Save Name function
 *********************************************************/
function saveName() {
    var name = document.getElementById('username').value;
    if (name != '') {
        localStorage.setItem('bookLifeName', JSON.stringify(name));
    }
}

/*********************************************************
 * setAccount() Fills in all data in the account Div
 *********************************************************/
function setAccount() {
    if (localStorage.getItem('bookLifeName') != null)
        // Set Name field
        document.getElementById('username').value = JSON.parse(localStorage.getItem('bookLifeName'));
    if (localStorage.getItem('library') != null) {
        var library = JSON.parse(localStorage.getItem('library'));
        // Set the total books number
        document.getElementById('totalBooks').innerHTML = library.length;

        // Now get the total number of Read books to pass to totalRead()
        var read = 0;
        for (var i = 0; i < library.length; i++) {
            if (library[i].read == 1)
                read++;
        }

        // Run totalRead() function to display progress wheel
        totalRead(read, library.length);
    }
}

/*********************************************************
 * Set Canvas Progress Circle to show amount of Books Read
 * out of the entire Library!
 *********************************************************/
function totalRead(read, total) {
// Establish all our variables
var canv = document.getElementById("my_canvas").getContext('2d');
var al = 0; // amount loaded
var start = 4.72; // Start point of canvas circle
var cw = canv.canvas.width; // current width
var ch = canv.canvas.height; // current height
var diff; // Diff of percentage to amount loaded, relative to 6.28 (math.pie * 2) ?
    var readTotal = (read / total) * 100;

function progressSim() {
	// Whats the difference? (diff)
	diff = ((al / 100) * Math.PI * 2 * 10).toFixed(2); // Make sure has 2 decimals
	canv.clearRect(0, 0, cw, ch);
	canv.lineWidth = 10;
	canv.fillStyle = 'black';
	canv.strokeStyle = "#09F";
	canv.textAlign = 'center';
	canv.fillText(al + '%', cw * .5, ch * .5, cw);
	canv.beginPath();
	canv.arc(45, 45, 40, start, diff / 10 + start, false);
	canv.stroke();
	if (al >= readTotal) {
		clearTimeout(sim);
	}
	al++;
}

var sim = setInterval(progressSim, 50);

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

/**********************************************************
 * Receive and create Shelf Divs
 * Receives the innerHTML necessary for creating Shelf
 * Divs and then adds them to the document
 * Used for filling both the Search and library divs
 **********************************************************/
function fillShelves(book, targetDiv) {
    // Create the shelf Div
    var shelfDiv = document.createElement('Div');
    shelfDiv.setAttribute('class', 'shelf');

    shelfDiv.innerHTML = book;

    // Append shelf to target Div
    document.getElementById(targetDiv).appendChild(shelfDiv);

}

/***********************************************************
 * Function to search for books from Google Books API
 ***********************************************************/
function getBooks(title) {
    // Define URL for Book Search, we are also limiting the results to 9 results
    var url = "https://www.googleapis.com/books/v1/volumes?q=" + title + "&maxResults=9";
    //Use of AJAX call to get book results
    ajaxGet(url, function (response) {
        // Set data
        var data = JSON.parse(response);
        // Log the Data to the Console for our own purposes
        console.log(data);

        // Set empty variable to be used as the fill up of list items, will be cleared each time a row is finished
        var bookDetails = "";
        var count = 1;
        for (var i = 0; i < data.items.length; i++) {
            // Add inner Html which will be used to add to a shelf
            var image = data.items[i].volumeInfo.imageLinks.thumbnail;
            var title = data.items[i].volumeInfo.title;
            var description = data.items[i].volumeInfo.description;

            var tempBook = {
                title: title,
                image: image,
                description: description,
                read: 0
            };

            // If user decides to save we need to have tempm image stored in localStorage
            localStorage.setItem('tempBook' + i, JSON.stringify(tempBook));
            
            bookDetails += '<div style="display: inline-block;"><ul style="list-style-type: none;">';
            bookDetails += '<li><img src="' + image + '" class="bookCover"></li>';
            bookDetails += '<li style="text-align: center;"><button onClick="saveBook(' + i + ')">Add to Library</button></li>';
            //close our div
            bookDetails += '</ul></div>';
            
            // Check if divisble by 3, if so add everything to document
            if (count == 3) {
                // Use function add a shelf to the page
                fillShelves(bookDetails, 'search');

                bookDetails = "";
                count = 0;
            }
            count++;
        }
    });
}

/*********************************************************
 * On click, save selected book details to local storage
 *********************************************************/
function saveBook(tempId) {
    // Get image from temp storage
    var book = JSON.parse(localStorage.getItem('tempBook' + tempId));

    // // Make sure the library json object exists in local storage
    if (localStorage.getItem('library') != null) {
        var library = JSON.parse(localStorage.getItem('library'));

        // Loop through library and make sure the Book does not already exist
        var exists = false;
        for (var i = 0; i < library.length; i++) {
            if (library[i].title == book.title) {
                exists = true;
            }
        }
        if (exists == false) {
            // Add book
            library.push(book);

            //Save back to local storage
            localStorage.setItem('library', JSON.stringify(library));
            // reload library
            getLibrary();
        }
        // If the book does exist already, inform the user
        else {
            alert('The Book, "' + book.title + '", already exists in your library');
        }
    }
    // If it does not, then we need to create and add to it
    else {
        var library = [];
        library.push(book);

        // Set new library array to local Storage
        localStorage.setItem('library', JSON.stringify(library));

        // update library
        getLibrary();
    }
}

/********************************************************
 * Fill Library shelves, just like the getBooks() function
 * except no AJAX call is required
 *********************************************************/
function getLibrary() {
    // Clear out contents of libraryDiv
    document.getElementById("library").innerHTML = "";

    // Create Book objects from the library JSON object in Local Storage
    var library = JSON.parse(localStorage.getItem('library'));

    // Loop through the library
    var bookDetails = "";
    var count = 1;
    for (var i = 0; i < library.length; i++) {
        bookDetails += '<div style="display: inline-block;"><ul style="list-style-type: none;">';
        bookDetails += '<li><img src="' + library[i].image + '" class="bookCover"></li>';
        bookDetails += '<li style="text-align: center;"><button onClick="markRead(' + i + ', ' + library[i].read + ')">';
        if (library[i].read == 0) {
            bookDetails += 'Mark Read</button ></li > ';
        }
        else {
            bookDetails += 'Mark Un-Read</button ></li > ';
        }
        
        //close our div
        bookDetails += '</ul></div>';
            
        // If we've hit the end of the library and it is not divisble by 3
        if (count != 3 && (i + 1) == library.length) {
            // Use function add a shelf to the page
            fillShelves(bookDetails, 'library');

            bookDetails = "";
            count = 0;
        }
        // Check if divisble by 3, if so add everything to document
        if (count == 3) {
            // Use function add a shelf to the page
            fillShelves(bookDetails, 'library');

            bookDetails = "";
            count = 0;
        }

        count++;
    }
}

/**************************************************************
 * markRead() Mark or unmark a book as read
 *************************************************************/
function markRead(index, status) {
    // Get our library JSON object
    var library = JSON.parse(localStorage.getItem('library'));

    // Using our passed index, change the read status
    if (status == 0) {
        library[index].read = 1;
    }
    else {
        library[index].read = 0;
    }

    // Save our library object back to localStorage
    localStorage.setItem('library', JSON.stringify(library));

    // Reset libraryDiv again
    getLibrary();
}