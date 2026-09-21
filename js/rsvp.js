document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("rsvp-form");
    const asistencia = document.getElementById("asiste");
    const acompanantesContainer = document.getElementById("acompanantes-container");
    const acompanantes = document.getElementById("acompanantes");
    const mensaje = document.getElementById("rsvp-message");

    // URL de nuestro Google Apps Script
    const SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbyntNd03f-zEV_pnvqQPj-GIFpCKRRrB9GlKSfzJSx4EXN6h2JJBOUKIPknAvpOcxbL/exec";


    // =====================================================
    // MOSTRAR / OCULTAR ACOMPAÑANTES
    // =====================================================

    asistencia.addEventListener("change", () => {

        if (asistencia.value === "Sí") {

            acompanantesContainer.style.display = "block";

        } else {

            acompanantesContainer.style.display = "none";
            acompanantes.value = "";

        }

    });


    // =====================================================
    // ENVÍO DEL FORMULARIO
    // =====================================================

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const boton = form.querySelector(".rsvp-button");

        // Limpiar mensaje anterior
        mensaje.textContent = "";
        mensaje.classList.remove("visible", "error");

        // Desactivar botón mientras se envía
        boton.disabled = true;
        boton.textContent = "ENVIANDO...";


        // Recoger información
        const datos = {

            nombre: document.getElementById("nombre").value.trim(),

            telefono: document.getElementById("telefono").value.trim(),

            asiste: asistencia.value,

            acompanantes:
                asistencia.value === "Sí"
                    ? acompanantes.value.trim()
                    : "",

            observaciones:
                document.getElementById("observaciones").value.trim()

        };


        try {

            const respuesta = await fetch(SCRIPT_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },

                body: JSON.stringify(datos)

            });


            const resultado = await respuesta.json();


            if (!resultado.success) {
                throw new Error(
                    resultado.error || "No fue posible enviar la confirmación."
                );
            }


            // =================================================
            // CONFIRMACIÓN EXITOSA
            // =================================================

            mensaje.textContent =
                "Gracias por confirmar tu asistencia. Nos encantará compartir este día contigo.";

            mensaje.classList.add("visible");

            form.reset();

            acompanantesContainer.style.display = "none";


        } catch (error) {

            console.error("Error RSVP:", error);

            mensaje.textContent =
                "No fue posible enviar tu confirmación. Por favor, inténtalo nuevamente.";

            mensaje.classList.add("visible", "error");

        } finally {

            boton.disabled = false;
            boton.textContent = "CONFIRMAR ASISTENCIA";

        }

    });

});