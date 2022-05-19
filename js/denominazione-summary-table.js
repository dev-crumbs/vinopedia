import {tableSort} from '/it/js/table-filter.js';
import {denominazioneTableFilter} from '/it/js/table-filter.js';
export function denominazioneSummaryTable(){
  var denominazione = document.querySelector(".denominazioneNome").innerText.replaceAll(' ', '-');
  var denominazioneTipo = document.querySelectorAll(".denominazioneTipo");
  var regione = document.querySelector(".denominazioneRegione").innerText
  var avgPriceArray = [];
  var maxPriceArray = [];
  var avgPrice = 0
  //checks
  const statisticheCheck = document.querySelector(".statistiche-denominazione")
  const denominazioneCheck = document.querySelector(".denominazioneTipo")
  const staticCheck = document.querySelector(".static")
  if (denominazioneCheck == null) {}
  if (staticCheck == null) {} else {
    //setTimeout(function(){
      const priceIntervalAll = document.querySelectorAll(".denominazione-table td[data-th='Prezzo']")
      for (const i of priceIntervalAll) { 
        const priceIntervalEUR = i.innerText.split("€")
        const priceInterval = priceIntervalEUR[0].split("-")
        const priceAvg = ((Number(priceInterval[0])+Number(priceInterval[1]))/2).toFixed(0)
        console.log(priceInterval[1])
        maxPriceArray.push(Number(priceInterval[1]))
        avgPriceArray.push(priceAvg)
        const sum = avgPriceArray.reduce((a, b) => a+b, 0);
        const avg = (sum / avgPriceArray.length) || 0;
        avgPrice = avg
      }
      document.querySelector(".statistiche-denominazione li:nth-child(1) span").innerText = avgPriceArray.length
      document.querySelector(".statistiche-denominazione li:nth-child(2) span").innerText = avgPrice.toFixed(0) + "€"
      document.querySelector(".statistiche-denominazione li:nth-child(3) span").innerText = Math.max(...maxPriceArray) + "€"
      //},1000)
  }
  denominazioneTipo.forEach(el => {
    const denominazioneTipoNome = el.previousElementSibling.getAttribute('data-tn');
    const denominazioneTipoNomeL = denominazioneTipoNome.toLowerCase();
    d3.text(`${denominazione}/${denominazioneTipoNome}.csv`).then( function(data) {
      var sortAscending = true;
      var csv = d3.csvParse(data), allheaders = d3.csvParseRows(data)[0],
      table = d3.select(`[data-tn="${denominazioneTipoNome}"] + .denominazioneTipo div.table-container`).append('table').attr('class','sort denominazione-table');
          var titles = Object.keys(data[0]);
          var headers = table.append('thead').append('tr')
                      .selectAll('th')
                      .data(allheaders).enter()
                      .append('th')
                      .text(function (d) {
                          return d;
                        })
      var rows = table.append('tbody').attr('class','list').selectAll('tr')
                  .data(csv).enter()
                  .append('tr');
      rows.selectAll('td')
        .data(function (d) {
          return allheaders.map(function (k) {
            return { 'value': d[k], 'name': k};
          });
        }).enter()
        .append('td')
        .attr('data-th', function (d) {
          return d.name;
        })
        .attr('title', function (d) {
          return d.value;
        })
        .text(function (d) {
          return d.value;
        });
      //add widths for bars
      rows.selectAll('td[data-th="VScore"], td[data-th="QP"]')
        .style("width", function (d) {
          return ((d.value*90)/100) + "%";
        })
      //add € to filter
      rows.selectAll('td[data-th="Prezzo"]')
        .attr('avg',function(d){
          return d.value + "€";
        })
        .text(function (d) {
          const priceInterval = d.value.split("-")
          const priceAvg = (Number(priceInterval[0])+Number(priceInterval[1]))/2
          maxPriceArray.push(priceAvg)
          avgPriceArray.push(priceAvg)
          return(priceAvg.toFixed(0))
        });
      //add V to filter 
      // rows.selectAll('td[data-th="VScore"]')
      //   .text(function (d) {
      //     return d.value + "V";
      //   });
      // //add QP to filter  
      // rows.selectAll('td[data-th="QP"]')
      //   .text(function (d) {
      //     return d.value + "QP";
      //   });
      //avg calculations
      const sum = avgPriceArray.reduce((a, b) => a+b, 0);
      const avg = (sum / avgPriceArray.length) || 0;
      avgPrice = avg
    }).then(function(){//post content populating js functions
      if (statisticheCheck == null) {} else {
        document.querySelector(".statistiche-denominazione li:nth-child(1) span").innerText = avgPriceArray.length
        document.querySelector(".statistiche-denominazione li:nth-child(2) span").innerText = avgPrice.toFixed(0) + "€"
        document.querySelector(".statistiche-denominazione li:nth-child(3) span").innerText = Math.max(...maxPriceArray).toFixed(0) + "€"
      }
      var startTime = performance.now()
      //ext link 500ms
      const nomeAll = el.querySelectorAll("td[data-th='Vino']");
      nomeAll.forEach(i =>{
        const nome = i.innerText.replaceAll(' ', '-').replaceAll('é','e')
        const produttore = i.previousElementSibling.innerText.replaceAll("' ", '-').replaceAll(' ', '-').replaceAll("'", '-');
        const path = "/it/vini/Italia/" + regione + "/" + produttore + "/" + nome + "/scheda-globale"
        const node = document.createElement("a");
        node.href = path
        node.classList.add("summaryExtLink")
        node.setAttribute("target","_blank")
        if (window.innerWidth < 600) {
              i.append(node)
        } else {
              i.prepend(node)
        }
      });
      //title on th desktop
      if (window.innerWidth >= 600) {
        const thAll = el.querySelectorAll("thead th");
        for (const i of thAll){
          i.setAttribute("title",i.innerText)
        }
      }
      var endTime = performance.now()
      console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
      //remove loader
      const tempCheck = document.querySelector(".loader")
      if (tempCheck == null){
        denominazioneTableFilter()
        setTimeout(tableSort, 1000)
        return;} 
      document.querySelector(".loader-container").remove()
      const dataTable = new simpleDatatables.DataTable(".denominazione-table", {
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
          { select: [3,5,6,7,8,9,10,11], type: "number"},
          { select: 4, type: "number", sort: "desc"}
        ],
        nextPrev: false
      })
    })
  })
}