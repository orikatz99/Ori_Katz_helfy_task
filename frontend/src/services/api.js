export async function getTasks() {
  const response = await fetch('http://localhost:4000/api/tasks');

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
    }

    return response.json();
}
