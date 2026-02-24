export async function getTasks() {
  const response = await fetch('http://localhost:4000/api/tasks');

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
    }

    return response.json();
}

export async function createTask(task) {
  const response = await fetch('http://localhost:4000/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }

  return response.json();
}


export async function toggleTask(id) {
  const response = await fetch(`http://localhost:4000/api/tasks/${id}`, {
    method: 'PATCH',
  });

  if (!response.ok) {
    throw new Error('Failed to toggle task');
  }

  return response.json();
}

export async function deleteTask(id) {
    const response = await fetch(`http://localhost:4000/api/tasks/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete task');
    }
}
