import React, { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // do login logic here
        console.log("Email:", email);
        console.log("Password:", password);

        // reset form
        setEmail("");
        setPassword("");
    };


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <form className="col-12 col-md-6" onSubmit={handleSubmit}>
                    <div className="mt-2">
                        <h2>Login</h2>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="form-text">
                            We'll never share your email with anyone else.
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>

                </form>
            </div>
        </div>
    );
}