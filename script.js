const factibilidadData = {
    metal: [],
    concreto: []
};
let proyectoCount = 0;

function actualizarSuma() {
    const factorResistencia = parseFloat(document.getElementById('factor-resistencia').value) || 0;
    const factorCosto = parseFloat(document.getElementById('factor-costo').value) || 0;
    const factorTiempo = parseFloat(document.getElementById('factor-tiempo').value) || 0;
    const factorVida = parseFloat(document.getElementById('factor-vida').value) || 0;
    
    const suma = factorResistencia + factorCosto + factorTiempo + factorVida;
    document.getElementById('suma-factores').innerText = `Suma actual: ${suma}%`;
    
    if (suma !== 100) {
        document.getElementById('suma-factores').style.color = 'red';
    } else {
        document.getElementById('suma-factores').style.color = 'black';
    }
}

function calcularFactibilidad() {
    const factorResistencia = parseFloat(document.getElementById('factor-resistencia').value) || 0;
    const factorCosto = parseFloat(document.getElementById('factor-costo').value) || 0;
    const factorTiempo = parseFloat(document.getElementById('factor-tiempo').value) || 0;
    const factorVida = parseFloat(document.getElementById('factor-vida').value) || 0;

    const suma = factorResistencia + factorCosto + factorTiempo + factorVida;
    if (suma !== 100) {
        alert("La suma de las casillas debe ser igual a 100.");
        return;
    }

    const metalResistencia = parseFloat(document.getElementById('metal-resistencia').value) || 0;
    const metalCosto = parseFloat(document.getElementById('metal-costo').value) || 0;
    const metalTiempo = parseFloat(document.getElementById('metal-tiempo').value) || 0;
    const metalVida = parseFloat(document.getElementById('metal-vida').value) || 0;

    const concretoResistencia = parseFloat(document.getElementById('concreto-resistencia').value) || 0;
    const concretoCosto = parseFloat(document.getElementById('concreto-costo').value) || 0;
    const concretoTiempo = parseFloat(document.getElementById('concreto-tiempo').value) || 0;
    const concretoVida = parseFloat(document.getElementById('concreto-vida').value) || 0;

    const factibilidadMetal = (metalResistencia * factorResistencia / 100) - (metalCosto * factorCosto / 100) - (metalTiempo * factorTiempo / 100) + (metalVida * factorVida / 100);
    const factibilidadConcreto = (concretoResistencia * factorResistencia / 100) - (concretoCosto * factorCosto / 100) - (concretoTiempo * factorTiempo / 100) + (concretoVida * factorVida / 100);

    factibilidadData.metal.push(factibilidadMetal);
    factibilidadData.concreto.push(factibilidadConcreto);
    proyectoCount++;

    let factibilidadNormalizada = (factibilidadMetal / factibilidadConcreto) * 100;

    let resultadoText = "";

    if (factibilidadMetal >= 0 && factibilidadConcreto >= 0) {
        if (factibilidadNormalizada > 100) {
            resultadoText = `Las estructuras metálicas son factibles (${factibilidadNormalizada.toFixed(2)}%)`;
            document.getElementById('resultado').style.color = "green";
        } else if (factibilidadNormalizada < 100) {
            resultadoText = `Las estructuras metálicas no son factibles (${factibilidadNormalizada.toFixed(2)}%)`;
            document.getElementById('resultado').style.color = "red";
        } else {
            resultadoText = `Ambas estructuras son igualmente factibles (${factibilidadNormalizada.toFixed(2)}%)`;
            document.getElementById('resultado').style.color = "yellow";
        }
    } else if (factibilidadMetal >= 0 && factibilidadConcreto < 0) {
        factibilidadNormalizada *= -1;
        resultadoText = `Las estructuras metálicas son factibles (${factibilidadNormalizada.toFixed(2)}%)`;
        document.getElementById('resultado').style.color = "green";
    } else if (factibilidadMetal < 0 && factibilidadConcreto < 0) {
        if (factibilidadNormalizada > 100) {
            resultadoText = `Las estructuras metálicas no son factibles (${Math.abs(factibilidadNormalizada.toFixed(2))}%)`;
            document.getElementById('resultado').style.color = "red";
        } else {
            resultadoText = `Las estructuras metálicas son factibles (${Math.abs(factibilidadNormalizada.toFixed(2))}%)`;
            document.getElementById('resultado').style.color = "green";
        }
    } else if (factibilidadMetal < 0 && factibilidadConcreto >= 0) {
        factibilidadNormalizada *= -1;
        resultadoText = `Las estructuras metálicas no son factibles (${factibilidadNormalizada.toFixed(2)}%)`;
        document.getElementById('resultado').style.color = "red";
    }

    document.getElementById('resultado').innerText = resultadoText;
    actualizarGrafica();
}

function actualizarGrafica() {
    const chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: "Comparación de Factibilidad"
        },
        axisX: {
            title: "Proyectos"
        },
        axisY: {
            title: "Factibilidad",
            includeZero: true
        },
        data: [{
            type: "column",
            name: "Metal",
            showInLegend: true,
            dataPoints: factibilidadData.metal.map((value, index) => ({ label: `Proyecto ${index + 1}`, y: value })),
            color: "#ff6666"
        },
        {
            type: "column",
            name: "Concreto",
            showInLegend: true,
            dataPoints: factibilidadData.concreto.map((value, index) => ({ label: `Proyecto ${index + 1}`, y: value })),
            color: "#666666"
        }]
    });
    chart.render();
}
