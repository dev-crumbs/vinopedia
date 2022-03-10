export function schedaGlobaleImport() {
  //page headline input
  const headlineFull = document.querySelector(".headline").innerText
  d3.text(`../../../../listone.csv`).then(function(data) {
      const csv = d3.csvParse(data);
      const tipologia = csv.filter(function(d) {return d.Nome == headlineFull[0] && d.Entry === "1"})[0].Tipologia;

      d3.select('.caratteristiche li:nth-child(1)').append().text(" " + headlineFull);
      d3.select('.caratteristiche li:nth-child(2)').append().text(" " + tipologia)
  });
}
