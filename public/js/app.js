// check si on a une langue mis en cache et l'affiche
if (localStorage.getItem('lang')) {
  const lang = localStorage.getItem('lang')
  if (lang === 'fr') {
    getDom('fr.html')
  } else if (lang === 'en') {
    getDom('en.html')
  }
} else {
  getDom('fr.html')
}

/**
 * l'url vers la page HTML nécessaire
 * @param {string} url 
 */
function getDom(url) {
  // requête la page
  fetch(url)
  .then(response => {
    return response.text()
  })
  .then(html => {
    // parse la page HTML
    const parser = new DOMParser();
    const content = parser.parseFromString(html, "text/html")

    // affiche la page
    document.body.innerHTML = content.body.innerHTML

    // nécessaire lorsque la page est chargé
    responsiveMenu();
    selectLang();
  })
}

/**
 * Permet de rendre le menu responsive
 */
function responsiveMenu() {
  /**
  * @type {HTMLElement} nav__icon
  */
  const nav__icon = document.querySelector(".nav__icon");

  /**
  * @type {HTMLElement} menu
  */
  const menu = document.querySelector(".menu");

  nav__icon.addEventListener('click', e => {
    e.preventDefault();
    menu.classList.toggle("showing");
  });
}

/**
 * Permet de sélectionner une langue et modifier le contenu
 */
function selectLang() {
  const select = document.getElementById('lang');
  Array.from(select.children).forEach(element => {
    element.addEventListener("click", (e) => {
      e.preventDefault()
      const lang = e.target.value;
      if (lang === "fr") {
        localStorage.setItem('lang', 'fr')
        getDom("fr.html")
      } else if (lang === "en") {
        localStorage.setItem('lang', 'en')
        getDom("en.html")
      }
    })
  });
}