import { produttoreSummaryTable } from './it/js/produttore-summary-table.js';
import { tableFilter } from './it/js/table-filter.js';
import { tableSort } from './it/js/table-filter.js';
import { searchLabel } from './it/js/mobile-nav-bottom.js';
import { mobileNavBottom } from './it/js/mobile-nav-bottom.js';

window.addEventListener("load", function(){
  searchLabel();
  if (window.innerWidth < 959) {
    mobileNavBottom();
  }
  if (window.location.href.indexOf("/produttori/") != -1){
    produttoreSummaryTable()
      document.querySelector('#myInput').addEventListener('keyup', tableFilter)
      setTimeout(tableSort, 1000) 
  }
})