const api = "http://localhost:3001/api";

const signup = async (userData) => {
  const response = await fetch(`${api}/signup`, {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify({ userData }),
  });
  const users = await response.json();
  return users;
};

const signin = async (user) => {
  const response = await fetch(`${api}/signin`, {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify({ user }),
  });
  const users = await response.json();
  return users;
};

export { signup, signin };
