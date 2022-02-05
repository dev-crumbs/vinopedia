import { produttoreSummaryTable } from './it/js/produttore-summary-table.js';
import { myFunction } from './it/js/table-filter.js';

if (window.location.href.indexOf("/produttori/") != -1){
  produttoreSummaryTable()
}

if (window.location.href.indexOf("/cantina") != -1){
  window.addEventListener("load", function(){
      document.querySelector('#myInput').addEventListener('keyup', myFunction)
  })
}