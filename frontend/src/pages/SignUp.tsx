
import { useState } from 'react';
import { signUpUser } from '../api/authAPI';

const Signup = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSignup = async () => {
    if (!username || !email || !password) {
      setMessage('Please fill in all fields.');
      return;
    }

    const response = await signUpUser(username, email, password);

    if (response.message) {
      setMessage(response.message);
    } else {
      setMessage(`User ${response.username} signed up successfully!`);
      setUsername('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br /><br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />
      <button onClick={handleSignup}>Sign Up</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;