const annoCorrente = document.querySelector("#annata").textContent;
const wineId = "#concerto";
function wineData(){
  const thisWine = d3.select(`${wineId} svg g`) 
  d3.csv(`${annoCorrente}.csv`).then( function(data) {
  
    //const
    const x = d3.scaleBand()
      .range(xAxisRange) 
      .align(0)
      .domain(data.map(d => d.Sentore));
    const y = d3.scaleRadial()
      .range([vpInnerRadius, vpOuterRadius])
      .domain(yAxisDomain);
  
    //Add the bars
    thisWine.append("g")
      .selectAll("path")
      .data(data)
      .join("path")
        .attr("id", function(d){return(d.Sentore.replaceAll(' ', '_').toLowerCase())})
        .attr("fill", colorScale  )
        .attr("d", d3.arc()
        .innerRadius(vpInnerRadius + 125)
        .outerRadius(d => y(d['Valore']))
        .startAngle(d => x(d.Sentore))
        .endAngle(d => x(d.Sentore) + x.bandwidth())
        .padAngle(0.01)
        .padRadius(vpInnerRadius))
  
      // Add the labels
      thisWine.append("g")
      .selectAll("g")
      .data(data)
      .join("g")
        .attr("text-anchor", function(d) { return (x(d.Sentore) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
        /* conditional applied with the same condition that sets the anchor in the previous attr, so that when text-anchor is "end" we can subtract 92, when is "start we can subtract 88". Without this hack labels are not perfectly centered*/
        .attr("transform", function(d) { return (x(d.Sentore) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(" + ((x(d.Sentore) + x.bandwidth() / 2) * 180 / Math.PI - 90.5) + ")"+"translate(" + (100) + ",0)" : "rotate(" + ((x(d.Sentore) + x.bandwidth() / 2) * 180 / Math.PI - 89.5) + ")"+"translate(" + (100) + ",0)"; }
        // the following is the original function used to position labels: 
        /*function(d) { return "rotate(" + ((x(d.Sentore) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (100) + ",0)";}
        */)
      .append("text")
        .text(function(d){return(d.Sentore)})
        .attr("transform", function(d) { return (x(d.Sentore) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
        .attr("x", function(d) { return (x(d.Sentore) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "-"+labelDistance : labelDistance; })
        labelStyle();
  });
}