import React from "react";
import logo from "../Images/logo.png";
import { userComponents, moderatorComponents } from "../Data/data.ts";
import { useNavigate } from "react-router-dom";

const NavLayout = ({ body }) => {
  const logOut = () => console.log("log out");
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-warning">
        <img
          src={logo}
          className="img-fluid logo-with-border"
          style={{ maxHeight: "8vh", marginLeft: "5%", marginRight: "5%" }}
        ></img>

        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            {userComponents.map((component) => {
              return (
                <li className="nav-item h3">
                  <a
                    className="nav-link"
                    key={component.name}
                    onClick={() => navigate(component.url)}
                    role="button"
                  >
                    {component.name}
                  </a>
                </li>
              );
            })}
            {moderatorComponents.map((component) => {
              return (
                <li className="nav-item h3">
                  <a
                    className="nav-link"
                    key={component.name}
                    onClick={() => navigate(component.url)}
                    role="button"
                  >
                    {component.name}
                  </a>
                </li>
              );
            })}
          </ul>
          <ul
            className="navbar-nav mr-auto"
            style={{ marginLeft: "auto", marginRight: "5%", fontSize: "30px" }}
          >
            <li className="nav-item h3">
              <a className="nav-link" role="button" onClick={logOut}>
                Sign Out
              </a>
            </li>
          </ul>
          {/* <a
            className="nav-item nav-link"
            role="button"
            style={{ marginLeft: "auto", marginRight: "5%", fontSize: "30px" }}
            onClick={logOut}
          >
            Sign Out
          </a> */}
        </div>
      </nav>
      <div className="background bg-body-color h-max">{body}</div>
    </>
  );
};

export default NavLayout;
