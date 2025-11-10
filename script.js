const button = document.getElementById("login-btn");
const box = document.querySelector(".login-box");
const message = document.getElementById("message");
const buttonBg = document.querySelector(".button-bg");

const taunts = [
  "😆 Haha, missed me!",
  "⚡ Too slow, human!",
  "🤖 My AI reflexes are superior!",
  "😂 Try harder, mortal!",
  "🙃 You’ll never click me!",
  "😜 Almost had me!",
  "💨 Dodged again!",
  "😎 Nice try!"
];

let moves = 0;
let escaped = false;

function moveButton() {
  moves++;
  const boxRect = box.getBoundingClientRect();
  const btnRect = button.getBoundingClientRect();

  // Allow full movement within box (no -60)
  let newX = Math.random() * (boxRect.width - btnRect.width);
  let newY = Math.random() * (boxRect.height - btnRect.height);

  // After 40 moves — escape the box, use full window area
  if (moves > 40 && !escaped) {
    const safeMargin = 60; // keep it a little away from edges
    newX = Math.random() * (window.innerWidth - btnRect.width - safeMargin);
    newY = Math.random() * (window.innerHeight - btnRect.height - safeMargin);

    // Prevent it from going out of view
    newX = Math.max(20, newX);
    newY = Math.max(20, newY);

    button.style.position = "fixed";
    buttonBg.style.position = "fixed";
    escaped = true;
    message.textContent = "😈 I’m free now!";
  } else if (!escaped) {
    message.textContent = taunts[Math.floor(Math.random() * taunts.length)];
  }

  // Add playful tilt animation
  const tiltX = Math.random() * 40 - 20;
  const tiltY = Math.random() * 40 - 20;

  button.style.transform = `translate(${newX}px, ${newY}px) rotateY(${tiltX}deg) rotateX(${tiltY}deg)`;
  buttonBg.style.transform = `translate(${newX}px, ${newY}px) scale(1.2)`;

  // Smooth movement timing
  const speed = Math.max(0.1, 0.4 - moves * 0.015);
  button.style.transition = `${speed}s ease`;
  buttonBg.style.transition = `${speed + 0.05}s ease`;
}

button.addEventListener("mouseover", moveButton);

button.addEventListener("click", () => {
  message.textContent = `🎉 You actually caught me in ${moves} tries! Respect! 👏`;
  button.style.background = "linear-gradient(45deg, #ff4b1f, #ff9068)";
  button.style.boxShadow = "0 8px 30px rgba(255, 100, 80, 0.6)";
  button.disabled = true;
});
