const express = require('express');
const mysql = require("mysql2");
const router = express.Router();
const { exec } = require('child_process');


let dbconfig = JSON.parse(require('fs').readFileSync('db/dbconfig.json'));


const connection = mysql.createConnection({
   host: dbconfig["host"],
   user: dbconfig["user"],
   database: dbconfig["database"],
   password: dbconfig["password"]
});
connection.connect(function(err){
   if (err) return console.error("Помилка: " + err.message);
   else console.log("Успішно підключено до SQL сервера");
});
global.db = connection;


router.get('/login', (req, res)=>res.render('login'));
router.get('/register', (req, res)=>res.render('register'));
router.get('/reset/email', (req, res)=>res.render('resetPasswordEmailSetting'));
router.get('/reset/:token', (req, res)=>res.render('resetPasswordSettingNew'));


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
         const sql=`INSERT INTO event_calendar.User (name, surname, company_position, email, password, confirmed) VALUES ('${name}', '${surname}', '${companyPosition}', '${email}', '${password}', false);`;

         db.query(sql, function(err, results){
            if (err) console.log(err.message);



            //  Run python module that send letter

            exec(`python3 python_modules/confmaillib.py -hash "${email}"`, (err, stdout, stderr) => {
               var subject = "Confirm account";
               var body = `Press link for confirm account. http://${req.headers.host}/users/verify/${stdout}`;

               exec(`python3 python_modules/mailer.py "${subject}" "${body}" "${email}" `, (err, stdout, stderr) => {
                  console.log(`stdout: ${stdout}`);
                  console.log(`stderr: ${stderr}`);
               });
            });


            res.render("login");
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
         var opn = require('opn');
         opn('http://localhost:63342/event_calendar/views/views/examples/theming.html?_ijt=1o53imao09p71p205nh4tsf5ff');
      }
      else{
         res.send('Користувач не знайдений.');
      }
   });
});


router.get('/verify/:token', (req, res) => {
   console.log(req.params.token);

   exec(`python3 python_modules/confmaillib.py -confirm "${req.params.token}"`, (err, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
   });

   res.render("login");
});







router.post('/reset/email', (req, res)=> {
   const email = req.body['email'];
   console.log(email);

   // const sql=`INSERT INTO event_calendar.User (name, surname, company_position, email, password, confirmed) VALUES ('${name}', '${surname}', '${companyPosition}', '${email}', '${password}', false);`;
   //
   // db.query(sql, function(err, results){
   //    if (err) console.log(err.message);
   //
   //
   //
   //    //  Run python module that send letter
   //
   //    exec(`python3 python_modules/confmaillib.py -hash "${email}"`, (err, stdout, stderr) => {
   //       var subject = "Confirm account";
   //       var body = `Press link for confirm account. http://${req.headers.host}/users/verify/${stdout}`;
   //
   //       exec(`python3 python_modules/mailer.py "${subject}" "${body}" "${email}" `, (err, stdout, stderr) => {
   //          console.log(`stdout: ${stdout}`);
   //          console.log(`stderr: ${stderr}`);
   //       });
   //    });
   //
   //
   //    res.render("login");
   // });

});

router.post('/reset/:token', (req, res) => {
   console.log(req.params.token.split('-'));
   const login = req.params.token.split('-')[0];
   const password = req.params.token.split('-')[1];


   // exec(`python3 python_modules/confmaillib.py -confirm "${req.params.token}"`, (err, stdout, stderr) => {
   //    console.log(stdout);
   //    console.log(stderr);
   // });

   // res.render("login");
});





module.exports = router;