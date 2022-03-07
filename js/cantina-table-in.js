export function cantinaTableIn(){   
  d3.text(`cantina-table-in.csv`).then( function(data) {
    var sortAscending = true;
    var csv = d3.csvParse(data), allheaders = d3.csvParseRows(data)[0],
    table = d3.select('#table-in-container').append('table').attr('class','summary-table sort produttore-table');
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
      const regione = document.querySelector(".produttoreRegione").innerText
      for (let i = 0; i < nomeAll.length; i++){
        const nome = nomeAll[i].innerText.replaceAll(' ', '-').replaceAll('é','e')
        const path = "/it/vini/Italia/" + regione + "/" + produttore + "/" + nome + "/scheda-globale"
        const node = document.createElement("a");
        node.href = path
        node.classList.add("summaryExtLink")
        node.setAttribute("target","_blank")
        nomeAll[i].prepend(node)
        nomeAll[i].setAttribute("title",nomeAll[i].innerText)
      }
    const firstTh = document.querySelector('.sort th:nth-child(1)');
        firstTh.setAttribute("scope","col");
        firstTh.classList.add("table__header");
    const secondTh = document.querySelector('.sort th:nth-child(2)');
        secondTh.setAttribute("scope","col");
        secondTh.classList.add("table__header");
  });
}