export default function LoginPage({ onLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.elements.teamName.value.trim();
    if (name) onLogin(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="teamName" placeholder="Enter Team Name" />
      <button type="submit">Login</button>
    </form>
  );
}