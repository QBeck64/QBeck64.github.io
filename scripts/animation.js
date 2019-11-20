function setTransform(changeClass) {
    // Get element to work with
    var item = document.getElementById('rainCloud');

    // Check if the chosen class already exists
    if (item.classList.contains(changeClass)) {
        // Then toggle the class
        item.classList.toggle(changeClass);
    }
    else {
        // Set the class
        item.classList.add(changeClass);
    }
}