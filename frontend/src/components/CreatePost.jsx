import React, {useState, useEffect} from "react"

import '../styles/CreatePost.css'
import { useNavigate } from "react-router-dom"


export const CreatePost = (props) => {
    const navigate = useNavigate();

    const user = props.user
    // Equipment Handlers
    const [selectedGrinder, setSelectedGrinder] = useState('default')
    const handleChangeGrinder = (event) => {
        setSelectedGrinder(event.target.value)
    }
    const [selectedBrewer, setSelectedBrewer] = useState(user.brewers[0])
    const handleChangeBrewer = (event) => {
        setSelectedBrewer(event.target.value)
    }
    const [coarseness, setCoarseness] = useState("");
    const handleChangeCoarseness = (event) => {
        setCoarseness(event.target.value)
        console.log(coarseness)
    }
    const likertOptions = [
        { label: "Coarse", value: 1},
        { label: "Medium Coarse", value: 2},
        { label: "Medium", value: 3},
        { label: "Medium Fine", value: 4},
        { label: "Fine", value: 5},
    ]
    const likertRating = [
        {
            label: "Strongly Dislike",
            value: 1
        },
        {
            label: "Dislike", 
            value: 2
        },
        {
            label: "Eh", 
            value: 3
        },
        {
            label: "Like", 
            value: 4
        },
        {
            label: "Strongly Like", 
            value: 5
        }
    ]
    
    // Recipe Handlers

    const [recipeFields, setFields] = useState([{value: ""}])
    const handleAddFields = () => {
        console.log(recipeFields)
        const values = [...recipeFields]
        values.push({value: ""});
        setFields(values);
        console.log(recipeFields)
    }

    const handleRemoveFields = (index) => {
        const values = [...recipeFields]
        values.splice(index, 1)
        setFields(values);
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData();

        formData.append('author', user.userID)
        formData.append('grinder', selectedGrinder)
        formData.append('coarseness', coarseness)
        formData.append('brewer', selectedBrewer)
        formData.append('recipe', recipeFields)
        formData.append('roast', roast)
        formData.append('rating', rating)

        for (const [name, value] of formData.entries()) {
            console.log(`${name}: ${value}`);
        }
        console.log(recipeFields)
        fetch("http://localhost:5000/post", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))
    }
    const handleChange = (index, event) => {
        const values = [...recipeFields];
        values[index].value = event.target.value
        
        setFields(values)
    }

    // Roast Handlers
    const roastLevels = ["Light", "Medium", "Dark"]
    const [roast, setRoast] = useState('Medium')
    const handleChangeRoast = (event) => {
        const value = event.target.value
        setRoast(value)
    }
    useEffect(()=>{
        const color = document.getElementById("roast-color")
        if(roast === "Light"){
            color.style.backgroundColor = "#F9EA9A"
        }
        else if(roast === "Medium"){
            color.style.backgroundColor = "#684E32"
        } else {
            color.style.backgroundColor = "#3d2600"

        }
    },[roast])

    // Rating Handlers
    const [rating, setRating] = useState(0)
    const handleChangeRating = (event) => {
        setRating(event.target.value)
    }

    function handleClick() {
        localStorage.removeItem('userID');
        navigate("/login")
      }

        // dark: #FD3A00 med: #684E32, light: #F9EA9A
    const content = (

        <div className="post-form-container">
                <button onClick={handleClick}>Clear Local Storage</button>

            <form action="" onSubmit={handleSubmit}>
                <div className="section">
                    <div className="section-container">
                        <label 
                            className="form__label"
                            htmlFor="grinders"
                        >
                            Grinder: 
                        </label>
                        <select className="item-list" onChange={handleChangeGrinder}>
                            <option value="default">Default Scale</option>
                            {user.grinders.map((grinder, index) => (
                                <option key={index} value={grinder}>{grinder}</option>
                            ))}
                        </select>
                        <div className="likert-scale">
                        {selectedGrinder == "default" ?
                            (
                                likertOptions.map((option, index) => (
                                    <div className="rating" key={index}>
                                        <input 
                                            type="radio"
                                            id={`options${index}`}
                                            name="likertScale"
                                            value={option.value}
                                            checked={coarseness == option.value}
                                            onChange={handleChangeCoarseness}
                                        />
                                        <label htmlFor={`option${index}`} className="rating-label"> {option.label}</label>
                                    </div>
                                )
                            )) : (
                                <div>
                                    <label htmlFor="setting">Setting:</label>
                                    <input type="text" name="setting" onChange={handleChangeCoarseness}/>
                                </div>
                            )
                        }
                        </div>
                    </div>
                    <div className="section-container">
                        <label 
                            className="form__label"
                            htmlFor="brewers"
                        >
                            Brewer: 
                        </label>
                        <select className="item-list" onChange={handleChangeBrewer}>
                            {user.brewers.map((brewer, index) => (
                                <option key={index} value={brewer}>{brewer}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="section">
                    <div className="section-container">
                        <label className="form__label">Recipe: </label>
                        {recipeFields.map((input, index) =>(
                            <div className="input-fields" key={index}>
                                <label className="input-label" htmlFor="step">{index + 1}: </label>
                                <textarea
                                    name="step"
                                    type="text"
                                    placeholder={`Step ${index + 1}`}
                                    value={input.value}
                                    onChange={(e) => handleChange(index, e)}
                                    maxLength={180}
                                />
                                <h2 className="remove-btn" onClick={() => handleRemoveFields(index)}>&#10005;</h2>
                                
                            </div>
                        ))}
                        <button className="btn" type="button" onClick={() => handleAddFields()}>&#65291;</button>
                    </div>
                    <div className="section-container">
                        <label className="form__label">Roast Level:</label>
                        <select className="item-list" onChange={handleChangeRoast}>
                            <option default>--Select Roast--</option>
                            {roastLevels.map((value, index) => (
                                <option key={index} value={value}>{value}</option>
                            ))}
                        </select>
                        <div className="small-box" id="roast-color"></div>
                    </div>
                </div>
                <div className="section">
                    <div className="section-container last">
                    <label className="form__label last">How did you like it? </label>
                        
                        <div className="likert-scale">
                            {likertRating.map((option, index) => (
                                <div className="relative-rating" key={index}>
                                    <input 
                                        type="radio"
                                        id={`options${index}`}
                                        name="relativeScale"
                                        value={option.value}
                                        checked={rating == option.value}
                                        onChange={handleChangeRating}
                                    />
                                    <label htmlFor={`option${index}`} className="rating-label"> {option.label}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <button className="post-btn" type="submit">Post</button>
            </form>
        </div>
    )
    return content;
}

/* likertOptions.map((option), index) => {(
    <div key={index}>
        <input 
            type="radio"
            id={`options${index}`}
            name="likertScale"
            value={option.value}
            checked={coarseness}
            onChange={handleChangeCoarseness}
        />
    </div>
)} */