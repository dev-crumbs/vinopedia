function wineData(){
  const wineId = "#" + document.querySelector("#analisi-olfattiva").nextElementSibling.id; 
  const annoCorrente = document.querySelector("#annata").textContent;
  const thisWine = d3.selectAll(`.vini > svg > g`)
  //Funzione Dati vino
  function wineText(doc, name, cantina, vitigno, punteggio){
    const vpText = d3.selectAll(`.vini > svg > g`).append("g")
      .style("text-anchor","middle")
      .style("font-size", "20px")
    vpText.append("text")
      .text(doc)
      .attr("dy", -50)  
    vpText.append("text")
      .text(name)
      .attr("dy", -25)  
      .style("font-style","italic")
    vpText.append("text")
      .text(cantina)
      .attr("dy", 0)
    vpText.append("text")
      .text(annoCorrente)
      .attr("dy", 25)
    vpText.append("text")
      .text(vitigno)
      .attr("dy", 50)
    vpText.append("text")
      .text(punteggio)
      .attr("dy", 75)
  }
  d3.csv(`${annoCorrente}.csv`).then( function(data) {  
    //const
    const x = d3.scaleBand().range(xAxisRange).align(0).domain(data.map(d => d.Sentore));
    const y = d3.scaleRadial().range([vpInnerRadius, vpOuterRadius]).domain(yAxisDomain);
    //Add the bars
    d3.selectAll(`.vini > svg > g`).append("g")
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
    // Add labels
    d3.selectAll(`.vini > svg > g`).append("g")
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("text-anchor", function(d) { return (x(d.Sentore) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
      .attr("transform", function(d) { return (x(d.Sentore) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(" + ((x(d.Sentore) + x.bandwidth() / 2) * 180 / Math.PI - 90.5) + ")"+"translate(" + (100) + ",0)" : "rotate(" + ((x(d.Sentore) + x.bandwidth() / 2) * 180 / Math.PI - 89.5) + ")"+"translate(" + (100) + ",0)"; }// conditional applied with the same condition that sets the anchor in the previous attr, so that when text-anchor is "end" we can subtract a different value. Without this hack labels are not perfectly centered. the following is the original function used to position labels: 
        /*function(d) { return "rotate(" + ((x(d.Sentore) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (100) + ",0)";}
        */)
      .append("text")
        .text(function(d){return(d.Sentore)})
        .attr("transform", function(d) { return (x(d.Sentore) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
        .attr("x", function(d) { return (x(d.Sentore) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "-"+labelDistance : labelDistance; })
        .attr("class","labels")
        labelStyle();
    
    //Input dati vino
    const nomeVino = document.querySelector("#nome").innerText;
    const docVino = document.querySelector("#denominazione").innerText;
    const cantinaVino = document.querySelector("#cantina").innerText;
    const vitignoVino = document.querySelector("#vitigno").innerText;
    const punteggioVino = document.querySelector("#punteggio").innerText;     
    if (document.querySelector("#florealeInput")){var florealeVino = 1} else {var florealeVino = 0}
    if (document.querySelector("#fruttatoInput")){var fruttatoVino = 2} else {var fruttatoVino = 0}
    if (document.querySelector("#vegetaleInput")){var vegetaleVino = 3} else {var vegetaleVino = 0}
    if (document.querySelector("#mineraleInput")){var mineraleVino = 4} else {var mineraleVino = 0}
    if (document.querySelector("#tostatoInput")){var tostatoVino = 5} else {var tostatoVino = 0}
    if (document.querySelector("#vinosoInput")){var vinosoVino = 7} else {var vinosoVino = 0}
    if (document.querySelector("#fragranteInput")){var fragranteVino = 11} else {var fragranteVino = 0}
    if (document.querySelector("#altriInput")){var altriVino = 10} else {var altriVino = 0}

    // input dati vino e corona
    wineText(docVino, nomeVino, cantinaVino, vitignoVino, punteggioVino)
    vpCoronaFunction(floreale, "floreale",florealeVino);
    vpCoronaFunction(fruttato, "fruttato",fruttatoVino);
    vpCoronaFunction(vegetale, "vegetale",vegetaleVino);
    vpCoronaFunction(minerale, "minerale",mineraleVino);
    vpCoronaFunction(tostato, "tostato",tostatoVino);
    vpCoronaFunction(vinoso, "",vinosoVino);
    vpCoronaFunction(fragrante, "",fragranteVino);
    vpCoronaFunction(altri, "altri",altriVino);
  });
}

window.addEventListener("load", function(){
mainSvg()
setTimeout(wineData, 1500)  
});
