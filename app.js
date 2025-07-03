(function() {
  const sections = {
    home: document.getElementById('home'),
    newGame: document.getElementById('new-game'),
    game: document.getElementById('game'),
    stats: document.getElementById('stats'),
    players: document.getElementById('players'),
    rules: document.getElementById('rules')
  };

  function showSection(id) {
    Object.values(sections).forEach(s => s.classList.add('hidden'));
    sections[id].classList.remove('hidden');
  }

  document.getElementById('btn-new-game').addEventListener('click', () => showSection('newGame'));
  document.getElementById('btn-stats').addEventListener('click', () => { loadStats(); showSection('stats'); });
  document.getElementById('btn-players').addEventListener('click', () => { loadPlayers(); showSection('players'); });
  document.getElementById('btn-rules').addEventListener('click', () => showSection('rules'));

  document.getElementById('back-home-from-new').addEventListener('click', () => showSection('home'));
  document.getElementById('back-home-from-game').addEventListener('click', () => showSection('home'));
  document.getElementById('back-home-from-stats').addEventListener('click', () => showSection('home'));
  document.getElementById('back-home-from-players').addEventListener('click', () => showSection('home'));
  document.getElementById('back-home-from-rules').addEventListener('click', () => showSection('home'));

  const rulesText = document.getElementById('rules-text');
  const modeSelect = document.getElementById('mode');
  const roundsInput = document.getElementById('rounds');
  const doubleIn = document.getElementById('double-in');
  const doubleOut = document.getElementById('double-out');
  const playersInput = document.getElementById('players');
  const startBtn = document.getElementById('start-game');
  const addGuestBtn = document.getElementById('add-guest');
  const scoreboard = document.getElementById('scoreboard');
  const throwArea = document.getElementById('throw-area');
  const nextPlayerBtn = document.getElementById('next-player');
  const statsContent = document.getElementById('stats-content');
  const playersList = document.getElementById('players-list');
  const newPlayerInput = document.getElementById('new-player');
  const addPlayerBtn = document.getElementById('add-player');

  const rules = {
    '301': 'Jeder Spieler startet bei 301 Punkten und spielt herunter.',
    '501': 'Jeder Spieler startet bei 501 Punkten und spielt herunter.',
    'tannenbaum': 'Treffe der Reihe nach die Felder 1 bis 20 und dann die Doppel.'
  };

  modeSelect.addEventListener('change', () => {
    rulesText.textContent = rules[modeSelect.value] || '';
  });

  function loadPlayers() {
    const data = JSON.parse(localStorage.getItem('darts-players') || '[]');
    playersList.innerHTML = data.map(n => `<div>${n}</div>`).join('');
  }

  function savePlayer(name) {
    const data = JSON.parse(localStorage.getItem('darts-players') || '[]');
    if (!data.includes(name)) {
      data.push(name);
      localStorage.setItem('darts-players', JSON.stringify(data));
    }
  }

  addPlayerBtn.addEventListener('click', () => {
    const name = newPlayerInput.value.trim();
    if (name) {
      savePlayer(name);
      newPlayerInput.value = '';
      loadPlayers();
    }
  });

  let guestCount = 1;
  addGuestBtn.addEventListener('click', () => {
    const arr = playersInput.value ? playersInput.value.split(',') : [];
    arr.push('Gast ' + guestCount++);
    playersInput.value = arr.join(',');
  });

  let gamePlayers = [];
  let scores = [];
  let currentPlayer = 0;
  let throwsLeft = 3;
  let multiplier = 1;

  function setupKeypad() {
    throwArea.innerHTML = '';
    const numbers = Array.from({ length: 21 }, (_, i) => i);
    numbers.push(25, 50);
    numbers.forEach(n => {
      const btn = document.createElement('button');
      btn.className = 'btn btn-outline-secondary m-1';
      btn.textContent = n;
      btn.addEventListener('click', () => registerThrow(n));
      throwArea.appendChild(btn);
    });
    const multiDiv = document.createElement('div');
    multiDiv.className = 'mt-2';
    const dBtn = document.createElement('button');
    dBtn.className = 'btn btn-secondary me-2';
    dBtn.textContent = 'Double';
    const tBtn = document.createElement('button');
    tBtn.className = 'btn btn-secondary';
    tBtn.textContent = 'Triple';
    dBtn.addEventListener('click', () => { multiplier = multiplier === 2 ? 1 : 2; updateMulti(); });
    tBtn.addEventListener('click', () => { multiplier = multiplier === 3 ? 1 : 3; updateMulti(); });
    multiDiv.appendChild(dBtn);
    multiDiv.appendChild(tBtn);
    throwArea.appendChild(multiDiv);

    function updateMulti() {
      dBtn.classList.toggle('active', multiplier === 2);
      tBtn.classList.toggle('active', multiplier === 3);
    }
  }

  function registerThrow(n) {
    scores[currentPlayer] -= n * multiplier;
    updateScoreboard();
    throwsLeft--;
    if (throwsLeft === 0) {
      nextPlayerBtn.classList.remove('hidden');
    }
  }

  function updateScoreboard() {
    scoreboard.innerHTML = '';
    gamePlayers.forEach((p, i) => {
      const div = document.createElement('div');
      div.className = 'd-flex justify-content-between';
      div.innerHTML = `<strong>${p}</strong><span>${scores[i]}</span>`;
      if (i === currentPlayer) div.classList.add('fw-bold');
      scoreboard.appendChild(div);
    });
  }

  nextPlayerBtn.addEventListener('click', () => {
    throwsLeft = 3;
    multiplier = 1;
    nextPlayerBtn.classList.add('hidden');
    currentPlayer = (currentPlayer + 1) % gamePlayers.length;
    updateScoreboard();
  });

  function startGame() {
    const names = playersInput.value.split(',').map(s => s.trim()).filter(Boolean);
    if (!names.length) return;
    gamePlayers = names;
    scores = names.map(() => parseInt(modeSelect.value, 10));
    currentPlayer = 0;
    throwsLeft = 3;
    multiplier = 1;
    updateScoreboard();
    setupKeypad();
    saveStats(names);
    showSection('game');
  }

  startBtn.addEventListener('click', startGame);

  function loadStats() {
    const stats = JSON.parse(localStorage.getItem('darts-stats') || '{}');
    statsContent.innerHTML = Object.keys(stats).length ? '' : 'Keine Daten';
    for (const [name, data] of Object.entries(stats)) {
      const div = document.createElement('div');
      div.textContent = `${name}: ${data.games} Spiele`;
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

  loadStats();
  loadPlayers();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }
})();
