const puzzle = document.getElementById('puzzle');
const size = 3;
const tiles = [];

// ساخت قطعه‌ها
for (let row = 0; row < size; row++) {
  for (let col = 0; col < size; col++) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.setAttribute('draggable', 'true');
    tile.dataset.correct = row * size + col;
    tile.style.backgroundPosition = -${col * 333}px -${row * 266}px;
    tiles.push(tile);
  }
}

// درهم‌ریختن و اضافه به صفحه
tiles.sort(() => Math.random() - 0.5);
tiles.forEach(t => puzzle.appendChild(t));

let dragged = null;

puzzle.addEventListener('dragstart', e => {
  if (e.target.classList.contains('tile')) {
    dragged = e.target;
    e.target.classList.add('dragging');
  }
});

puzzle.addEventListener('dragend', e => {
  e.target.classList.remove('dragging');
});

puzzle.addEventListener('dragover', e => {
  e.preventDefault();
});

puzzle.addEventListener('drop', e => {
  e.preventDefault();
  const target = e.target;
  if (target.classList.contains('tile') && dragged && dragged !== target) {
    const draggedClone = dragged.cloneNode(true);
    const targetClone = target.cloneNode(true);

    puzzle.replaceChild(draggedClone, target);
    puzzle.replaceChild(targetClone, dragged);

    dragged = null;
    checkSolved();
  }
});

function checkSolved() {
  const currentTiles = Array.from(puzzle.children);
  const solved = currentTiles.every((tile, i) => +tile.dataset.correct === i);
  if (solved) {
    setTimeout(() => alert("تبریک! پازل کامل شد 🎉"), 100);
  }
}
