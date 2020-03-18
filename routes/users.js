const express = require('express');
const mysql = require("mysql2");
const router = express.Router();



// SQL SERVER CONFIGURATION
const connection = mysql.createConnection({
   host: "localhost",
   user: "root",
   database: "event_calendar",
   password: "qwertyqwerty123"
});
connection.connect(function(err){
   if (err) return console.error("Помилка: " + err.message);
   else console.log("Успішно підключено до SQL сервера");
});


router.get('/login', (req, res)=>res.render('login'));
router.get('/register', (req, res)=>res.render('register'));

router.post('/register', (req, res) => {
   console.log(req.body);
   res.send('post');
});

module.exports = router;