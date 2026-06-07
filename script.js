
const CUPCAKES = {
  2: { emoji: '🧁', name: 'Vanilla Spark', desc: 'A simple vanilla sponge with white frosting.' },
  4: { emoji: '🌸', name: 'Bubblegum Pink', desc: 'Sweet pink frosting with tiny star sprinkles.' },
  8: { emoji: '🍋', name: 'Lemon Zest', desc: 'Zesty lemon frosting topped with a candied lemon slice.' },
  16: { emoji: '🌿', name: 'Minty Fresh', desc: 'Cool mint cream with fine dark chocolate chips.' },
  32: { emoji: '🍓', name: 'Berry Blush', desc: 'Rich strawberry buttercream with a fresh berry.' },
  64: { emoji: '🫐', name: 'Blueberry Dream', desc: 'Creamy blueberry compote with violet sugar crystals.' },
  128: { emoji: '🍫', name: 'Choco Caramel', desc: 'Double chocolate muffin with salted caramel drizzle.' },
  256: { emoji: '🍵', name: 'Matcha Mist', desc: 'Green tea sponge with matcha buttercream.' },
  512: { emoji: '❤️', name: 'Red Velvet', desc: 'Velvety cocoa sponge with cream cheese frosting.' },
  1024: { emoji: '🍯', name: 'Golden Honey', desc: 'Honey-infused cream topped with real honeycomb.' },
  2048: { emoji: '🌈', name: 'Rainbow Sparkle', desc: 'Magical multi-layered rainbow birthday cupcake!' },
  4096: { emoji: '🌌', name: 'Cosmic Galaxy', desc: 'Stunning space-colored glaze with edible glitter.' }
};


class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('cupcakes_muted') === 'true';
  }

  init() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
  }

  toggle() {
    this.muted = !this.muted;
    localStorage.setItem('cupcakes_muted', this.muted);
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  playTone(freq, startTime, duration, type = 'sine', volume = 0.1) {
    if (this.muted) return;
    this.init();
    
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);
    
    
    gain.gain.setValueAtTime(volume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  playSlide() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);
    
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.08);
  }

  playMerge() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    
    
    this.playTone(329.63, now, 0.08, 'sine', 0.08); 
    this.playTone(392.00, now + 0.04, 0.08, 'sine', 0.08); 
    this.playTone(523.25, now + 0.08, 0.15, 'sine', 0.08); 
  }

  playGameOver() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    
    
    this.playTone(349.23, now, 0.2, 'triangle', 0.1); 
    this.playTone(293.66, now + 0.15, 0.25, 'triangle', 0.1); 
    this.playTone(220.00, now + 0.3, 0.4, 'triangle', 0.1); 
  }

  playWin() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    
    
    this.playTone(261.63, now, 0.12, 'sine', 0.08); 
    this.playTone(329.63, now + 0.06, 0.12, 'sine', 0.08); 
    this.playTone(392.00, now + 0.12, 0.12, 'sine', 0.08); 
    this.playTone(523.25, now + 0.18, 0.18, 'sine', 0.1); 
    this.playTone(659.25, now + 0.24, 0.35, 'sine', 0.1); 
  }
}

const sound = new SoundEngine();


class Tile {
  constructor(row, col, value, container) {
    this.row = row;
    this.col = col;
    this.value = value;
    this.container = container;
    this.id = Tile.nextId++;
    
    
    this.element = this.createElement();
  }

  createElement() {
    const el = document.createElement('div');
    el.className = 'tile tile-new';
    el.style.setProperty('--row', this.row);
    el.style.setProperty('--col', this.col);
    el.dataset.value = this.value;
    
    this.updateContent(el);
    this.container.appendChild(el);
    return el;
  }

  updateContent(el) {
    const info = CUPCAKES[this.value] || { emoji: '🧁', name: 'Yummy Treat', desc: '' };
    el.innerHTML = `
      <div class="tile-inner">
        <span class="tile-emoji">${info.emoji}</span>
        <span class="tile-name">${info.name}</span>
        <span class="tile-val">${this.value}</span>
      </div>
    `;
  }

  moveTo(row, col) {
    this.row = row;
    this.col = col;
    this.element.style.setProperty('--row', this.row);
    this.element.style.setProperty('--col', this.col);
  }

  setValue(newValue) {
    this.value = newValue;
    this.element.dataset.value = newValue;
    this.updateContent(this.element);
    
    
    this.element.classList.remove('tile-new');
    this.element.classList.remove('tile-merged');
    void this.element.offsetWidth; 
    this.element.classList.add('tile-merged');
  }

