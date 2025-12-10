import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    try {
      const list = await api.getItems();
      console.log("items:", list);
      setItems(Array.isArray(list) ? list : []);
    } catch (e) {
      console.error(e);
      setItems([]);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Hapus item ini?")) return;
    try {
      await api.deleteItem(id);
      loadItems();
    } catch (e) {
      console.error(e);
      alert("Gagal hapus");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Daftar Barang Kenangan
            </h2>
            <Link
              to="/add"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 shadow-md"
            >
              + Tambah Item
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <p className="text-gray-500 text-lg">
                Belum ada data. Mulai tambahkan barang kenangan Anda!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-lg p-5 hover:shadow-md transition duration-200"
                >
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.story}
                    </p>
                  </div>
                  <div className="flex gap-3 pt-3 border-t border-gray-200">
                    <Link
                      to={`/item/${item.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                    >
                      Detail
                    </Link>
                    <span className="text-gray-300">|</span>
                    <Link
                      to={`/edit/${item.id}`}
                      className="text-green-600 hover:text-green-700 font-medium hover:underline"
                    >
                      Edit
                    </Link>
                    <span className="text-gray-300">|</span>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-700 font-medium hover:underline"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}