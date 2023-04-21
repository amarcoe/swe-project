import { useState, useEffect } from "react"

import { useNavigate } from "react-router-dom"

import "../styles/Signup.css"


export const Login = () => {
    const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

    const changeUser = (e) => setUsername(e.target.value);
	const changePassword = (e) => setPassword(e.target.value);

    const submit = (event) => {
        event.preventDefault()
        console.log(username, password)
    }
    const content = (
        <div className="form-container">
			<form className="form" onSubmit={submit}>
				<div className="form__title-row">
					<h2>Login</h2>
				</div>
				
				<label className="form__label" htmlFor="user">
					Username: <span className="nowrap"></span>
				</label>
				<input
					className="form__input"
					id="user"
					name="user"
					type="text"
					autoComplete="off"
					onChange={changeUser}
				/>

				<label className="form__label" htmlFor="password">
					Password: <span className="nowrap"></span>
				</label>
				<input
					className="form__input"
					id="password"
					name="password"
					type="password"
					onChange={changePassword}
				/>
				<button type="submit" className="sub-btn">
					Submit
				</button>
			</form>
		</div>
    )
    return content
}