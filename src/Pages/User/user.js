import React, { useState } from "react";
import MenuComponent from "../../Components/MenuComponent/MenuComponent";
import "./user.css";
import { useUser } from "./useUser";
import DeleteIcon from "../../Assets/delete_icon.png";

const User = () => {
  const {
    listUser,
    name,
    setName,
    password,
    setPassword,
    role,
    setRole,
    toko,
    setToko,
    handleAddNewuser,
    handleDeleteUser,
  } = useUser();
  const [menu, setMenu] = useState("user");

  return (
    <>
      <MenuComponent setMenu={setMenu} menu={menu} />
      <div className="container-user">
        <div style={{ display: "flex", alignItems: "end" }}>
          <div
            style={{
              padding: "0 12px",
              display: "flex",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <div style={{ marginRight: "12px" }}>
              <p style={{ margin: "6px 0" }}>Nama :</p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </div>
            <div style={{ margin: "12px" }}>
              <p style={{ margin: "6px 0" }}>Password :</p>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <p style={{ margin: "6px 0" }}>Role :</p>
              <div style={{ display: "flex" }}>
                <div
                  className="radio-jenis-pembayaran"
                  style={{ marginRight: "16px" }}
                  onClick={() => setRole("kasir")}
                >
                  <input
                    type="radio"
                    style={{ cursor: "pointer" }}
                    checked={role === "kasir"}
                  />
                  <label style={{ cursor: "pointer" }}>kasir</label>
                </div>
                <div
                  className="radio-jenis-pembayaran"
                  style={{ marginRight: "16px" }}
                  onClick={() => setRole("kepala")}
                >
                  <input
                    type="radio"
                    style={{ cursor: "pointer" }}
                    checked={role === "kepala"}
                  />
                  <label style={{ cursor: "pointer" }}>kepala</label>
                </div>
                <div
                  className="radio-jenis-pembayaran"
                  style={{ marginRight: "16px" }}
                  onClick={() => setRole("god_mode")}
                >
                  <input
                    type="radio"
                    style={{ cursor: "pointer" }}
                    checked={role === "god_mode"}
                  />
                  <label style={{ cursor: "pointer" }}>god</label>
                </div>
              </div>
            </div>
            <div>
              <p style={{ margin: "6px 0" }}>Toko :</p>
              <div style={{ display: "flex" }}>
                <div
                  className="radio-jenis-pembayaran"
                  style={{ marginRight: "16px" }}
                  onClick={() => setToko("Tenar")}
                >
                  <input
                    type="radio"
                    style={{ cursor: "pointer" }}
                    checked={toko === "Tenar"}
                  />
                  <label style={{ cursor: "pointer" }}>Tenar</label>
                </div>
                <div
                  className="radio-jenis-pembayaran"
                  style={{ marginRight: "16px" }}
                  onClick={() => setToko("TigaHarga")}
                >
                  <input
                    type="radio"
                    style={{ cursor: "pointer" }}
                    checked={toko === "TigaHarga"}
                  />
                  <label style={{ cursor: "pointer" }}>TigaHarga</label>
                </div>
              </div>
            </div>
          </div>
          <div style={{ padding: "0 6px" }}>
            <p
              style={{ padding: "12px", background: "red" }}
              className="button-add-new-item"
              onClick={() => handleAddNewuser()}
            >
              Add User
            </p>
          </div>
        </div>
        <div className="wrapper-table-kasir">
          <table
            className="font10-mobile-bpb"
            style={{ width: "100%", borderSpacing: 0 }}
          >
            <tr style={{ textAlign: "left" }}>
              <th style={{ padding: "12px 0 12px 12px" }}>No.</th>
              <th style={{ padding: "12px 0 12px 12px" }}>Nama</th>
              <th style={{ padding: "12px 0 12px 12px" }}>Username</th>
              <th style={{ padding: "12px 0 12px 12px" }}>Password</th>
              <th style={{ padding: "12px 0 12px 12px" }}>Role</th>
              <th style={{ padding: "12px 0 12px 12px" }}>Toko</th>
              <th style={{ padding: "12px 0 12px 12px" }}></th>
            </tr>
            {listUser &&
              listUser.map((ele, index) => {
                return (
                  <tr
                    style={
                      index % 2 === 0
                        ? { background: "white" }
                        : { background: "#F7F7F7" }
                    }
                  >
                    <td
                      style={{
                        padding: "12px 0px 12px 12px",
                      }}
                    >
                      {index + 1}.
                    </td>
                    <td style={{ padding: "12px 0px 12px 12px" }}>
                      {ele.name}
                    </td>
                    <td style={{ padding: "12px 0px 12px 12px" }}>
                      {ele.username}
                    </td>
                    <td style={{ padding: "12px 0px 12px 12px" }}>
                      {ele.password}
                    </td>
                    <td style={{ padding: "12px 0px 12px 12px" }}>
                      {ele.role}
                    </td>
                    <td style={{ padding: "12px 0px 12px 12px" }}>
                      {ele.toko}
                    </td>
                    <td style={{ padding: "12px 0px 12px 12px" }}>
                      <img
                        src={DeleteIcon}
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDeleteUser(ele.id)}
                      />
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    </>
  );
};
export default User;
