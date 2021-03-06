export function schedaGlobaleImport() {
  //Checks
  const tempCheck = document.querySelector(".caratteristiche")
  const listCheck = document.querySelector("div[role='list'] .v-list-item__title")
  const spumanteCheck = document.querySelector(".spumantizzazione")
  const noteCheck = document.querySelector(".note")
  if (tempCheck == null){return;}
  //page headline input
  const headlineFull = document.querySelector(".headline").innerText.split(' – ')
  const regioneH = headlineFull[3].split(' (')
  const regioneHSan = regioneH[0].toLowerCase().replaceAll(' ', '-').replaceAll("'", '-')
  d3.text(`/vini/${regioneHSan}.csv`).then(function myFunction(data) {
      const csv = d3.csvParse(data);
      const filterGlobalCSV = function(d) {return d.Nome == headlineFull[0] && d.Produttore == headlineFull[2] && d.Entry === "1"}
      const filterSingleCSV = function(d) {return d.Nome == headlineFull[0] && d.Produttore == headlineFull[2] && d.Entry === "2"}
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
      const noteCSV = csv.filter(filterGlobalCSV)[0].Note;
      //punteggi
      const RS = csv.filter(filterGlobalCSV)[0].RS;
      const QP = csv.filter(filterGlobalCSV)[0].QP;
      const punteggioAIS = csv.filter(filterGlobalCSV)[0].AIS;
      const punteggioGR = csv.filter(filterGlobalCSV)[0].GR;
      const mediaGlobale = csv.filter(filterGlobalCSV)[0].PunteggioMedio;
      //spumantizzazione
      const millesimoCSV = csv.filter(filterGlobalCSV)[0].Millesimo;
      const tecnicaCSV = csv.filter(filterGlobalCSV)[0].Tecnica;
      const zuccheroCSV = csv.filter(filterGlobalCSV)[0].Zucchero;
      //singola annata
      const annateCSVArray = csv.filter(filterSingleCSV)
      const valutazioneCSV = csv.filter(filterSingleCSV)[0].Valutazione;
      const punteggioMedioCSV = csv.filter(filterSingleCSV)[0].PunteggioMedio;
    
      d3.select('h1').append().text(nomeCSV)
      d3.select('.caratteristiche li:nth-child(1)').append("span").text(" " + nomeCSV)
      d3.select('.caratteristiche li:nth-child(2)').append("span").text(" " + tipoCSV)
      if (classificazioneCSV){ 
        d3.select('.caratteristiche li:nth-child(3)').append("a").text(`${classificazioneCSV + " " + denominazioneCSV}`)
      } else {
        d3.select('.caratteristiche li:nth-child(3)').append("a").text(`${denominazioneCSV}`)      
      }
      d3.select('.caratteristiche li:nth-child(3) a').attr("href",`/denominazioni/${nazioneCSV}/${regioneCSV.replaceAll("'", '-').replaceAll(' ', '-')}/${classificazioneCSV}-${denominazioneCSV.replaceAll("'", '-').replaceAll(' ', '-')}`)
      d3.select('.caratteristiche li:nth-child(3)').append("span").text(` | ${menzioniCSV}`)
      d3.select('.caratteristiche li:nth-child(4)').append("a").text(`${produttoreCSV}`)
      d3.select('.caratteristiche li:nth-child(4) a').attr("href",`/produttori/${nazioneCSV}/${regioneCSV.replaceAll("'", '-').replaceAll(' ', '-')}/${produttoreCSV.replaceAll("' ", '-').replaceAll(' ', '-')}`)
      for (const i of composizioneArray) {
        const cleanVitigno = i.split(/( \d+)/)[0].replaceAll(' ', '-').replaceAll("'", "-").toLowerCase()
        function nationCheck(){switch(cleanVitigno){case"cabernet-sauvignon":return"Francia";case"cabernet-franc":return"Francia";case"carmenere":return"Francia";case"pinot-noir":return"Francia";case"merlot":return"Francia";case"syrah":return"Francia";case"sauvignon-blanc":return"Francia";case"chardonnay":return"Francia";case"pinot-blanc":return"Francia";case"kerner":return"Germania";case"muller-thurgau":return"Svizzera";default:return"Italia"}}
        if (!--composizioneLength){
          d3.select('.caratteristiche li:nth-child(5)').append("a").text(`${i}`) 
          d3.select(`.caratteristiche li:nth-child(5) a:nth-of-type(${composizioneArray.indexOf(i) + 1})`).attr("href", `/vitigni/${nationCheck()}/${cleanVitigno}`)         
        } else {
          d3.select('.caratteristiche li:nth-child(5)').append("a").text(`${i}`) 
          d3.select(`.caratteristiche li:nth-child(5) a:nth-of-type(${composizioneArray.indexOf(i) + 1})`).attr("href", `/vitigni/${nationCheck()}/${cleanVitigno}`)
          d3.select('.caratteristiche li:nth-child(5)').append("span").text(" - ")
        }
      }
      if (spumanteCheck == null){      
        d3.select('.caratteristiche li:nth-child(6)').append("span").text(" " + affinamentoCSV)
        d3.select('.caratteristiche li:nth-child(7)').append("span").text(" " + alcolCSV + "%") 
        d3.select('.caratteristiche li:nth-child(8)').append("span").text(" " + prezzoCSV + "€")
      } else {
        d3.select('.caratteristiche li:nth-child(6)').append("span").text(" " + alcolCSV + "%")
        d3.select('.caratteristiche li:nth-child(7)').append("span").text(" " + prezzoCSV + "€")
      }
      // punteggi
      if (mediaGlobale == "nd"){
        d3.select('.m-glo').remove();
      } else {
        d3.select('.m-glo').append("p").text("Media Globale")
        d3.select('.m-glo').append("p").text(mediaGlobale)
      }
      if (punteggioAIS == "nd"){
        d3.select('.m-ais').remove();
      } else {
        d3.select('.m-ais').append("p").text("Media AIS")
        d3.select('.m-ais').append("p").text(punteggioAIS)
      }
      if (punteggioGR == "nd"){
        d3.select('.m-gr').remove()
      } else {
        d3.select('.m-gr').append("p").text("Media G.Rosso")
        d3.select('.m-gr').append("p").text(punteggioGR)
      }
      //RS-QP
       d3.select('.vscore').append("p").text("V Score")
       d3.select('.vscore').append("p").html(RS + "/100")
       d3.select('.qp').append("p").text("Qualità Prezzo")
       d3.select('.qp').append("p").text(QP + "/100")
      //abbinamenti
      for (const i of abbinamentoArray) {
        d3.select('.abbinamento').append("li").text(i)
      }
      //annate
      const annateHead = d3.select('.annate-table thead tr')
          annateHead.append("th").text("Annata")
          annateHead.append("th").text("Media")
          annateHead.append("th").text("AIS")
          annateHead.append("th").text("Gambero Rosso")
      for (const i of annateCSVArray) {
        const annateBodyRow = d3.select('.annate-table tbody').append("tr")
          annateBodyRow.append("td").html(`<a href="/it/vini/${nazioneCSV}/${regioneCSV}/${produttoreCSV.replaceAll("' ", '-').replaceAll(' ', '-').replaceAll("'", '-')}/${nomeCSV.replaceAll(' ', '-').replaceAll("'", '-')}/annata-${i.Anno}">${i.Anno}</a>`) 
          annateBodyRow.append("td").html(`${i.Valutazione}<span class="star"></span> -- ${i.PunteggioMedio}/100`)
          if (i.ValutazioneAIS == "nd") {
            annateBodyRow.append("td").html(`${i.ValutazioneAIS}`).attr("data-label","AIS")
          } else {
            annateBodyRow.append("td").html(`${i.ValutazioneAIS}<span class="star"></span> -- ${i.AIS}/100`).attr("data-label","AIS")
          }   
          if (i.ValutazioneGR == "nd") {
            annateBodyRow.append("td").html(`${i.ValutazioneGR}`).attr("data-label","Gambero Rosso")
          } else {
          annateBodyRow.append("td").html(`${i.ValutazioneGR}<span class="star"></span> -- ${i.GR}/100`).attr("data-label","Gambero Rosso")   
          }
      }
      // add title to list
      if (spumanteCheck == null){
        
      } else {
        d3.select('.spumantizzazione li:nth-child(1)').append("span").text(" " + millesimoCSV)
        d3.select('.spumantizzazione li:nth-child(2)').append("span").text(" " + tecnicaCSV)
        d3.select('.spumantizzazione li:nth-child(3)').append("span").text(" " + zuccheroCSV)
        d3.select('.spumantizzazione li:nth-child(4)').append("span").text(" " + affinamentoCSV)
      }
      if (noteCheck == null){ } else{
        d3.select('.note').append().text(noteCSV)
      }
      if (listCheck == null){return;} else {
        document.querySelector("div[role='list'] .v-list-item__title").innerText = headlineFull[0]
      }
  })
}