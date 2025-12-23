const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
const trxList = document.getElementById("trxList");

trxList.innerHTML = "";

transactions.forEach((trx, index) => {
    trxList.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${trx.tanggal}</td>
            <td>Rp ${trx.total.toLocaleString()}</td>
            <td>
                <span class="badge ${trx.status === 'PAID' ? 'bg-success' : 'bg-warning'}">
                    ${trx.status}
                </span>
            </td>
            <td>
                <a href="invoice.html?id=${index}" class="btn btn-sm btn-primary">
                    Invoice
                </a>
            </td>
        </tr>
    `;
});
