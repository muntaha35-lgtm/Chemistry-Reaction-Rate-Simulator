window.addEventListener("DOMContentLoaded", function () {

    const temperature = document.getElementById("temperature");
    const concentration = document.getElementById("concentration");

    const temperatureValue = document.getElementById("temperatureValue");
    const concentrationValue = document.getElementById("concentrationValue");
    const rateValue = document.getElementById("rateValue");
    const rateStatus = document.getElementById("rateStatus");

    const canvas = document.getElementById("reactionGraph");
    const ctx = canvas.getContext("2d");

    function calculateRate() {

        const temp = Number(temperature.value);
        const conc = Number(concentration.value);

        const rate = conc * (1 + temp / 25);

        temperatureValue.textContent = temp;
        concentrationValue.textContent = conc.toFixed(1);
        rateValue.textContent = rate.toFixed(2);

        if (rate < 2) {
            rateStatus.textContent = "Reaction speed: Slow";
        } else if (rate < 4) {
            rateStatus.textContent = "Reaction speed: Moderate";
        } else {
            rateStatus.textContent = "Reaction speed: Fast";
        }

        drawGraph(conc, temp);
    }

    function drawGraph(conc, currentTemp) {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const left = 60;
        const bottom = 250;
        const width = 500;
        const height = 200;

        ctx.beginPath();
        ctx.moveTo(left, 30);
        ctx.lineTo(left, bottom);
        ctx.lineTo(left + width, bottom);
        ctx.stroke();

        ctx.beginPath();

        for (let temp = 0; temp <= 100; temp++) {

            const rate = conc * (1 + temp / 25);

            const x = left + (temp / 100) * width;
            const y = bottom - (rate / 6) * height;

            if (temp === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.stroke();

        const currentRate = conc * (1 + currentTemp / 25);

        const pointX = left + (currentTemp / 100) * width;
        const pointY = bottom - (currentRate / 6) * height;

        ctx.beginPath();
        ctx.arc(pointX, pointY, 6, 0, 2 * Math.PI);
        ctx.fill();

        ctx.font = "14px Arial";

        ctx.fillText("Temperature (°C)", 245, 290);
        ctx.fillText("Reaction Rate", 5, 20);

        ctx.fillText("0", 55, 270);
        ctx.fillText("25", 175, 270);
        ctx.fillText("50", 300, 270);
        ctx.fillText("75", 425, 270);
        ctx.fillText("100", 545, 270);
    }

    temperature.addEventListener("input", calculateRate);
    concentration.addEventListener("input", calculateRate);

    calculateRate();

});