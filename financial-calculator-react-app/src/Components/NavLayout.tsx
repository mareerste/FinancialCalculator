import React, { useEffect, useState } from "react";
import logo from "../Images/logo.png";
import { User } from "../Data/interface.ts";
import {
  userComponents,
  moderatorComponents,
  role,
  UserRole,
} from "../Data/data.ts";
import { useNavigate } from "react-router-dom";
import { WhoAmI } from "../Services/AuthService.ts";

const NavLayout = ({ body }) => {
  const logOut = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const [loggedUser, setLoggedUser] = useState<User>(null);
  const [IsModerator, setIsModerator] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem(role) === UserRole.Moderator)
      setIsModerator(true);
    WhoAmI()
      .then((res) => {
        setLoggedUser(res);
      })
      .catch((err) => console.log(err));
  }, []);
  const changeUser = (user: User) => {
    setLoggedUser(user);
  };

  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-warning ">
        <img
          src={logo}
          alt={"FC"}
          className="img-fluid logo-with-border"
          style={{ maxHeight: "8vh", marginLeft: "5%", marginRight: "5%" }}
        ></img>

        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            {userComponents.map((component) => {
              return (
                <li className="nav-item h3" key={component.name}>
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
            {IsModerator &&
              moderatorComponents.map((component) => {
                return (
                  <li className="nav-item h3" key={component.name}>
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
            style={{
              marginLeft: "auto",
              marginRight: "5%",
              fontSize: "30px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <li className="nav-item h3" style={{ display: "flex" }}>
              <a
                className="nav-link"
                role="button"
                onClick={() => console.log("not implemented")}
              >
                {loggedUser?.username}
              </a>
            </li>
            <li className="nav-item h3" style={{ display: "flex" }}>
              <a className="nav-link" role="button" onClick={logOut}>
                Sign Out
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <section className="background bg-body-color h-max flex-column justify-content-center align-items-center d-flex">
        {body ? React.cloneElement(body, { loggedUser, changeUser }) : null}
      </section>
    </>
  );
};

export default NavLayout;
