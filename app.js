(function() {
  const gameSection = document.getElementById('game');
  const scoreboard = document.getElementById('scoreboard');
  const startBtn = document.getElementById('start-game');
  const modeSelect = document.getElementById('mode');
  const playersInput = document.getElementById('players');
  const doubleOutCheckbox = document.getElementById('double-out');
  const rulesText = document.getElementById('rules-text');
  const statsContent = document.getElementById('stats-content');

  const rules = {
    '301': 'Jeder Spieler startet bei 301 Punkten und spielt herunter.',
    '501': 'Jeder Spieler startet bei 501 Punkten und spielt herunter.',
    'tannenbaum': 'Treffe der Reihe nach die Felder 1 bis 20 und dann die Doppel.'
  };

  // Update rules when mode changes
  modeSelect.addEventListener('change', () => {
    rulesText.textContent = rules[modeSelect.value] || '';
  });

  function loadStats() {
    const stats = JSON.parse(localStorage.getItem('darts-stats') || '{}');
    statsContent.innerHTML = Object.keys(stats).length ? '' : 'Keine Daten';
    for (const [name, data] of Object.entries(stats)) {
      const div = document.createElement('div');
      div.textContent = `${name}: ${data.games} Spiele`; // simple display
      statsContent.appendChild(div);
    }
  }

  function saveStats(players) {
    const stats = JSON.parse(localStorage.getItem('darts-stats') || '{}');
    players.forEach(p => {
      stats[p] = stats[p] || { games: 0 };
      stats[p].games += 1;
    });
    localStorage.setItem('darts-stats', JSON.stringify(stats));
  }

  function startGame() {
    const players = playersInput.value.split(',').map(p => p.trim()).filter(Boolean);
    if (!players.length) return;
    saveStats(players);
    loadStats();

    scoreboard.innerHTML = '';
    players.forEach(name => {
      const row = document.createElement('div');
      row.className = 'player d-flex justify-content-between align-items-center';
      row.innerHTML = `<span>${name}</span><input type="number" class="form-control w-auto" value="0">`;
      scoreboard.appendChild(row);
    });
    gameSection.classList.remove('hidden');
  }

  startBtn.addEventListener('click', startGame);
  loadStats();

  // PWA install popup and service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }
})();
