# 🧁 2048 Cupcakes

Welcome to **2048 Cupcakes**, a sweet, delicious, and highly interactive browser-based recreation of the classic 2048 puzzle game!

![Cupcake Game Header](https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=400&q=80)

---

## 🎨 Game Features

- **🍰 Sweet Cupcake Tiers**: Instead of plain numbers, merge your way through vanilla sponges, lemon zests, blueberry dreams, all the way to the legendary *Rainbow Sparkle Cupcake (2048)*!
- **🎵 Retro Audio Effects**: Self-contained sound effects synthesized in real time using the **Web Audio API** (slide, merge, win, lose). Silent mode can be toggled at any time.
- **⚡ Particle Merge Effects**: Merging cupcakes emits bursts of colorful baking sprinkles that float and fade, making the game feel responsive and alive.
- **📚 Interactive Recipe Book**: Access the Recipe Collection inside the game to see all the cupcakes you have successfully unlocked during your baking career.
- **🏆 Multi-Difficulty Grids**:
  - **Bite-Sized (3x3)**: Highly challenging, narrow grid.
  - **Classic Sweet (4x4)**: The standard recipe layout.
  - **Mega Feast (5x5)**: Relaxing and spacious play area.
- **📱 Responsive & Swipe-Enabled**: Play on your phone, tablet, or desktop with keyboard keys (`Arrow Keys` or `WASD`) or touch swipe gestures.

---

## 🛠️ Engine & Tech Stack

This project was built from scratch without any heavy external libraries or game engines to ensure maximum performance and instant loading speeds:

1. **HTML5**: Standard markup structure with accessible roles.
2. **CSS3**: Pure custom CSS utilizing a pastel glassmorphic design system, keyframe animations, responsive grid templates, and dynamic variable-based layouts.
3. **Vanilla JavaScript**: Core 2048 sliding algorithms, swipe gesture tracking, LocalStorage states, and dynamic elements rendering.
4. **Web Audio API**: Real-time sound synthesis for retro game sounds, bypassing the need for external `.mp3` / `.wav` assets.

---

## 🚀 How to Run the Game

To launch the game locally:

### Option 1: Double-Click
Simply double-click the [index.html](file:///Users/stan/2048cupcakes/index.html) file in your file explorer to open it instantly in any modern web browser.

### Option 2: Local Server (Recommended)
Run a local static server to test high scores and audio contexts properly:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

Open `http://localhost:8000` (or the port specified by your tool) in your web browser.

---

## 🎂 Recipe Guide

- **2**: 🧁 Vanilla Spark
- **4**: 🌸 Bubblegum Pink
- **8**: 🍋 Lemon Zest
- **16**: 🌿 Minty Fresh
- **32**: 🍓 Berry Blush
- **64**: 🫐 Blueberry Dream
- **128**: 🍫 Choco Caramel
- **256**: 🍵 Matcha Mist
- **512**: ❤️ Red Velvet
- **1024**: 🍯 Golden Honey
- **2048**: 🌈 Rainbow Sparkle
- **4096**: 🌌 Cosmic Galaxy

*Happy Baking!* 🧁✨
