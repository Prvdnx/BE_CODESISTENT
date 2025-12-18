// dom elements
const passIn = document.getElementById("password");
const lenSld = document.getElementById("length");
const lenTxt = document.getElementById("length-value");
const upperC = document.getElementById("uppercase");
const lowerC = document.getElementById("lowercase");
const numC = document.getElementById("numbers");
const symC = document.getElementById("symbols");
const genBtn = document.getElementById("generate-btn");
const copyBtn = document.getElementById("copy-btn");
const sBar = document.querySelector(".strength-bar");
const sLab = document.getElementById("strength-label");

// char sets
const chars = {
  u: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  l: "abcdefghijklmnopqrstuvwxyz",
  n: "0123456789",
  s: "!@#$%^&*()-_=+[]{}|;:,.<>?/"
};

// slider update
lenSld.oninput = () => lenTxt.textContent = lenSld.value;

// generate logic
const makePass = () => {
  let all = "";
  if (upperC.checked) all += chars.u;
  if (lowerC.checked) all += chars.l;
  if (numC.checked) all += chars.n;
  if (symC.checked) all += chars.s;

  if (!all) return alert("Select at least one!");

  const pass = Array.from({ length: lenSld.value }, () => all[Math.floor(Math.random() * all.length)]).join("");
  passIn.value = pass;
  updateS(pass);
};

// strength logic
const updateS = (p) => {
  let score = Math.min(p.length * 2, 40);
  /[A-Z]/.test(p) && (score += 15);
  /[a-z]/.test(p) && (score += 15);
  /[0-9]/.test(p) && (score += 15);
  /[^A-Za-z0-9]/.test(p) && (score += 15);
  p.length < 8 && (score = Math.min(score, 40));

  const label = score < 40 ? "Weak" : score < 70 ? "Medium" : "Strong";
  const color = score < 40 ? "#ef4444" : score < 70 ? "#f59e0b" : "#10b981";

  sBar.style.width = `${score}%`;
  sBar.style.backgroundColor = color;
  sLab.textContent = label;
  sLab.style.color = color;
};

// copy handler
copyBtn.onclick = () => {
  if (!passIn.value) return;
  navigator.clipboard.writeText(passIn.value).then(() => {
    copyBtn.className = "fas fa-check";
    copyBtn.style.color = "#10b981";
    setTimeout(() => {
      copyBtn.className = "far fa-copy";
      copyBtn.style.color = "";
    }, 1200);
  });
};

// init
genBtn.onclick = makePass;
window.onload = makePass;
