export function produttoreSummaryTable(){
  window.addEventListener("load", function(){
    var produttore = document.querySelector(".produttoreNome").innerText.replaceAll(' ', '-');
    d3.text(`${produttore}/produttore-summary.csv`).then( function(data) {
      var sortAscending = true;
      var csv = d3.csvParse(data), allheaders = d3.csvParseRows(data)[0],
      table = d3.select('#table-container').append('table').attr('class','produttore-summary');
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
      for (const td of document.querySelectorAll("td")) {
        if (td.textContent.includes("sv")) {
          td.style.color = "lightgray"
          //console.log(td.innerText.length)
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
    });
    
  })
}

/*
window.addEventListener("load", function(){
  d3.csv("produttore-summary.csv").then( function(data) {
    var sortAscending = true;
    var table = d3.select('#table-container').append('table').attr('class','produttore-summary');
        var titles = Object.keys(data[0]);
        var headers = table.append('thead').append('tr')
                     .selectAll('th')
                     .data(titles).enter()
                     .append('th')
                     .text(function (d) {
                        return d;
                      })
                     .on('click', function (d) {
                       headers.attr('class', 'header');
                       
                       if (sortAscending) {
                         rows.sort(function(a, b) { return b[d] < a[d]; });
                         sortAscending = false;
                         this.className = 'aes';
                       } else {
                       rows.sort(function(a, b) { return b[d] > a[d]; });
                       sortAscending = true;
                       this.className = 'des';
                       }
                       
                     });
    
    var rows = table.append('tbody').selectAll('tr')
                 .data(data).enter()
                 .append('tr');
    rows.selectAll('td')
      .data(function (d) {
        return titles.map(function (k) {
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
  });
  });

*/

