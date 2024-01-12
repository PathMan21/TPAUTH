
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



const SECRET_KEY = 'your_secret_key';

app.post('/login', (req, res) => {
  const { userId, password } = req.body;

  const user = require('./users.json')[userId];
  if (user && user.password === password) {

    const token = jwt.sign({ userId, admin: user.admin }, SECRET_KEY, { expiresIn: '1d' });

    res.json({ token });
  } else {
    res.status(401).json({ error: 'ne marche pas' });
  }
});


function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ error: 'Forbidden' });
  
      req.user = user;
      next();
    });
  }
  
  app.get('/posts', authenticateToken, (req, res) => {
    const posts = require('./posts.json');
    const userPosts = {};
  
    for (const postId in posts) {
      const post = posts[postId];
      if (req.user.admin || post.author_id === req.user.userId) {
        userPosts[postId] = post;
      }
    }
  
    res.json(userPosts);
  });
  