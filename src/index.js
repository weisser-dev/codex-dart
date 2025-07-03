const { useState, useEffect } = React;

function applyTheme(theme) {
  if (!theme) return;
  for (const [key, val] of Object.entries(theme)) {
    document.documentElement.style.setProperty(key, val);
  }
}

function AppWrapper() {
  const [themes, setThemes] = useState({});
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [themeName, setThemeName] = useState(
    localStorage.getItem('theme') || (systemDark ? 'dark' : 'light')
  );
  const browserLang = (navigator.language || 'de').slice(0, 2);
  const [lang, setLang] = useState(
    localStorage.getItem('lang') || (translations[browserLang] ? browserLang : 'de')
  );

  useEffect(() => {
    fetch('src/themes.json')
      .then(res => res.json())
      .then(data => setThemes(data));
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
  }, [lang]);

  useEffect(() => {
    if (themes[themeName]) {
      applyTheme(themes[themeName]);
      localStorage.setItem('theme', themeName);
    }
  }, [themes, themeName]);

  return <App setThemeName={setThemeName} themes={themes} lang={lang} setLang={setLang} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(<AppWrapper />);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
