import React from "react";
import { Form,Button } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';


var userName;
var id;

userName=localStorage.getItem("user");
id = localStorage.getItem("id");

const buttonSend = (e) => {
    e.preventDefault();
    var message = document.getElementById("exampleFormControlTextarea1").value;
    var Recipient = document.getElementById("Name").value;
    var Title = document.getElementById("Title").value;
    console.log(message);
    fetch("https://pool.energy/apiv2/newmessage", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Recipient: Recipient,
            Title: Title,
            message: message,
        }),
    });
}

fetch("https://pool.energy/apiv2/showmessage", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
            id: id,
        }),
    }).then(function (res) {
        Promise.resolve(res.json()).then(function (data) {
            for (var i = 0; i < data.length; i++) {
                document.getElementById("messageTest").innerHTML += "<span class=Title> Title:</span> "+data[i].message_user +"<br>" +  data[i].title + "<br>";
            }
        });

    });




const ChatDashboard = () => {
    return (
        <div>
            <div className="background">
                    <div className="centerDiv">

        <h2>Welcome {userName}</h2>
        </div>
        </div>
        <div  className="centerDiv form">
        <Form>
  <Form.Group className="mb-3" >
    <Form.Label>Recipient</Form.Label>
    <Form.Control id="Name" type="email" placeholder="Enter name" />
    <Form.Label>Title</Form.Label>
    <Form.Control id="Title" type="text" placeholder="Enter title" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Message</Form.Label>
    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </Form.Group>
  <Button onClick={buttonSend} variant="primary" type="submit">
    Submit
  </Button>

</Form>
</div>
<div  className="centerDiv form">
<h3>Your Messages</h3>
<p id="messageTest" ></p>
</div>
        </div>
    );
    }


export default ChatDashboard;