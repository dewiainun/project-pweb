const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = {
  // CATEGORIES
  async getCategories() {
    const res = await fetch(`${API_URL}/categories.php`);
    const json = await res.json();
    return json.data || [];
  },
  async createCategory(payload) {
    // payload: plain object { name }
    const res = await fetch(`${API_URL}/categories.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  // ITEMS
  async getItems() {
    const res = await fetch(`${API_URL}/items.php`);
    const json = await res.json();
    return json.data || [];
  },

  async getItemById(id) {
    const res = await fetch(`${API_URL}/items.php?id=${id}`);
    const json = await res.json();
    return json.data || null;
  },

  async createItem(formData) {
    // formData = FormData()
    const res = await fetch(`${API_URL}/create_item.php`, {
      method: "POST",
      body: formData,
    });
    return res.json();
  },

  async updateItem(formData) {
    // formData must include field 'id'
    const res = await fetch(`${API_URL}/update_item.php`, {
      method: "POST",
      body: formData,
    });
    return res.json();
  },

  async deleteItem(id) {
    // delete via DELETE with query param or fallback to POST in backend
    const res = await fetch(`${API_URL}/delete_item.php?id=${id}`, {
      method: "DELETE",
    });
    return res.json();
  }
};

export default api;