  destroy() {
    this.element.classList.remove('tile-new');
    this.element.classList.remove('tile-merged');
    
    setTimeout(() => {
      this.element.remove();
    }, 130);
  }
}
Tile.nextId = 0;


class GameManager {
  constructor() {
    this.gridContainer = document.getElementById('grid-container');
    this.tileContainer = document.getElementById('tile-container');
    this.scoreElement = document.getElementById('score');
    this.highScoreElement = document.getElementById('high-score');
    this.scoreAddition = document.getElementById('score-addition');

    this.size = 4;
    this.grid = [];
    this.score = 0;
    this.highScore = 0;
    this.unlocked = [];
    this.hasWon = false;
    this.keepPlaying = false;
    this.isTransitioning = false;

    this.loadState();
    this.setupUI();
    this.setupInput();
  }

  loadState() {
    
    try {
      this.unlocked = JSON.parse(localStorage.getItem('cupcakes_unlocked')) || [2];
    } catch {
      this.unlocked = [2];
    }
    
    
    this.updateSoundToggleUI();
  }

  saveHighScore() {
    localStorage.setItem(`cupcakes_highscore_${this.size}`, this.highScore);
  }

  loadHighScore() {
    this.highScore = parseInt(localStorage.getItem(`cupcakes_highscore_${this.size}`)) || 0;
    this.highScoreElement.textContent = this.highScore;
  }

  saveUnlocked() {
    localStorage.setItem('cupcakes_unlocked', JSON.stringify(this.unlocked));
  }

  
  drawBackgroundGrid() {
    const bg = document.getElementById('grid-background');
    bg.innerHTML = '';
    for (let i = 0; i < this.size * this.size; i++) {
      const cell = document.createElement('div');
      cell.className = 'grid-cell-bg';
      bg.appendChild(cell);
    }
  }

  setupUI() {
    
    document.getElementById('btn-sound-toggle').addEventListener('click', () => {
      const muted = sound.toggle();
      this.updateSoundToggleUI();
      sound.init(); 
    });

    
    document.getElementById('restart').addEventListener('click', () => this.startGame());
    

    
    document.getElementById('btn-start-game').addEventListener('click', () => {
      sound.init();
      document.getElementById('modal-intro').classList.remove('active');
      this.startGame();
    });

    
    document.getElementById('btn-recipe-book').addEventListener('click', () => this.openRecipes());
    document.getElementById('btn-close-recipes').addEventListener('click', () => this.closeRecipes());
    document.getElementById('btn-close-recipes-bottom').addEventListener('click', () => this.closeRecipes());

    
    document.getElementById('btn-restart-game-over').addEventListener('click', () => {
      document.getElementById('modal-game-over').classList.remove('active');
      this.startGame();
    });
    document.getElementById('btn-restart-game-won').addEventListener('click', () => {
      document.getElementById('modal-game-won').classList.remove('active');
      this.startGame();
    });
    document.getElementById('btn-keep-playing').addEventListener('click', () => {
      document.getElementById('modal-game-won').classList.remove('active');
      this.keepPlaying = true;
    });
  }

  updateSoundToggleUI() {
    const isMuted = sound.isMuted();
    const iconOn = document.getElementById('sound-icon-on');
    const iconOff = document.getElementById('sound-icon-off');
    if (isMuted) {
      iconOn.classList.add('hidden');
      iconOff.classList.remove('hidden');
    } else {
      iconOn.classList.remove('hidden');
      iconOff.classList.add('hidden');
    }
  }

  openRecipes() {
    const gallery = document.getElementById('recipe-gallery');
    gallery.innerHTML = '';
    
    
    Object.keys(CUPCAKES).forEach((val) => {
      const value = parseInt(val);
      const isUnlocked = this.unlocked.includes(value);
      const data = CUPCAKES[value];
      
      const card = document.createElement('div');
      card.className = `recipe-card ${isUnlocked ? '' : 'locked'}`;
      
      if (isUnlocked) {
        card.innerHTML = `
          <div class="recipe-card-value">${value}</div>
          <div class="recipe-card-emoji">${data.emoji}</div>
          <div class="recipe-card-name">${data.name}</div>
          <div class="recipe-card-desc">${data.desc}</div>
        `;
      } else {
        card.innerHTML = `
          <div class="recipe-card-value">${value}</div>
          <div class="recipe-card-emoji">🔒</div>
          <div class="recipe-card-name">Locked Recipe</div>
          <div class="recipe-card-desc">Merge to value ${value} to unlock!</div>
        `;
      }
      gallery.appendChild(card);
    });

    document.getElementById('modal-recipe-book').classList.add('active');
  }

