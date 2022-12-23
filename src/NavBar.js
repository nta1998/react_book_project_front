import {Link} from "react-router-dom";
import React from 'react';

const NavBar = () => {
    return (
         <nav className="navbar navbar-dark bg-dark" >
         <div className="container-fluid">
        
           <Link className="navbar-brand" to='/'><ion-icon name="book-outline"></ion-icon>Management of the bookstore</Link>
     
           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
             <span className="navbar-toggler-icon"></span>
           </button>
           <div className="collapse navbar-collapse" id="navbarNav">
             <ul className="navbar-nav">
               <li className="nav-item">
               <Link className="nav-link" to='/'>Books</Link>
               </li>
               <li className="nav-item">
               <Link className="nav-link" to='/Coustomers'>Customers</Link>
               </li>
               <li className="nav-item">
               <Link className="nav-link" to='/Loans'>Loans</Link>
               </li>
             </ul>
           </div>
         </div>
       </nav>
    )
}

export default NavBar