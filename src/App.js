const { useState, useEffect } = React;

function App({ setThemeName, themes }) {
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
  const [playerModalShow, setPlayerModalShow] = useState(false);
  const [guestModalShow, setGuestModalShow] = useState(false);
  const [playerSelect, setPlayerSelect] = useState('');
  const [newPlayerName, setNewPlayerName] = useState('');
  const [guestName, setGuestName] = useState('');

  useEffect(() => localStorage.setItem('darts-players', JSON.stringify(players)), [players]);
  useEffect(() => localStorage.setItem('darts-stats', JSON.stringify(stats)), [stats]);

  const rulesText = {
    '301': 'Jeder Spieler startet bei 301 Punkten und spielt herunter.',
    '501': 'Jeder Spieler startet bei 501 Punkten und spielt herunter.',
    'tannenbaum': 'Treffe der Reihe nach die Felder 1 bis 20 und dann die Doppel.'
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
    setScores(newGamePlayers.map(() => parseInt(mode, 10)));
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
    setThrowsLeft(throwsLeft - 1);
  }

  useEffect(() => {
    if (throwsLeft === 0) {
      // wait for user to click next
    }
  }, [throwsLeft]);

  function nextPlayer() {
    setThrowsLeft(3);
    setMultiplier(1);
    setCurrentPlayer((currentPlayer + 1) % gamePlayers.length);
  }

  return (
    <div>
      {view === 'home' && (
        <section id="home">
          <button className="btn btn-primary w-100 mb-2" onClick={() => { setNewGamePlayers([]); setView('newGame'); }}>Neues Spiel starten</button>
          <button className="btn btn-primary w-100 mb-2" onClick={() => setView('stats')}>Statistiken</button>
          <button className="btn btn-primary w-100 mb-2" onClick={() => setView('players')}>Spieler</button>
          <button className="btn btn-primary w-100 mb-2" onClick={() => setView('rules')}>Regeln</button>
          <button className="btn btn-primary w-100" onClick={() => setView('settings')}>Einstellungen</button>
        </section>
      )}

      {view === 'newGame' && (
        <section id="new-game">
          <h2>Neues Spiel</h2>
          <div className="mb-2">
            <label className="form-label">Spielmodus:</label>
            <select value={mode} onChange={e => setMode(e.target.value)} className="form-select">
              <option value="301">301</option>
              <option value="501">501</option>
              <option value="tannenbaum">Tannenbaum</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="form-label">Runden:</label>
            <input type="number" min="1" value={rounds} onChange={e => setRounds(parseInt(e.target.value, 10))} className="form-control" />
          </div>
          <div className="form-check mb-1">
            <input id="double-in" type="checkbox" className="form-check-input" checked={doubleIn} onChange={e => setDoubleIn(e.target.checked)} />
            <label className="form-check-label" htmlFor="double-in">Double In</label>
          </div>
          <div className="form-check mb-2">
            <input id="double-out" type="checkbox" className="form-check-input" checked={doubleOut} onChange={e => setDoubleOut(e.target.checked)} />
            <label className="form-check-label" htmlFor="double-out">Double Out</label>
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
          <button className="btn btn-primary me-2 mb-2" onClick={() => { setPlayerModalShow(true); setPlayerSelect(players[0] || '__new__'); }}>Spieler hinzufügen</button>
          <button className="btn btn-secondary mb-2" onClick={() => setGuestModalShow(true)}>Gast hinzufügen</button>
          <div>
            <button className="btn btn-success" onClick={startGame}>Spiel starten</button>
            <button className="btn btn-link back-btn" onClick={() => setView('home')}>&#x2190;</button>
          </div>
        </section>
      )}

      {view === 'game' && (
        <section id="game">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h2 className="m-0">Aktives Spiel</h2>
            <button className="btn btn-link back-btn" onClick={() => setView('home')}>&#x2190;</button>
          </div>
          <div id="scoreboard" className="mb-3">
            {gamePlayers.map((p, i) => (
              <div key={i} className={'d-flex justify-content-between' + (i === currentPlayer ? ' fw-bold' : '')}>
                <strong>{p}</strong><span>{scores[i]}</span>
              </div>
            ))}
          </div>
          <div id="throw-area" className="mb-3">
            {Array.from({ length: 21 }, (_, i) => i).concat([25, 50]).map(n => (
              <button key={n} className="btn btn-outline-secondary m-1" onClick={() => registerThrow(n)}>{n}</button>
            ))}
            <div className="mt-2">
              <button className={'btn btn-secondary me-2' + (multiplier === 2 ? ' active' : '')} onClick={() => setMultiplier(multiplier === 2 ? 1 : 2)}>Double</button>
              <button className={'btn btn-secondary' + (multiplier === 3 ? ' active' : '')} onClick={() => setMultiplier(multiplier === 3 ? 1 : 3)}>Triple</button>
            </div>
          </div>
          <button id="next-player" className={'btn btn-primary' + (throwsLeft > 0 ? ' hidden' : '')} onClick={nextPlayer}>Nächster Spieler</button>
        </section>
      )}

      {view === 'stats' && (
        <section id="stats">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="m-0">Statistiken</h2>
            <button className="btn btn-link back-btn" onClick={() => setView('home')}>&#x2190;</button>
          </div>
          <div id="stats-content" className="mt-2">
            {Object.keys(stats).length === 0 ? 'Keine Daten' : Object.entries(stats).map(([n, d]) => (
              <div key={n}>{n}: {d.games} Spiele</div>
            ))}
          </div>
        </section>
      )}

      {view === 'players' && (
        <section id="players">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="m-0">Spieler</h2>
            <button className="btn btn-link back-btn" onClick={() => setView('home')}>&#x2190;</button>
          </div>
          <table className="table table-striped mt-2">
            <tbody>
              {players.map((p, i) => (
                <tr key={i}>
                  <td>{p}</td>
                  <td className="text-end">
                    <button className="btn btn-link p-0" onClick={() => { const n = prompt('Neuer Name', p); if (n) editPlayer(i, n.trim()); }}>&#9998;</button>
                    <button className="btn btn-link text-danger p-0" onClick={() => { if (confirm('Spieler löschen?')) deletePlayer(i); }}>&#128465;</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-success mt-3" onClick={() => { const n = prompt('Spielername eingeben'); if (n) addPlayer(n.trim()); }}>Spieler hinzufügen</button>
        </section>
      )}

      {view === 'rules' && (
        <section id="rules">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="m-0">Regeln</h2>
            <button className="btn btn-link back-btn" onClick={() => setView('home')}>&#x2190;</button>
          </div>
          <p id="rules-text" className="mt-2">{rulesText[mode] || 'Waehle einen Spielmodus, um die Regeln zu sehen.'}</p>
        </section>
      )}

      {view === 'settings' && (
        <section id="settings">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="m-0">Einstellungen</h2>
            <button className="btn btn-link back-btn" onClick={() => setView('home')}>&#x2190;</button>
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
                <h5 className="modal-title">Spieler hinzufügen</h5>
                <button type="button" className="btn-close" onClick={() => setPlayerModalShow(false)}></button>
              </div>
              <div className="modal-body">
                <select className="form-select mb-2" value={playerSelect} onChange={e => setPlayerSelect(e.target.value)}>
                  {players.map(p => <option key={p} value={p}>{p}</option>)}
                  <option value="__new__">Neuer Spieler...</option>
                </select>
                {playerSelect === '__new__' && (
                  <input type="text" className="form-control" value={newPlayerName} onChange={e => setNewPlayerName(e.target.value)} placeholder="Neuer Spielername" />
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setPlayerModalShow(false)}>Abbrechen</button>
                <button type="button" className="btn btn-primary" onClick={() => {
                  let name = playerSelect === '__new__' ? newPlayerName.trim() : playerSelect;
                  if (!name) return;
                  if (playerSelect === '__new__') addPlayer(name);
                  addPlayerToGame(name);
                  setNewPlayerName('');
                  setPlayerModalShow(false);
                }}>OK</button>
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
                <h5 className="modal-title">Gast hinzufügen</h5>
                <button type="button" className="btn-close" onClick={() => setGuestModalShow(false)}></button>
              </div>
              <div className="modal-body">
                <input type="text" className="form-control" value={guestName} onChange={e => setGuestName(e.target.value)} placeholder="Name" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setGuestModalShow(false)}>Abbrechen</button>
                <button type="button" className="btn btn-primary" onClick={() => { const n = guestName.trim(); if (!n) return; addPlayerToGame(n); setGuestName(''); setGuestModalShow(false); }}>OK</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
