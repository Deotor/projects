var nav1 = document.getElementsByClassName("navElement1");
console.log(nav1);
for (var i = 0; i < nav1.length; i++) {
    nav1[i].addEventListener('click', writeTooLocalStorage1, true);
}

function writeTooLocalStorage1() {
    localStorage.setItem('navElementKey', this.innerHTML);
}

if (localStorage.getItem('navElementKey')){
    for (var m = 0; m < nav1.length; m++){
        if (nav1[m].innerHTML == localStorage.getItem('navElementKey')){
            nav1[m].style.cssText = 'background-color: white; color: black;';
        } else {
        }
    }
}

