import React from 'react';
import { TiSocialPinterestCircular } from "react-icons/ti";
import { Link } from "react-router-dom";
import "./Home.scss";
import heroImg from "../../assets/inv-img.png";
import {ShowOnLogin, ShowOnLogout} from "../../components/protect/HiddenLink";

const Home = () => {
  return (
    <div className="home">
      <nav className="contianer --flex-between">
        <div className="logo">
          <TiSocialPinterestCircular size={35}/>
        </div>
        <ul className="home-links">
          <ShowOnLogout>
          <li>
            <Link to={"/register"}>Register</Link>
          </li>
          </ShowOnLogout>
          <ShowOnLogout>
          <li>
            <button className="--btn --btn-primary">
              <Link to={"/login"}>Login</Link>
            </button>
          </li>
          </ShowOnLogout>
          <ShowOnLogin>
          <li>
            <button className="--btn --btn-primary">
              <Link to={"/dashboard"}>Dashboard</Link>
            </button>
          </li>
          </ShowOnLogin>
        </ul>
      </nav>
      {/*HERO SECTION*/}
      <section className="container hero">
        <div className="hero-text">
          <h2>Inventory and Stock
            Management
            Solution
          </h2>
          <p>Inventory System to control and manage products
            in the warehouse in real time and integrated to make
            it easier to develop your business.
          </p>
          <button className="--btn --btn-secondary">
              <Link to={"/dashboard"}>Free Trial 1 Month</Link>
            </button>
            <div className="--flex-start">
              <NumberText num = "15K" text="Brand Owners"/>
              <NumberText num = "23K" text="Active Users"/>
              <NumberText num = "500+" text="Partners"/>
            </div>
        </div>
        <div className="hero-image">
          <img src={heroImg} alt="Inventory" />
        </div>
      </section>
    </div>
  );
};

const NumberText = ({num, text}) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  )
}

export default Home