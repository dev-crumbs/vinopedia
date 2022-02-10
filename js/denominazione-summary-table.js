export function denominazioneSummaryTable(){
  var denominazione = document.querySelector(".denominazioneNome").innerText.replaceAll(' ', '-');
  var denominazioneTipo = document.querySelectorAll(".denominazioneTipo");
  denominazioneTipo.forEach(el => {
    const denominazioneTipoNome = el.innerText.replaceAll(' ', '-');
    const denominazioneTipoNomeL = denominazioneTipoNome.toLowerCase();
    d3.text(`${denominazione}/${denominazioneTipoNome}.csv`).then( function(data) {
      var sortAscending = true;
      var csv = d3.csvParse(data), allheaders = d3.csvParseRows(data)[0],
      table = d3.select(`#${denominazioneTipoNomeL} + div.table-container`).append('table').attr('class','produttore-summary').attr('id',`sortMe${denominazioneTipoNome}`);
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
        const nomeAll = document.querySelectorAll("td[data-th='Vino']");
        const regione = document.querySelector(".denominazioneRegione").innerText
        for (let i = 0; i < nomeAll.length; i++){
          const nome = nomeAll[i].innerText.replaceAll(' ', '-').replaceAll('é','e')
          const produttore = nomeAll[i].previousElementSibling.innerText.replaceAll(' ', '-');
          const path = "/it/vini/Italia/" + regione + "/" + produttore + "/" + nome + "/scheda-globale"
          const node = document.createElement("a");
          node.href = path
          node.classList.add("summaryExtLink")
          node.setAttribute("target","_blank")
          nomeAll[i].prepend(node)
          nomeAll[i].setAttribute("title",nomeAll[i].innerText)
      }
    for (const td of document.querySelectorAll("td")) {
      if (td.textContent.includes("sv")) {
        td.style.color = "lightgray"
      } else if (td.innerText.length <= 3){
        td.classList.add("star-table")
      }
    }
    for (const tdStar of document.querySelectorAll("td.star-table")){

      if (tdStar.innerText >= 1 && tdStar.innerText <= 1.9 ){
        tdStar.style.color = "#cecece"
      } else if (tdStar.innerText >= 2 && tdStar.innerText <= 2.9 ) {
        tdStar.style.color = "#a0a0a0"
      } else if (tdStar.innerText >= 3 && tdStar.innerText <= 3.9 ) {
        tdStar.style.color = "#747474"
      } else if (tdStar.innerText >= 4 && tdStar.innerText <= 4.7 ) {
        tdStar.style.color = "#4b4b4b"
      } else if (tdStar.innerText >= 4.7 && tdStar.innerText <= 5 ) {
        tdStar.style.color = "#252525"
      } 
    }
      const firstTh = document.querySelector('.produttore-summary th:nth-child(1)');
          firstTh.setAttribute("scope","col");
          firstTh.classList.add("table__header");
      const secondTh = document.querySelector('.produttore-summary th:nth-child(2)');
          secondTh.setAttribute("scope","col");
          secondTh.classList.add("table__header");
      const thirdTh = document.querySelector('.produttore-summary th:nth-child(3)');
          thirdTh.setAttribute("scope","col");
          thirdTh.classList.add("table__header");
    });
  })
}