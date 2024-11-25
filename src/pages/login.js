import './../styles/auth.css';
import React from "react";
import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            username: event.target.username.value,
            password: event.target.password.value,
        };

        fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                 if (data.token){ 
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("id", data.id);
                    navigate("../home");
                } else {
                    console.error("No token received");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div>
            <header>
                <h1>WHO WANTS</h1>
            </header>
            <section id="login" className="login">
                <h3>Log in</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="POST-username">Username:</label>
                    <br />
                    <input id="POST-username" type="text" name="username" />
                    <br />
                    <label htmlFor="POST-password">Password:</label>
                    <br />
                    <input id="POST-password" type="password" name="password" />
                    <br />
                    <div className="secundaryButtons">
                        <a id="forgot" className="forgot">
                            I forgot my password
                        </a>
                        <a href= "http://localhost:3000/signup" id="signup" className="signup">
                            Sign up
                        </a>
                    </div>
                    <input type="submit" value="Log in" />
                </form>
            </section>
        </div>
    );
}

export default Login;
