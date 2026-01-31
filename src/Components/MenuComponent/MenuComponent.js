import React, { useState } from "react";
import DashboardIcon from "../../Assets/dashboard-icon.png";
import BudgetIcon from "../../Assets/budget-icon.png";
import LogoutIcon from "../../Assets/logout-icon.png";
import UserIcon from "../../Assets/adduser-icon.png";
import InventoryIcon from "../../Assets/inventory-icon.png";
import PopUpComponent from "../PopUp/PopUpComponent";
import { useNavigate } from "react-router-dom";
import CloseLogo from "../../Assets/close_icon.png";
import Cookies from "js-cookie";
import "./MenuComponent.css";

const MenuComponent = ({ setMenu, menu }) => {
  const navigate = useNavigate();

  const [code, setCode] = useState();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
    Cookies.remove("loginCookie");
  };

  const pickMenu = (data, slug) => {
    if (data) {
      navigate(`/${data}`);
      setMenu(data);
    }
  };

  return (
    <>
      <div className="show-menu-mobile hide-menu-desktop">
        <div
          style={{
            display: "flex",
            overflow: "auto",
            alignItems: "center",
            background: "white",
          }}
        >
          <img
            src={DashboardIcon}
            className={
              menu === "kasir" ? "img-menu-mobile-active" : "img-menu-mobile"
            }
            onClick={() => pickMenu("kasir", "/kasir")}
          />
          <img
            className={
              menu === "stok" ? "img-menu-mobile-active" : "img-menu-mobile"
            }
            onClick={() => pickMenu("stok", "/stok")}
            src={InventoryIcon}
          />
          <img
            className={
              menu === "user" ? "img-menu-mobile-active" : "img-menu-mobile"
            }
            onClick={() => pickMenu("user", "/user")}
            src={UserIcon}
          />

          <img
            style={{
              width: "24px",
              height: "24px",
              margin: "12px 12px 12px 36px",
            }}
            src={LogoutIcon}
            onClick={() => handleLogout()}
          />
        </div>
      </div>
      <div
        className="hide-menu-mobile"
        style={{
          borderRight: "1px solid #f4f4f4",
          width: "136px",
          minHeight: "100vh",
          position: "fixed",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p>Tenar</p>
        </div>
        <div>
          <div>
            <div
              className="wrapper-menu-component"
              onClick={() => pickMenu("kasir", "/kasir")}
            >
              <label
                className={
                  menu === "kasir" ? "menu-marker" : "display-none-menu"
                }
              >
                a
              </label>
              <img
                className={
                  menu === "kasir"
                    ? "img-menu-component img-menu-active"
                    : "img-menu-component"
                }
                src={DashboardIcon}
              />
              <p className={menu === "kasir" ? "menu-active" : "menu"}>Kasir</p>
            </div>
          </div>
          <div
            className="wrapper-menu-component"
            onClick={() => pickMenu("stok", "/stok")}
          >
            <label
              className={menu === "stok" ? "menu-marker" : "display-none-menu"}
            >
              a
            </label>
            <img
              className={
                menu === "stok"
                  ? "img-menu-component img-menu-active"
                  : "img-menu-component"
              }
              src={InventoryIcon}
            />
            <p className={menu === "stok" ? "menu-active" : "menu"}>Stok</p>
          </div>
          <div
            className="wrapper-menu-component"
            onClick={() => pickMenu("user", "/user")}
          >
            <label
              className={menu === "user" ? "menu-marker" : "display-none-menu"}
            >
              a
            </label>
            <img
              className={
                menu === "user"
                  ? "img-menu-component img-menu-active"
                  : "img-menu-component"
              }
              src={UserIcon}
            />
            <p className={menu === "user" ? "menu-active" : "menu"}>User</p>
          </div>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div
            className="wrapper-menu-component"
            onClick={() => handleLogout()}
          >
            <img className="img-menu-component " src={LogoutIcon} />
            <p style={{ margin: "0" }}>Log Out</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default MenuComponent;
