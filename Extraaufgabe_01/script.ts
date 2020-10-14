window.onload = function() {
    let person = prompt("What's your name?", "Enter here");
    document.getElementById("hello")!.innerHTML = "Hello " + person + "!";
}
