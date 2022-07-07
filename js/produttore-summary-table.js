import {tableSort} from '/it/js/table-filter.js';
import {denominazioneTableFilter} from '/it/js/table-filter.js';
export function produttoreSummaryTable() {
    //Checks
    const produttore = document.querySelector(".headline").innerText
    const produttoreURL = document.querySelector(".headline").innerText.replaceAll("' ", '-').replaceAll(' ', '-').replaceAll("'", '-')
    const headlineCaption = document.querySelector(".caption").innerText.split(' | ')
    const regione = headlineCaption[1].replaceAll(" ", "-").replaceAll("'", "-");
    const nazione = document.querySelector(".prouttoreNazione").innerText
    const years = [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005]
    d3.text(`/vini/${regione}.csv`).then(function myFunction(data) {
        const csv = d3.csvParse(data);
        const winesFilter = function(d) {
            return d.Produttore == produttore && d.Entry === "1"
        }
        const winesList = csv.filter(winesFilter)
        const wineFilter = function(d) {
            return d.Produttore == produttore && d.Entry === "2"
        }
        const wineList = csv.filter(wineFilter)
        //table pop
        const produttoreHead = d3.select('.produttore-table thead tr')
        produttoreHead.append("th").text("Vino")
        produttoreHead.append("th").text("Media Grezza")
        produttoreHead.append("th").text("Prezzo")
        produttoreHead.append("th").text("VScore")
        produttoreHead.append("th").text("QP")
        for (const i in years) {
            produttoreHead.append("th").text(`${years[i]}`).attr("data-th",`${years[i]}`)
        }
        function calcPrice(i) {
            const splitPrices = i.Prezzo.split("-");
            const avgPrice = (Number(splitPrices[0]) + Number(splitPrices[1])) / 2
            return avgPrice
        }
        for (const i of winesList) {
            const produttoreBodyRow = d3.select('.produttore-table tbody').append("tr").attr("title", `${i.Nome}-row`)
            produttoreBodyRow.append("td").attr("data-th", "Vino").html(`<a href="/it/vini/Italia/${regione}/${produttoreURL}/${i.Nome.replaceAll(' ', '-').replaceAll("'", '-')}/scheda-globale.html">${i.Nome}</a>`)
            produttoreBodyRow.append("td").attr("data-th", "Media Grezza").text(`${i.MediaGrezza}`)
            produttoreBodyRow.append("td").attr("data-th", "Prezzo").html(`${calcPrice(i)}`)
            produttoreBodyRow.append("td").attr("data-th", "VScore").attr("title", `${i.VScore}`).style("width", function (d) {
          return ((i.VScore*90)/100) + "%"}).text(`${i.VScore}`)
            produttoreBodyRow.append("td").attr("data-th", "QP").attr("title", `${i.QP}`).style("width", function (d) {
          return ((i.QP*90)/100) + "%"}).text(`${i.QP}`)
            for (const j in years) {
                produttoreBodyRow.append("td").attr("data-th", `${years[j]}`)
            }
            for (const k of wineList) {
                d3.select(`.produttore-table tr[title="${k.Nome}-row"] td[data-th="${k.Anno}"]`).attr("title", `${k.Valutazione}`).text(`${k.Valutazione}`)
            }
        }
        for (const i of years) {
            const all132 = document.querySelector(`.produttore-table th[data-th="${i}"]`)
            const all13 = document.querySelectorAll(`.produttore-table td[data-th="${i}"]`)
            const all = []
            for (const j of all13) {
                all.push(j.innerText)
            }
            const allEqual = arr => arr.every( v => v === arr[0] )

            if (allEqual(all) == true){ 
                all132.remove()
                for (const i of all13){
                    i.remove()
                }
            } else {
                for (const i of all13){
                    if(i.innerText == "") {
                        i.innerText = "sv"
                        i.setAttribute("title", "sv")
                    }
                }
            }
        }
      }).then(function myFunction(data) {
    //simpleTable
    const allTables = document.querySelectorAll(".produttore-table")
    for (var i = 0; i < allTables.length; i++) {
      allTables[i].classList.add(`tableNumber${i}`)
      const dataTable = new simpleDatatables.DataTable(`.tableNumber${i}`, {
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
          { select: [2,3,4,5,6], type: "number"},
          { select: 1, type: "number", sort: "desc"}
        ],
        nextPrev: false
      })
    }
  })
}