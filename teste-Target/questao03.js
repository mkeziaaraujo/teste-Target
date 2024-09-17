// 3) Dado um vetor que guarda o valor de faturamento diário de uma distribuidora, faça um programa,
// na linguagem que desejar, que calcule e retorne:
// • O menor valor de faturamento ocorrido em um dia do mês;
// • O maior valor de faturamento ocorrido em um dia do mês;
// • Número de dias no mês em que o valor de faturamento diário foi superior à média mensal.

// IMPORTANTE:
// a) Usar o json ou xml disponível como fonte dos dados do faturamento mensal;
// b) Podem existir dias sem faturamento, como nos finais de semana e feriados.
// Estes dias devem ser ignorados no cálculo da média;

const fs = require("fs");

function processarFaturamento(dados) {
  if (dados.length === 0) {
    console.log("Nenhum dado de faturamento disponível.");
    return {
      menorValor: null,
      maiorValor: null,
      diasAcimaMedia: 0,
    };
  }

  let menor = Infinity;
  let maior = -Infinity;
  let totalFaturamento = 0;
  let diasComFaturamento = 0;

  dados.forEach((dia) => {
    if (dia.valor !== null && dia.valor !== undefined) {
      if (dia.valor < menor) menor = dia.valor;
      if (dia.valor > maior) maior = dia.valor;
      totalFaturamento += dia.valor;
      diasComFaturamento++;
    }
  });

  const mediaMensal =
    diasComFaturamento > 0 ? totalFaturamento / diasComFaturamento : 0;

  const diasAcimaMedia = dados.filter(
    (dia) => dia.valor !== null && dia.valor > mediaMensal
  ).length;

  return {
    menorValor: diasComFaturamento > 0 ? menor : "Não disponível",
    maiorValor: diasComFaturamento > 0 ? maior : "Não disponível",
    diasAcimaMedia,
  };
}
fs.readFile("../faturamento.json", (err, data) => {
  if (err) {
    console.error("Erro ao ler o arquivo:", err);
    return;
  }

  try {
    const faturamento = JSON.parse(data);
    if (!Array.isArray(faturamento)) {
      throw new Error("O arquivo JSON não contém um array.");
    }

    console.log("Dados lidos do arquivo:", faturamento);

    const resultado = processarFaturamento(faturamento);

    console.log(`Menor valor de faturamento: ${resultado.menorValor}`);
    console.log(`Maior valor de faturamento: ${resultado.maiorValor}`);
    console.log(
      `Número de dias acima da média mensal: ${resultado.diasAcimaMedia}`
    );
  } catch (parseError) {
    console.error("Erro ao processar o JSON:", parseError);
  }
});
