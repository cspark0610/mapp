import React from 'react';
import {Link} from 'react-router-dom';

export const Header = () => {
    return ( 
        <header>
         <Link to='/'><h3>OMDB</h3></Link>
          <div className="favorites">
            <Link to="/favs">FAVORITES</Link>
          </div>

          <ul className="nav-links">
            <li>
              <Link to="/profile" className="btn btn-success">
                Profile 
              </Link>
            </li>
          </ul>
        
      </header>  

    );
}
 
