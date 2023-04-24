import {useState, useRef} from "react"

import { CreatePost } from "./CreatePost.jsx";
import { CSSTransition } from "react-transition-group";

import "../styles/Dashboard.css"


export const Dashboard = () => {
    const nodeRef = useRef(null)
    const [showCreatePost, setShowCreate] = useState(false)
    const handleCreateToggle = () => {
        setShowCreate(!showCreatePost)
    }
    const [showPost, setShowPost] = useState(false)
    const data = [
        {
            id: 1,
            user: "dilbert",
            roast: "medium",
            recipe: [
                "1.) Step One",
                "2.) Step Two",
                "3.) Step Three",
                "4.) Step Four",
                "5.) Step Five"
            ], 
            brewer: "Brewer",
            grind: "Medium Fine"
        },
        {
            id: 2,
            user: "filbert",
            roast: "Dark",
            recipe: [
                "1.) Step One",
                "2.) Step Two",
                "3.) Step Three",
                "4.) Step Four",
                "5.) Step Five"
            ], 
            brewer: "Brewer",
            grind: "Medium Fine"
        }
    ]
    function handleOpen(id) {
        console.log(id)
    }

    const content = (
        <div className="dash-container">
            <div className="post-container">
                <h2 onClick={handleCreateToggle}>Create Post</h2>
                
                    <CSSTransition nodeRef={nodeRef} in={showCreatePost} timeout={1000} classNames="fade">
                        <div ref={nodeRef}>
                            {
                                showCreatePost ?
                                <CreatePost /> :null
                            }
                        </div>   
                    </CSSTransition>
                
            </div>
            <div className="post-feed">
                <div className="post" >
                    <div className="post-header" id={data[0].id} onClick={() => handleOpen(data[0].id)}>
                        <h3>{data[0].user}</h3>
                        <h3>{data[0].roast}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
    return content;
}