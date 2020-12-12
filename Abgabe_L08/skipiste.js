"use strict";
var Skipiste;
(function (Skipiste) {
    window.addEventListener("load", buildPiste);
    let crc2;
    function buildPiste() {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = canvas.getContext("2d");
        drawBackground();
        drawSun({ x: 650, y: 80 });
        drawCloud({ x: 250, y: 100 }, { x: 150, y: 50 });
        drawCloud({ x: 550, y: 200 }, { x: 100, y: 40 });
        drawMountains({ x: 0, y: crc2.canvas.height / 2.6 }, "grey", "lightgrey");
        drawSkipiste();
        drawSkilift();
        drawSkifahrer();
        drawTrees();
    }
    function drawBackground() {
        console.log("Back");
        let gradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "#3198FF");
        gradient.addColorStop(.3, "white");
        gradient.addColorStop(1, "#7096A9");
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }
    function drawSun(_position) {
        console.log("Sun", _position);
        let r1 = 20;
        let r2 = 70;
        let gradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(60, 100%, 70%, 1");
        gradient.addColorStop(1, "HSLA(60, 100%, 50%, 0)");
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }
    function drawCloud(_position, _size) {
        console.log("Cloud", _position, _size);
        let nParticles = 25;
        let radiusParticle = 30;
        let particle = new Path2D();
        let gradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0,100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }
    function drawMountains(_position, _colorLow, _colorHigh) {
        console.log("Mountains");
        let stepMin = 20;
        let stepMax = 130;
        let x = 0;
        let _min;
        let _max = 370;
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            _min = -0.3 * x + 350;
            _max = _min + 150;
            let y = -_min - Math.random() * (_max - _min);
            crc2.lineTo(x, y);
        } while (x < crc2.canvas.width);
        crc2.lineTo(x, 0);
        crc2.closePath();
        let gradient = crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(1, _colorHigh);
        crc2.fillStyle = gradient;
        crc2.fill();
        crc2.restore();
    }
    function drawSkipiste() {
        console.log("Skipiste");
        crc2.save();
        crc2.beginPath();
        crc2.moveTo(0, crc2.canvas.height / 8);
        crc2.lineTo(crc2.canvas.width, crc2.canvas.height / 2.6);
        crc2.lineTo(crc2.canvas.width, crc2.canvas.height);
        crc2.lineTo(0, crc2.canvas.height);
        crc2.closePath();
        let gradient = crc2.createLinearGradient(crc2.canvas.width, 160, 0, crc2.canvas.height);
        gradient.addColorStop(0, "HSL(200, 99%,99%)");
        gradient.addColorStop(1, "HSL(190, 20%, 60%)");
        crc2.fillStyle = gradient;
        crc2.fill();
        crc2.restore();
    }
    function drawSkilift() {
        console.log("Lift");
        drawSchlepper({ x: 700, y: 750 });
        drawLifthaus({ x: 600, y: 800 });
    }
    function drawSchlepper(_position) {
        console.log("Schlepplift");
        let nPoles = 8;
        let pole = new Path2D();
        let poleWidth = 5;
        let poleHeight = 90;
        pole.rect(0, 0, poleWidth, -poleHeight);
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.moveTo(0, -poleHeight);
        crc2.lineTo(-100 * nPoles, -(nPoles * poleHeight * 0.8) - poleHeight);
        crc2.closePath();
        crc2.stroke();
        crc2.beginPath();
        crc2.moveTo(15, -poleHeight - 10);
        crc2.lineTo(-100 * (nPoles - 1) + 15, -((nPoles - 1) * poleHeight * 0.8) - poleHeight - 10);
        crc2.closePath();
        crc2.stroke();
        crc2.fillStyle = "HSL(5, 20%, 30%)";
        for (let drawn = 0; drawn < nPoles; drawn++) {
            crc2.fill(pole);
            crc2.transform(1, 0, 0, 1, -100, -poleHeight * 0.8);
        }
        crc2.restore();
        crc2.save();
        crc2.translate(_position.x + 15, _position.y - 10);
        crc2.fillStyle = "HSL(5, 20%, 50%)";
        for (let drawn = 0; drawn < nPoles; drawn++) {
            crc2.fill(pole);
            crc2.transform(1, 0, 0, 1, -100, -poleHeight * 0.8);
        }
        crc2.restore();
    }
    function drawLifthaus(_position) {
        console.log("Lifthaus");
        crc2.save();
        let houseWidth = 90;
        let houseHeight = 40;
        let roofTip = 80;
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(houseWidth, houseHeight);
        crc2.lineTo(houseWidth, -houseHeight);
        crc2.lineTo(0, -houseHeight);
        crc2.closePath();
        crc2.fillStyle = "HSL(20, 50%, 30%)";
        crc2.fill();
        crc2.beginPath();
        crc2.moveTo(0, -houseHeight);
        crc2.lineTo(houseWidth / 2, -roofTip);
        crc2.lineTo(houseWidth, -houseHeight);
        crc2.closePath();
        crc2.fillStyle = "HSL(0, 60%, 50%)";
        crc2.fill();
        crc2.restore();
    }
    function drawSkifahrer() {
        console.log("Skifahrer");
        let skiCount = 10;
        crc2.save();
        for (let i = 0; i < skiCount; i++) {
            let x = Math.random() * 350 + 50;
            let y = Math.random() * 500 + 450;
            drawSingleSkifahrer({ x: x, y: y });
            crc2.restore();
        }
    }
    function drawSingleSkifahrer(_position) {
        console.log("Single Skifahrer");
        let skincolor = "HSL(30, 80%, " + Math.random() * 100 + "%)";
        let shirtrandom = Math.random() * 360;
        let shirtcolor = "HSL(" + shirtrandom + ", 70%, 50%)";
        let trousercolor = "HSL(" + shirtrandom + ", 60%, 20%)";
        crc2.save();
        crc2.translate(_position.x, _position.y);
        //head
        crc2.beginPath();
        crc2.arc(0, 0, 5, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fillStyle = skincolor;
        crc2.fill();
        //skier
        crc2.lineWidth = 4;
        crc2.lineCap = "round";
        crc2.beginPath();
        crc2.moveTo(-20, 35);
        crc2.lineTo(4, 48);
        crc2.moveTo(-11, 34);
        crc2.lineTo(15, 48);
        crc2.strokeStyle = "brown";
        crc2.stroke();
        //beine
        crc2.lineWidth = 5;
        crc2.beginPath();
        crc2.moveTo(-6, 25);
        crc2.lineTo(-4, 33);
        crc2.lineTo(-11, 40);
        crc2.moveTo(1, 25);
        crc2.lineTo(3, 31);
        crc2.lineTo(0, 39);
        crc2.strokeStyle = trousercolor;
        crc2.stroke();
        crc2.closePath();
        // body
        crc2.beginPath();
        crc2.moveTo(-10, 25);
        crc2.bezierCurveTo(-5, 0, 5, 0, 5, 25);
        crc2.closePath();
        crc2.fillStyle = shirtcolor;
        crc2.fill();
        //arm
        crc2.lineWidth = 4;
        crc2.beginPath();
        crc2.moveTo(-2, 8);
        crc2.lineTo(-12, 15);
        crc2.lineTo(-13, 25);
        crc2.strokeStyle = shirtcolor;
        crc2.stroke();
        crc2.closePath();
        //stock
        crc2.beginPath();
        crc2.lineWidth = 1;
        crc2.moveTo(-11, 23);
        crc2.lineTo(-30, 40);
        crc2.strokeStyle = "HSL(0,0%,0%)";
        crc2.stroke();
        crc2.closePath();
        crc2.restore();
    }
    function drawTrees() {
        console.log("Trees");
    }
})(Skipiste || (Skipiste = {}));
//# sourceMappingURL=skipiste.js.map