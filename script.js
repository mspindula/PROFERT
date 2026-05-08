const formulario =
document.getElementById("formulario");

const hpd =
document.getElementById("hpd");

const hfe =
document.getElementById("hfe");

const peso =
document.getElementById("peso");

const totalVagoes =
document.getElementById("totalVagoes");

const pesoMedio =
document.getElementById("pesoMedio");



function calcular() {

    const valorHPD =
    parseFloat(hpd.value) || 0;

    const valorHFE =
    parseFloat(hfe.value) || 0;

    const total =
    valorHPD + valorHFE;

    totalVagoes.value = total;

    const pesoLiquido =
    parseFloat(peso.value) || 0;

    if(total > 0){

        pesoMedio.value =
        (pesoLiquido / total)
        .toFixed(2);

    } else {

        pesoMedio.value = 0;

    }

}



hpd.addEventListener(
    "input",
    calcular
);

hfe.addEventListener(
    "input",
    calcular
);

peso.addEventListener(
    "input",
    calcular
);




formulario.addEventListener(
    "submit",
    async (e) => {

    e.preventDefault();



    // PEGA A DATA

    const dataSelecionada =
    document.getElementById("data").value;



    // GERA O DIA AUTOMÁTICO

    const partes =
dataSelecionada.split("-");

const dia =
parseInt(partes[2]);




  const dados = {

    data: dataSelecionada,

    dia: dia,

    produto:
    document.getElementById("produto").value,

    hpd: hpd.value,

    hfe: hfe.value,

    totalVagoes: totalVagoes.value,

    peso: peso.value,

    pesoMedio: pesoMedio.value

};

console.log(dados);
    try {

        await fetch(

            "https://script.google.com/macros/s/AKfycbwWInvRfe9ZsU0WxZzvhtsPfPI7sUqKlzmhSBF875A_jwyH4RzUDlxsLAMZ4xWO2nQX/exec",

            {

                method: "POST",

                mode: "no-cors",

                headers: {

                    "Content-Type":
                    "application/json"

                },

                body:
                JSON.stringify(dados)

            }

        );



        document
        .getElementById("mensagem")
        .innerHTML =
        "Dados enviados com sucesso!";



        formulario.reset();

        totalVagoes.value = "";

        pesoMedio.value = "";



    } catch(error){

        console.error(error);

        document
        .getElementById("mensagem")
        .innerHTML =
        "Erro ao conectar.";

    }

});