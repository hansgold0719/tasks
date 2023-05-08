const api = "http://localhost:3001/api";

const createTask = async (taskData, currentPage, itemsPerPage) => {
  const response = await fetch(
    `${api}/createTask?page=${currentPage}&limit=${itemsPerPage}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "post",
      body: JSON.stringify({ taskData }),
    }
  );
  const tasks = await response.json();
  return tasks;
};
const updateTask = async (task) => {
  const response = await fetch(`${api}/updateTask`, {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify({ task }),
  });
  const tasks = await response.json();
  return tasks;
};
const getTask = async (currentPage, itemsPerPage, sortField, sortOrder) => {
  try {
    const response = await fetch(
      `${api}/getTask?page=${currentPage}&limit=${itemsPerPage}&sort=${sortField}&order=${sortOrder}`
    );
    const tasks = await response.json();
    return tasks;
  } catch (err) {
    console.log(err);
  }
};

const removeTask = async (id, currentPage, itemsPerPage) => {
  const response = await fetch(
    `${api}/removeTask/${id}?page=${currentPage}&limit=${itemsPerPage}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    }
  );
  const tasks = await response.json();
  return tasks;
};

export { createTask, getTask, updateTask, removeTask };
