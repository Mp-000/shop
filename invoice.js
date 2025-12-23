const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
const trx = transactions[id];

document.getElementById("tanggal").innerText = "Tanggal: " + trx.tanggal;
document.getElementById("status").innerText = trx.status;

const items = document.getElementById("invoiceItems");
let total = 0;

trx.items.forEach(item => {
    let subtotal = item.price * item.qty;
    total += subtotal;

    items.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>Rp ${item.price.toLocaleString()}</td>
            <td>${item.qty}</td>
            <td>Rp ${subtotal.toLocaleString()}</td>
        </tr>
    `;
});

document.getElementById("total").innerText = total.toLocaleString();
