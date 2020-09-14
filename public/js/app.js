if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('https://hypario.netlify.app/SW.js')
    .then((reg) => {
      // registration successful
    })
    .catch(err => {
      console.log("fail : " + err)
    })
}

// check if a language is in localStorage and display it
if (localStorage.getItem('lang')) {
  const lang = localStorage.getItem('lang');
  if (lang === 'fr') {
    getDom('fr.html')
  } else if (lang === 'en') {
    getDom('en.html')
  }
} else {
  getDom('fr.html')
}

/**
 * get the content from the needed page
 * @param {string} url
 */
function getDom(url) {
  fetch(url)
    .then(response => {
      return response.text()
    })
    .then(html => {
      // parse the HTML document
      const parser = new DOMParser();
      const content = parser.parseFromString(html, "text/html");

      // display the document
      document.body.innerHTML = content.body.innerHTML;

      // needed when the document is loaded
      responsiveMenu();
      selectLang();
    })
}

/**
 * make the menu responsive
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
 * make you able to select a language
 */
function selectLang() {
  const select = document.getElementById('lang');

  select.addEventListener("change", (e) => {
    e.preventDefault();
    const lang = e.target.value;

    // get dom according to the language
    if (lang === "fr") {
      localStorage.setItem('lang', 'fr');
      getDom("fr.html")
    } else if (lang === "en") {
      localStorage.setItem('lang', 'en');
      getDom("en.html")
    }
  });
}
