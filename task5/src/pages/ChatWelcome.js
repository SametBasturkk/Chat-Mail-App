import React, { useEffect, useState,Fragment } from "react";
import { Button,Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';


var user;
var id;
var idparse;

const submitUsername = () => {
    user = document.getElementsByTagName ("input")[0].value;
    console.log(user);
    fetch("https://pool.energy/apiv2/newuser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_name: user,
        }),
    }).then(function (res) {
        res.json().then(json => {
            console.log(json);
            idparse = json.user_id;
            localStorage.setItem("id", idparse);
          });
        localStorage.setItem("user", user);
        window.location.href = "/chatdashboard";

    });
}

var options = [];

const userNames = () => {
    options = [];
    fetch("https://pool.energy/apiv2/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function (res) {
        Promise.resolve(res.json()).then(function (data) {
            for (var i = 0; i < data.length; i++) {
                options.push(data[i].user_name);
            }
        });

    });
}

const ChatWelcome = () => {
    userNames();

    return (
        <div className="background">
                    <div className="centerDiv">

        <h2>Please enter your username</h2>
        <form className="marginTop">
        <Fragment>
            <Typeahead
                id="userName"
                className="userName"
                labelKey="user_name"
                options={options}
                placeholder="Select a username"
                onChange={selected => console.log(selected)}
            />
        </Fragment>
        <Button onClick={submitUsername} className="button marginButton">Login</Button>
        </form>
        </div>
        </div>
    );
    }


export default ChatWelcome;