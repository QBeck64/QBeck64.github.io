function setTransition() {
    // Get element to work with
    var item = document.getElementById('rainCloud');
    if (item.style.transition)
        item.style.removeProperty('transition');
    else
        item.style.transition = "all 4s";
}

function setTransform() {
    // Get element to work with
    var item = document.getElementById('rainCloud');

    if (item.style.transform)
        item.style.removeProperty('transform')
    else
        item.style.transform = "rotate(40deg)"; 
}

function setAnimation() {
    // Get element to work with
    var item = document.getElementById('animate');
    var pos = 0;
    var id = setInterval(frame, 10);
    function frame() {
        if (pos == 500) {
            clearInterval(id);
        }
        else {
            pos++;
            item.style.left = pos + 'px';
        }
    }
}