const express = require('express');
const bcrypt = require('bcrypt');

const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

const salt = bcrypt.genSaltSync(15); // 10 salt rounds for password hashing

// setting up sessions, to tell when user is logged in or not
const session = require('express-session');

// Set up sessions
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true,
}));

// Host each file inside public folder
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  return res.redirect('/index.html');
});

app.get('/index.html', function (req, res) {

  return res.sendFile(path.join(__dirname, 'public', '/index.html'));
});

app.get('/forecast.html', function (req, res) {

  return res.sendFile(path.join(__dirname, 'public', '/forecast.html'));
});

app.get('/weatherMap.html', function (req, res) {

  return res.sendFile(path.join(__dirname, 'public', '/weatherMap.html'));
});

app.get('/login.html', function (req, res) {
  return res.sendFile(path.join(__dirname, 'public', '/login.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

  // Connect to the MongoDB cluster

  //Password = TKVUNihz8KazgTGS 
  const uri = "mongodb+srv://dsteele1906:TKVUNihz8KazgTGS@finalproject.68sictq.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  async function connectToMongoDB() {
    try {
      await client.connect();
      console.log("Connected to MongoDB");
      return client.db("WeatherApplication");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }

  // signup form - will log the users username, password and email to the mongo users collection
  app.post('/signin', async (req, res) => {
    try {
      const db = await connectToMongoDB();
      const { username, password } = req.body;
      const usersCollection = db.collection('users');

      // checks for existing account with the same name to prevent duplicate entries

      const existingAccount = await usersCollection.findOne({ username: username });

      if (existingAccount) {
        console.log(`User ${username} already exists, please try again`);
        return res.redirect('/login.html?error=' + encodeURIComponent('Username already exists, please try again'));

      }

      const hash = await bcrypt.hash(password, salt);  // salt and hash the password before storing in database. 

      const insertResult = await usersCollection.insertOne({
        username: username,
        password: hash,
      });

      console.log(insertResult);

      console.log(`User ${username} registered successfully!`);
      return res.redirect('/login.html?success=' + encodeURIComponent('Signup complete! Please log in to access your account.')); // Redirect to login.html

    } catch (error) {
      console.error("Error in signup route:", error);
      return res.redirect('/login.html?error=' + encodeURIComponent('An error occurred. Username is not unique, please try again'));

    }
  });

  // login form , checks against the users collection to see if username and password matches with existing accounts. 
  app.post('/login', async (req, res) => {
    try {
      const db = await connectToMongoDB();
      const { username, password } = req.body;
      const usersCollection = db.collection('users');

      const user = await usersCollection.findOne({ username: username });

      if (user) {
        const isValid = await bcrypt.compare(password, user.password);

        if (isValid) {
          req.session.user = user; // Save the user data in the session
          return res.redirect('/weatherMap.html');
        }
        else {
          return res.redirect('/login.html?error=' + encodeURIComponent('Incorrect Password, Please try again'));
        }
      } else {
        return res.redirect('/login.html?error=' + encodeURIComponent('Username incorrect, Please try again'));
      }

    } catch (error) {
      console.error("Error in login route:", error);
      return res.status(500).send('Internal Server Error');
    }
  });

  // logout route, destroys the session and redirects to login.html

  app.get('/logout', (req, res) => {
    req.session.destroy();
    return res.redirect('/login.html');
  });

  // delete route  

  connectToMongoDB().catch(console.error);
});

