let kategori = JSON.parse(localStorage.getItem("kategori")) || [];

function save() {
  localStorage.setItem("kategori", JSON.stringify(kategori));
  render();
}

function addKategori() {
  kategori.push({ id: Date.now(), nama: nama.value });
  nama.value = "";
  save();
}

function hapus(id) {
  kategori = kategori.filter(k => k.id !== id);
  save();
}

function render() {
  list.innerHTML = "";
  kategori.forEach(k => {
    list.innerHTML += `
      <tr>
        <td>${k.nama}</td>
        <td><button class="btn btn-danger btn-sm" onclick="hapus(${k.id})">Hapus</button></td>
      </tr>
    `;
  });
}

render();
