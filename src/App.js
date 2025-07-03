const { useState, useEffect } = React;

function App({ setThemeName, themes, lang, setLang }) {
  const t = translations[lang] || translations.de;
  const [view, setView] = useState('home');
  const [players, setPlayers] = useState(() => JSON.parse(localStorage.getItem('darts-players') || '[]'));
  const [stats, setStats] = useState(() => JSON.parse(localStorage.getItem('darts-stats') || '{}'));
  const [newGamePlayers, setNewGamePlayers] = useState([]);
  const [mode, setMode] = useState('301');
  const [rounds, setRounds] = useState(3);
  const [doubleIn, setDoubleIn] = useState(false);
  const [doubleOut, setDoubleOut] = useState(false);
  const [gamePlayers, setGamePlayers] = useState([]);
  const [scores, setScores] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [throwsLeft, setThrowsLeft] = useState(3);
  const [multiplier, setMultiplier] = useState(1);
  const [roundThrows, setRoundThrows] = useState([]);
  const [playerModalShow, setPlayerModalShow] = useState(false);
  const [guestModalShow, setGuestModalShow] = useState(false);
  const [modeModalShow, setModeModalShow] = useState(false);
  const [infoModalShow, setInfoModalShow] = useState(false);
  const [infoMode, setInfoMode] = useState('');
  const [playerSelect, setPlayerSelect] = useState('');
  const [newPlayerName, setNewPlayerName] = useState('');
  const [guestName, setGuestName] = useState('');

  const modeGroups = {
    classic: ['301', '501', '701', '1001'],
    competition: ['competition'],
    fun: ['tannenbaum', 'cricket', 'shanghai', 'killer', 'baseball'],
    training: ['double', 'checkout', 'averages']
  };

  useEffect(() => localStorage.setItem('darts-players', JSON.stringify(players)), [players]);
  useEffect(() => localStorage.setItem('darts-stats', JSON.stringify(stats)), [stats]);

  const rulesText = {
    de: {
      '301': 'Jeder Spieler startet bei 301 Punkten und spielt herunter.',
      '501': 'Jeder Spieler startet bei 501 Punkten und spielt herunter.',
      '701': 'Jeder Spieler startet bei 701 Punkten und spielt herunter.',
      '1001': 'Jeder Spieler startet bei 1001 Punkten und spielt herunter.',
      'competition': 'Modus nach offiziellen Turnierregeln (PDC). Double-In & Double-Out. Best-of-X Legs und Sets. Optional kein Checkout-Hinweis.',
      'tannenbaum': 'Treffe der Reihe nach die Felder 1 bis 20 und dann die Doppel.',
      'cricket': 'Treffe die Felder 15–20 und Bull jeweils dreimal.',
      'shanghai': 'Runde 1 auf 1, Runde 2 auf 2 usw. Single, Double und Triple in einer Runde gewinnt sofort.',
      'killer': 'Jeder hat eine Zahl. Doppel auf die eigene Zahl macht dich zum Killer, Doppel auf Gegner nimmt Leben.',
      'baseball': 'Neun Runden. In Runde n wird auf Feld n geworfen. Punkte entsprechen dem Treffer.',
      'double': 'Alle Doppel der Reihe nach treffen.',
      'checkout': 'Checkouts von 170 bis 50 trainieren.',
      'averages': 'Auf Punkte spielen und den Average verbessern.'
    },
    en: {
      '301': 'Each player starts with 301 points and plays down.',
      '501': 'Each player starts with 501 points and plays down.',
      '701': 'Each player starts with 701 points and plays down.',
      '1001': 'Each player starts with 1001 points and plays down.',
      'competition': 'Official tournament rules (PDC). Always Double-In & Double-Out. Best-of-X legs and sets. Optional no checkout hint.',
      'tannenbaum': 'Hit fields 1 to 20 in order and then the doubles.',
      'cricket': 'Hit 15–20 and bull three times each before opponents.',
      'shanghai': 'Round 1 on 1, round 2 on 2, etc. Hitting single, double and triple of a number in one round wins instantly.',
      'killer': 'Each player has a number. A double on your own makes you killer, doubles on opponents take lives.',
      'baseball': 'Nine innings. In inning n aim for field n. Score equals the hit.',
      'double': 'Practice hitting all doubles in sequence.',
      'checkout': 'Train checkouts from 170 down to 50.',
      'averages': 'Play for score and improve your average.'
    },
    es: {
      '301': 'Cada jugador comienza con 301 puntos y va restando.',
      '501': 'Cada jugador comienza con 501 puntos y va restando.',
      '701': 'Cada jugador comienza con 701 puntos y va restando.',
      '1001': 'Cada jugador comienza con 1001 puntos y va restando.',
      'competition': 'Modo oficial PDC. Siempre Double-In & Double-Out. Best-of-X legs y sets.',
      'tannenbaum': 'Acierte los campos del 1 al 20 en orden y luego los dobles.',
      'cricket': 'Acierta los campos 15–20 y Bull tres veces cada uno.',
      'shanghai': 'Ronda 1 a la 1, ronda 2 a la 2, etc. Single, doble y triple en la misma ronda gana.',
      'killer': 'Cada jugador tiene un número. Doble propio te hace killer, dobles a rivales quitan vidas.',
      'baseball': 'Nueve rondas tirando al número correspondiente.',
      'double': 'Practica todos los dobles en orden.',
      'checkout': 'Entrena checkouts de 170 a 50.',
      'averages': 'Juega por puntos para mejorar tu promedio.'
    },
    ru: {
      '301': 'Каждый игрок начинает с 301 очка и снижает счет.',
      '501': 'Каждый игрок начинает с 501 очка и снижает счет.',
      '701': 'Каждый игрок начинает с 701 очка и снижает счет.',
      '1001': 'Каждый игрок начинает с 1001 очка и снижает счет.',
      'competition': 'Режим по официальным правилам PDC. Всегда Double-In и Double-Out. Матчи Best-of-X.',
      'tannenbaum': 'Попадайте по полям 1-20 по порядку, затем доблы.',
      'cricket': 'Попадите по секторам 15–20 и быку по три раза.',
      'shanghai': 'Раунд 1 по 1, раунд 2 по 2 и т.д. Если выбить single, double и triple за раунд — победа.',
      'killer': 'Каждому назначается число. Двойное в свое число делает киллером, двойные в чужие отнимают жизни.',
      'baseball': 'Девять раундов, в раунде n бросаем по сектору n.',
      'double': 'Тренируйте попадание во все двойные подряд.',
      'checkout': 'Отработка чек-аутов со 170 до 50.',
      'averages': 'Играйте на очки и улучшайте средний.'
    }
  };

  function addPlayer(name) {
    if (!name) return;
    if (!players.includes(name)) {
      setPlayers([...players, name]);
    }
  }

  function deletePlayer(idx) {
    setPlayers(players.filter((_, i) => i !== idx));
  }

  function editPlayer(idx, name) {
    if (!name) return;
    setPlayers(players.map((p, i) => i === idx ? name : p));
  }

  function addPlayerToGame(name) {
    setNewGamePlayers([...newGamePlayers, name]);
  }

  function removePlayerFromGame(idx) {
    setNewGamePlayers(newGamePlayers.filter((_, i) => i !== idx));
  }

  function startGame() {
    if (!newGamePlayers.length) return;
    setGamePlayers(newGamePlayers);
    const startScore = parseInt(mode, 10) || 0;
    setScores(newGamePlayers.map(() => startScore));
    setRoundThrows(newGamePlayers.map(() => [null, null, null]));
    setCurrentPlayer(0);
    setThrowsLeft(3);
    setMultiplier(1);
    const updated = { ...stats };
    newGamePlayers.forEach(p => {
      updated[p] = updated[p] || { games: 0 };
      updated[p].games += 1;
    });
    setStats(updated);
    setView('game');
  }

  function registerThrow(n) {
    const sc = [...scores];
    sc[currentPlayer] -= n * multiplier;
    setScores(sc);
    const rt = roundThrows.map(r => r.slice());
    const idx = 3 - throwsLeft;
    rt[currentPlayer][idx] = n * multiplier;
    setRoundThrows(rt);
    setThrowsLeft(throwsLeft - 1);
  }

  useEffect(() => {
    if (throwsLeft === 0) {
      // wait for user to click next
    }
  }, [throwsLeft]);

  function confirmTurn() {
    if (throwsLeft > 0) return;
    const next = (currentPlayer + 1) % gamePlayers.length;
    setThrowsLeft(3);
    setMultiplier(1);
    const rt = roundThrows.map(r => r.slice());
    if (rt[next]) rt[next] = [null, null, null];
    setRoundThrows(rt);
    setCurrentPlayer(next);
  }

  return (
    <div>
        {view === 'home' && (
        <section id="home">
          <button className="btn btn-primary w-100 mb-2" onClick={() => { setNewGamePlayers([]); setView('newGame'); }}>{t.homeNewGame}</button>
          <button className="btn btn-primary w-100 mb-2" onClick={() => setView('stats')}>{t.homeStats}</button>
          <button className="btn btn-primary w-100 mb-2" onClick={() => setView('players')}>{t.homePlayers}</button>
          <button className="btn btn-primary w-100 mb-2" onClick={() => setView('rules')}>{t.homeRules}</button>
          <button className="btn btn-primary w-100" onClick={() => setView('settings')}>{t.homeSettings}</button>
        </section>
      )}

      {view === 'newGame' && (
          <section id="new-game">
          <h2>{t.newGameHeading}</h2>
          <div className="mb-2">
            <label className="form-label">{t.mode}:</label>
            <button className="btn btn-secondary w-100" onClick={() => setModeModalShow(true)}>
              {t.modeNames?.[mode] || t.modes[mode] || mode}
            </button>
          </div>
          <div className="mb-2">
            <label className="form-label">{t.rounds}:</label>
            <input type="number" min="1" value={rounds} onChange={e => setRounds(parseInt(e.target.value, 10))} className="form-control" />
          </div>
          <div className="form-check mb-1">
            <input id="double-in" type="checkbox" className="form-check-input" checked={doubleIn} onChange={e => setDoubleIn(e.target.checked)} />
            <label className="form-check-label" htmlFor="double-in">{t.doubleIn}</label>
          </div>
          <div className="form-check mb-2">
            <input id="double-out" type="checkbox" className="form-check-input" checked={doubleOut} onChange={e => setDoubleOut(e.target.checked)} />
            <label className="form-check-label" htmlFor="double-out">{t.doubleOut}</label>
          </div>
          <table className="table table-striped mb-2">
            <tbody>
              {newGamePlayers.map((n, i) => (
                <tr key={i}>
                  <td>{n}</td>
                  <td className="text-end"><button className="btn btn-link p-0" onClick={() => removePlayerFromGame(i)}>&#128465;</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-primary me-2 mb-2" onClick={() => { setPlayerModalShow(true); setPlayerSelect(players[0] || '__new__'); }}>{t.addPlayer}</button>
          <button className="btn btn-secondary mb-2" onClick={() => setGuestModalShow(true)}>{t.addGuest}</button>
          <div>
            <button className="btn btn-success" onClick={startGame}>{t.startGame}</button>
            <button className="btn btn-link back-btn" onClick={() => setView('home')}>&#x2190;</button>
          </div>
        </section>
      )}

      {view === 'game' && (
        <section id="game">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h2 className="m-0">{t.activeGame}</h2>
            <button className="btn btn-link back-btn" onClick={() => setView('home')}>&#x2190;</button>
          </div>
          <div id="scoreboard" className="mb-3">
            <table className="table table-bordered text-center score-table">
              <thead>
                <tr>
                  <th></th>
                  {gamePlayers.map((p, i) => (
                    <th key={i} className={i === currentPlayer ? 'table-primary' : ''}>
                      {p}
                      <div>{scores[i]}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[0, 1, 2].map(r => (
                  <tr key={r}>
                    <th>{r + 1}</th>
                    {gamePlayers.map((_, i) => (
                      <td key={i}>{roundThrows[i] && roundThrows[i][r] != null ? roundThrows[i][r] : ''}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div id="throw-area" className="mb-3">
            {[0, ...Array.from({ length: 20 }, (_, i) => i + 1), 25, 50].map(n => (
              <button key={n} className="btn btn-outline-secondary m-1" onClick={() => registerThrow(n)}>{n === 0 ? t.miss : n}</button>
            ))}
            <div className="mt-2">
              <button className={'btn btn-secondary me-2' + (multiplier === 2 ? ' active' : '')} onClick={() => setMultiplier(multiplier === 2 ? 1 : 2)}>Double</button>
              <button className={'btn btn-secondary' + (multiplier === 3 ? ' active' : '')} onClick={() => setMultiplier(multiplier === 3 ? 1 : 3)}>Triple</button>
            </div>
          </div>
          <button id="confirm-turn" className="btn btn-primary" disabled={throwsLeft > 0} onClick={confirmTurn}>{t.confirmTurn}</button>
        </section>
      )}

      {view === 'stats' && (
        <section id="stats">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="m-0">{t.statsHeading}</h2>
            <button className="btn btn-link back-btn" onClick={() => setView('home')}>&#x2190;</button>
          </div>
          <div id="stats-content" className="mt-2">
            {Object.keys(stats).length === 0 ? t.noData : Object.entries(stats).map(([n, d]) => (
              <div key={n}>{n}: {d.games} {t.gamesLabel}</div>
            ))}
          </div>
        </section>
      )}

      {view === 'players' && (
        <section id="players">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="m-0">{t.playersHeading}</h2>
            <button className="btn btn-link back-btn" onClick={() => setView('home')}>&#x2190;</button>
          </div>
          <table className="table table-striped mt-2">
            <tbody>
              {players.map((p, i) => (
                <tr key={i}>
                  <td>{p}</td>
                  <td className="text-end">
                    <button className="btn btn-link p-0" onClick={() => { const n = prompt(t.addPlayerPrompt, p); if (n) editPlayer(i, n.trim()); }}>&#9998;</button>
                    <button className="btn btn-link text-danger p-0" onClick={() => { if (confirm(t.deletePlayerPrompt)) deletePlayer(i); }}>&#128465;</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-success mt-3" onClick={() => { const n = prompt(t.addPlayerPrompt); if (n) addPlayer(n.trim()); }}>{t.addPlayer}</button>
        </section>
      )}

      {view === 'rules' && (
        <section id="rules">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="m-0">{t.rulesHeading}</h2>
            <button className="btn btn-link back-btn" onClick={() => setView('home')}>&#x2190;</button>
          </div>
          <p id="rules-text" className="mt-2">{(rulesText[lang] && rulesText[lang][mode]) || t.chooseMode}</p>
        </section>
      )}

      {view === 'settings' && (
        <section id="settings">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="m-0">{t.settingsHeading}</h2>
            <button className="btn btn-link back-btn" onClick={() => setView('home')}>&#x2190;</button>
          </div>
          <div className="mt-2">
            {Object.keys(translations).map(l => (
              <button key={l} className={'btn me-2 mb-2 ' + (l === lang ? 'btn-success' : 'btn-outline-secondary')} onClick={() => setLang(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="mt-2">
            {Object.keys(themes).map(name => (
              <button key={name} className="btn btn-primary me-2 mb-2" onClick={() => setThemeName(name)}>
                {name}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Player Modal */}
      {playerModalShow && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{t.addPlayerModalTitle}</h5>
                <button type="button" className="btn-close" onClick={() => setPlayerModalShow(false)}></button>
              </div>
              <div className="modal-body">
                <select className="form-select mb-2" value={playerSelect} onChange={e => setPlayerSelect(e.target.value)}>
                  {players.map(p => <option key={p} value={p}>{p}</option>)}
                  <option value="__new__">{t.newPlayerOption}</option>
                </select>
                {playerSelect === '__new__' && (
                  <input type="text" className="form-control" value={newPlayerName} onChange={e => setNewPlayerName(e.target.value)} placeholder={t.playerNamePlaceholder} />
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setPlayerModalShow(false)}>{t.cancel}</button>
                <button type="button" className="btn btn-primary" onClick={() => {
                  let name = playerSelect === '__new__' ? newPlayerName.trim() : playerSelect;
                  if (!name) return;
                  if (playerSelect === '__new__') addPlayer(name);
                  addPlayerToGame(name);
                  setNewPlayerName('');
                  setPlayerModalShow(false);
                }}>{t.ok}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Guest Modal */}
      {guestModalShow && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{t.addGuestModalTitle}</h5>
                <button type="button" className="btn-close" onClick={() => setGuestModalShow(false)}></button>
              </div>
              <div className="modal-body">
                <input type="text" className="form-control" value={guestName} onChange={e => setGuestName(e.target.value)} placeholder={t.guestNamePlaceholder} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setGuestModalShow(false)}>{t.cancel}</button>
                <button type="button" className="btn btn-primary" onClick={() => { const n = guestName.trim(); if (!n) return; addPlayerToGame(n); setGuestName(''); setGuestModalShow(false); }}>{t.ok}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode Modal */}
      {modeModalShow && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{t.mode}</h5>
                <button type="button" className="btn-close" onClick={() => setModeModalShow(false)}></button>
              </div>
              <div className="modal-body">
                {Object.keys(modeGroups).map(g => (
                  <div key={g} className="mb-3">
                    <h6>{t.modes[g]}</h6>
                    {modeGroups[g].map(m => (
                      <div key={m} className="d-flex mb-2">
                        <button className={'btn flex-grow-1 me-2 ' + (m === mode ? 'btn-primary' : 'btn-outline-primary')} onClick={() => setMode(m)}>
                          {t.modeNames?.[m] || m}
                        </button>
                        <button className="btn btn-outline-secondary" onClick={() => { setInfoMode(m); setInfoModalShow(true); }}>?</button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" onClick={() => setModeModalShow(false)}>{t.confirmMode}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {infoModalShow && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{t.modeNames?.[infoMode] || infoMode}</h5>
                <button type="button" className="btn-close" onClick={() => setInfoModalShow(false)}></button>
              </div>
              <div className="modal-body">
                <p>{(rulesText[lang] && rulesText[lang][infoMode]) || ''}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
