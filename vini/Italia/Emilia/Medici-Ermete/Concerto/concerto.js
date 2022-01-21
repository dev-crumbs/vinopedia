function wineData(){
  const annata = document.querySelectorAll(".annata");
  const thisWine = d3.selectAll(`.vini > svg > g`)
  //Funzione Dati vino
  function wineText(doc, name, cantina, vitigno, punteggio, annoCorrente){
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

  annata.forEach(el => {
    const annoCorrente = el.querySelector(".annocorrente").innerText;
    console.log(annoCorrente)
  });
  
}

window.addEventListener("load", function(){
mainSvg()
setTimeout(wineData, 1500)  
});
