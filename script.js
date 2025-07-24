const puzzle = document.getElementById("puzzle");
const message = document.getElementById("message");
const shuffleBtn = document.getElementById("shuffleBtn");

let positions = [];
let tiles = [];

function createTiles() {
  puzzle.innerHTML = "";
  positions = [];

  for (let i = 0; i < 9; i++) {
    const row = Math.floor(i / 3);
    const col = i % 3;
    const pos = `-${col * 120}px -${row * 180}px`;
    positions.push(pos);
  }

  shuffleArray(positions); // پخش تصادفی

  for (let i = 0; i < 9; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.setAttribute("draggable", true);
    tile.style.backgroundPosition = positions[i];
    tile.dataset.correct = i; // موقعیت درست
    tile.dataset.current = positions.indexOf(`-${(i % 3) * 120}px -${Math.floor(i / 3) * 180}px`);
    puzzle.appendChild(tile);
  }

  tiles = Array.from(document.querySelectorAll(".tile"));
  addEventListeners();
  message.textContent = "";
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let dragSrc = null;

function addEventListeners() {
  tiles = Array.from(document.querySelectorAll(".tile"));
  tiles.forEach((tile) => {
    tile.addEventListener("dragstart", function (e) {
      dragSrc = this;
      this.classList.add("dragging");
    });

    tile.addEventListener("dragover", function (e) {
      e.preventDefault();
    });

    tile.addEventListener("dragenter", function () {
      this.classList.add("over");
    });

    tile.addEventListener("dragleave", function () {
      this.classList.remove("over");
    });

    tile.addEventListener("drop", function (e) {
      e.preventDefault();
      if (dragSrc !== this) {
        // جابجایی موقعیت تصویر
        const temp = this.style.backgroundPosition;
        this.style.backgroundPosition = dragSrc.style.backgroundPosition;
        dragSrc.style.backgroundPosition = temp;

        checkSolved();
      }
      this.classList.remove("over");
      dragSrc.classList.remove("dragging");
    });

    tile.addEventListener("dragend", function () {
      this.classList.remove("dragging");
    });
  });
}

function checkSolved() {
  const current = Array.from(puzzle.children).map(tile => tile.style.backgroundPosition);
  const solved = [];

  for (let i = 0; i < 9; i++) {
    const row = Math.floor(i / 3);
    const col = i % 3;
    solved.push(`-${col * 120}px -${row * 180}px`);
  }

  const isSolved = current.every((pos, idx) => pos === solved[idx]);

  if (isSolved) {
    message.textContent = "🎉 پازل با موفقیت کامل شد!";
  }
}

shuffleBtn.addEventListener("click", createTiles);

// اجرای اولیه
createTiles();
