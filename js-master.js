import {produttoreSummaryTable} from './it/js/produttore-summary-table.js';
import {tableFilter} from './it/js/table-filter.js';
import {tableSort} from './it/js/table-filter.js';
import {searchLabel} from './it/js/mobile-nav-bottom.js';
import {mobileNavBottom} from './it/js/mobile-nav-bottom.js';
import {denominazioneSummaryTable} from './it/js/denominazione-summary-table.js';
import {denominazioneSummaryTableStatic} from '.it/js/denominazione-summary-table-static.js';
import {denominazioneTableFilter} from './it/js/table-filter.js';
import {cantinaTableIn} from './it/js/cantina-table.js';
import {cantinaTableOut} from './it/js/cantina-table.js';
import {firstWordBold} from './it/js/vitigni-first-word-bold.js';
import {schedaGlobaleImport} from './it/js/scheda-globale-import.js';
import {schedaSingolaImport} from './it/js/scheda-singola-import.js';
import {sentoreCheck} from './it/js/listone-olfattivo.js';
import {esperienzeImport} from './it/js/esperienze-import.js';
import {abbinamentiTree} from './it/js/abbinamenti.js';


window.addEventListener("load", function() {
    // custom label for search field
    searchLabel();
    //hide single wines from search contents
    /**const searchInput = document.querySelector(".nav-header input")
  if (searchInput == null){ } else {
    searchInput.addEventListener("keydown", function(){
      for (const i of document.querySelectorAll(".search-results-items .v-list-item__subtitle")) {
        if (i.textContent.match(/[0-9]{7}/)){
          i.parentElement.parentElement.style.display = "none"
        }
      }
    })
  }
  const searchButton = document.querySelector("header.nav-header-inner button")
  console.log(searchButton)
  if (searchButton == null){ } else {
    searchButton.addEventListener("click", function(){
      const searchInput = document.querySelector(".nav-header input")
      searchInput.addEventListener("keydown", function(){
        console.log("test")
        for (const i of document.querySelectorAll(".search-results-items .caption")) {
          if (i.textContent.match(/[0-9]{7}/)){
            i.parentElement.parentElement.style.display = "none"
          }
        }
      })
    })
  }**/

    // Select the node that will be observed for mutations
    var targetNode = document.querySelector('.v-application--wrap');

    // Options for the observer (which mutations to observe)
    var config = {
        childList: true,
        subtree: true
    };

    // Callback function to execute when mutations are observed
    var callback = function(mutationsList) {
        for (var mutation of mutationsList) {
            for (const i of document.querySelectorAll(".search-results-items .caption")) {
                if (i.textContent.match(/[0-9]{7}/)) {
                    i.parentElement.parentElement.style.display = "none"
                }
            }
        }
    };

    // Create an observer instance linked to the callback function
    var observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations

    observer.observe(targetNode, config);

    // Later, you can stop observing
    //observer.disconnect();

    //hide caption from single wine pages
    const hideCaption = document.querySelector(".is-page-header .caption")
    if (hideCaption.textContent.match(/[0-9]{7}/)) {
        hideCaption.style.display = "none"
    }
    //mobile navigation bottom
    if (window.innerWidth < 959) {
        let headers = document.querySelectorAll("div.contents > div > h2.toc-header");
        mobileNavBottom();
    }
    // produttore table and sort/filter tools
    if (window.location.href.indexOf("/produttori/") != -1) {
        produttoreSummaryTable()
    }
    // denominazione table
    id1: if ((window.location.href.indexOf("/denominazioni/Italia/Piemonte/DOCG-Barolo") != -1) || (window.location.href.indexOf("/denominazioni/Italia/Toscana/DOCG-Chianti-Classico") != -1)){
      denominazioneSummaryTableStatic()
      break id1;
    } else if (window.location.href.indexOf("/denominazioni/") != -1) {
      denominazioneSummaryTable()
      //abbinamentiTree()
    } 
    // cantina
    if (window.location.href.indexOf("/cantina") != -1) {
        cantinaTableIn()
        cantinaTableOut()
        denominazioneTableFilter()
        setTimeout(tableSort, 1000)
    }
    // vitigni first word bold
    if (window.location.href.indexOf("/vitigni/") != -1) {
        firstWordBold()
    }
    // scheda globale import csv
    if (window.location.href.indexOf("/scheda-globale") != -1) {
        schedaGlobaleImport()
    }
    // scheda singola import csv
    if (window.location.href.indexOf("annata") != -1) {
        schedaSingolaImport()
    }
    // esperienza table import csv
    if (window.location.href.indexOf("/esperienze/") != -1) {
        esperienzeImport()
        setTimeout(tableSort, 1000)
    }
})
