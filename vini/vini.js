// general dimensions
const vpMargin = {top: 20, right: 10, bottom: 30, left: 10},
vpWidth = 930 - vpMargin.left - vpMargin.right,
vpHeight = 930 - vpMargin.top - vpMargin.bottom,
vpInnerRadius = 5,
vpOuterRadius = Math.min(vpWidth, vpHeight) /1.8;   
xAxisRange = [0, 2 * Math.PI];
yAxisDomain = [0, 300];

familiesOuterRadius = vpOuterRadius - 60
familiesInnerRadius = vpOuterRadius - 40

window.addEventListener("load", function(){
var wineId = "#" + document.querySelector("#analisi-olfattiva").nextElementSibling.id;
var thisWine = d3.select(`${wineId} svg g`) 

const vpText = function(doc, name, cantina, vitigno, punteggio){
  thisWine.append("g")
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
});

// Color scales
const myColor = d3.scaleLinear().domain([0,1,2,3,4,5,6,7,8,9,10,11])
.range(["#d3d3d3", "#80b1d3", "#e66e6d", "#c5d551", "#3f5c6f", "#f9c91d", "#a27859", "#4a032a", "#e94235", "#cf9fd6", "#2a2e32","#e7ba77"]);
//Color scale for bars
const colorScale =  function(d){
  if (d.Valore == 0){
    return('white')
   } else {
     return(myColor(d.Famiglia))
   }
 };
// color scales for labels
const colorScaleText =  function(d){
 if (d.Valore == 0){
   return('lightgray')
   } else {
     return(myColor(d.Famiglia))
   }
 };   
//label styles
labelDistance = 186
const labelStyle =  function(){
  return d3.selectAll(".labels")
    .style("font-size", "20px")
    .style("font-weight", "900")
    .attr("fill", colorScaleText)
    .attr("alignment-baseline", "middle")
}

//create SVG
function createSVG(){
  const vpSvg = d3.selectAll(".vini")
    .append("svg")
    .attr("width", "100%")
    .attr("viewBox","10 10 930 930")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g")
    .attr("transform", `translate(${vpWidth/2+vpMargin.left}, ${vpHeight/2+vpMargin.top})`); 
    return vpSvg;
}

const vpCoronaFunction = function(id, nome, testo, colore, size){
  d3.select(`${id} svg g`).append("g").append("path")
    .attr("d", nome)
    .attr("fill", myColor(colore))
    .attr("id", testo);
  d3.select(`${id} svg g`).append("g").append("text")
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
