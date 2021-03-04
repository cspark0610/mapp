import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { log, success, error } from "./utils/logs";
import axios from "axios";

export const Navbar = () => {
	const { user, login, logout } = useContext(UserContext);

	const history = useHistory();

	console.log(user);

	const handleLogout = async () => {
		log("logout attempt...");
		try {
			await axios.post("http://localhost:8080/api/logout");
			logout();
			success("logged out");
			history.push("/");
		} catch (err) {
			error(console.error(err));
		}
	};

	return (
		<nav className='navbar navbar-dark bg-dark'>
			<div className='container'>
				<Link to='/login' style={{ color: "white" }}>
					<span className='navbar-brand'>
						<h4> Welcome to OMDB</h4>
					</span>
				</Link>
			</div>

			<button className='btn btn-danger' onClick={handleLogout}>
				LogOut
			</button>

			<button className='btn btn-success' onClick={() => login()}>
				<Link to='/login' style={{ color: "white" }}>
					LogIn
				</Link>
			</button>

			<button className='btn btn-primary'>
				<Link to='/register' style={{ color: "white" }}>
					Register
				</Link>
			</button>
		</nav>
	);
};
