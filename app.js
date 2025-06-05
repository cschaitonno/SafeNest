const secret = "safenest-key"; // Optional secret for XOR

document.getElementById("enterBtn").onclick = () => {
  document.getElementById("welcome").style.display = "none";
  document.getElementById("vault").style.display = "block";
};

function xorEncryptDecrypt(str, key) {
  return str.split('').map((char, i) =>
    String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
  ).join('');
}

function savePassword() {
  const site = document.getElementById("site").value;
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  if (!site || !user || !pass) return alert("❗ All fields required.");

  const encrypted = xorEncryptDecrypt(`${site} | ${user} | ${pass}`, secret);
  let existing = localStorage.getItem("safenest") || "";
  existing += encrypted + "\n";
  localStorage.setItem("safenest", existing);

  alert("✅ Saved Successfully!");
  document.getElementById("site").value = "";
  document.getElementById("user").value = "";
  document.getElementById("pass").value = "";
}

function viewPasswords() {
  let data = localStorage.getItem("safenest");
  if (!data) return alert("⚠️ No data found.");

  const lines = data.trim().split("\n");
  const decrypted = lines.map(line => xorEncryptDecrypt(line, secret)).join("\n");

  document.getElementById("passwordList").textContent = decrypted;
}
