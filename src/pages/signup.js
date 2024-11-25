import './../styles/auth.css';
import { useState } from 'react';

function Signup() {
    const [registered, setRegistered] = useState(false); // Estado para la carga

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            username: event.target.username.value,
            password: event.target.password.value,
            email: event.target.email.value,
            name: event.target.name.value,
        };

        fetch("http://localhost:8080/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                setRegistered(true);
            })
            .catch((error) => {
                console.error("Error:", error);
                setRegistered(false); 
            });
    };

    return (
        <div>
            <header>
                <h1>WHO WANTS</h1>
            </header>
            <section id="login" className="login">
                <h3>Sign up</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="POST-username">Username:</label>
                    <br />
                    <input id="POST-username" type="text" name="username" />
                    <br />
                    <label htmlFor="POST-name">Name:</label>
                    <br />
                    <input id="POST-name" type="text" name="name" />
                    <br />
                    <label htmlFor="POST-email">Email:</label>
                    <br />
                    <input id="POST-email" type="text" name="email" />
                    <br />
                    <label htmlFor="POST-password">Password:</label>
                    <br />
                    <input id="POST-password" type="password" name="password" />
                    <br />
                    <div className="secundaryButtons">
                        <a id="forgot" className="forgot">
                            I forgot my password
                        </a>
                        <a href="http://localhost:3000/login" id="Log in" className="Log in">
                            Log in
                        </a>
                    </div>
                    {registered && <p className="registered">Successful sign up!!</p>}
                    <input type="submit" value= "Sign up" />
                </form>
            </section>
        </div>
    );
}

export default Signup;
