import React, {useEffect, useState, useRef} from  "react"
import '../styles/PostCard.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";


export const PostCard = (props) => {
    const nodeRef = useRef(null)
    const data = props.data
    const username = "Chuck"

    const [show, setShow] = useState(false)
    const handleHeaderClick = () => {
        setShow(!show)
    }

    const [bookmarks, setBookmarks] = useState(data.bookmarks)
    const handleBookmarking = () => {

        if(data.usersBookmarked.includes(username)){
            const index = data.usersBookmarked.indexOf(username)
            data.usersBookmarked.splice(index, 1)
            setBookmarks(bookmarks - 1)
        } else{
            data.usersBookmarked.push(username)
            setBookmarks(bookmarks + 1)

        }
    } 
    
   
    function getRoastColor(){
        if(data.roast === "Light"){
            return "#F9EA9A"
        }
        else if(data.roast === "Medium"){
            return "#684E32"
        } else {
            return "#3d2600"
    
        }
    }
    
    const [hasBookmarked, setHasBookmarked] = useState(false)
    useEffect(() => {
        const index = data.usersBookmarked.indexOf(username)
        if (index !== -1){
            setHasBookmarked(true)
        }else {
            setHasBookmarked(false)
        }
    }, [bookmarks])

    const roastColor = getRoastColor(data.roast)
    
    const content = (
        <div className="post-container">
            <div className='post-header' onClick={handleHeaderClick}>
                <div className="post-header-info">
                    <h2>{data.user}</h2>
                </div>
                <div className="post-header-info">
                    <h2>{data.brewer}</h2>
                </div>
                <div className="post-header-info">
                    <div className="dense">
                        <div className="dense-left">
                            <h3>{data.rating} / 5</h3>
                            <h3><FontAwesomeIcon icon={faBookmark} /> {bookmarks}</h3>
                        </div>
                        <div className="box" style={{backgroundColor: getRoastColor()}}></div> 
                    </div>
                </div>
            </div>
            <CSSTransition nodeRef={nodeRef} in={show} timeout={1000} classNames="fade" unmountOnExit>
                <div ref={nodeRef}>
                    
                    <div className="post-body">
                        <div className="post-section">
                            <div className="post-info">
                                <h3>Brewer: {data.brewer}</h3>
                                <h3>Coarseness: {data.coarseness}</h3>
                                <h3>Roast: {data.roast}</h3>
                            </div>
                            <div className="post-info">
                                <h3>Rating: {data.rating} / 5</h3>
                            </div>
                        </div>
                        <div className="post-section">
                            <h3>Recipe</h3>
                            <ol className="recipe">
                                {data.recipe.map((value, index) =>(
                                    <li value={value} key={index}>{value}</li>
                                ))
                                }
                            </ol>
                        </div>
                        <div className="bookmark-container">
                            {
                                hasBookmarked ? 
                                (
                                    <h3><FontAwesomeIcon className="bookmark add" icon={faBookmark}  onClick={handleBookmarking}/></h3>
                                ):
                                (
                                    <FontAwesomeIcon className="bookmark" icon={faBookmark}  onClick={handleBookmarking}/>
                                )
                            }
                            
                        </div>
                    </div>
                    
                </div>
            </CSSTransition>
        </div>
    )
    return content;
}