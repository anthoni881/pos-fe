import React, { useState, useRef, useCallback, useEffect } from "react";
import MenuComponent from "../../Components/MenuComponent/MenuComponent";
import PopUpComponent from "../../Components/PopUp/PopUpComponent";
import "./user.css";

const User = () => {
  const [menu, setMenu] = useState("user");

  return (
    <>
      <MenuComponent setMenu={setMenu} menu={menu} />
      <div className="container-user">
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
            {/* {dataTemp &&
                dataTemp.map((ele, index) => {
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
                        {ele.kode}
                      </td>
                      <td style={{ padding: "12px 0px 12px 12px" }}>
                        {ele.stock ? formatDot(ele.stock) : 0} Pcs
                      </td>
                      <td style={{ padding: "12px 0px 12px 12px" }}>
                        Rp. {formatDot(ele.price)}
                      </td>
                      <td style={{ padding: "12px 0px 12px 12px" }}>
                        {ele.toko}
                      </td>
                      <td style={{ padding: "12px 0px 12px 12px" }}>
                        <img
                          src={EditLogo}
                          style={{ width: "24px", cursor: "pointer" }}
                          onClick={() => handlePickEdit(ele)}
                        />
                      </td>
                      <td style={{ padding: "12px 0px 12px 12px" }}>
                        <img
                          src={BarcodeLogo}
                          style={{ width: "24px", cursor: "pointer" }}
                        />
                      </td>
                      <td style={{ padding: "12px 0px 12px 12px" }}>
                        <img
                          src={DeleteIcon}
                          style={{
                            width: "24px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setPickDelete(ele);
                            setPopUpDelete(true);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })} */}
          </table>
        </div>
      </div>
    </>
  );
};
export default User;
