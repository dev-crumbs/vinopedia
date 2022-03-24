export function schedaGlobaleImport() {
  const tempCheck = document.querySelector(".caratteristiche")
  if (tempCheck == null){return;}
  //page headline input
  const headlineFull = document.querySelector(".headline").innerText.split(' – ')
  //console.log(headlineFull[0])
  //console.log(headlineFull[2])
  const listCheck = document.querySelector("div[role='list'] .v-list-item__title")
  d3.text(`/vini/listone.csv`).then(function(data) {
      const csv = d3.csvParse(data);
      const filterGlobalCSV = function(d) {return d.Nome == headlineFull[0] && d.Produttore == headlineFull[2].replaceAll('é', 'e') && d.Entry === "1"}
      const filterSingleCSV = function(d) {return d.Nome == headlineFull[0] && d.Produttore == headlineFull[2].replaceAll('é', 'e') && d.Entry === "2"}
      //tutte le annate
      const nomeCSV = csv.filter(filterGlobalCSV)[0].Nome;
      const regioneCSV = csv.filter(filterGlobalCSV)[0].Regione;
      const nazioneCSV = csv.filter(filterGlobalCSV)[0].Nazione;
      const tipoCSV = csv.filter(filterGlobalCSV)[0].Tipologia;
      const denominazioneCSV = csv.filter(filterGlobalCSV)[0].Denominazione;
      const menzioniCSV = csv.filter(filterGlobalCSV)[0].Menzioni;
      const classificazioneCSV = csv.filter(filterGlobalCSV)[0].Classificazione;
      const produttoreCSV = csv.filter(filterGlobalCSV)[0].Produttore;
      const composizioneCSV = csv.filter(filterGlobalCSV)[0].Composizione;
      const composizioneArray = composizioneCSV.split(' – ')    
      let composizioneLength = composizioneArray.length; //must be let for the condition to work
      const affinamentoCSV = csv.filter(filterGlobalCSV)[0].Affinamento;
      const alcolCSV = csv.filter(filterGlobalCSV)[0].Alcol;
      const prezzoCSV = csv.filter(filterGlobalCSV)[0].Prezzo;
      const abbinamentoCSV = csv.filter(filterGlobalCSV)[0].Abbinamento;
      const abbinamentoArray = abbinamentoCSV.split(' – ')
      //singola annata
      const annateCSVArray = csv.filter(filterSingleCSV)
      const valutazioneCSV = csv.filter(filterSingleCSV)[0].Valutazione;
      const punteggioMedioCSV = csv.filter(filterSingleCSV)[0].PunteggioMedio;

      d3.select('h1').append().text(nomeCSV)
      d3.select('.caratteristiche li:nth-child(1)').append().text(" " + nomeCSV)
      d3.select('.caratteristiche li:nth-child(2)').append().text(" " + tipoCSV)
      d3.select('.caratteristiche li:nth-child(3)').append().html(` <a href="/denominazioni/${nazioneCSV}/${regioneCSV}/${classificazioneCSV}-${denominazioneCSV.replaceAll(' ', '-')}">${denominazioneCSV} ${classificazioneCSV}</a> | ${menzioniCSV}`)
      d3.select('.caratteristiche li:nth-child(4)').append().html(` <a href="/produttori/${nazioneCSV}/${regioneCSV}/${produttoreCSV.replaceAll("' ", '-').replaceAll(' ', '-')}">${produttoreCSV}</a>`)
      for (const i of composizioneArray) {
        const cleanVitigno = i.split(/( \d+)/)[0].replaceAll(' ', '-').replaceAll("'", "-").toLowerCase()
        function nationCheck(){switch(cleanVitigno){case"cabernet-sauvignon":case"cabernet-franc":case"carmenere":return"Francia";case"pinot-nero":return"Francia";case"merlot":return"Francia";case"syrah":return"Francia";default:return"Italia"}}
        if (!--composizioneLength){
          d3.select('.caratteristiche li:nth-child(5)').append().html(` <a href="/vitigni/${nationCheck()}/${cleanVitigno}">${i}</a>`)          
        } else {
          d3.select('.caratteristiche li:nth-child(5)').append().html(` <a href="/vitigni/${nationCheck()}/${cleanVitigno}">${i}</a> -`)
        }
      }
      d3.select('.caratteristiche li:nth-child(6)').append().text(" " + affinamentoCSV)
      d3.select('.caratteristiche li:nth-child(7)').append().text(" " + alcolCSV + "%") 
      d3.select('.caratteristiche li:nth-child(8)').append().text(" " + prezzoCSV + "€")
      for (const i of abbinamentoArray) {
        d3.select('.abbinamento').append("li").text(i)
      }
      for (const i of annateCSVArray) {
        d3.select('.annate').append("li").html(`${nomeCSV} <a href="/vini/${nazioneCSV}/${regioneCSV}/${produttoreCSV.replaceAll("' ", '-').replaceAll(' ', '-').replaceAll("'", '-')}/${nomeCSV.replaceAll(' ', '-').replaceAll("'", '-')}/${i.Anno}">${i.Anno}</a> -- <span class="star-${i.Valutazione}"></span> -- ${i.PunteggioMedio}/100`)
      }
      // add ittle to list
      if (listCheck == null){return;} else {
        document.querySelector("div[role='list'] .v-list-item__title").innerText = headlineFull[0]
      }
  });
}