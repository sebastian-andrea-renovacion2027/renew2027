/* =====================================================
   COUNTDOWN
===================================================== */

const countdownTarget = new Date("2027-03-20T16:30:00").getTime();


function updateCountdown(){

    const now = new Date().getTime();

    const distance = countdownTarget - now;


    /* ================================================
       SI LA FECHA YA LLEGÓ
    ================================================ */

    if(distance <= 0){

        document.getElementById("days").textContent = "000";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;

    }


    /* ================================================
       CÁLCULO DEL TIEMPO
    ================================================ */

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (distance / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (distance / 1000) % 60
    );


    /* ================================================
       MOSTRAR RESULTADO
    ================================================ */

    document.getElementById("days").textContent =
        String(days).padStart(3, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}


/* =====================================================
   INICIAR
===================================================== */

updateCountdown();

setInterval(updateCountdown, 1000);