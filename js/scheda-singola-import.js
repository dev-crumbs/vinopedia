import {sentoreCheck} from '/it/js/listone-olfattivo.js';
export function schedaSingolaImport() {
    //Checks
    const listCheck = document.querySelector("div[role='list'] .v-list-item__title")
    const spumanteCheck = document.querySelector(".spumantizzazione")
    const noteCheck = document.querySelector(".note")
    //page headline input
    const headlineFull = document.querySelector(".headline").innerText.split(' – ')
    const caption = document.querySelector(".is-page-header .caption").innerText
    d3.text(`/vini/listone.csv`).then(function(data) {
        const csv = d3.csvParse(data);
        const filterCSV = function(d) {
            return d.Ref == caption && d.Anno == headlineFull[1]
        }
        const nomeCSV = csv.filter(filterCSV)[0].Nome;
        const regioneCSV = csv.filter(filterCSV)[0].Regione;
        const nazioneCSV = csv.filter(filterCSV)[0].Nazione;
        const tipoCSV = csv.filter(filterCSV)[0].Tipologia;
        const denominazioneCSV = csv.filter(filterCSV)[0].Denominazione;
        const menzioniCSV = csv.filter(filterCSV)[0].Menzioni;
        const classificazioneCSV = csv.filter(filterCSV)[0].Classificazione;
        const produttoreCSV = csv.filter(filterCSV)[0].Produttore;
        const composizioneCSV = csv.filter(filterCSV)[0].Composizione;
        const composizioneArray = composizioneCSV.split(' – ')
        let composizioneLength = composizioneArray.length;
        //must be let for the condition to work
        const affinamentoCSV = csv.filter(filterCSV)[0].Affinamento;
        const alcolCSV = csv.filter(filterCSV)[0].Alcol;
        const prezzoCSV = csv.filter(filterCSV)[0].Prezzo;
        const abbinamentoCSV = csv.filter(filterCSV)[0].Abbinamento;
        const descrizioneCSV = csv.filter(filterCSV)[0].Descrizione;
        if (descrizioneCSV == '') { } else {
          const descrizioneSplit = descrizioneCSV.split(' – ')
          const sentoriCSV = descrizioneSplit[1];
          const sentoriSplit = sentoriCSV.split(' | ')
        }
        const noteCSV = csv.filter(filterCSV)[0].Note;
        //spumantizzazione
        const millesimoCSV = csv.filter(filterCSV)[0].Millesimo;
        const tecnicaCSV = csv.filter(filterCSV)[0].Tecnica;
        const zuccheroCSV = csv.filter(filterCSV)[0].Zucchero;

        d3.select('h1').append().text(nomeCSV)
        d3.select('.caratteristiche li:nth-child(1)').append().text(" " + nomeCSV)
        d3.select('.caratteristiche li:nth-child(2)').append().text(" " + tipoCSV)
        d3.select('.caratteristiche li:nth-child(3)').append().html(` <a href="/denominazioni/${nazioneCSV}/${regioneCSV}/${classificazioneCSV}-${denominazioneCSV.replaceAll(' ', '-')}">${denominazioneCSV} ${classificazioneCSV}</a> | ${menzioniCSV}`)
        d3.select('.caratteristiche li:nth-child(4)').append().html(` <a href="/produttori/${nazioneCSV}/${regioneCSV}/${produttoreCSV.replaceAll("' ", '-').replaceAll(' ', '-')}">${produttoreCSV}</a>`)
        for (const i of composizioneArray) {
            const cleanVitigno = i.split(/( \d+)/)[0].replaceAll(' ', '-').replaceAll("'", "-").toLowerCase()
            function nationCheck() {
                switch (cleanVitigno) {
                case "cabernet-sauvignon":
                    return "Francia";
                case "cabernet-franc":
                    return "Francia";
                case "carmenere":
                    return "Francia";
                case "pinot-noir":
                    return "Francia";
                case "merlot":
                    return "Francia";
                case "syrah":
                    return "Francia";
                case "sauvignon-blanc":
                    return "Francia";
                case "chardonnay":
                    return "Francia";
                case "pinot-blanc":
                    return "Francia";
                case "kerner":
                    return "Germania";
                case "muller-thurgau":
                    return "Svizzera";
                default:
                    return "Italia"
                }
            }
            if (!--composizioneLength) {
                d3.select('.caratteristiche li:nth-child(5)').append().html(` <a href="/vitigni/${nationCheck()}/${cleanVitigno}">${i}</a>`)
            } else {
                d3.select('.caratteristiche li:nth-child(5)').append().html(` <a href="/vitigni/${nationCheck()}/${cleanVitigno}">${i}</a> -`)
            }
        }
        if (spumanteCheck == null) {
            d3.select('.caratteristiche li:nth-child(6)').append().text(" " + affinamentoCSV)
            d3.select('.caratteristiche li:nth-child(7)').append().text(" " + alcolCSV + "%")
            d3.select('.caratteristiche li:nth-child(8)').append().text(" " + prezzoCSV + "€")
        } else {
            d3.select('.caratteristiche li:nth-child(6)').append().text(" " + alcolCSV + "%")
            d3.select('.caratteristiche li:nth-child(7)').append().text(" " + prezzoCSV + "€")
        }

        d3.select('.abbinamento').append("li").text(abbinamentoCSV)
        if (descrizioneCSV == '') { } else {
            for (const i of sentoriSplit) {
                const nome = i.split(' - ')
                const ricWidth = document.querySelector('.riconoscimenti').clientWidth
                var divOut = d3.select('.riconoscimenti').append("div")
                    .attr("class", sentoreCheck(nome[0]))
                    .attr("style", `width:${nome[1]}%; background-size: ${ricWidth}px`)
                    divOut.append("span").text(sentoreCheck(nome[0]))
                    divOut.append("span").text(" - " + nome[0])
    //            d3.select('.riconoscimenti').append("div").text(nome[0]);
            }
        }
        // spumante
        if (spumanteCheck == null) {} else {
            d3.select('.spumantizzazione li:nth-child(1)').append().text(" " + millesimoCSV)
            d3.select('.spumantizzazione li:nth-child(2)').append().text(" " + tecnicaCSV)
            d3.select('.spumantizzazione li:nth-child(3)').append().text(" " + zuccheroCSV)
            d3.select('.spumantizzazione li:nth-child(4)').append().text(" " + affinamentoCSV)
        }
        if (noteCheck == null) {} else {
            d3.select('.note').append().text(noteCSV)
        }
        if (listCheck == null) {
            return;
        } else {
            document.querySelector("div[role='list'] .v-list-item__title").innerText = headlineFull[0]
        }
    });
}
