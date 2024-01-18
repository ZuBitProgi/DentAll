import React from "react";
import "./style.css";
import HoteliLista from "./HoteliLista";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

let shouldNavigate = false

export const Index = () => {

  

  let navigate = useNavigate()
  const [role, setRole] = useState("")

  function clearForm() {
    document.getElementById("username").value = ""
    document.getElementById("password").value = ""
    setRole("")
    document.getElementById("user_admin").checked = false
    document.getElementById("sleep_admin").checked = false
    document.getElementById("transport_admin").checked = false
  
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({"username": document.getElementById("username").value, "password": document.getElementById("password").value, "role": role})
    })

    let resData = await response.json();
    let token = resData["accessToken"];
    let prefix = resData["tokenType"];

    localStorage.setItem("token", prefix + token);
    
    if (response.status !== 200) {
      document.getElementById("error-text").className = "error-text"
      clearForm()
    } else {
      if (role === "user_admin") {
        navigate("/users", {state: {username: document.getElementById("username").value}})
      } else if (role === "sleep_admin") {
        navigate("/housing", {state: {username: document.getElementById("username").value}})
      } else {
        navigate("/transport", {state: {username: document.getElementById("username").value}})
      }
    }
  }
  
  return (
    <div className="index">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <form onSubmit={(e) => handleSubmit(e, role)} >

            <div className="text-wrapper">Login here</div>
            <p id="error-text" className="error-text hidden">Invalid username, password or role</p>
            <div className="overlap">
              <input id="username" className="input" placeholder="Username..." type="username" required/>
            </div>
            <div className="password-wrapper">
              <input id="password" className="input" placeholder="Password..." type="password" required/>
            </div>
            <div className="radio">
              <div className='check-label-text'>
                <label htmlFor="user_admin" className="label-text">Korisnički Admin</label>
                <input type="radio" className="check-box-input" name="user_admin" id="user_admin" checked={role === "user_admin"} onChange={() => setRole("user_admin")}/>
              </div>
              <div className='check-label-text'>
                <label htmlFor="user_admin" className="label-text">Smještajni Admin</label>
                <input type="radio" className="check-box-input" name="sleep_admin" id="sleep_admin" checked={role === "sleep_admin"} onChange={() => setRole("sleep_admin")}/>
              </div>
              <div className='check-label-text'>
                <label htmlFor="user_admin" className="label-text">Prijevoznički Admin</label>
                <input type="radio" className="check-box-input" name="transport_admin" id="transport_admin" checked={role === "transport_admin"} onChange={() => setRole("transport_admin")}/>
              </div>
            </div>
            <div className="buttonContainer"><button type="submit" className="btn">Login</button></div>
          </form>
          
        </div>
      </div>
      {/*<HoteliLista hoteli={hoteli}/>*/}
    </div>
  );
};



