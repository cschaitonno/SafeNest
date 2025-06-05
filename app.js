const app = document.getElementById('app');

function savePassword() {
  const site = prompt("Website:");
  const username = prompt("Username:");
  const password = prompt("Password:");

  const entry = `${site} | ${username} | ${password}\n`;
  let stored = localStorage.getItem("vault") || "";
  stored += entry;
  localStorage.setItem("vault", stored);

  alert("✅ Saved!");
  showVault();
}

function showVault() {
  const data = localStorage.getItem("vault");
  app.innerHTML = "<h2>Your Vault:</h2><pre>" + (data || "Nothing yet.") + "</pre>";
}

const btn = document.createElement("button");
btn.innerText = "➕ Save New Password";
btn.onclick = savePassword;
document.body.appendChild(btn);

showVault();
