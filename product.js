let products = JSON.parse(localStorage.getItem("products")) || [];

function save() {
    localStorage.setItem("products", JSON.stringify(products));
}

function addProduct() {
    products.push({
        id: Date.now(),
        name: nama.value,
        price: harga.value
    });
    save(); render();
}

function deleteProduct(id) {
    products = products.filter(p => p.id !== id);
    save(); render();
}

function render() {
    list.innerHTML = "";
    products.forEach(p => {
        list.innerHTML += `
            <tr>
                <td>${p.name}</td>
                <td>Rp ${Number(p.price).toLocaleString()}</td>
                <td>
                    <button onclick="deleteProduct(${p.id})" class="btn btn-danger btn-sm">Hapus</button>
                </td>
            </tr>
        `;
    });
}

render();
