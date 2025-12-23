const products = [
    { id: 1, name: "Produk A", price: 50000 },
    { id: 2, name: "Produk B", price: 75000 },
    { id: 3, name: "Produk C", price: 100000 }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function loadProducts() {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach(p => {
        productList.innerHTML += `
            <div class="col-md-4 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5>${p.name}</h5>
                        <p>Rp ${p.price.toLocaleString()}</p>
                        <button class="btn btn-primary" onclick="addToCart(${p.id})">
                            Tambah
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

function addToCart(id) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty++;
    } else {
        const product = products.find(p => p.id === id);
        cart.push({ ...product, qty: 1 });
    }
    saveCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function loadCart() {
    const cartList = document.getElementById("cartList");
    cartList.innerHTML = "";

    let total = 0;
    cart.forEach((item, index) => {
        let subtotal = item.price * item.qty;
        total += subtotal;

        cartList.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>Rp ${item.price.toLocaleString()}</td>
                <td>
                    <button class="btn btn-sm btn-secondary" onclick="changeQty(${index}, -1)">-</button>
                    ${item.qty}
                    <button class="btn btn-sm btn-secondary" onclick="changeQty(${index}, 1)">+</button>
                </td>
                <td>Rp ${subtotal.toLocaleString()}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Hapus</button>
                </td>
            </tr>
        `;
    });

    document.getElementById("total").innerText = total.toLocaleString();
}

function changeQty(index, change) {
    cart[index].qty += change;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    saveCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
}

function checkout() {
    if (cart.length === 0) {
        Swal.fire("Keranjang kosong!", "", "warning");
        return;
    }

    Swal.fire({
        title: "Checkout?",
        text: "Pilih status pembayaran",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Paid",
        cancelButtonText: "Unpaid"
    }).then(result => {
        const status = result.isConfirmed ? "PAID" : "UNPAID";

        const transaksi = {
            tanggal: new Date().toLocaleString(),
            items: cart,
            total: cart.reduce((t, i) => t + i.price * i.qty, 0),
            status: status
        };

        let history = JSON.parse(localStorage.getItem("transactions")) || [];
        history.push(transaksi);
        localStorage.setItem("transactions", JSON.stringify(history));

        cart = [];
        localStorage.removeItem("cart");
        loadCart();

        Swal.fire("Berhasil!", `Status: ${status}`, "success");
    });
}

loadProducts();
loadCart();
