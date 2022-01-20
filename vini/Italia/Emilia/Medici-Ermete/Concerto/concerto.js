function wineData(){
  const annoCorrente = document.querySelector("#annata").textContent;
  const wineId = "#concerto"
  const thisWine = d3.select(`${wineId} svg g`) 
  d3.csv(`concerto-${annoCorrente}.csv`).then( function(data) {
  
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
        .style("font-size", "20px")
        .style("font-weight", "900")
        .attr("fill", colorScaleText)
        .attr("alignment-baseline", "middle")
  
      const vpText = thisWine.append("g")
      .style("text-anchor","middle")
      .style("font-size", "20px")
      vpText.append("text")
        .text("Lambrusco Reggiano")
        .attr("dy", -50)  
      vpText.append("text")
        .text("Concerto")
        .attr("dy", -25)  
        .style("font-style","italic")
      vpText.append("text")
        .text("Medici Ermete")
        .attr("dy", 0)
      vpText.append("text")
        .text(annoCorrente)
        .attr("dy", 25)
      vpText.append("text")
        .text("100% Lambrusco Salamino")
        .attr("dy", 50)
  
    // outer corona
    vpCoronaFunction(wineId, floreale, "floreale",0);
    vpCoronaFunction(wineId, fruttato, "fruttato",2);
    vpCoronaFunction(wineId, vegetale, "vegetale",3);
    vpCoronaFunction(wineId, minerale, "minerale",0);
    vpCoronaFunction(wineId, tostato, "tostato",0);
    vpCoronaFunction(wineId, vinoso, "",0);
    vpCoronaFunction(wineId, fragrante, "",0);
    vpCoronaFunction(wineId, altri, "altri",0);
  });
}

window.addEventListener("load", function(){
mainSvg().then(
  wineData()
  )
});
