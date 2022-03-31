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
      const filterCSV = function(d){return d.Ref == caption && d.Anno == headlineFull[1]} 
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
      let composizioneLength = composizioneArray.length; //must be let for the condition to work
      const affinamentoCSV = csv.filter(filterCSV)[0].Affinamento;
      const alcolCSV = csv.filter(filterCSV)[0].Alcol;
      const prezzoCSV = csv.filter(filterCSV)[0].Prezzo;
      const abbinamentoCSV = csv.filter(filterCSV)[0].Abbinamento;
      const descrizioneCSV = csv.filter(filterCSV)[0].Descrizione;
      const descrizioneSplit = descrizioneCSV.split(' – ')
      const sentoriCSV = descrizioneSplit[1];
      const sentoriSplit = sentoriCSV.split(' | ')
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
        function nationCheck(){switch(cleanVitigno){case"cabernet-sauvignon":return"Francia";case"cabernet-franc":return"Francia";case"carmenere":return"Francia";case"pinot-noir":return"Francia";case"merlot":return"Francia";case"syrah":return"Francia";case"sauvignon-blanc":return"Francia";case"chardonnay":return"Francia";case"pinot-blanc":return"Francia";case"kerner":return"Germania";case"muller-thurgau":return"Svizzera";default:return"Italia"}}
        if (!--composizioneLength){
          d3.select('.caratteristiche li:nth-child(5)').append().html(` <a href="/vitigni/${nationCheck()}/${cleanVitigno}">${i}</a>`)          
        } else {
          d3.select('.caratteristiche li:nth-child(5)').append().html(` <a href="/vitigni/${nationCheck()}/${cleanVitigno}">${i}</a> -`)
        }
      }
      if (spumanteCheck == null){      
        d3.select('.caratteristiche li:nth-child(6)').append().text(" " + affinamentoCSV)
        d3.select('.caratteristiche li:nth-child(7)').append().text(" " + alcolCSV + "%") 
        d3.select('.caratteristiche li:nth-child(8)').append().text(" " + prezzoCSV + "€")
      } else {
        d3.select('.caratteristiche li:nth-child(6)').append().text(" " + alcolCSV + "%")
        d3.select('.caratteristiche li:nth-child(7)').append().text(" " + prezzoCSV + "€")
      }

      d3.select('.abbinamento').append("li").text(abbinamentoCSV)

      for (const i of sentoriSplit ){
        function sentoreCheck(){
          switch(cleanVitigno){
            case "aromatico":
              return "aromatico";
            case "acacia":
              return "floreale";
            case "artemisia":
              return "floreale";
            case "biancospino":
              return "floreale";
            case "caprifoglio":
              return "floreale";
            case "ciclamino":
              return "floreale";
            case "fiori d'arancio":
              return "floreale";
            case "camomilla":
              return "floreale";
            case "fiori di campo":
              return "floreale";
            case "fiori di vite":
              return "floreale";
            case "garofano":
              return "floreale";
            case "gelsomino":
              return "floreale";
            case "geranio":
              return "floreale";
            case "giacinto":
              return "floreale";
            case "giaggiolo":
              return "floreale";
            case "ginestra":
              return "floreale";
            case "glicine":
              return "floreale";
            case "ibisco":
              return "floreale";
            case "iris":
              return "floreale";
            case "lavanda":
              return "floreale";
            case "lillà":
              return "floreale";
            case "magnolia":
              return "floreale";
            case "mimosa":
              return "floreale";
            case "mugheso":
              return "floreale";
            case "narciso":
              return "floreale";
            case "passiflora":
              return "floreale";
            case "peonia":
              return "floreale";
            case "pot-pourri":
              return "floreale";
            case "rosa":
              return "floreale";
            case "rosa canina":
              return "floreale";
            case "r. damascena":
              return "floreale";
            case "rosa tea":
              return "floreale";
            case "ranuncolo":
              return "floreale";
            case "sambuco":
              return "floreale";
            case "viola":
              return "floreale";
            case "viola mammola":
              return "floreale";
            case "tiglio":
              return "floreale";
            case "tuberosa":
              return "floreale";
            case "zagara":
              return "floreale";
            case "albicocca":
              return "fruttato";
            case "amarena":
              return "fruttato";
            case "ananas":
              return "fruttato";
            case "anguria":
              return "fruttato";
            case "banana":
              return "fruttato";
            case "bergamotto":
              return "fruttato";
            case "buccia d'arancia":
              return "fruttato";
            case "carruba":
              return "fruttato";
            case "cassis":
              return "fruttato";
            case "cedro":
              return "fruttato";
            case "chinotto":
              return "fruttato";
            case "ciliegia":
              return "fruttato";
            case "cocco":
              return "fruttato";
            case "datteri":
              return "fruttato";
            case "fico":
              return "fruttato";
            case "fragola":
              return "fruttato";
            case "fragolina":
              return "fruttato";
            case "frutta candita":
              return "fruttato";
            case "frutta caramellata":
              return "fruttato";
            case "frutta cotta":
              return "fruttato";
            case "frutta disidratata":
              return "fruttato";
            case "frutta distillata":
              return "fruttato";
            case "f. in gelatina":
              return "fruttato";
            case "f. in confettura":
              return "fruttato";
            case "frutta sciroppata":
              return "fruttato";
            case "f. sotto spirito":
              return "fruttato";
            case "frutti di bosco":
              return "fruttato";
            case "gelso":
              return "fruttato";
            case "giuggiola":
              return "fruttato";
            case "kiwi":
              return "fruttato";
            case "lampone":
              return "fruttato";
            case "lime":
              return "fruttato";
            case "limone":
              return "fruttato";
            case "litchi":
              return "fruttato";
            case "macis":
              return "fruttato";
            case "mandarino":
              return "fruttato";
            case "mandorla":
              return "fruttato";
            case "mango":
              return "fruttato";
            case "marasca":
              return "fruttato";
            case "mela":
              return "fruttato";
            case "melagrana":
              return "fruttato";
            case "melone":
              return "fruttato";
            case "mirtillo":
              return "fruttato";
            case "mirto":
              return "fruttato";
            case "mora":
              return "fruttato";
            case "nespola":
              return "fruttato";
            case "nocciola":
              return "fruttato";
            case "noce":
              return "fruttato";
            case "papaia":
              return "fruttato";
            case "pera":
              return "fruttato";
            case "pesca":
              return "fruttato";
            case "pompelmo":
              return "fruttato";
            case "prugna":
              return "fruttato";
            case "ribes":
              return "fruttato";
            case "susina":
              return "fruttato";
            case "uva moscato":
              return "fruttato";
            case "uva spina":
              return "fruttato";
            case "uva passa":
              return "fruttato";
            case "visciola":
              return "fruttato";
            case "acero":
              return "vegetale";
            case "alga marina":
              return "vegetale";
            case "asparagi":
              return "vegetale";
            case "bosso":
              return "vegetale";
            case "cipresso":
              return "vegetale";
            case "corteccia":
              return "vegetale";
            case "dragoncello":
              return "vegetale";
            case "erba medica":
              return "vegetale";
            case "erba sfalciata":
              return "vegetale";
            case "erbe agresti":
              return "vegetale";
            case "e. aromatiche":
              return "vegetale";
            case "erbe officinali":
              return "vegetale";
            case "elicriso":
              return "vegetale";
            case "fagiolini":
              return "vegetale";
            case "felce":
              return "vegetale";
            case "fieno":
              return "vegetale";
            case "fiore di veccia":
              return "vegetale";
            case "foglia di cappero":
              return "vegetale";
            case "foglia di fico":
              return "vegetale";
            case "f. di pomodoro":
              return "vegetale";
            case "foglie secche":
              return "vegetale";
            case "fresia":
              return "vegetale";
            case "friggitello":
              return "vegetale";
            case "frutta acerba":
              return "vegetale";
            case "fungo":
              return "vegetale";
            case "genziana":
              return "vegetale";
            case "humus":
              return "vegetale";
            case "lentisco":
              return "vegetale";
            case "m. mediterranea":
              return "vegetale";
            case "mallo di noce":
              return "vegetale";
            case "malva":
              return "vegetale";
            case "muschio":
              return "vegetale";
            case "pacciame":
              return "vegetale";
            case "peperone":
              return "vegetale";
            case "prugnolo":
              return "vegetale";
            case "sottobosco":
              return "vegetale";
            case "rabarbaro":
              return "vegetale";
            case "ruta":
              return "vegetale";
            case "tartufo":
              return "vegetale";
            case "verdura cotta":
              return "vegetale";
            case "aneto":
              return "vegetale";
            case "alloro":
              return "vegetale";
            case "balsamico":
              return "vegetale";
            case "basilico":
              return "vegetale";
            case "cardo":
              return "vegetale";
            case "finocchio":
              return "vegetale";
            case "maggiorana":
              return "vegetale";
            case "melissa":
              return "vegetale";
            case "menta":
              return "vegetale";
            case "origano":
              return "vegetale";
            case "ortica":
              return "vegetale";
            case "prezzemolo":
              return "vegetale";
            case "rosmarino":
              return "vegetale";
            case "salvia":
              return "vegetale";
            case "santoreggia":
              return "vegetale";
            case "tartufo":
              return "vegetale";
            case "terriccio":
              return "vegetale";
            case "timo":
              return "vegetale";
            case "verbena":
              return "vegetale";
            case "ardesia":
              return "minerale";
            case "argilla":
              return "minerale";
            case "benzina":
              return "minerale";
            case "cenere":
              return "minerale";
            case "gesso":
              return "minerale";
            case "ghiaia":
              return "minerale";
            case "grafite":
              return "minerale";
            case "ferro":
              return "minerale";
            case "idrocarburi":
              return "minerale";
            case "inchiostro":
              return "minerale";
            case "petrolio":
              return "minerale";
            case "pietra focaia":
              return "minerale";
            case "pietrisco":
              return "minerale";
            case "polvere da sparo":
              return "minerale";
            case "ruggine":
              return "minerale";
            case "salmastro":
              return "minerale";
            case "silice":
              return "minerale";
            case "talco":
              return "minerale";
            case "torba":
              return "minerale";
            case "anice":
              return "speziato";
            case "cannella":
              return "speziato";
            case "cardamomo":
              return "speziato";
            case "c. di garofano":
              return "speziato";
            case "coriandolo":
              return "speziato";
            case "cumino":
              return "speziato";
            case "curcuma":
              return "speziato";
            case "curry":
              return "speziato";
            case "ginepro":
              return "speziato";
            case "noce moscata":
              return "speziato";
            case "pepe bianco":
              return "speziato";
            case "pepe nero":
              return "speziato";
            case "pepe rosa":
              return "speziato";
            case "pepe verde":
              return "speziato";
            case "peperoncino":
              return "speziato";
            case "senape":
              return "speziato";
            case "sandalo":
              return "speziato";
            case "vaniglia":
              return "speziato";
            case "zafferano":
              return "speziato";
            case "zenzero":
              return "speziato";
            case "affumicato":
              return "tostato";
            case "cacao":
              return "tostato";
            case "caffè":
              return "tostato";
            case "cioccolato":
              return "tostato";
            case "fava tonka":
              return "tostato";
            case "fava di cacao":
              return "tostato";
            case "fumo":
              return "tostato";
            case "catrame":
              return "tostato";
            case "mandorla tostata":
              return "tostato";
            case "nocciola tostata":
              return "tostato";
            case "orzo tostato":
              return "tostato";
            case "pane tostato":
              return "tostato";
            case "pinolo tostato":
              return "tostato";
            case "pipa":
              return "tostato";
            case "scatola di sigari":
              return "tostato";
            case "tabacco":
              return "tostato";
            case "vinoso":
              return "vinoso";
            case "fragrante":
              return "fragrante";
            case "cuoio":
              return "animale";
            case "ematico":
              return "animale";
            case "lana bagnata":
              return "animale";
            case "pellame":
              return "animale";
            case "selvaggina":
              return "animale";
            case "alchermes":
              return "etereo";
            case "cera":
              return "etereo";
            case "ceralacca":
              return "etereo";
            case "cioccolato al rum":
              return "etereo";
            case "iodio":
              return "etereo";
            case "medicinale":
              return "etereo";
            case "plastica":
              return "etereo";
            case "sapone":
              return "etereo";
            case "smalto":
              return "etereo";
            case "vermouth":
              return "etereo";
            case "amaretto":
              return "altri";
            case "amaro alle erbe":
              return "altri";
            case "angostura":
              return "altri";
            case "biscotto":
              return "altri";
            case "boero":
              return "altri";
            case "brioche":
              return "altri";
            case "burro":
              return "altri";
            case "caramella":
              return "altri";
            case "caramello":
              return "altri";
            case "cera d'api":
              return "altri";
            case "china":
              return "altri";
            case "cipria":
              return "altri";
            case "colatura di alici":
              return "altri";
            case "confetto":
              return "altri";
            case "creme caramel":
              return "altri";
            case "croccante":
              return "altri";
            case "crosta di pane":
              return "altri";
            case "eucalipto":
              return "altri";
            case "foglia di tè":
              return "altri";
            case "formaggio":
              return "altri";
            case "incenso":
              return "altri";
            case "legna arsa":
              return "altri";
            case "legno (boisè)":
              return "altri";
            case "lievito":
              return "altri";
            case "liquirizia":
              return "altri";
            case "marron glacee":
              return "altri";
            case "marzapane":
              return "altri";
            case "mentolo":
              return "altri";
            case "miele":
              return "altri";
            case "oliva":
              return "altri";
            case "pan brioche":
              return "altri";
            case "pan biscotto":
              return "altri";
            case "pan pepato":
              return "altri";
            case "pasticceria":
              return "altri";
            case "pino":
              return "altri";
            case "pane":
              return "altri";
            case "plum cake":
              return "altri";
            case "propoli":
              return "altri";
            case "resina":
              return "altri";
            case "tamarindo":
              return "altri";
            case "torrone":
              return "altri";
            case "zucchero a velo":
              return "altri";
            case "zucchero filato":
              return "altri";
          }
        }
        d3.select('.riconoscimenti').append("div").attr("class", sentoreCheck(i)).text(i);
      }


      // spumante
      if (spumanteCheck == null){ } else {
        d3.select('.spumantizzazione li:nth-child(1)').append().text(" " + millesimoCSV)
        d3.select('.spumantizzazione li:nth-child(2)').append().text(" " + tecnicaCSV)
        d3.select('.spumantizzazione li:nth-child(3)').append().text(" " + zuccheroCSV)
        d3.select('.spumantizzazione li:nth-child(4)').append().text(" " + affinamentoCSV)
      }
      if (noteCheck == null){ } else{
        d3.select('.note').append().text(noteCSV)
      }
      if (listCheck == null){return;} else {
        document.querySelector("div[role='list'] .v-list-item__title").innerText = headlineFull[0]
      }
  });
}
  