  closeRecipes() {
    document.getElementById('modal-recipe-book').classList.remove('active');
  }

  setupInput() {
    
    document.addEventListener('keydown', (e) => {
      if (document.querySelector('.modal-overlay.active')) return; 
      
      let direction = null;
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          direction = 'up';
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          direction = 'down';
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          direction = 'left';
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          direction = 'right';
          break;
      }
      
      if (direction) {
        e.preventDefault();
        this.handleMove(direction);
      }
    });

    
    let touchStartX = 0;
    let touchStartY = 0;
    
    this.gridContainer.addEventListener('touchstart', (e) => {
      if (e.touches.length > 1) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    this.gridContainer.addEventListener('touchend', (e) => {
      if (e.touches.length > 0) return;
      
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      
      
      if (Math.max(absDx, absDy) > 35) {
        let direction = null;
        if (absDx > absDy) {
          direction = dx > 0 ? 'right' : 'left';
        } else {
          direction = dy > 0 ? 'down' : 'up';
        }
        
        if (direction) {
          e.preventDefault();
          this.handleMove(direction);
        }
      }
    }, { passive: false });
  }

  startGame() {
    
    this.tileContainer.innerHTML = '';
    this.score = 0;
    this.scoreElement.textContent = 0;
    this.hasWon = false;
    this.keepPlaying = false;
    this.isTransitioning = false;
    
    
    this.gridContainer.className = `grid-container size-${this.size}`;
    this.drawBackgroundGrid();
    this.loadHighScore();
    
    
    this.grid = Array.from({ length: this.size }, () => Array(this.size).fill(null));
    
    
    this.addRandomCupcake();
    this.addRandomCupcake();
  }

  addRandomCupcake() {
    const emptyCells = [];
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        if (!this.grid[r][c]) {
          emptyCells.push({ r, c });
        }
      }
    }
    
    if (emptyCells.length === 0) return;
    
    
    const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    
    
    const value = Math.random() < 0.9 ? 2 : 4;
    
