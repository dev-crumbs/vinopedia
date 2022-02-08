import { produttoreSummaryTable } from './it/js/produttore-summary-table.js';
import { tableFilter } from './it/js/table-filter.js';
import { tableSort } from './it/js/table-filter.js';

if (window.location.href.indexOf("/produttori/") != -1){
  produttoreSummaryTable()
  window.addEventListener("load", function(){
    document.querySelector('#myInput').addEventListener('keyup', tableFilter)
    setTimeout(tableSort, 1000) 
  })
}