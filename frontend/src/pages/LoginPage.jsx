import React, { useState } from 'react';

const LoginPage = ({ setTeamName }) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    localStorage.setItem('teamName', input);
    setTeamName(input);
  };

  return (
    <div>
      <h2>Enter Team Name</h2>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default LoginPage;