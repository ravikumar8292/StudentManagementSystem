const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve HTML file for the signup page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/abhi.html');
});

// Handle form submission
app.post('/signup', (req, res) => {
  const userData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  // Convert the user data to JSON
  const userDataJson = JSON.stringify(userData);

  // Append the user data to a file (you can change the file name)
  fs.appendFile('user_data.json', userDataJson + '\n', (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Signup Successful');
  });
});

// Start the server
const port = 3000; // You can change the port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
