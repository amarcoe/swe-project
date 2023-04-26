import { useState, useEffect } from "react"

import { useNavigate } from "react-router-dom"

import "../styles/Signup.css"


const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

export const Signup = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)

    const [grinders, setGrinders] = useState([])
    const [brewers, setBrewers] = useState([])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])


    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''

    /* 
    Username
    Password
    Equipment (optional) 
    Favorite Roasters (top 3)
    Bookmarked recipes
    User Recipes 
    */
    function handleAddGrinder(event) {
        event.preventDefault()
        const input = document.getElementById('grinders')
        const item = input.value;
        let formatted = item.charAt(0).toUpperCase() + item.slice(1)

        setGrinders([...grinders, formatted]);
        input.value = ''
    }
    function handleAddBrewer(event) {
        event.preventDefault()
        const input = document.getElementById('brewers')
        const item = input.value
        let formatted = item.charAt(0).toUpperCase() + item.slice(1)

        setBrewers([...brewers, formatted])
        input.value = ''
    }
    function removeGrinder(index){
        let arr = [...grinders]
        arr.splice(index, 1)
        setGrinders(arr)
    }
    function removeBrewer(index) {
        let arr = [...brewers]
        arr.splice(index, 1)
        setBrewers(arr)
    }
    
    const [isSuccess, setSuccess] = useState(false)
    function handleSubmission(event) {
        event.preventDefault()
        const formData = new FormData();

        formData.append('username', username)
        formData.append('password', password)
        formData.append('grinders', grinders)
        formData.append('brewers', brewers)
        
        for (const [name, value] of formData.entries()) {
            console.log(`${name}: ${value}`);
        }

        // actual fetch request to the server for user signup
        fetch("https://little-water-7513.fly.dev/signup", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            
            console.log(data)
            if(data.message === "success"){
                window.location.href = "/login"
            }
        
        })
        .catch(error => console.error(error))

    }
    
    const content = (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmission}>
                <div className="form__title-row">
                    <h2>New User</h2>
                
                </div>
                <label className="form__label" htmlFor="username">
                    Username: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validUserClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                />
                <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />

                
                <label id="equipment-label" className="form__label" >Equipment: (optional)</label>
                <label className="form__label" htmlFor="grinders">Grinders: </label>

                <input type="text" id="grinders" className="form__input"/>
                <button className="form-btn" onClick={handleAddGrinder}>Add</button>
                <ul className="user-list">
                    {grinders.map((value, index) => (
                        <li key={index} >{value} <p className="del-btn" onClick={() => removeGrinder(index)}>&#10005;</p></li>
                    ))}
                </ul>

                <label className="form__label" htmlFor="brewers">Brewers: </label>

                <input type="text" id="brewers" className="form__input"/>
                <button className="form-btn" onClick={handleAddBrewer}>Add</button>
                <ul>
                    {brewers.map((value, index) => (
                        <li key={index}>{value} <p className="del-btn" onClick={() => removeBrewer(index)}>&#10005;</p></li>
                    ))}
                </ul>
                <button className="sub-btn">Sign Up</button>
            </form>
        </div>
    )

    return content
}

