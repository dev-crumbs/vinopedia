function wineNameAndCorona(){
const vptext = d3.select(`#concerto svg g`).append("g")
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
  .text(2020)
  .attr("dy", 25)
vpText.append("text")
  .text("100% Lambrusco Salamino")
  .attr("dy", 50)
  vpText.append("text")
  .text("86")
  .attr("dy", 75)
}
// outer corona
vpCoronaFunction(wineId, floreale, "floreale",0);
vpCoronaFunction(wineId, fruttato, "fruttato",2);
vpCoronaFunction(wineId, vegetale, "vegetale",3);
vpCoronaFunction(wineId, minerale, "minerale",0);
vpCoronaFunction(wineId, tostato, "tostato",0);
vpCoronaFunction(wineId, vinoso, "",1);
vpCoronaFunction(wineId, fragrante, "",0);
vpCoronaFunction(wineId, altri, "altri",0);

window.addEventListener("load", function(){
  mainSvg()
  setTimeout(wineData(wineNameAndCorona), 1500)  
});