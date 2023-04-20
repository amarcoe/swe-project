import { Link } from 'react-router-dom';

import '../styles/Home.css'

export const Home = () => {
    const content =  (  
        <div className="home-container">
            <h1>Coffee Logger</h1>

            <div className="info">
                <p className='splash-text'>
                    Your one stop for keeping track of how you like
                    to prepare your coffee.

                </p>
            </div>
            <div className="btn-group">
                <Link className="nav-link" to="/login">
                    <a>Log In</a>
                </Link>
                
                <Link className="nav-link" to="/signup">
                    Sign Up
                </Link>
            </div>
        </div>
    );
    return content

}
 
