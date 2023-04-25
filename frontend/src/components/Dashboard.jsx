import {useState, useRef, useEffect} from "react"

import { CreatePost } from "./CreatePost.jsx";
import { CSSTransition } from "react-transition-group";

import "../styles/Dashboard.css"
import { PostCard } from "./PostCard.jsx";
import { FilterBy } from "./FilterBy.jsx";


export const Dashboard = () => {
    const [user, setUser] = useState({})
    

    useEffect(() => {
        const id = localStorage.getItem("userID")
        fetch(`http://localhost:5000/get-current-user?id=${id}`, {
            method: "GET",
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setUser(data)
        })
        .catch(error => console.error(error))
    },[])

    const nodeRef = useRef(null)
    const [showCreatePost, setShowCreate] = useState(false)
    const handleCreateToggle = () => {
        setShowCreate(!showCreatePost)
    }


    const data = [
        {
            id: 1,
            user: "Dilbert",
            roast: "Dark",
            recipe: [
                "Measure out 1 tablespoon of coffee grounds per 6 ounces of water",
                "Boil 6 ounces of water",
                "Place a filter in a pour-over or drip coffee maker",
                "Add the coffee grounds to the filter",
                "Slowly pour the hot water over the coffee grounds, starting at the center and spiraling outward",
                "Wait for the coffee to finish brewing, then remove the filter and discard the grounds"
            ], 
            brewer: "Chemex",
            grinder: "Default",
            coarseness: "Medium", 
            bookmarks: 5,
            usersBookmarked: [], 
            rating: 5
        },
        {
            id: 2,
            user: "filbert",
            roast: "Light",
            recipe: [
                "Measure out 1 tablespoon of coffee grounds per 6 ounces of water",
                "Boil 6 ounces of water",
                "Place a filter in a pour-over or drip coffee maker",
                "Add the coffee grounds to the filter",
                "Slowly pour the hot water over the coffee grounds, starting at the center and spiraling outward",
                "Wait for the coffee to finish brewing, then remove the filter and discard the grounds"
            ], 
            brewer: "Pour Over",
            grind: "Medium Fine", 
            bookmarks: 0,
            usersBookmarked: [], 
            rating: 3
        }
    ]
    const [activeTab, setActiveTab] = useState(2)
    const handleTabClick = (num) => {
        setActiveTab(num)
    }
    const content = (
        <div className="dash-container">
            <div className="nav-bar">
                <ul className="nav-menu">
                    <li className={activeTab===1 ? `nav-item active` : `nav-item`} onClick={() => handleTabClick(1)} id="1">Your Posts</li>
                    <li className={activeTab===2 ? `nav-item active` : `nav-item`} onClick={() => handleTabClick(2)} id="2">Create</li>
                    <li className={activeTab===3 ? `nav-item active` : `nav-item`} onClick={() => handleTabClick(3)} id="3">Bookmarks</li>
                </ul>
            </div>
            {activeTab === 1 &&
                <div className="post-feed">
                    <h1>{user.username}'s' Posts</h1>
                    {data.map((item, index) =>(
                        <div className="post" key={index}>
                            <PostCard data={item}/>
                        </div>
                    ))}
                </div>
            }
            {activeTab === 2 && 
                <div>
                    <div className="posting-container">
                    <button className="post-open" onClick={handleCreateToggle}>Create Post</button>
                
                    <CSSTransition nodeRef={nodeRef} in={showCreatePost} timeout={1000} classNames="fade" unmountOnExit>
                        <div ref={nodeRef}>
                            {user ? (
                                <CreatePost user={user}/>
                            ) : (
                                <CreatePost />
                            )}
                            
                        </div>   
                    </CSSTransition>
                
                    </div>
                    <div className="post-feed">
                        <FilterBy data={data}/>
                    </div>
                </div>
            }
            {activeTab === 3 &&
                <div className="post-feed">

                    <h1>Bookmarked Posts</h1>
                    <FilterBy data={data}/>
                </div>
            }
            
        </div>
    )
    return content;
}