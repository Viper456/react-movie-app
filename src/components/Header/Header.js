import React, { useState } from "react";
import { Link } from "react-router-dom";
import user_logo from "../../images/user_logo.png";
import "./Header.scss";
import { useDispatch } from "react-redux";
import { fetchAsyncMovies, fetchAsyncShows } from '../../redux/movies/movieSlice';

const Header = () => {
   const [term, setTerm] = useState("");
   const dispatch = useDispatch();

   const submitHandler = (e) => {
      e.preventDefault();
      if (term === "") return alert("Please, enter search term!");
      dispatch(fetchAsyncMovies(term));
      dispatch(fetchAsyncShows(term));
      setTerm('');
   };

   return (
      <div className="header">
         <div className="logo">
            <Link to="/">React Movie App</Link>
         </div>
         <div className="search-bar">
            <form onSubmit={submitHandler}>
               <input
                  type="text"
                  value={term}
                  placeholder="Search movies or shows here"
                  onChange={(e) => setTerm(e.target.value)}
               />
               <button type='submit'>
                  <i className='fa fa-search'></i>
               </button>
            </form>
         </div>
         <div className="user-image">
            <img src={user_logo} alt="user" />
         </div>
      </div>
   );
};

export default Header;
