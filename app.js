const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

const usersFilePath = __dirname + '/users.json';

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/option.html');
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Code for signup process

app.post('/register', (req, res) => {
  const { firstname, lastname, username, password } = req.body;
  const newUser = { firstname, lastname, username, password };

  // Read existing user data from the file
  let users = [];
  try {
    const usersData = fs.readFileSync(usersFilePath, 'utf8');
    users = JSON.parse(usersData);
  } catch (error) {}

  // Add the new user to the list
  users.push(newUser);

  // Write updated user data back to the file
  fs.writeFileSync(usersFilePath, JSON.stringify(users));

  res.send('<center> <h3> Register successful. Now you can <a href="/">login</a>. </h3> </center>');
});

// Code for login process

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Read user data from the file
  try {
    const usersData = fs.readFileSync(usersFilePath, 'utf8');
    const users = JSON.parse(usersData);

    // Check if the provided username and password match any user
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      res.send(`<center> <h1>Welcome, ${user.firstname} </h1> <br><a href="details.html">Employee Details</a>. </center>  `);
      // res.send('<center> <h3> Register successful. Now you can <a href="/">login</a>. </h3> </center>');

    } else {
      res.send('Invalid login credentials.');
    }
  } catch (error) {
    res.send('An error occurred.');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
