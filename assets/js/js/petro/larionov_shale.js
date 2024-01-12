let igr = document.getElementById("igr");
let result = document.getElementById("result");
let resultPorc = document.getElementById("resultPorc");
let calculateButton = document.getElementById("calculateButton");
let errorMessage = document.getElementById("errorMessage");

const activateButton = () => {
    if (igr.value.trim() === "") {
        calculateButton.setAttribute("disabled", "true");
    } else {
        calculateButton.removeAttribute("disabled");
    }
    result.value = "";
    resultPorc.value = "";
};

igr.onkeyup = activateButton;

const clearErrorMessage = () => {
    setInterval(() => {
        errorMessage.innerHTML = "";
    }, 3000);
};

function calc() {
    errorMessage.innerHTML = "";
    let a = parseFloat(igr.value);

    if (!a) {
        errorMessage.innerHTML = "Todos os valores são necessários";
        clearErrorMessage();
        return;
    }

    if (a < 0) {
        errorMessage.innerHTML = "Todos os valores devem ser positivos";
        clearErrorMessage();
        return;
    }

    if (a > 1) {
        errorMessage.innerHTML = "Os valores de IGR devem ser um número decimal";
        clearErrorMessage();
        return;
    }

    if (isNaN(a)) {
        errorMessage.innerHTML = "Todos os valores devem ser números";
        clearErrorMessage();
        return;
    }

    // Larionov shale volume formula
    let b = (.083 * (Math.pow(2, 3.71 * a) - 1)).toFixed(4);
    let c = (100 * b).toFixed(2);

    if (c < 0 || c > 100) {
        errorMessage.innerHTML = "O resultado não deve ser superior a 100% nem negativo. Verifique seus valores";
        clearErrorMessage();
        return;
    }

    result.value = b;
    resultPorc.value = `${c} %`;
}

calculateButton.onclick = calc;