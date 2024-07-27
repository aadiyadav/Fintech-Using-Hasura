import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({onRegister}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, username, accountNumber })
    });
    const data = await response.json();
    if (data) {
      onRegister(data.id)
      alert('Registration successful');
    } else {
      alert('Registration failed');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-dark text-light'>
      <h1 className='text-5xl mb-16 text-funky font-one'>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username' className='mb-1'>Username:</label>
          <input id='username' type="text" value={username} onChange={(e) => setUsername(e.target.value)} required 
          className='mb-5 p-2 w-96 border border-accent bg-darker text-light rounded-sm' />
        </div>
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
        <div>
          <label htmlFor='account' className='mb-1'>Account Number:</label>
          <input id='account' type="number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required
          className='mb-5 p-2 w-96 border border-accent bg-darker text-light rounded-sm' />
        </div>
        <button type="submit" className='bg-funky text-white py-2 px-4 text-xl rounded-md'>Register</button>
      </form>
      <div className='flex m-6 justify-between items-center text-lg'>
      <h1 className='mr-3'>Authorized User?</h1>
      <button onClick={handleLoginClick} className="text-funky">Login</button>
      </div>
    </div> 
  );
};

export default Register;
