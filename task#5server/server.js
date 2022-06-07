var express = require("express");
const cors = require("cors");

const { Pool, Client } = require("pg");
const { json } = require("express/lib/response");

const pool = new Pool({
  user: "x",
  host: "x",
  database: "x",
  password: "x?",
  port: 5432,
});

var app = express();

app.use(express.json());
app.use(cors());

let users;
let user_id;
let Recipient_id;



app.post("/newuser", function (request, response) {
  console.log(request.body);

  parsedJson = request.body;
  user_name = "'" + parsedJson.user_name + "'";
  pool.query(

   "INSERT INTO public.message_users(user_name) SELECT" +user_name+ "WHERE NOT EXISTS ( SELECT 1 FROM public.message_users WHERE user_name="+user_name+");"

).then(function (res) {

    pool.query("select distinct user_id from public.message_users where user_name=" +  user_name + ";").then(function (res) {
      users = res.rows;
      user_id = users[0].user_id;
      response.status(200).send({user_id});

    });
  } )

});

app.post("/newmessage", function (request, response) {

  parsedJson = request.body;
  Recipient = parsedJson.Recipient;
  Title = parsedJson.Title;
  message = parsedJson.message;
  pool.query(
    "SELECT * FROM public.message_users where user_name=" + "'" + Recipient + "'" + ";"
  ).then(function (res) {
    console.log(res.rows);
    Recipient_id = res.rows[0].user_id;
    console.log(Recipient_id);

    pool.query(
      "INSERT INTO public.messages(id,title,message_user) SELECT " + Recipient_id + "," + "'" + Title + "'" + "," + "'" + message + "'"+";");




});

});


app.post("/showmessage", function (request, response) {

  parsedJson = request.body;
  Recipient_id = parsedJson.id;
  pool.query(
    "SELECT DISTINCT message_user,title FROM public.messages where id="  + Recipient_id  + ";"
  ).then(function (res) {
    a=res.rows;
    JSON.stringify(a);
    response.status(200).send(a);
    response.end();

});

});


app.get("/users", function (request, response) {

  pool.query(
    "SELECT user_name FROM public.message_users;"
  ).then(function (res) {
    a=res.rows;
    JSON.stringify(a);
    response.status(200).send(a);
    response.end();

});

});

console.log("Listening on port 3001");
app.listen(3001);
