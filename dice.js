// dice.js
export function setupDiceRoller() {
  const dicePanel = document.getElementById('dice-panel')
  if (!dicePanel) return

  let dSides = 4, dCount = 1, dHistory = [];
  window.toggleDice = function() {
    const p = document.getElementById('dice-panel');
    if (!p) return;
    p.classList.toggle('open');
  };
  window.selectDie = function(btn) {
    document.querySelectorAll('.d-btn[data-sides]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    dSides = parseInt(btn.dataset.sides);
    updateDiceLabel();
  };
  window.selectCount = function(btn) {
    document.querySelectorAll('.d-btn[data-count]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    dCount = parseInt(btn.dataset.count);
    updateDiceLabel();
  };
  function updateDiceLabel() {
    const el = document.getElementById('dice-label2')
    if (el) el.textContent = `${dCount}d${dSides}`;
  }
  window.rollDice = function() {
    const rolls = Array.from({length: dCount}, () => Math.floor(Math.random() * dSides) + 1);
    const total = rolls.reduce((a, b) => a + b, 0);
    const isMax = rolls.every(r => r === dSides);
    const isMin = rolls.every(r => r === 1);
    const col = isMax ? '#22c55e' : isMin ? '#ef4444' : 'var(--orange)';
    const label = `${dCount}d${dSides}`;
    const res = document.getElementById('dice-result');
    if (!res) return;
    res.innerHTML = `<div class="roll-anim">
      <div style="font-size:2rem;font-weight:bold;color:${col};line-height:1;">${total}</div>
      <div style="font-size:.62rem;color:var(--muted);margin-top:4px;">${label}${dCount > 1 ? ' [' + rolls.join(', ') + ']' : ''}</div>
    </div>`;
    const dl = document.getElementById('dice-label');
    if (dl) dl.textContent = `${label} → ${total}`;
    dHistory.unshift({ label, rolls, total });
    if (dHistory.length > 8) dHistory.pop();
    const dh = document.getElementById('dice-history');
    if (!dh) return;
    dh.innerHTML = dHistory.map((h, i) => `
      <div style="display:flex;justify-content:space-between;font-size:.62rem;color:${i===0?'var(--muted)':'#2a2a4a'};padding:1px 0;">
        <span>${h.label}</span>
        <span>${h.rolls.length > 1 ? '['+h.rolls.join(',')+'] = ' : ''}${h.total}</span>
      </div>`).join('');
  };
  document.addEventListener('keydown', e => {
    if (e.target.matches('input,textarea')) return;
    const p = document.getElementById('dice-panel');
    if (!p) return;
    if (e.key === 'd' || e.key === 'D') { p.classList.toggle('open'); }
    if (e.key === 'Enter') { if (p.classList.contains('open')) window.rollDice(); }
  });
}
