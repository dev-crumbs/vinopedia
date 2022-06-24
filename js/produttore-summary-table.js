import {tableSort} from '/it/js/table-filter.js';
import {denominazioneTableFilter} from '/it/js/table-filter.js';
export function produttoreSummaryTable(){
  var produttore = document.querySelector(".produttoreNome").innerText.replaceAll(' ', '-').replaceAll("'", '-');
  var produttoreTipo = document.querySelectorAll(".produttoreTipo");
  var regione = document.querySelector(".produttoreRegione").innerText.replaceAll("'", '-').replaceAll(' ', '-')
  //checks
  const statisticheCheck = document.querySelector(".statistiche-produttore")
  const produttoreCheck = document.querySelector(".produttoreTipo")
  const staticCheck = document.querySelector(".static")
  if (produttoreCheck == null) {}
  if (staticCheck == null) {} else {
    //setTimeout(function(){
      const priceIntervalAll = document.querySelectorAll(".produttore-table td[data-th='Prezzo']")
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
      document.querySelector(".statistiche-produttore li:nth-child(1) span").innerText = avgPriceArray.length
      document.querySelector(".statistiche-produttore li:nth-child(2) span").innerText = avgPrice.toFixed(0) + "€"
      document.querySelector(".statistiche-produttore li:nth-child(3) span").innerText = Math.max(...maxPriceArray) + "€"
      //},1000)
  }
  produttoreTipo.forEach(el => {
    const produttoreTipoNome = el.previousElementSibling.getAttribute('data-tn');
    const produttoreTipoNomeL = produttoreTipoNome.toLowerCase();
    d3.text(`${produttoreTipoNome}/${produttoreTipoNome}.csv`).then( function(data) {
      //stats variables
      var avgPriceArray = [];
      var maxPriceArray = [];
      var avgPrice = 0
      var avgScoreRawArray = [];
      var avgScoreRaw = 0;
      //
      var sortAscending = true;
      var csv = d3.csvParse(data), allheaders = d3.csvParseRows(data)[0],
      table = d3.select(`[data-tn="${produttoreTipoNome}"] + .produttoreTipo div.table-container`).append('table').attr('class','sort produttore-table');
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
      rows.selectAll('td[data-th="Media Grezza"]')
        .text(function (d) {
          const avg = Number(d.value)
          avgScoreRawArray.push(avg)
          return(avg)
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
      //avg raw score calculations
      const avgScoreRawSum = avgScoreRawArray.reduce((c, d) => c+d, 0);
      const avgAvgScoreRaw = (avgScoreRawSum / avgScoreRawArray.length) || 0;
      avgScoreRaw = avgAvgScoreRaw
      //populate stats
      if (statisticheCheck == null) {} else {
        el.querySelector(".statistiche-produttore li:nth-child(1) span").innerText = avgPriceArray.length
        el.querySelector(".statistiche-produttore li:nth-child(2) span").innerText = avgPrice.toFixed(0) + "€"
        el.querySelector(".statistiche-produttore li:nth-child(3) span").innerText = Math.max(...maxPriceArray).toFixed(0) + "€"
        el.querySelector(".statistiche-produttore li:nth-child(4) span").innerText = avgScoreRaw.toFixed(1)
      }
      //tutti-i-chianti only code
      if (window.location.href.indexOf("/Tutti-i-Chianti") != -1) {
        if(window.innerWidth < 600){
          const allChianti = document.querySelectorAll(".produttore-table tbody td:nth-child(1),.produttore-table tbody td:nth-child(2)")
          for (const i of allChianti) {
            i.style.backgroundColor = "inherit"
          }
          const allClassico = document.querySelectorAll("td[title*='Chianti Classico']")
          for (const i of allClassico) {
            i.parentElement.style.backgroundColor = "#f4f4f4"
          }
        } else {
          const allClassico = document.querySelectorAll("td[title*='Chianti Classico']")
          for (const i of allClassico) {
            const allClassicoParent = i.parentElement.querySelectorAll("td")
            for (const j of allClassicoParent) {
              j.style.backgroundColor = "#f4f4f4"
            }
          }
        }
      }
    }).then(function(){//post content populating js functions
      var startTime = performance.now()
      //ext link 500ms
      const nomeAll = el.querySelectorAll("td[data-th='Vino']");
      nomeAll.forEach(i =>{
        const nome = i.innerText.replaceAll(' ', '-').replaceAll('é','e').replaceAll("'", '-')
        const produttore = document.querySelector(".produttoreNome").innerText.replaceAll("' ", '-').replaceAll(' ', '-').replaceAll("'", '-');
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
        produttoreTableFilter()
        setTimeout(tableSort, 1000)
        return;} 
      document.querySelector(".loader-container").remove()
      const allTables = document.querySelectorAll(".produttore-table")
      for (var i = 0; i < allTables.length; i++) {
        allTables[i].classList.add(`tableNumber${i}`)
        const dataTable = new simpleDatatables.DataTable(`.tableNumber${i}`, {
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
      }
    })
  })
}