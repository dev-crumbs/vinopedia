export function esperienzeImport(){
  const esperienzaNome = document.querySelector(".esperienzaNome").innerText.replaceAll(' ', '-');
  const esperienzaDove = document.querySelector(".esperienzaDove").innerText;
  const esperienzaAnno = document.querySelector(".esperienzaAnno").innerText;
  const esperienza = esperienzaAnno + "-" + esperienzaNome + "-" + esperienzaDove;
  d3.text(`${esperienza}.csv`).then( function(data) {
    var sortAscending = true;
    var csv = d3.csvParse(data), allheaders = d3.csvParseRows(data)[0],
    table = d3.select(`div.esperienza-table-container`).append('table').attr('class','sort esperienza-table');
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
    const nomeAll = rows.selectAll("td[data-th='Vino']");
    for (const i of nomeAll){
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
      i.setAttribute("title",i.innerText)
    }
    const produttoreAll = el.querySelectorAll("td[data-th='Produttore']");
    for (const i of produttoreAll){
      i.setAttribute("title",i.innerText)
    }
    const thAll = el.querySelectorAll("thead th");
    for (const i of thAll){
      i.setAttribute("title",i.innerText)
    }
    const tdAll = el.querySelectorAll("td")
    tdAll.forEach(j =>{  
      if (j.textContent.includes("sv")) {
        j.style.color = "lightgray"
        //console.log(td.innerText.length)
      } else if (j.innerText.length <= 2){
        j.classList.add("star-table")
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
    const fourthTh = el.querySelector('th:nth-child(4)');
      fourthTh.setAttribute("scope","col");
      fourthTh.classList.add("table__header");
    const fifthTh = el.querySelector('th:nth-child(5)');
      fifthTh.setAttribute("scope","col");
      fifthTh.setAttribute("data-type","number");
      fifthTh.classList.add("table__header");
  })
}