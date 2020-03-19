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
   const {name, surname, companyPosition, email, password, password2} = req.body;

   let errors = [];

   if (!name || !surname || !email || !password || !password2) errors.push({msg: 'Будь ласка, заповніть всі обовязкові поля'});
   if (password !== password2) errors.push({msg: 'Паролі не співпадають'});
   if (password.length < 6) errors.push({msg: 'Пароль повинен містити хочаб 6 символів'});
   if (password.length > 45) errors.push({msg: 'Пароль не може бути більше 45 символів'});
   if (name.length > 45) errors.push({msg: 'Ім\'я не може бути більше 45 символів'});
   if (surname.length > 45) errors.push({msg: 'Прізвище не може бути більше 45 символів'});
   if (email.length > 45) errors.push({msg: 'Електронна скринька не може бути більше 45 символів'});
   if (companyPosition.length > 90) errors.push({msg: 'Company position не може бути більше 90 символів'});

   db.query(`SELECT * FROM event_calendar.User WHERE email LIKE '${email}';`, function (err, result) {
      if (err) console.log(err.message);
      if (result.length) errors.push({msg: 'Користувач з таким поштовим адресом вже існує'});
      if (errors.length > 0){
         res.render('register', {
            errors,
            name,
            surname,
            companyPosition,
            email,
            password,
            password2
         });
      }
      else {
         const sql=`INSERT INTO event_calendar.User (name, surname, company_position, email, password) VALUES ('${name}', '${surname}', '${companyPosition}', '${email}', '${password}');`;

         db.query(sql, function(err, results){
            if (err) console.log(err.message);
            res.send("OK");
         });
      }
   });
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