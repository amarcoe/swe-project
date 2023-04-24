import { useState, useEffect, useRef } from "react"

import "../styles/FilterBy.css"

import { PostCard } from "./PostCard"
import { CSSTransition } from "react-transition-group";


export const FilterBy = (props) => {
    const nodeRef = useRef(null)
    const dummyUser = {
        username: "dummy",
        brewers: ["Chemex", "Aeropress", "Clever"],
        grinders: ["Baratza Encore", "Fellow Ode"],
        roaster: "Eiland"
    }

    const [brewer, setBrewer] = useState('')
    const [grinder, setGrinder] = useState("default")
    const [roast, setRoast] = useState('')
    const [coarseness, setCoarseness] = useState(0)
    const [showFilter, setShowfilter] = useState(false)
    const handleShowFilter = () => {
        setShowfilter(!showFilter)
    }

    const handleChangeGrinder = (event) => {
        setGrinder(event.target.value)
    }
    const handleChangeCoarseness = (event) => {
        setCoarseness(event.target.value)
        
    }
    const handleChangeBrewer = (event) => {
        setBrewer(event.target.value)

    }

    const roastLevels = ["Light", "Medium", "Dark"]
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
        } else if(roast === 'Dark'){
            color.style.backgroundColor = "#3d2600"

        }
    },[roast])

    const [filtered, setFiltered] = useState(null)
    const handleApplyFilters = () => {
        console.log(brewer, coarseness, roast)
        const brewerMatch = props.data[0].coarseness === coarseness;
        console.log(brewerMatch)
        const filteredArray = props.data.filter(coffee => 
            coffee.brewer === brewer 
            && coffee.coarseness === coarseness 
            && coffee.roast === roast
        )

        setFiltered(filteredArray)
        console.log(filtered)
    }

    
    const likertOptions = [
        { label: "Coarse", value: "Coarse"},
        { label: "Medium Coarse", value: "Medium Coarse"},
        { label: "Medium", value: "Medium"},
        { label: "Medium Fine", value: "Medium Fine"},
        { label: "Fine", value: "Fine"},
    ]
    const content = ( 
        <div className="filter-container">
            <button className="post-open" onClick={handleShowFilter}>Show Filter</button>

            <CSSTransition nodeRef={nodeRef} in={showFilter} timeout={1000} classNames="fade" unmountOnExit>
                <div className="section" ref={nodeRef}>
                    <div className="section-container">
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
                        {grinder == "default" ?
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
                            {dummyUser.brewers.map((brewer, index) => (
                                <option key={index} value={brewer}>{brewer}</option>
                            ))}
                        </select>
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

            </CSSTransition>
            {showFilter ? (
                <button className="post-btn" type="submit" onClick={handleApplyFilters}>Apply Filters</button>
            ) : null}

            
            { filtered ? 
            (
                filtered.map((item, index) =>(
                    <div className="post" key={index}>
                        <PostCard data={item}/>
                    </div>
                ))
            )
            : 
            (
                props.data.map((item, index) =>(
                    <div className="post" key={index}>
                        <PostCard data={item}/>
                    </div>
                ))
            )
            }
        </div>
    )
    return content
}