import React, { useEffect, useState } from "react";
import Button from "./common/Button";
import axios from "axios";

export const TableTask = () => {
  const [tasks, setTasks] = useState([]);

  // Mendapatkan data dari API dan menyimpannya dalam state
  useEffect(() => {
    const getTasks = async () => {
      try {
        const res = await axios.get("http://localhost:8000");
        setTasks(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    getTasks();
  }, []);

  // Fungsi untuk memperbarui task menjadi complete
  const updateTask = async (taskId) => {
    try {
      const res = await fetch("http://localhost:8000", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: taskId }),
      });
      const data = await res.json();
      window.location.reload();
      console.log(data);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: "completed" } : task
        )
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  // Fungsi untuk menghapus task
  const deleteTask = async (taskId) => {
    try {
      const res = await fetch("http://localhost:8000", {
        method: "DELETE",
        body: JSON.stringify({ id: taskId }),
      });
      const data = await res.json();
      console.log(data);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg border border-purple-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-600">
          <h2 className="text-2xl font-bold text-white mb-1">Task List</h2>
          <p className="text-purple-100 text-sm">Manage your tasks efficiently</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-purple-100 to-pink-100">
                <th className="px-6 py-4 text-left text-sm font-bold text-purple-800 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-purple-800 uppercase tracking-wider">
                  Task
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-purple-800 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-purple-800 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-purple-200">
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <tr 
                    key={task.id} 
                    className="hover:bg-purple-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm">
                          {task.id}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {task.task}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {task.completed ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-sm">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-sm">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                          Incomplete
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex gap-2 justify-center">
                        <Button
                          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-medium text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-1"
                          onClick={() => updateTask(task.id)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Complete
                        </Button>
                        <Button
                          className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-medium text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-1"
                          onClick={() => deleteTask(task.id)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <svg className="w-16 h-16 text-purple-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <p className="text-gray-500 text-lg font-medium">No tasks available</p>
                      <p className="text-gray-400 text-sm mt-1">Start by adding a new task!</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};