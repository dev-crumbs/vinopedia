import { produttoreSummaryTable } from './it/js/produttore-summary-table.js';
import { tableFilter } from './it/js/table-filter.js';
import { tableSort } from './it/js/table-filter.js';
import { searchLabel } from './it/js/mobile-nav-bottom.js';
import { mobileNavBottom } from './it/js/mobile-nav-bottom.js';
import { denominazioneSummaryTable } from './it/js/denominazione-summary-table.js';


window.addEventListener("load", function(){
  // custom label for search field
  searchLabel();
  //mobile navigation bottom
  if (window.innerWidth < 959) {
    let headers = document.querySelectorAll("div.contents > div > h2.toc-header");
    console.log(headers);
    mobileNavBottom();
  }
  // produttore table and sort/filter tools
  if (window.location.href.indexOf("/produttori/") != -1){  
    produttoreSummaryTable()
    document.querySelector('#myInput').addEventListener('keyup', tableFilter)
    setTimeout(tableSort, 1000) 
  }
  // denominazione talbe
  if (window.location.href.indexOf("/denominazioni/") != -1){
    denominazioneSummaryTable()
    denominazionetableFilter()
    setTimeout(tableSort, 1000) 
  }
})