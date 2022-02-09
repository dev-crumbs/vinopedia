export function searchLabel(){
  [...document.querySelectorAll("label")]
   .filter(label => label.textContent.includes("Cerca"))
   .forEach(label => label.innerText = "Cerca vitigni, vini, abbinamenti, regioni...")
  }


//if (window.innerWidth < 959) {
export function mobileNavBottom(){
  let mobileSummaryContainer = document.querySelector("div.dc-summary"); 
  let headers = document.querySelectorAll("div.contents > div > h2.toc-header");
  headers.forEach(el => {
    clone = el.cloneNode(true);
    anchor = clone.querySelector("a")
    anchor.classList.remove("toc-anchor")
    anchor.innerText = anchor.getAttribute("href")
    let s1 = anchor.innerText
    let s2 = s1.substring(1)
    let s3 = s2.replace(/\-/g," ");
    anchor.innerText = s3
    mobileSummaryContainer.append(anchor);
  })
  // anchor smooth
  document.querySelectorAll('.dc-summary a[href^="#"]').forEach(el => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
}
//}