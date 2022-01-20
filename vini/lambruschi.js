window.addEventListener("load", function(){
  d3.csv("../../../../lambrusco.csv").then( function(data) {

    // Scales
    var x = d3.scaleBand()
        .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
        .align(0)                  // This does nothing
        .domain(data.map(d => d.Sentore)); // The domain of the X axis is the list of states.
    var y = d3.scaleRadial()
        .range([vpInnerRadius, vpOuterRadius])   // Domain will be define later.
        .domain([0, 300]); // Domain of Y is from 0 to the max seen in the data

    // Add the bars
    vpSvg.append("g")
      .selectAll("path")
      .data(data)
      .join("path")
        .attr("fill", "lightgray")
        .attr("d", d3.arc()     // imagine your doing a part of a donut plot
            .innerRadius(vpInnerRadius + 125)
            .outerRadius(d => y(d['Valore']))
            .startAngle(d => x(d.Sentore))
            .endAngle(d => x(d.Sentore) + x.bandwidth())
            .padAngle(1)
            .padRadius(vpInnerRadius))
  });  

    // outer corona
var floreale = d3.arc()
  .innerRadius(familiesInnerRadius)
  .outerRadius(familiesOuterRadius)
  .startAngle(0.001 * Math.PI)
  .endAngle(0.43 * Math.PI);
var fruttato = d3.arc()   
  .innerRadius(familiesInnerRadius)
  .outerRadius(familiesOuterRadius)
  .startAngle(0.43 * Math.PI)
  .endAngle(1.085 * Math.PI);
var vegetale = d3.arc()   
  .innerRadius(familiesInnerRadius)
  .outerRadius(familiesOuterRadius)
  .startAngle(1.085 * Math.PI)
  .endAngle(1.54 * Math.PI);
var minerale = d3.arc()   
  .innerRadius(familiesInnerRadius)
  .outerRadius(familiesOuterRadius)
  .startAngle(1.54 * Math.PI)
  .endAngle(1.595 * Math.PI);
var tostato = d3.arc()   
  .innerRadius(familiesInnerRadius)
  .outerRadius(familiesOuterRadius)
  .startAngle(1.595 * Math.PI)
  .endAngle(1.65 * Math.PI);
var vinoso = d3.arc()   
  .innerRadius(familiesInnerRadius)
  .outerRadius(familiesOuterRadius)
  .startAngle(1.65 * Math.PI)
  .endAngle(1.68 * Math.PI);
var fragrante = d3.arc()   
  .innerRadius(familiesInnerRadius)
  .outerRadius(familiesOuterRadius)
  .startAngle(1.68 * Math.PI)
  .endAngle(1.71 * Math.PI);  
var altri = d3.arc()   
  .innerRadius(familiesInnerRadius)
  .outerRadius(familiesOuterRadius)
  .startAngle(1.71 * Math.PI)
  .endAngle(2 * Math.PI);
});