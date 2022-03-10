export function schedaGlobaleImport() {
  //page headline input
  const headlineFull = document.querySelector(".headline").innerText.split(' – ')
  d3.text(`../../../../listone.csv`).then(function(data) {
      const csv = d3.csvParse(data);
      const nomeCSV = csv.filter(function(d) {return d.Nome == headlineFull[0] && d.Entry === "1"})[0].Nome;
      const tipoCSV = csv.filter(function(d) {return d.Nome == headlineFull[0] && d.Entry === "1"})[0].Tipologia;
      const denominazioneCSV = csv.filter(function(d) {return d.Nome == headlineFull[0] && d.Entry === "1"})[0].Denominazione;
      const classificazioneCSV = csv.filter(function(d) {return d.Nome == headlineFull[0] && d.Entry === "1"})[0].Classificazione;
      const produttoreCSV = csv.filter(function(d) {return d.Nome == headlineFull[0] && d.Entry === "1"})[0].Produttore;
      const composizioneCSV = csv.filter(function(d) {return d.Nome == headlineFull[0] && d.Entry === "1"})[0].Composizione;    
      const affinamentoCSV = csv.filter(function(d) {return d.Nome == headlineFull[0] && d.Entry === "1"})[0].Affinamento;
      const alcolCSV = csv.filter(function(d) {return d.Nome == headlineFull[0] && d.Entry === "1"})[0].Alcol;
      const prezzoCSV = csv.filter(function(d) {return d.Nome == headlineFull[0] && d.Entry === "1"})[0].Prezzo;
      const abbinamentoCSV = csv.filter(function(d) {return d.Nome == headlineFull[0] && d.Entry === "1"})[0].Abbinamento;
      //const annateCSV = csv.filter(function(d) {return d.Nome == headlineFull[0] && d.Entry === "1"})[0].Prezzo;

      d3.select('.caratteristiche li:nth-child(1)').append().text(" " + nomeCSV);
      d3.select('.caratteristiche li:nth-child(2)').append().text(" " + tipoCSV)
      d3.select('.caratteristiche li:nth-child(3)').append().text(" " + denominazioneCSV + " " + classificazioneCSV)
      d3.select('.caratteristiche li:nth-child(4)').append().text(" " + produttoreCSV)
      d3.select('.caratteristiche li:nth-child(5)').append().text(" " + composizioneCSV)
      d3.select('.caratteristiche li:nth-child(6)').append().text(" " + affinamentoCSV)
      d3.select('.caratteristiche li:nth-child(7)').append().text(" " + alcolCSV)
      d3.select('.caratteristiche li:nth-child(8)').append().text(" " + prezzoCSV)
      d3.select('.abbinamento').append().text(" " + abbinamentoCSV)
      //d3.select('.annate').append().text(" " + annateCSV)
  });
}
