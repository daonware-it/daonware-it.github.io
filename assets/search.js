// Zentrale Suchfunktion für alle Seiten
// Sucht in allen Elementen mit .article-preview oder .wide-preview
// Zeigt eine Meldung an, wenn keine Treffer gefunden werden

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.search-box form');
  if (!form) return;
  const input = form.querySelector('input');
  // Alle Artikel-Boxen auf der Seite
    const isStartseite = !!document.querySelector('.hero');
    const articles = Array.from(document.querySelectorAll('.article-preview, .wide-preview'));
  // Optional: Meldung für keine Treffer
  let noResults = document.getElementById('no-results');
  if (!noResults) {
    // Falls nicht vorhanden, dynamisch einfügen
    noResults = document.createElement('div');
    noResults.id = 'no-results';
    noResults.style.display = 'none';
    noResults.style.color = '#b8860b';
    noResults.style.fontSize = '1.15em';
    noResults.style.textAlign = 'center';
    noResults.style.margin = '2em 0 1em 0';
    noResults.textContent = 'Leider konnten wir Ihren Artikel nicht finden.';
    const blogContainer = document.querySelector('.blog-container');
    if (blogContainer) blogContainer.prepend(noResults);
  }
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const query = input.value.trim().toLowerCase();
        if (isStartseite && query.length > 0) {
            // Weiterleitung zu articel.html mit Suchbegriff als Parameter
            window.location.href = 'articel.html?search=' + encodeURIComponent(query);
            return;
        }
        let found = false;
    articles.forEach(box => {
      box.style.display = 'block';
      const text = box.textContent.toLowerCase();
      if (!text.includes(query) && query.length > 0) {
        box.style.display = 'none';
      } else if (query.length > 0) {
        found = true;
      }
    });
    if (!found && query.length > 0) {
      noResults.style.display = 'block';
    } else {
      noResults.style.display = 'none';
    }
    if (query.length === 0) {
      articles.forEach(box => box.style.display = 'block');
      noResults.style.display = 'none';
    }
  });
    // Auf articel.html: Suche beim Laden ausführen, wenn Suchbegriff vorhanden
    if (!isStartseite) {
        const params = new URLSearchParams(window.location.search);
        const search = params.get('search');
        if (search) {
            input.value = search;
            form.dispatchEvent(new Event('submit'));
        }
    }
});
