import { useState } from 'react';
import './home.css'
import {Chat, Home, Atm, Notifications, Wallet, LocalMall, CurrencyBitcoin, AttachMoney, KeyboardArrowDown} from '@mui/icons-material';

const FintechApp = ({id}) => {
  const userId = id;
  const [amount, setAmount] = useState('');
  const [user, setUser] = useState([])
  const [transactions, setTransactions] = useState([]);
  const [show, setShow] = useState(false)

  const deposit = async () => {
    const response = await fetch('http://localhost:3000/deposit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, amount })
    });
    const data = await response.json();
    console.log(data);
  };

  const withdraw = async () => {
    const response = await fetch('http://localhost:3000/withdraw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, amount })
    });
    const data = await response.json();
    console.log(data);
  };

  const fetchUser = async () => {
    const response = await fetch(`http://localhost:3000/user/${userId}`);
    const result = await response.json();
    setUser(result);
  }

  const fetchTransactions = async () => {
    const response = await fetch(`http://localhost:3000/transactions/${userId}`);
    const result = await response.json();
    setTransactions(result);
    if (result.length===0)
     document.getElementById("demo").innerHTML = "No transactions yet!";
  };

  return (
    <div className="min-h-screen bg-dark text-light font-one">
      <nav className="bg-accent p-3 h-14 text-white flex items-center justify-between">
        <h1 className='ml-20 text-3xl text-red-400 cursor-pointer'>BINGOFIN</h1>
        <div className="flex text-xl items-center">
          <div className='pr-1 cursor-pointer'><Home/></div>
          <div className='mr-20 cursor-pointer'>Home</div>
          <div className='pr-1 cursor-pointer'><Wallet/></div>
          <div className='mr-20 cursor-pointer'>Wallet</div>
          <div className='pr-1 cursor-pointer'><CurrencyBitcoin/></div>
          <div className='mr-20 cursor-pointer'>Crypto</div>
          <div className='cursor-pointer'><AttachMoney/></div>
          <div className='mr-20 cursor-pointer'>Stocks</div>
          <div className='pr-1 cursor-pointer'><Atm fontSize='large'/></div>
          <div className='mr-20 cursor-pointer'>Services</div>
          <div className='pr-1 cursor-pointer'><LocalMall/></div>
          <div className='mr-32 cursor-pointer'>Store</div>
          <div className='mr-5 cursor-pointer'><Notifications/></div>
          <div className='mr-5 cursor-pointer'><Chat/></div>
        </div>
      </nav>

      <div className="flex items-top justify-around">
      <div className="p-6 mt-10">
      <h1 className="text-8xl font-semibold mb-4">Hello, user!</h1>
      <div className="text-lg font-two">
        <p>Welcome to our fintech platform. Here are some of the features you can explore:</p>
        <ul className="list-disc list-inside mt-4">
          <li>User Authentication and Authorization</li>
          <li>Account Management</li>
          <li>Payment Processing</li>
          <li>Transaction Management</li>
          <li>Security Features</li>
          <li>Financial Analytics and Reporting</li>
          <li>Investment Management</li>
          <li>Customer Support</li>
          <li>Notifications and Alerts</li>
          <li>Integration with Third-Party Services</li>
          <li>Compliance and Regulatory Features</li>
          <li>Mobile and Web Accessibility</li>
          <li>User Experience Enhancements</li>
          <li>Lending and Credit Services</li>
          <li>Blockchain and Cryptocurrency Support</li>
        </ul>
      </div>
      </div>
      <div className='p-6 mt-10'>
      <div>
        <div className="text-2xl mb-4">Your important credentials are safe here...</div>
        <button onClick={fetchUser} className='mb-1 ml-3' >Click Here<KeyboardArrowDown/></button>
      </div>
      <div className="">
        {user.map((prop) => (
          <div key={userId} className="border p-4 mb-2 rounded-lg">
            <p>Account Number: {prop.acc_num}</p>
            <p>Balance: {prop.balance}</p>
          </div>
        ))}
      </div>
      { show ? (<div className='mt-10 text-lg'>
        <div className="form-group">
        <label htmlFor="amount" className='m-3' >Amount :</label>
        <input className='mb-2 p-2 w-100 border border-accent bg-darker text-light rounded-sm' 
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className='flex justify-around'>
        <button onClick={deposit} className='bg-darker border border-white text-white py-2 px-4 rounded'>Deposit</button>
        <button onClick={withdraw} className='bg-darker border border-white text-white py-2 px-4 rounded'>Withdraw</button>
      </div>
      </div>) : (
        <button onClick={() => setShow(!show) } className='mt-10 mb-1 ml-3'>Perform Transactions <KeyboardArrowDown/></button>
      )}
      <div className='mt-10 text-lg'>
      <button onClick={fetchTransactions} className='mb-1 ml-3'>Account History <KeyboardArrowDown/></button>
      <div id="demo" className='m-3 text-base'></div>
      <div className="mt-4 text-base" id="transactions">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="border p-3 mb-3 rounded-md bg-darker border-accent">
            <p>Type: {transaction.type==="deposit" ? "Debited" : "Credited"}</p>
            <p>Amount: {transaction.amount}</p>
            <p>Date: {transaction.created_at.split('T')[0]}</p>
            <p>Time: {[transaction.created_at.split('T')[1].split(':')[0], ':', transaction.created_at.split('T')[1].split(':')[1]]}</p>
          </div>
        ))}
      </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default FintechApp;
