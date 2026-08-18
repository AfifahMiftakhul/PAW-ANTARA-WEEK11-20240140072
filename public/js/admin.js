// Logout
document.getElementById('logout-btn').addEventListener('click', async () => {
  const res = await fetch('/api/admin/logout', { method: 'POST' });
  const data = await res.json();
  if (data.success) {
    window.location.href = '/admin/login';
  }
});

const form = document.getElementById('product-form');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');

const prodId = document.getElementById('prod-id');
const prodName = document.getElementById('prod-name');
const prodPrice = document.getElementById('prod-price');
const prodStock = document.getElementById('prod-stock');
const prodDesc = document.getElementById('prod-desc');

// Submit Form (Tambah / Update)
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = prodId.value;
  const payload = {
    name: prodName.value,
    price: Number(prodPrice.value),
    stock: Number(prodStock.value),
    description: prodDesc.value,
  };

  const url = id ? `/api/products/${id}` : '/api/products';
  const method = id ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (data.success) {
      window.location.reload(); // Refresh data dashboard
    } else {
      alert(data.message || 'Gagal menyimpan produk');
    }
  } catch (err) {
    alert('Terjadi kesalahan jaringan');
  }
});

// Event Delegation Edit & Delete
document.getElementById('admin-product-table').addEventListener('click', async (e) => {
  // Mode Edit
  const editBtn = e.target.closest('.edit-btn');
  if (editBtn) {
    prodId.value = editBtn.dataset.id;
    prodName.value = editBtn.dataset.name;
    prodPrice.value = editBtn.dataset.price;
    prodStock.value = editBtn.dataset.stock;
    prodDesc.value = editBtn.dataset.desc;

    formTitle.textContent = 'Edit Produk';
    submitBtn.textContent = 'Update Produk';
    cancelBtn.classList.remove('hidden');
    return;
  }

  // Mode Delete
  const deleteBtn = e.target.closest('.delete-btn');
  if (deleteBtn) {
    if (!confirm('Yakin ingin menghapus produk ini?')) return;

    const id = deleteBtn.dataset.id;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        document.getElementById(`row-${id}`).remove();
      } else {
        alert(data.message || 'Gagal menghapus produk');
      }
    } catch (err) {
      alert('Terjadi kesalahan jaringan');
    }
  }
});

// Batal Edit
cancelBtn.addEventListener('click', () => {
  form.reset();
  prodId.value = '';
  formTitle.textContent = 'Tambah Produk Baru';
  submitBtn.textContent = 'Simpan Produk';
  cancelBtn.classList.add('hidden');
});