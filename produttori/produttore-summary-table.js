window.addEventListener("load", function(){
  d3.csv("produttore-summary.csv", function(error, data) {
    if (error) throw error;
    
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
  });
  });