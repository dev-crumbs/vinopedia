import { produttoreSummaryTable } from './it/js/produttore-summary-table.js';
import { mySortn } from './it/js/table-filter.js';

if (window.location.href.indexOf("/produttori/") != -1){
  produttoreSummaryTable()
  window.addEventListener("load", function(){
    document.querySelector('#myInput').addEventListener('keyup', mySort)
  })
}