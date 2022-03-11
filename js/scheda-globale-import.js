export function schedaGlobaleImport() {
  const tempCheck = document.querySelector(".nome")
  if (tempCheck == null){return;}
  //page headline input
  const headlineFull = document.querySelector(".headline").innerText.split(' – ')
  d3.text(`../../../../listone.csv`).then(function(data) {
      const csv = d3.csvParse(data);
      const nomeCSV = csv.filter(function(d) {return d.Nome == headlineFull[0] && d.Entry === "1"})[0].Nome;
      const regioneCSV = csv.filter(function(d) {return d.Nome == headlineFull[0] && d.Entry === "1"})[0].Regione;
      const nazioneCSV = csv.filter(function(d) {return d.Nome == headlineFull[0] && d.Entry === "1"})[0].Nazione;
      const tipoCSV = csv.filter(function(d) {return d.Nome == headlineFull[0] && d.Entry === "1"})[0].Tipologia;
      const denominazioneCSV = csv.filter(function(d) {return d.Nome == headlineFull[0] && d.Entry === "1"})[0].Denominazione;
      const menzioniCSV = csv.filter(function(d) {return d.Nome == headlineFull[0] && d.Entry === "1"})[0].Menzioni;
      const classificazioneCSV = csv.filter(function(d) {return d.Nome == headlineFull[0] && d.Entry === "1"})[0].Classificazione;
      const produttoreCSV = csv.filter(function(d) {return d.Nome == headlineFull[0] && d.Entry === "1"})[0].Produttore;
      const composizioneCSV = csv.filter(function(d) {return d.Nome == headlineFull[0] && d.Entry === "1"})[0].Composizione;
      const composizioneArray = composizioneCSV.split(' – ')    
      let composizioneLength = composizioneArray.length; //must be let for the condition to work
      const affinamentoCSV = csv.filter(function(d) {return d.Nome == headlineFull[0] && d.Entry === "1"})[0].Affinamento;
      const alcolCSV = csv.filter(function(d) {return d.Nome == headlineFull[0] && d.Entry === "1"})[0].Alcol;
      const prezzoCSV = csv.filter(function(d) {return d.Nome == headlineFull[0] && d.Entry === "1"})[0].Prezzo;
      const abbinamentoCSV = csv.filter(function(d) {return d.Nome == headlineFull[0] && d.Entry === "1"})[0].Abbinamento;
      const abbinamentoArray = abbinamentoCSV.split(' – ')
      //singola annata
      const annateCSVArray = csv.filter(function(d) {return d.Nome == headlineFull[0] && d.Entry === "2"})
      const valutazioneCSV = csv.filter(function(d) {return d.Nome == headlineFull[0] && d.Entry === "2"})[0].Valutazione;
      const punteggioMedioCSV = csv.filter(function(d) {return d.Nome == headlineFull[0] && d.Entry === "2"})[0].PunteggioMedio;

      d3.select('h1').append().text(nomeCSV)
      d3.select('.caratteristiche li:nth-child(1)').append().text(" " + nomeCSV)
      d3.select('.caratteristiche li:nth-child(2)').append().text(" " + tipoCSV)
      d3.select('.caratteristiche li:nth-child(3)').append().html(` <a href="/denominazioni/${nazioneCSV}/${regioneCSV}/${classificazioneCSV}-${denominazioneCSV.replaceAll(' ', '-')}">${denominazioneCSV} ${classificazioneCSV}</a> (${menzioniCSV})`)
      d3.select('.caratteristiche li:nth-child(4)').append().html(` <a href="/produttori/${nazioneCSV}/${regioneCSV}/${produttoreCSV.replaceAll(' ', '-')}">${produttoreCSV}</a>`)
      for (const i of composizioneArray) {
        if (!--composizioneLength){
          d3.select('.caratteristiche li:nth-child(5)').append().html(` <a href="/vitigno/${nazioneCSV}/${i.replaceAll(' ', '-').toLowerCase()}">${i}</a>`)          
        } else {
          d3.select('.caratteristiche li:nth-child(5)').append().html(` <a href="/vitigno/${nazioneCSV}/${i.replaceAll(' ', '-').toLowerCase()}">${i}</a> -`)
        }
      }
      d3.select('.caratteristiche li:nth-child(6)').append().text(" " + affinamentoCSV)
      d3.select('.caratteristiche li:nth-child(7)').append().text(" " + alcolCSV)
      d3.select('.caratteristiche li:nth-child(8)').append().text(" " + prezzoCSV)
      for (const i of abbinamentoArray) {
        d3.select('.abbinamento').append("li").text(i)
      }
      for (const i of annateCSVArray) {
        d3.select('.annate').append("li").html(`${nomeCSV} <a href="/vini/${nazioneCSV}/${regioneCSV}/${produttoreCSV.replaceAll(' ', '-')}/${nomeCSV.replaceAll(' ', '-')}/${i.Anno}">${i.Anno}</a> -- <span class="${valutazioneCSV}"></span> -- ${punteggioMedioCSV}/100`)
      }
  });
}
