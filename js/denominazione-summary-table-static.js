export function denominazioneSummaryTableStatic(){
  //
  //statistiche denominazionee prima di dataTable
  //
  const arrayWines = document.querySelectorAll(`.denominazioneTipo[data-tn="${denominazione}"] .denominazione-table td[data-th='Vino']`)
  //media delle medie
  const arrayAvgTd = document.querySelectorAll(`.denominazioneTipo[data-tn="${denominazione}"] .denominazione-table td[data-th='Media Grezza']`)
  const arrayAvgString = []
  for (const i of arrayAvgTd) {
      arrayAvgString.push(i.innerText)
  }
  const arrayAvg = arrayAvgString.map(Number)
  const sumAvg = arrayAvg.reduce((a, b) => a+b, 0);
  const globalAvg = ((sumAvg / arrayAvg.length) || 0).toFixed(1);
  //prezzo medio    
  const arrayPriceTd = document.querySelectorAll(`.denominazioneTipo[data-tn="${denominazione}"] .denominazione-table td[data-th='Prezzo']`)
  const arrayPriceString = []
  for (const i of arrayPriceTd) {
      arrayPriceString.push(i.innerText)
  }
  const arrayPrice = arrayPriceString.map(Number)
  const sumPrice = arrayPrice.reduce((a, b) => a+b, 0);
  const globalPrice = ((sumPrice / arrayPrice.length) || 0).toFixed(0);
  document.querySelector(`.denominazioneTipo[data-tn="${denominazione}"] .statistiche-denominazione li:nth-child(1) span`).innerText = arrayWines.length
  document.querySelector(`.denominazioneTipo[data-tn="${denominazione}"] .statistiche-denominazione li:nth-child(2) span`).innerText = globalPrice + "€"
  document.querySelector(`.denominazioneTipo[data-tn="${denominazione}"] .statistiche-denominazione li:nth-child(3) span`).innerText = Math.max(...arrayPrice) + "€"
  document.querySelector(`.denominazioneTipo[data-tn="${denominazione}"] .statistiche-denominazione li:nth-child(4) span`).innerText = globalAvg
  //
  //dataTable
  //
  var denominazione = document.querySelector(".denominazioneTipo").getAttribute("data-tn")
  const dataTable = new simpleDatatables.DataTable(`.denominazioneTipo[data-tn='${denominazione}'] .denominazione-table`, {
    layout: {
      top: "{search}",
      bottom: "{pager}",
    },
    labels: {
      placeholder: "Cerca nella tabella",
      perPage: "{select} risultati per pagina",
      noRows: "Nessun risultato corrispondente",
      info: "{start} to {end} of {rows} entries",
    },
  searchable: true,
    columns: [
      { select: [3,5,6,7], type: "number"},
      { select: 4, type: "number", sort: "desc"}
    ],
    nextPrev: false
  })
}