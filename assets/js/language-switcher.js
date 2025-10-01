document.addEventListener('DOMContentLoaded', function() {
  // Default language
  let currentLang = localStorage.getItem('language') || 'fr';
  
  // Update language selector UI
  function updateLanguageSelector() {
    document.querySelectorAll('.language-selector a').forEach(link => {
      link.classList.remove('active');
      if (link.classList.contains(`lang-${currentLang}`)) {
        link.classList.add('active');
      }
    });
  }
  
  // Translate the page
  function translatePage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    updateLanguageSelector();
    
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        let text = translations[lang][key];
        
        // Handle dynamic content (like year)
        if (text.includes('{year}')) {
          text = text.replace('{year}', new Date().getFullYear());
        }
        
        element.textContent = text;
      }
    });
    
    // Update attributes like placeholders and titles
    document.querySelectorAll('[data-i18n-attr]').forEach(element => {
      const [attr, key] = element.getAttribute('data-i18n-attr').split(':');
      if (translations[lang] && translations[lang][key]) {
        element.setAttribute(attr, translations[lang][key]);
      }
    });
  }
  
  // Event listeners for language switcher
  document.querySelectorAll('.language-selector a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const lang = this.classList.contains('lang-fr') ? 'fr' : 'en';
      if (lang !== currentLang) {
        translatePage(lang);
      }
    });
  });
  
  // Initialize
  updateLanguageSelector();
  translatePage(currentLang);
  
  // Update year in footer
  document.getElementById('year').textContent = new Date().getFullYear();
});
