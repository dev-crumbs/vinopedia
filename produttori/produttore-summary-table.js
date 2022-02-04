window.addEventListener("load", function(){
  d3.csv("produttore-summary.csv").then( function(data) {
  
    var sortAscending = true;
    var table = d3.select('#table-container').append('table').attr('class','produttore-summary');
    var titles = d3.keys(data[0]);
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