import React from "react";
import "./style.css";


function handleSubmit(e) {
  e.preventDefault;
  alert("You have logged in");
}


export const Index = () => {
  return (
    <div className="index">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <form onSubmit={handleSubmit}>
          <div className="overlap">
            <input className="input" placeholder="E-mail" type="Email" required/>
          </div>
          <div className="password-wrapper">
            <input className="input" placeholder="password" type="password" required/>
          </div>
          <div className="text-wrapper">Login here</div>
          <div><button type="submit" class="btn">Login</button></div>
          </form>
          
        </div>
      </div>
    </div>
  );
};



