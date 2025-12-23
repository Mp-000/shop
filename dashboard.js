const trx = JSON.parse(localStorage.getItem("transactions")) || [];
const products = JSON.parse(localStorage.getItem("products")) || [];

document.getElementById("totalTrx").innerText = trx.length;
document.getElementById("totalProduk").innerText = products.length;

document.getElementById("omzet").innerText =
    trx.filter(t => t.status === "PAID")
       .reduce((a, b) => a + b.total, 0)
       .toLocaleString();
