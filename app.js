let passwords = [];

function savePassword() {
  const site = document.getElementById("site").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!site || !username || !password) {
    alert("❗ Please fill out all fields.");
    return;
  }

  passwords.push({ site, username, password });
  localStorage.setItem("safenestVault", JSON.stringify(passwords));
  alert("✅ Saved Successfully!");
  document.getElementById("site").value = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

function viewPasswords() {
  const stored = JSON.parse(localStorage.getItem("safenestVault")) || [];
  let output = "";
  if (stored.length === 0) {
    output = "⚠️ No passwords saved.";
  } else {
    stored.forEach((entry, i) => {
      output += `<div class='password-entry'><strong>${entry.site}</strong><br>👤 ${entry.username}<br>🔑 ${entry.password}</div>`;
    });
  }
  document.getElementById("output").innerHTML = output;
}
