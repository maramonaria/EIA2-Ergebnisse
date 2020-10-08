"use strict";
window.onload = function () {
    let person = prompt("What's your name?", "Enter here");
    if (person != null) {
        document.getElementById("hello").innerHTML = "Hello " + person + "!";
    }
};
//# sourceMappingURL=script.js.map