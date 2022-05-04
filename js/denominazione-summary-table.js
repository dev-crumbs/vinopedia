import {tableSort} from '/it/js/table-filter.js';
export function denominazioneSummaryTable(){
  //checks
  const statisticheCheck = document.querySelector(".statistiche-denominazione")
  const denominazioneCheck = document.querySelector(".denominazioneTipo")
  if (denominazioneCheck == null) {}
  var denominazione = document.querySelector(".denominazioneNome").innerText.replaceAll(' ', '-');
  var denominazioneTipo = document.querySelectorAll(".denominazioneTipo");
  var regione = document.querySelector(".denominazioneRegione").innerText
  var avgPriceArray = [];
  var maxPriceArray = [];
  var avgPrice = 0
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
      var rows = table.append('tbody').selectAll('tr')
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
      rows.selectAll('td[data-th="V Score"], td[data-th="Q/P"]')
        .style("width", function (d) {
          return ((d.value*90)/100) + "%";
        })
      //add € to filter
      rows.selectAll('td[data-th="Prezzo"]')
        .text(function (d) {
          const priceInterval = d.value.split("-")
          const priceAvg = (Number(priceInterval[0])+Number(priceInterval[1]))/2
          maxPriceArray.push(Number(priceInterval[1]))
          avgPriceArray.push(priceAvg)
          return d.value + "€";
        });
      //add V to filter 
      rows.selectAll('td[data-th="V Score"]')
        .text(function (d) {
          return d.value + "V";
        });
      //add Q/P to filter  
      rows.selectAll('td[data-th="Q/P"]')
        .text(function (d) {
          return d.value + "QP";
        });
      //avg calculations
      const sum = avgPriceArray.reduce((a, b) => a+b, 0);
      const avg = (sum / avgPriceArray.length) || 0;
      avgPrice = avg
    }).then(function(){//post content populating js functions
      if (statisticheCheck == null) {} else {
        document.querySelector(".statistiche-denominazione li:nth-child(1) span").innerText = avgPriceArray.length
        document.querySelector(".statistiche-denominazione li:nth-child(2) span").innerText = avgPrice.toFixed(0) + "€"
        document.querySelector(".statistiche-denominazione li:nth-child(3) span").innerText = Math.max(...maxPriceArray) + "€"
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
      // add sorting filters
      const firstTh = el.querySelector('th:nth-child(1)');
        firstTh.setAttribute("scope","col");
        firstTh.classList.add("table__header");
      const secondTh = el.querySelector('th:nth-child(2)');
        secondTh.setAttribute("scope","col");
        secondTh.classList.add("table__header");
      const thirdTh = el.querySelector('th:nth-child(3)');
        thirdTh.setAttribute("scope","col");
        thirdTh.classList.add("table__header");
      const fourthTh = el.querySelector('th:nth-child(4)');
        fourthTh.setAttribute("scope","col");
        fourthTh.classList.add("table__header");
        fourthTh.setAttribute("data-type","number");
        fourthTh.classList.add("table__header");
      const fifthTh = el.querySelector('th:nth-child(5)');
        fifthTh.setAttribute("scope","col");
        fifthTh.setAttribute("data-type","number");
        fifthTh.classList.add("table__header");
      const sixTh = el.querySelector('th:nth-child(6)');
        sixTh.setAttribute("scope","col");
        sixTh.setAttribute("data-type","number");
        sixTh.classList.add("table__header");
      //hide sv cells on mobile
      if (window.innerWidth <= 600) {
        for (const i of document.querySelectorAll("td")) {
          if (i.textContent.includes("sv")) {
            i.style.display = "none"
          }
        }
      } else {
        const thAll = el.querySelectorAll("thead th");
        for (const i of thAll){
          i.setAttribute("title",i.innerText)
        }
      }

      var endTime = performance.now()
      console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
      //remove loader
      const tempCheck = document.querySelector(".loader")
      if (tempCheck == null){return;} 
      document.querySelector(".loader-container").remove()
    }).then(tableSort);
  })
}