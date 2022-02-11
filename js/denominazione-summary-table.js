export function denominazioneSummaryTable(){
  var denominazione = document.querySelector(".denominazioneNome").innerText.replaceAll(' ', '-');
  var denominazioneTipo = document.querySelectorAll(".denominazioneTipo");
  var regione = document.querySelector(".denominazioneRegione").innerText
  denominazioneTipo.forEach(el => {
    const denominazioneTipoNome = el.previousElementSibling.innerText.replaceAll(' ', '-');
    const denominazioneTipoNomeL = denominazioneTipoNome.toLowerCase();
    d3.text(`${denominazione}/${denominazioneTipoNome}.csv`).then( function(data) {
      var sortAscending = true;
      var csv = d3.csvParse(data), allheaders = d3.csvParseRows(data)[0],
      table = d3.select(`#${denominazioneTipoNomeL} + div.table-container`).append('table').attr('class','summary-table sort denominazione-table');
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
        .text(function (d) {
          return d.value;
        });
      const nomeAll = el.querySelectorAll("td[data-th='Vino']");
      nomeAll.forEach(i =>{
        const nome = i.innerText.replaceAll(' ', '-').replaceAll('é','e')
        const produttore = i.previousElementSibling.innerText.replaceAll(' ', '-');
        const path = "/it/vini/Italia/" + regione + "/" + produttore + "/" + nome + "/scheda-globale"
        const node = document.createElement("a");
        node.href = path
        node.classList.add("summaryExtLink")
        node.setAttribute("target","_blank")
        i.prepend(node)
        i.setAttribute("title",i.innerText)
      });
      const tdAll = el.querySelectorAll("td")
      tdAll.forEach(j =>{  
        if (j.textContent.includes("sv")) {
          j.style.color = "lightgray"
          //console.log(td.innerText.length)
        } else if (j.innerText.length <= 3){
          j.classList.add("star-table")
        }
      })
      const starAll = el.querySelectorAll("td.star-table")
      starAll.forEach(k =>{
        if (k.innerText >= 1 && k.innerText <= 1.9 ){
          k.style.color = "#cecece"
        } else if (k.innerText >= 2 && k.innerText <= 2.9 ) {
          k.style.color = "#a0a0a0"
        } else if (k.innerText >= 3 && k.innerText <= 3.9 ) {
          k.style.color = "#747474"
        } else if (k.innerText >= 4 && k.innerText <= 4.7 ) {
          k.style.color = "#4b4b4b"
        } else if (k.innerText >= 4.7 && k.innerText <= 5 ) {
          k.style.color = "#252525"
        } 
      })
      const firstTh = el.querySelector('th:nth-child(1)');
        firstTh.setAttribute("scope","col");
        firstTh.classList.add("table__header");
      const secondTh = el.querySelector('th:nth-child(2)');
        secondTh.setAttribute("scope","col");
        secondTh.classList.add("table__header");
      const thirdTh = el.querySelector('th:nth-child(3)');
        thirdTh.setAttribute("scope","col");
        thirdTh.classList.add("table__header");
    });
  })
}
  