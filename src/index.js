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

  useEffect(() => {
    fetch('src/themes.json')
      .then(res => res.json())
      .then(data => setThemes(data));
  }, []);

  useEffect(() => {
    if (themes[themeName]) {
      applyTheme(themes[themeName]);
      localStorage.setItem('theme', themeName);
    }
  }, [themes, themeName]);

  return <App setThemeName={setThemeName} themes={themes} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(<AppWrapper />);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
