export function produttoreSummaryTable(){
  window.addEventListener("load", function(){
    d3.text("produttore-summary.csv").then( function(data) {
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
        const mytest = document.querySelectorAll("td[data-th='Vino']");
        const regione = document.querySelector(".produttoreRegione").innerText
        const produttore = document.querySelector(".produttoreNome").innerText.replaceAll(' ', '-');
        for (let i = 0; i < mytest.length; i++){
          const nome = mytest[i].innerText.replaceAll(' ', '-').replaceAll('é','e')
          const path = "/it/vini/Italia/" + regione + "/" + produttore + "/" + nome + "/scheda-globale"
          const node = document.createElement("a");
          node.href = path
          node.innerText = "X";
          mytest[i].appendChild(node)
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

