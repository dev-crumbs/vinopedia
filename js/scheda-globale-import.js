export function schedaGlobaleImport(){
  d3.text(`../listone.csv`).then( function(data) {
    var csv = d3.csvParse(data);
    
    /*
    var allheaders = d3.csvParseRows(data)[0],
    table = d3.select('#table-in-container').append('table').attr('class','summary-table sort');
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
    for (const i of document.querySelectorAll('.sort th')) {
      i.setAttribute("scope","col");
      i.classList.add("table__header");
    }
    */
  });
}
