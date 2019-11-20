function setImg() {
    // change attribute 'src' of image
    var img = document.getElementById('testImage');

    // check what src exists
    if (img.getAttribute('src') == '../images/rainCloud.png')
        img.setAttribute('src', '../images/sunny.png');
    else
        img.setAttribute('src', '../images/rainCloud.png');
}

function setTransform() {
    var img = document.getElementById('testImage');
    if (img.classList.contains('transform'))
        img.classList.toggle('transform');
    else
        img.classList.add('transform');
}

function setTransition() {
    var img = document.getElementById('testImage');
    if (img.classList.contains('transition'))
        img.classList.toggle('transition');
    else
        img.classList.add('transition');
}

function setAnimation() {
    var img = document.getElementById('testImage');
    if (img.classList.contains('animation'))
        img.classList.toggle('animation');
    else
        img.classList.add('animation');
}