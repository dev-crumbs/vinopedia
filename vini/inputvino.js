function wineData(){
  const annata = document.querySelectorAll(".annata");

for(var i=0; i < annata.length; i++){
    const nomeVino = annata[i].querySelector(".nome").innerText.replaceAll(' ', '-');
    const annoCorrente = annata[i].querySelector(".annocorrente").innerText;
    d3.csv(`/vini/${nomeVino}-${annoCorrente}.csv`).then( function(data) {  
      //const
      const x = d3.scaleBand().range(xAxisRange).align(0).domain(data.map(d => d.Sentore));
      const y = d3.scaleRadial().range([vpInnerRadius, vpOuterRadius]).domain(yAxisDomain);
      //Add the bars
      d3.select(`.vini-${annoCorrente} svg g`).append("g")
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
      d3.select(`.vini-${annoCorrente} svg g`).append("g")
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
    });  
    //Input dati vino
    const docVino = annata[i].querySelector(".denominazione").innerText;
    const cantinaVino = annata[i].querySelector(".cantina").innerText;
    const vitignoVino = annata[i].querySelector(".vitigno").innerText;
    const punteggioVino = annata[i].querySelector(".punteggio").innerText;     
    if (annata[i].querySelector(".florealeInput")){var florealeVino = 1} else {var florealeVino = 0}
    if (annata[i].querySelector(".fruttatoInput")){var fruttatoVino = 2} else {var fruttatoVino = 0}
    if (annata[i].querySelector(".vegetaleInput")){var vegetaleVino = 3} else {var vegetaleVino = 0}
    if (annata[i].querySelector(".mineraleInput")){var mineraleVino = 4} else {var mineraleVino = 0}
    if (annata[i].querySelector(".tostatoInput")){var tostatoVino = 5} else {var tostatoVino = 0}
    if (annata[i].querySelector(".vinosoInput")){var vinosoVino = 7} else {var vinosoVino = 0}
    if (annata[i].querySelector(".fragranteInput")){var fragranteVino = 11} else {var fragranteVino = 0}
    if (annata[i].querySelector(".altriInput")){var altriVino = 10} else {var altriVino = 0}

    // input dati vino e corona
    

  function wineText(doc, name, cantina, vitigno, punteggio, annoCorrente){
  const vpText = d3.select(`.vini-${annoCorrente} svg g`).append("g")
    .style("text-anchor","middle")
    .style("font-size", "20px")
    .style("backgroundColor","white")
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
  function vpCoronaFunction(nome, testo, colore, size){
  d3.selectAll(`.vini-${annoCorrente} > svg > g`).append("g").append("path")
    .attr("d", nome)
    .attr("fill", myColor(colore))
    .attr("id", testo);
    d3.selectAll(".vini > svg > g").append("g").append("text")
    .attr("dy", 17)
    .append("textPath") 
      .attr("fill", "white")
      .style("font-weight", "bold") 
      .style("text-anchor","start")
      .style("font-size", size+"px") 
      .attr("startOffset", "5px")
      .attr("xlink:href", "#"+testo)
      .attr("class", "famiglia")
      .text(testo);
};
wineText(docVino, nomeVino, cantinaVino, vitignoVino, punteggioVino, annoCorrente)
  vpCoronaFunction(floreale, "floreale",florealeVino);
    vpCoronaFunction(fruttato, "fruttato",fruttatoVino);
    vpCoronaFunction(vegetale, "vegetale",vegetaleVino);
    vpCoronaFunction(minerale, "minerale",mineraleVino);
    vpCoronaFunction(tostato, "tostato",tostatoVino);
    vpCoronaFunction(vinoso, "",vinosoVino);
    vpCoronaFunction(fragrante, "",fragranteVino);
    vpCoronaFunction(altri, "altri",altriVino);
}
}

window.addEventListener("load", function(){
mainSvg()
setTimeout(wineData, 1500)  
});




