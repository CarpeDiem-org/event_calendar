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
global.db = connection;








router.get('/login', (req, res)=>res.render('login'));
router.get('/register', (req, res)=>res.render('register'));

router.post('/register', (req, res) => {
   const name = req.body['name'];
   const surname = req.body['surname'];
   const companyPosition = req.body['email'];
   const email = req.body['email'];
   const password = req.body['password'];
   const password2 = req.body['password2'];

   if (password === password2)
   {
      const sql=`INSERT INTO event_calendar.User (name, surname, company_position, email, password) VALUES ('${name}', '${surname}', '${companyPosition}', '${email}', '${password}');`;

      db.query(sql, function(err, results){
         res.send(results);
      });
   }
   else
   {
      res.send('Паролі не співпадають.');
   }
});

router.post('/login', (req, res) => {
   const email = req.body['email'];
   const password = req.body['password'];

   const sql=`SELECT email, password FROM event_calendar.User WHERE email LIKE '${email}' AND password LIKE '${password}';`;
   db.query(sql, function(err, results){
      if(results.length){
         // req.session.userId = results[0].id;
         // req.session.user = results[0];
         // console.log(results[0].id);
         // res.redirect('/home/dashboard');
         res.send("Авторизовано.");
      }
      else{
         res.send('Користувач не знайдений.');
      }
   });
});

module.exports = router;