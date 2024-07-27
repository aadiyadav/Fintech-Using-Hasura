const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
dotenv.config()
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const HASURA_URL = process.env.HASURA_URL
const token = process.env.TOKEN;

app.post('/deposit', async (req, res) => {
  const { userId, amount } = req.body;
  const query = `
    mutation {
      insert_transactions(objects: {user_id: ${userId}, type: "deposit", amount: ${amount}}) {
        returning {
          id
        }
      }
      update_users(where: {id: {_eq: ${userId}}}, _inc: {balance: ${amount}}) {
        returning {
          balance
        }
      }
    }
  `;
  const response = await fetch(HASURA_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ query })
  });
  const data = await response.json();
  res.json(data);
});

app.post('/withdraw', async (req, res) => {
  const { userId, amount } = req.body;
  const query = `
    mutation {
      insert_transactions(objects: {user_id: ${userId}, type: "withdrawal", amount: ${amount}}) {
        returning {
          id
        }
      }
      update_users(where: {id: {_eq: ${userId}}}, _inc: {balance: -${amount}}) {
        returning {
          balance
        }
      }
    }
  `;
  const response = await fetch(HASURA_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ query })
  });
  const data = await response.json();
  res.json(data);
});

app.get('/user/:id', async (req, res) => {
  const userId = req.params.id
  const query = `
    query GetUserDetails($userId: Int!) {
      users(where: {id: {_eq: $userId}}) {
        acc_num
        balance
      }
    }
  `;

  const variables = { userId: parseInt(userId, 10) }

  const response = await fetch(HASURA_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ query, variables })
  });
  const result = await response.json();
  console.log(result)
  res.json(result.data.users);
});

app.get('/transactions/:id', async (req, res) => {
  const userId = req.params.id
  const query = `
    query GetTransactions($userId: Int!) {
      transactions(where: {user_id: {_eq: $userId}}) {
        id
        type
        amount
        created_at
      }
    }
  `;

  const variables = { userId: parseInt(userId, 10) }

  const response = await fetch(HASURA_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ query, variables })
  });
  const result = await response.json();
  res.json(result.data.transactions);
});


// Helper function to make GraphQL requests to Hasura
const makeHasuraRequest = async (query, variables) => {
  try {
    const response = await axios.post(
      HASURA_URL,
      {
        query,
        variables,
      },
      // {
      //   headers: {
      //     'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
      //   },
      // }
    );
    return response.data;
  } catch (error) {
    console.error('Error making Hasura request:', error);
    throw error;
  }
};

app.post('/register', async (req, res) => {
  const { email, password, username, accountNumber } = req.body;
  const query = `
    mutation RegisterUser($email: String!, $password: String!, $username: String!, $accountNumber: String!) {
      insert_users(objects: {email: $email, password: $password, name: $username, acc_num: $accountNumber}) {
        returning {
          id
          email
        }
      }
    }
  `;

  const variables = {
    email,
    password,
    username,
    accountNumber
  };

  try {
    const data = await makeHasuraRequest(query, variables);
    if (data.data.insert_users.returning.length > 0)
      res.status(200).json(data.data.insert_users.returning[0]);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to register user' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const query = `
    query LoginUser($email: String!, $password: String!) {
      users(where: {email: {_eq: $email}, password: {_eq: $password}}) {
        id
        email
        name
        acc_num
      }
    }
  `;

  const variables = {
    email,
    password,
  };

  try {
    const data = await makeHasuraRequest(query, variables);
    console.log("dataaaa :", data)
    if (data.data.users.length > 0) {
      res.status(200).json(data.data.users[0]);
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to login user' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});