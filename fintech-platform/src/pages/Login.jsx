import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (data) {
    localStorage.setItem('token', data.token);
    onLogin(data.id);
    alert('Login successful');
  } else {
    alert('Login failed');
  }
};

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-dark text-light'>
      <h1 className='text-5xl mb-16 text-funky font-one'>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email' className='mb-1'>Email:</label>
          <input id='email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required 
          className='mb-5 p-2 w-96 border border-accent bg-darker text-light rounded-sm' />
        </div>
        <div>
          <label htmlFor='password' className='mb-1'>Password:</label>
          <input id='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required 
          className='mb-5 p-2 w-96 border border-accent bg-darker text-light rounded-sm' />
        </div>
        <button type="submit" className='bg-funky text-white py-2 px-4 text-xl rounded-md'>Login</button>
      </form>
      <div className='flex m-6 justify-between items-center text-lg'>
      <h1 className='mr-3'>New user?</h1>
      <button onClick={handleRegisterClick} className='text-funky'>Register</button>
      </div>
    </div>
  );
};

export default Login;
