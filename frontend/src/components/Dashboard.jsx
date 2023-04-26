import {useState, useRef, useEffect} from "react"

import { CreatePost } from "./CreatePost.jsx";
import { CSSTransition } from "react-transition-group";

import "../styles/Dashboard.css"
import { PostCard } from "./PostCard.jsx";
import { FilterBy } from "./FilterBy.jsx";


export const Dashboard = () => {
    const [user, setUser] = useState({})
    const [allPosts, setPosts] = useState([])

    useEffect(() => {
        const username = localStorage.getItem("username")
        fetch(`https://little-water-7513.fly.dev/get-current-user?username=${username}`, {
            method: "GET",
        })
        .then(response => response.json())
        .then(data => {
            setUser(data)
        })
        .catch(error => console.error(error))

        fetch("https://little-water-7513.fly.dev/get-posts", {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            setPosts(data)
        })
    },[localStorage.getItem("username")])

    const nodeRef = useRef(null)
    const [showCreatePost, setShowCreate] = useState(false)
    const handleCreateToggle = () => {
        setShowCreate(!showCreatePost)
    }
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
            {activeTab === 1 && user &&
                <div className="post-feed">
                    <h1>{user.username}'s' Posts</h1>
                    {user.user_posts?.map((item, index) =>(
                        <div className="post" key={index}>
                            <PostCard data={item} user={user}/>
                        </div>
                    ))}
                </div>
            }
            {activeTab === 2 && user && 
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
                       { user ? 
                       (
                            <FilterBy data={allPosts} user={user}/>
                       ): null
                       }
                    </div>
                </div>
            }
            {activeTab === 3 && user &&
                <div className="post-feed">

                    <h1>Bookmarked Posts</h1>
                    { user ? 
                       (
                            <FilterBy data={allPosts} user={user}/>
                       ): null
                       }
                </div>
            }
            
        </div>
    )
    return content;
}