    const tile = new Tile(r, c, value, this.tileContainer);
    this.grid[r][c] = tile;
    this.trackUnlock(value);
  }

  trackUnlock(val) {
    if (!this.unlocked.includes(val)) {
      this.unlocked.push(val);
      this.unlocked.sort((a, b) => a - b);
      this.saveUnlocked();
    }
  }

  
  spawnSprinkles(row, col) {
    const container = document.getElementById('particle-container');
    if (!container) return;
    
    const rect = this.gridContainer.getBoundingClientRect();
    
    
    const gap = 12; 
    const gridInnerWidth = rect.width - gap * 2;
    const cellWidth = (gridInnerWidth - (this.size - 1) * gap) / this.size;
    
    
    const relX = col * (cellWidth + gap) + cellWidth / 2 + gap;
    const relY = row * (cellWidth + gap) + cellWidth / 2 + gap;
    
    
    const x = rect.left + relX;
    const y = rect.top + relY;
    
    const colors = ['#ff7eb9', '#ffb3d8', '#fff7a3', '#c2f3d0', '#b8dbff', '#e2bbfd'];
    const particlesCount = 14 + Math.floor(Math.random() * 6);
    
    for (let i = 0; i < particlesCount; i++) {
      const el = document.createElement('div');
      el.className = 'sprinkle';
      el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      
      const angle = Math.random() * Math.PI * 2;
      const dist = 30 + Math.random() * 70;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;
      const rot = -180 + Math.random() * 360;
      
      el.style.setProperty('--dx', `${dx}px`);
      el.style.setProperty('--dy', `${dy}px`);
      el.style.setProperty('--rot', `${rot}deg`);
      
      container.appendChild(el);
      
      setTimeout(() => el.remove(), 800);
    }
  }

  
  handleMove(direction) {
    if (this.isTransitioning) return;
    
    const vector = this.getVector(direction);
    const traversals = this.buildTraversals(vector);
    
    let moved = false;
    let scoreGained = 0;
    
    
    this.prepareTiles();
    
    
    traversals.row.forEach((r) => {
      traversals.col.forEach((c) => {
        const tile = this.grid[r][c];
        if (tile) {
          const positions = this.findFarthestPosition({ r, c }, vector);
          const nextTile = this.grid[positions.next.r]?.[positions.next.c];
          
          if (nextTile && nextTile.value === tile.value && !nextTile.mergedFrom) {
            
            const mergedValue = tile.value * 2;
            
            
            tile.moveTo(positions.next.r, positions.next.c);
            tile.destroy();
            
            
            nextTile.setValue(mergedValue);
            nextTile.mergedFrom = tile; 
            
            
            this.grid[r][c] = null;
            
            
            scoreGained += mergedValue;
            moved = true;
            
            this.trackUnlock(mergedValue);
            
            
            setTimeout(() => {
              this.spawnSprinkles(positions.next.r, positions.next.c);
            }, 80);
            
            
            if (mergedValue === 2048 && !this.hasWon && !this.keepPlaying) {
              this.hasWon = true;
              setTimeout(() => this.showWinModal(), 400);
            }
            
          } else {
            
            if (positions.farthest.r !== r || positions.farthest.c !== c) {
              this.grid[r][c] = null;
              this.grid[positions.farthest.r][positions.farthest.c] = tile;
              tile.moveTo(positions.farthest.r, positions.farthest.c);
              moved = true;
            }
          }
        }
      });
    });

    if (moved) {
      sound.playSlide();
      
      if (scoreGained > 0) {
        this.updateScore(scoreGained);
        sound.playMerge();
      }
      
      this.isTransitioning = true;
      
      
      setTimeout(() => {
        this.addRandomCupcake();
        this.isTransitioning = false;
        this.checkGameOver();
      }, 140);
    }
  }

  getVector(direction) {
    const map = {
      up: { r: -1, c: 0 },
      down: { r: 1, c: 0 },
      left: { r: 0, c: -1 },
      right: { r: 0, c: 1 }
    };
    return map[direction];
  }

  buildTraversals(vector) {
    const traversals = {
      row: Array.from({ length: this.size }, (_, i) => i),
      col: Array.from({ length: this.size }, (_, i) => i)
    };
    
    
    if (vector.r === 1) traversals.row.reverse(); 
    if (vector.c === 1) traversals.col.reverse(); 
    
    return traversals;
  }

  prepareTiles() {
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        if (this.grid[r][c]) {
          this.grid[r][c].mergedFrom = null;
        }
      }
    }
  }

  findFarthestPosition(cell, vector) {
    let prev;
    let curr = { r: cell.r, c: cell.c };
    
    do {
      prev = curr;
      curr = { r: prev.r + vector.r, c: prev.c + vector.c };
    } while (this.inBounds(curr) && !this.grid[curr.r][curr.c]);
    
    return {
      farthest: prev,
      next: curr 
    };
  }

  inBounds(cell) {
    return cell.r >= 0 && cell.r < this.size && cell.c >= 0 && cell.c < this.size;
  }

  updateScore(gained) {
    this.score += gained;
    this.scoreElement.textContent = this.score;
    
    
    this.scoreAddition.textContent = `+${gained}`;
    this.scoreAddition.classList.remove('active');
    void this.scoreAddition.offsetWidth; 
    
    
    this.scoreAddition.style.animation = 'none';
    void this.scoreAddition.offsetHeight; 
    this.scoreAddition.style.animation = null;
    
    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.highScoreElement.textContent = this.highScore;
      this.saveHighScore();
    }
  }

  canMoveAny() {
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        const tile = this.grid[r][c];
        if (!tile) return true; 
        
        
        if (c < this.size - 1) {
          const right = this.grid[r][c + 1];
          if (!right || right.value === tile.value) return true;
        }
        
        if (r < this.size - 1) {
          const down = this.grid[r + 1][c];
          if (!down || down.value === tile.value) return true;
        }
      }
    }
    return false;
  }

  checkGameOver() {
    if (!this.canMoveAny()) {
      sound.playGameOver();
      
      const newHighDiv = document.getElementById('game-over-new-high');
      document.getElementById('game-over-score').textContent = this.score;
      
      if (this.score >= this.highScore && this.score > 0) {
        newHighDiv.classList.remove('hidden');
      } else {
        newHighDiv.classList.add('hidden');
      }
      
      document.getElementById('modal-game-over').classList.add('active');
    }
  }

  showWinModal() {
    sound.playWin();
    document.getElementById('game-won-score').textContent = this.score;
    document.getElementById('modal-game-won').classList.add('active');
  }
}


window.addEventListener('DOMContentLoaded', () => {
  new GameManager();
});
