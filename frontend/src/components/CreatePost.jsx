import React, {useState, useEffect} from "react"

import '../styles/CreatePost.css'

export const CreatePost = () => {

    const dummyUser = {
        username: "dummy",
        brewers: ["Chemex", "Aeropress", "Clever"],
        grinders: ["Baratza Encore", "Fellow Ode"],
        roaster: "Eiland"
    }
    // Equipment Handlers
    const [selectedGrinder, setSelectedGrinder] = useState('default')
    const handleChangeGrinder = (event) => {
        setSelectedGrinder(event.target.value)
    }
    const [selectedBrewer, setSelectedBrewer] = useState(dummyUser.brewers[0])
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

        const values = recipeFields.map((input) => input.value)
        console.log(values)
    }
    const handleChange = (index, event) => {
        const values = [...recipeFields];
        values[index].value = event.target.value
        console.log(values)
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

        // dark: #FD3A00 med: #684E32, light: #F9EA9A
    const content = (

        <div className="post-form-container">
            <form action="" onSubmit={handleSubmit}>
                <div className="section">
                    <div className="grinder-container">
                        <label 
                            className="form__label"
                            htmlFor="grinders"
                        >
                            Grinder: 
                        </label>
                        <select className="item-list" onChange={handleChangeGrinder}>
                            <option value="default">Default Scale</option>
                            {dummyUser.grinders.map((grinder, index) => (
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
                    <div className="grinder-container">
                        <label 
                            className="form__label"
                            htmlFor="brewers"
                        >
                            Brewer: 
                        </label>
                        <select className="item-list" onChange={handleChangeBrewer}>
                            {dummyUser.brewers.map((brewer, index) => (
                                <option key={index} value={brewer}>{brewer}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="section">
                    <div className="grinder-container">
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
                    <div className="grinder-container">
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