import {tableSort} from '/it/js/table-filter.js';
import {denominazioneTableFilter} from '/it/js/table-filter.js';
export function denominazioneSummaryTable(){
  //new
  const headlineCaption = document.querySelector(".caption").innerText.split(' | ')
  const nazione = headlineCaption[1]
  const regione = headlineCaption[2].replaceAll(" ", "-").replaceAll("'", "-");
  const years = [2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003]
  //endnew
  var denominazioneArray = document.querySelectorAll(".denominazioneTipo");
  for (const el of denominazioneArray){
    const denominazione = el.getAttribute('data-tn')
    //function declarations
    //destroyEmptiness
    function destroyEmptiness(){
      //var startTime2 = performance.now()
      for (const i of years) {
        const all132 = document.querySelector(`.denominazioneTipo[data-tn="${denominazione}"] .denominazione-table th[data-th="${i}"]`)
        const all13 = document.querySelectorAll(`.denominazioneTipo[data-tn="${denominazione}"] .denominazione-table td[data-th="${i}"]`)
        const all = []
        for (const j of all13) {
            all.push(j.innerText)
        }
        const allEqual = arr => arr.every( v => v === arr[0] )

        if (allEqual(all) == true){ 
            all132.remove()
            for (const i of all13){
                i.remove()
            }
        }
      }
      const loaderCheck = document.querySelector(".loader-container")
        if(loaderCheck) {loaderCheck.remove()} else {}
      //var endTime2 = performance.now()
      //console.log(`Call to doSomething took ${endTime2 - startTime2} milliseconds`)  
    }
    //calcSinglePrice
    function calcPrice(i) {
      const splitPrices = i.Prezzo.split("-");
      const avgPrice = (Number(splitPrices[0]) + Number(splitPrices[1])) / 2
      return avgPrice
    }
    //open csv first time
    d3.text(`/vini/${regione.toLowerCase()}.csv`).then( function(data) {
      const csv = d3.csvParse(data); 
      const winesFilter = function(d) {
        if (denominazione == "Denominazioni Del Cesanese"){
          return d.Denominazione == "Cesanese Del Piglio" && d.Entry === "1" || d.Denominazione == "Cesanese Di Affile" && d.Entry === "1" || d.Denominazione == "Cesanese Di Olevano Romano" && d.Entry === "1"
        } else {
          return d.Denominazione == denominazione && d.Entry === "1"
        }
      }
      const winesList = csv.filter(winesFilter)        
      //table pop
      const produttoreHead = d3.select(`.denominazioneTipo[data-tn="${denominazione}"] .denominazione-table thead tr`)
      produttoreHead.append("th").text("Produttore")
      produttoreHead.append("th").text("Vino")
      produttoreHead.append("th").text("Media Grezza")
      produttoreHead.append("th").text("Prezzo")
      produttoreHead.append("th").text("RS")
      produttoreHead.append("th").text("QP")
      for (const i in years) {
        produttoreHead.append("th").text(`${years[i]}`).attr("data-th",`${years[i]}`).attr("title","sv")
      }
      for (const i of winesList) {
        const produttoreBodyRow = d3.select(`.denominazioneTipo[data-tn="${denominazione}"] .denominazione-table tbody`).append("tr").attr("data-th", `${i.Produttore}-${i.Nome}`)
        produttoreBodyRow.append("td").attr("data-th", "Produttore").attr("title", `${i.Produttore}`).html(`<a href="/it/produttori/${nazione}/${regione}/${i.Produttore.replaceAll(' ', '-').replaceAll("'", '-')}.html">${i.Produttore}</a>`)
        const produttoreURL = document.querySelector(".headline").innerText.replaceAll("' ", '-').replaceAll(' ', '-').replaceAll("'", '-').replaceAll("è", 'e').replaceAll("à", 'a').replaceAll("é", 'e').replaceAll("ù", 'u') 
        produttoreBodyRow.append("td").attr("data-th", "Vino").attr("title", `${i.Nome}`).html(`<a href="/it/vini/${nazione}/${regione}/produttoreURL/${i.Nome.replaceAll(' ', '-').replaceAll("'", '-')}/scheda-globale.html">${i.Nome}</a>`)
        produttoreBodyRow.append("td").attr("data-th", "Media Grezza").text(`${i.MediaGrezza}`)
        produttoreBodyRow.append("td").attr("data-th", "Prezzo").html(`${calcPrice(i)}`)
        produttoreBodyRow.append("td").attr("data-th", "RS").attr("title", `${i.RS}`).style("width", function (d) {return ((i.RS*90)/100) + "%"}).text(`${i.RS}`)
        produttoreBodyRow.append("td").attr("data-th", "QP").attr("title", `${i.QP}`).style("width", function (d) {return ((i.QP*90)/100) + "%"}).text(`${i.QP}`)
        for (const j in years) {
            produttoreBodyRow.append("td").attr("data-th", `${years[j]}`).attr("title", "sv").text("sv")
        }  
      }
      //statistiche denominazionee prima di dataTable
      const arrayWines = document.querySelectorAll(`.denominazioneTipo[data-tn="${denominazione}"] .denominazione-table td[data-th='Vino']`)
      //media delle medie
      const arrayAvgTd = document.querySelectorAll(`.denominazioneTipo[data-tn="${denominazione}"] .denominazione-table td[data-th='Media Grezza']`)
      const arrayAvgString = []
      for (const i of arrayAvgTd) {
          arrayAvgString.push(i.innerText)
      }
      const arrayAvg = arrayAvgString.map(Number)
      const sumAvg = arrayAvg.reduce((a, b) => a+b, 0);
      const globalAvg = ((sumAvg / arrayAvg.length) || 0).toFixed(1);
      //prezzo medio    
      const arrayPriceTd = document.querySelectorAll(`.denominazioneTipo[data-tn="${denominazione}"] .denominazione-table td[data-th='Prezzo']`)
      const arrayPriceString = []
      for (const i of arrayPriceTd) {
          arrayPriceString.push(i.innerText)
      }
      const arrayPrice = arrayPriceString.map(Number)
      const sumPrice = arrayPrice.reduce((a, b) => a+b, 0);
      const globalPrice = ((sumPrice / arrayPrice.length) || 0).toFixed(0);
      document.querySelector(`.denominazioneTipo[data-tn="${denominazione}"] .statistiche-denominazione li:nth-child(1) span`).innerText = arrayWines.length
      document.querySelector(`.denominazioneTipo[data-tn="${denominazione}"] .statistiche-denominazione li:nth-child(2) span`).innerText = globalPrice + "€"
      document.querySelector(`.denominazioneTipo[data-tn="${denominazione}"] .statistiche-denominazione li:nth-child(3) span`).innerText = Math.max(...arrayPrice) + "€"
      document.querySelector(`.denominazioneTipo[data-tn="${denominazione}"] .statistiche-denominazione li:nth-child(4) span`).innerText = globalAvg        
    }).then(function(){   
      //safer to open csv a second time for bigger tables
      d3.text(`/vini/${regione.toLowerCase()}.csv`).then( function(data) {
        const csv = d3.csvParse(data);
        const wineFilter = function(d) {
          if (denominazione == "Denominazioni Del Cesanese"){
            return d.Denominazione == "Cesanese Del Piglio" && d.Entry === "2" || d.Denominazione == "Cesanese Di Affile" && d.Entry === "2" || d.Denominazione == "Cesanese Di Olevano Romano" && d.Entry === "2"
          } else {
            return d.Denominazione == denominazione && d.Entry === "2"
          }
        }
        const wineList = csv.filter(wineFilter)
        for (const k of wineList) {
          d3.select(`.denominazioneTipo[data-tn="${denominazione}"] .denominazione-table tr[data-th="${k.Produttore}-${k.Nome}"] td[data-th="${k.Anno}"]`).attr("title", `${k.Valutazione}`).text(`${k.Valutazione}`)
        }
      }).then(destroyEmptiness).then(function(){
        //start dataTable after everything else
        const dataTable = new simpleDatatables.DataTable(`.denominazioneTipo[data-tn="${denominazione}"] .denominazione-table`, {
          layout: {
            top: "{search}",
            bottom: "{pager}",
          },
          labels: {
            placeholder: "Cerca nella tabella",
            perPage: "{select} risultati per pagina",
            noRows: "Nessun risultato corrispondente",
            info: "{start} to {end} of {rows} entries",
          },
        searchable: true,
          columns: [
            { select: [3,5,6,7], type: "number"},
            { select: 4, type: "number", sort: "desc"}
          ],
          nextPrev: false
        })
      })
      })
  } //for (const i od denominazioneArray)
}