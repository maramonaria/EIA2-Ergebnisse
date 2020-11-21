"use strict";
let spielerkarten = []; // Array der Spielerkarten
let gegnerkarten = []; // Array der Gegnerkarten
let ablage = []; // Array für Spielstapel (mit der aktiven Karte oben)
let stapel = [];
let anDerReihe = "player";
window.onload = function () {
    startGame();
};
function startGame() {
    spielerkarten = [];
    gegnerkarten = [];
    ablage = [];
    stapel = [];
    anDerReihe = "player";
    spielSetup();
    // Karten im Html erzeugen
    updateHtml(spielerkarten);
    updateHtml(gegnerkarten);
    updateHtml(ablage);
    updateHtml(stapel);
    document.getElementById("stapel").addEventListener("click", karteNehmen, false);
}
function spielSetup() {
    // Stapel mit allen Karten generieren
    for (let i = 0; i < 4; i++) {
        let color = "";
        if (i == 0)
            color = "green";
        else if (i == 1)
            color = "blue";
        else if (i == 2)
            color = "red";
        else if (i == 3)
            color = "yellow";
        for (let j = 0; j <= 9; j++) {
            let newCard = {
                Farbe: color,
                Wert: j
            };
            stapel.push(newCard);
        }
        for (let j = 1; j <= 9; j++) {
            let newCard = {
                Farbe: color,
                Wert: j
            };
            stapel.push(newCard);
        }
    }
    // Stapel durchmischen
    mischen(stapel);
    // Spieler legt fest, mit wievielen Karten gespielt werden soll
    let n = Number(window.prompt("Mit wievielen Karten spielt ihr? Wähle von 3-10!", ""));
    while (Number.isNaN(n) || n < 3 || n > 10) {
        n = Number(window.prompt("Das war keine erlaubte Zahl! Try again: Wie viele Karten?", ""));
    }
    // Karten austeilen
    while (n) {
        spielerkarten.push(stapel[0]);
        stapel.splice(0, 1);
        gegnerkarten.push(stapel[0]);
        stapel.splice(0, 1);
        n -= 1;
    }
    ablage.push(stapel[stapel.length - 1]); // Startkarte zwischen den Spielern ablegen
    stapel.splice(stapel.length - 1, 1);
}
function karteLegen(_geklickteKarte, _index) {
    if (anDerReihe == "player") {
        if (_geklickteKarte.Farbe == ablage[ablage.length - 1].Farbe || _geklickteKarte.Wert == ablage[ablage.length - 1].Wert) {
            anDerReihe = "pc";
            ablage.push(_geklickteKarte);
            spielerkarten.splice(_index, 1);
            updateHtml(spielerkarten);
            updateHtml(ablage);
            if (spielerkarten.length == 0) {
                setTimeout(function () { window.alert("Du hast gewonnen!"); startGame(); }, 500);
            }
            else if (anDerReihe == "pc")
                gegnerzug();
        }
        else {
            window.alert("Die Karte passt nicht! Spiel eine andere oder nimm eine neue Karte auf.");
        }
    }
}
function karteNehmen() {
    if (anDerReihe == "player") {
        spielerkarten.push(stapel[stapel.length - 1]);
        stapel.splice(stapel.length - 1, 1);
        updateHtml(spielerkarten);
        updateHtml(stapel);
        anDerReihe = "pc";
        gegnerzug();
    }
}
function gegnerzug() {
    let couldLay = false;
    for (let i = 0; i < gegnerkarten.length; i++) {
        // Fall 1: Gegner kann eine Karte legen
        if (gegnerkarten[i].Farbe == ablage[ablage.length - 1].Farbe || gegnerkarten[i].Wert == ablage[ablage.length - 1].Wert) {
            ablage.push(gegnerkarten[i]);
            setTimeout(function () { document.getElementById(gegnerkarten[i].Farbe + gegnerkarten[i].Wert).classList.add("cardtransition"); gegnerkarten.splice(i, 1); }, 500);
            setTimeout(function () { updateHtml(ablage); updateHtml(gegnerkarten); }, 1500);
            couldLay = true;
            break;
        }
    }
    if (couldLay == false) {
        gegnerkarten.push(stapel[stapel.length - 1]);
        stapel.splice(stapel.length - 1, 1);
        setTimeout(function () { updateHtml(stapel); updateHtml(gegnerkarten); }, 1600);
    }
    if (gegnerkarten.length <= 1) {
        setTimeout(function () { window.alert("Gegner hat gewonnen"); startGame(); }, 2000);
    }
    else
        setTimeout(function () { anDerReihe = "player"; }, 2000);
}
// Mischen nach Fisher-Yates Shuffle Algorithmus
function mischen(_kartenarray) {
    let m = _kartenarray.length, t, i;
    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
        // And swap it with the current element.
        t = _kartenarray[m];
        _kartenarray[m] = _kartenarray[i];
        _kartenarray[i] = t;
    }
    return _kartenarray;
}
function updateHtml(_array) {
    let classStr = "";
    if (_array == spielerkarten) {
        classStr = "player";
    }
    else if (_array == gegnerkarten) {
        classStr = "computer";
    }
    else if (_array == stapel) {
        classStr = "stapel";
    }
    else if (_array == ablage) {
        classStr = "ablage";
    }
    // Bisherige Html Elemente aus der Section entfernen
    let myNode = document.getElementById(classStr);
    while (myNode && myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    if (classStr == "player" || classStr == "ablage") {
        for (let i = 0; i < _array.length; i++) {
            createOpenCardHtml(_array, i, classStr);
        }
    }
    else {
        for (let i = 0; i < _array.length; i++) {
            createHiddenCardHtml(_array, i, classStr);
        }
    }
}
function createOpenCardHtml(_array, _arrayIndex, _classString) {
    let holdingDiv = document.createElement("div");
    holdingDiv.setAttribute("class", _classString + " " + "card" + " " + _array[_arrayIndex].Farbe);
    holdingDiv.setAttribute("id", _array[_arrayIndex].Farbe + _array[_arrayIndex].Wert);
    document.getElementById(_classString).appendChild(holdingDiv);
    let i = 5;
    while (i) {
        let numberP = document.createElement("p");
        numberP.innerHTML = "" + _array[_arrayIndex].Wert;
        if (i == 5) {
            numberP.setAttribute("class", "topleft");
        }
        else if (i == 4) {
            numberP.setAttribute("class", "topright");
        }
        else if (i == 3) {
            numberP.setAttribute("class", "middle");
        }
        else if (i == 2) {
            numberP.setAttribute("class", "bottomleft");
        }
        else if (i == 1) {
            numberP.setAttribute("class", "bottomright");
        }
        holdingDiv.appendChild(numberP);
        i -= 1;
    }
    if (_classString == "player") {
        holdingDiv.addEventListener("click", function () { karteLegen(_array[_arrayIndex], _arrayIndex); }, false);
    }
}
// Verdeckte Karte in HTML erstellen
function createHiddenCardHtml(_array, _arrayIndex, _classString) {
    let holdingDiv = document.createElement("div");
    holdingDiv.setAttribute("class", _classString + " " + "card" + " " + "backside");
    holdingDiv.setAttribute("id", _array[_arrayIndex].Farbe + _array[_arrayIndex].Wert);
    document.getElementById(_classString).appendChild(holdingDiv);
    let image = document.createElement("img");
    image.setAttribute("src", "parquet.png");
    holdingDiv.appendChild(image);
}
//# sourceMappingURL=script.js.map