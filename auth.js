const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "kasir", password: "kasir123", role: "kasir" }
];

function login() {
    const u = username.value;
    const p = password.value;

    const user = users.find(x => x.username === u && x.password === p);
    if (!user) return alert("Login gagal");

    localStorage.setItem("user", JSON.stringify(user));
    location.href = user.role === "admin" ? "dashboard.html" : "shop.html";
}
