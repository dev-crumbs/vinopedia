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
  const regioneHSan = regioneH[0].replaceAll(' ', '-').replaceAll("'", '-')
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
      d3.select('.caratteristiche li:nth-child(3)').append("a").text(`${classificazioneCSV} ${denominazioneCSV}`)
      d3.select('.caratteristiche li:nth-child(3) a').attr("href",`/denominazioni/${nazioneCSV}/${regioneCSV.replaceAll("'", '-').replaceAll(' ', '-')}/${classificazioneCSV}-${denominazioneCSV.replaceAll("'", '-').replaceAll(' ', '-')}`)
      d3.select('.caratteristiche li:nth-child(3)').append("span").text(` | ${menzioniCSV}`)
      d3.select('.caratteristiche li:nth-child(4)').append("a").text(`${produttoreCSV}`)
      d3.select('.caratteristiche li:nth-child(4) a').attr("href",`/produttori/${nazioneCSV}/${regioneCSV}/${produttoreCSV.replaceAll("' ", '-').replaceAll(' ', '-')}`)
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

      for (const i of abbinamentoArray) {
        d3.select('.abbinamento').append("li").text(i)
      }
      for (const i of annateCSVArray) {
        d3.select('.annate').append("li").html(`${nomeCSV} <a href="/it/vini/${nazioneCSV}/${regioneCSV}/${produttoreCSV.replaceAll("' ", '-').replaceAll(' ', '-').replaceAll("'", '-')}/${nomeCSV.replaceAll(' ', '-').replaceAll("'", '-')}/annata-${i.Anno}">${i.Anno}</a> -- <span class="star-${i.Valutazione}"></span> -- ${i.PunteggioMedio}/100`)
      }
      // add ittle to list
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
    return nazioneCSV;
  }).then(function myFunction(data) {;
        //second csv
      let nazione2 = headlineFull[3].split(" (")
      let regione2 = nazione2[0].replaceAll(" ", "-").replaceAll("'", "-")
      nazione2 = nazione2[1]
      if(nazione2 == "IT)"){
        nazione2 = "Italia"
      }                           
      const denominazioneFull2 = document.querySelector(".grid-list.caratteristiche li:nth-child(3) a").innerText.replaceAll(" ", "-").replaceAll("'", "-").replaceAll("é", "e")
      const denominazione2 = denominazioneFull2.split("-")
      if(denominazione2[1] == "Generico"){
         d3.select('.vscore').text("Non è possibile una comparazione equa per questo vino")
         d3.select('.qp').remove()
      } else {
         d3.text(`/denominazioni/${nazione2}/${regione2}/${denominazioneFull2}/${denominazioneFull2}.csv`).then(function(data) {
         const csv2 = d3.csvParse(data);
         const filterInDen = function(d) {return d.Vino == headlineFull[0] && d.Produttore == headlineFull[2]}
         // retrieve qp and v
         const VScore = csv2.filter(filterInDen)[0].VScore;
         const QP = csv2.filter(filterInDen)[0].QP;
    
         d3.select('.vscore').append().text(" " + VScore)
         d3.select('.qp').append().text(" " + QP)
       })
      }
  })
}