import React, { useState } from "react";
import PopUpComponent from "../../Components/PopUp/PopUpComponent";
import MenuComponent from "../../Components/MenuComponent/MenuComponent";
import { formatDot } from "../../util/helperFunction";
import DeleteIcon from "../../Assets/delete_icon.png";
import TrolleyIcon from "../../Assets/trolley-icon.png";
import moment from "moment";
import RefreshIcon from "../../Assets/refresh-icon.png";

import { ComponentToPrint } from "../../Components/ComponentToPrint/ComponentToPrint";

import "./kasir.css";
import { useKasir } from "./useKasir";

const Kasir = () => {
  const {
    dataUser,
    handleTambahItem,
    keranjang,
    handleIncreaseItem,
    handleDecreaseItem,
    handleDeleteProdukPick,
    filterSearch,
    setFilterSearch,
    dataTemp,
    popUpBayar,
    setPopUpBayar,
    jenisPembayaran,
    setJenisPembayaran,
    handleFormChangeJumlah,
    handleBayarPrint,
    isDisabled,
    setIsDisabled,
    subMenu,
    setSubMenu,
    filterDateRiwayat,
    setFilterDateRiwayat,
    listRiwayat,
    popUpFinalisasi,
    setPopUpFinalisasi,
    finalisasi,
    setFinalisasi,
    handleCancelFinalisasi,
    isDisabledFinalisasi,
    setIsDisabledFinalisasi,
    handleKirimFinalisasi,
    handleChange,
    pecahanUang,
    handleChangeFinalisasi,
    setIsReload,
    componentRef,
  } = useKasir();

  const [menu, setMenu] = useState("kasir");

  const sumItem =
    keranjang &&
    keranjang.reduce(function (s, a) {
      return s + a.qty;
    }, 0);
  const sumTotal =
    keranjang &&
    keranjang.reduce(function (s, a) {
      let sumPrice = a.qty * a.price;
      return s + sumPrice;
    }, 0);

  const sumTotalRiwayat =
    listRiwayat &&
    listRiwayat.reduce(function (s, a) {
      let sumPrice = a.qty * a.price;
      return s + sumPrice;
    }, 0);

  return (
    <>
      <div
        style={{ visibility: "hidden", top: "-9999px", position: "absolute" }}
      >
        <ComponentToPrint
          ref={componentRef}
          total={sumTotal}
          pecahanUang={pecahanUang}
          kasir={dataUser.name}
          data={keranjang && keranjang}
          tanggal={moment().utcOffset("+0700").format("DD-MM-YYYY, HH:mm:ss")}
        />
      </div>
      <MenuComponent setMenu={setMenu} menu={menu} />
      {popUpFinalisasi ? (
        <PopUpComponent>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ marginRight: "12px" }}>
              <p style={{ margin: "12px 0" }}>
                Jumlah Final <label style={{ color: "red" }}>*</label>
              </p>
              <input
                type="text"
                style={{ height: "24px" }}
                placeholder="Nominal"
                value={formatDot(finalisasi)}
                onChange={(e) => handleChangeFinalisasi(e)}
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button
              onClick={() => handleCancelFinalisasi()}
              style={{ marginRight: "12px", background: "red" }}
              className="button-popUp-stock"
            >
              Cancel
            </button>
            <button
              disabled={isDisabledFinalisasi}
              onClick={() => {
                setIsDisabledFinalisasi(true);
                handleKirimFinalisasi();
              }}
              className="button-popUp-stock"
              style={{ background: "green" }}
            >
              Kirim
            </button>
          </div>
        </PopUpComponent>
      ) : (
        ""
      )}
      <div className="container_kasir" style={{ display: "flex" }}>
        <div style={{ width: "75%", height: "100vh", background: "#fafafa" }}>
          {dataUser.role === "god_mode" ? (
            <div className="wrapper-sub-menu-kasir">
              <p
                className={subMenu === "Input" ? "submenu-active" : ""}
                style={{ margin: 0, cursor: "pointer" }}
                onClick={() => setSubMenu("Input")}
              >
                Input
              </p>
              <p
                style={{ margin: 0, cursor: "pointer" }}
                className={subMenu === "Riwayat" ? "submenu-active" : ""}
                onClick={() => setSubMenu("Riwayat")}
              >
                Riwayat
              </p>
            </div>
          ) : (
            ""
          )}
          {subMenu === "Input" ? (
            <>
              <div
                style={{
                  background: "white",
                  padding: "24px 0",
                }}
              >
                <div style={{ padding: "0 12px" }}>
                  <input
                    type="text"
                    placeholder="Cari Barang"
                    className="search-bar-produk"
                    value={filterSearch}
                    onChange={(e) => setFilterSearch(e.target.value)}
                  />
                  <label
                    style={{ marginLeft: "-32px", height: "36px" }}
                    className="button-tambah-item"
                    onClick={() => setFilterSearch("")}
                  >
                    Reset
                  </label>
                </div>
              </div>
              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p style={{ fontWeight: "550", margin: "24px 12px" }}>
                    List Produk
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "12px",
                    }}
                  >
                    <button
                      className="button-finalisasi"
                      onClick={() => setPopUpFinalisasi(true)}
                    >
                      Finalisasi
                    </button>
                  </div>
                </div>
                <div className="wrapper-table-kasir">
                  <table
                    className="font10-mobile-bpb"
                    style={{ width: "100%", borderSpacing: 0 }}
                  >
                    <tr style={{ textAlign: "left" }}>
                      <th style={{ padding: "12px 0 12px 12px" }}>No.</th>
                      <th style={{ padding: "12px 0 12px 12px" }}>Produk</th>
                      <th style={{ padding: "12px 0 12px 12px" }}>Kode</th>
                      {/* <th style={{ padding: "12px 0 12px 12px" }}>Stok</th> */}
                      <th style={{ padding: "12px 0 12px 12px" }}>Harga</th>
                      <th style={{ padding: "12px 0 12px 12px" }}></th>
                    </tr>
                    {dataTemp &&
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
                            {/* <td style={{ padding: "12px 0px 12px 12px" }}>
                              {formatDot(ele.stock)} Pcs
                            </td> */}
                            <td style={{ padding: "12px 0px 12px 12px" }}>
                              Rp. {formatDot(ele.price)}
                            </td>
                            <td style={{ padding: "12px 0px 12px 12px" }}>
                              <label
                                className="button-tambah-item"
                                onClick={() => handleTambahItem(ele)}
                              >
                                Tambah
                              </label>
                            </td>
                          </tr>
                        );
                      })}
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div>
              <div className="flex-center-kasir">
                <p style={{ fontWeight: "550", margin: "24px 12px" }}>
                  List Transaksi
                </p>
                <img
                  src={RefreshIcon}
                  className="refresh-button"
                  onClick={() => setIsReload(true)}
                />
              </div>
              <div style={{ margin: "0 12px 12px 12px" }}>
                <input
                  style={{ height: "24px" }}
                  type="date"
                  value={filterDateRiwayat}
                  onChange={(e) => setFilterDateRiwayat(e.target.value)}
                />
              </div>
              <div className="wrapper-table-kasir">
                <table
                  className="font10-mobile-bpb"
                  style={{ width: "100%", borderSpacing: 0 }}
                >
                  <tr style={{ textAlign: "left" }}>
                    <th style={{ padding: "12px 0 12px 12px" }}>No.</th>
                    <th style={{ padding: "12px 0 12px 12px" }}>Produk</th>
                    <th style={{ padding: "12px 0 12px 12px" }}>Kode</th>
                    <th style={{ padding: "12px 0 12px 12px" }}>Qty</th>
                    <th style={{ padding: "12px 0 12px 12px" }}>Harga</th>
                    <th style={{ padding: "12px 0 12px 12px" }}>Total</th>
                    {/* <th style={{ padding: "12px 0 12px 12px" }}>Alat</th> */}
                    <th style={{ padding: "12px 0 12px 12px" }}>Jam</th>
                    <th style={{ padding: "12px 0 12px 12px" }}>Kasir</th>
                  </tr>
                  {listRiwayat &&
                    listRiwayat.map((ele, index) => {
                      return (
                        <tr
                          style={
                            index % 2 === 0
                              ? ele.isFinal
                                ? { background: "#d5ead6" }
                                : { background: "white" }
                              : ele.isFinal
                              ? { background: "#bed8c0" }
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
                            {formatDot(ele.qty)} Pcs
                          </td>
                          <td style={{ padding: "12px 0px 12px 12px" }}>
                            Rp. {formatDot(ele.price)}
                          </td>
                          <td style={{ padding: "12px 0px 12px 12px" }}>
                            Rp. {formatDot(ele.price * ele.qty)}
                          </td>
                          {/* <td style={{ padding: "12px 0px 12px 12px" }}>
                            {ele.jenisPembayaran}
                          </td> */}
                          <td style={{ padding: "12px 0px 12px 12px" }}>
                            {moment(ele.timestamp).format("HH:mm:ss")}
                          </td>
                          <td style={{ padding: "12px 0px 12px 12px" }}>
                            {ele.kasir}
                          </td>
                        </tr>
                      );
                    })}
                  <tr
                    style={{
                      background: "#F7F7F7",
                    }}
                  >
                    <td className="padding-td-kasir"></td>
                    <td className="padding-td-kasir"></td>
                    <td className="padding-td-kasir"></td>
                    <td className="padding-td-kasir"></td>
                    <td
                      className="padding-td-kasir"
                      style={{
                        borderBottom: "2px dashed black",
                        borderLeft: "2px dashed black",
                        fontWeight: "600",
                      }}
                    >
                      Grand Total :
                    </td>
                    <td
                      className="padding-td-kasir"
                      style={{
                        borderRight: "2px dashed black",
                        borderBottom: "2px dashed black",
                        borderLeft: "2px dashed black",
                        fontWeight: "600",
                        fontSize: "18px",
                      }}
                    >
                      Rp. {formatDot(sumTotalRiwayat)}
                    </td>
                    <td className="padding-td-kasir"></td>
                    <td
                      className="padding-td-kasir"
                      style={{
                        borderBottom: "2px dashed black",
                        borderLeft: "2px dashed black",
                        fontWeight: "600",
                        color: "red",
                      }}
                    >
                      Selisih :
                    </td>
                    <td
                      className="padding-td-kasir"
                      style={{
                        borderRight: "2px dashed black",
                        borderBottom: "2px dashed black",
                        borderLeft: "2px dashed black",
                        fontWeight: "600",
                        fontSize: "18px",
                        color: "red",
                      }}
                    >
                      Rp. {formatDot(100000)}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="wrapper-mini-bar">
          <div
            style={{
              background: "white",
              borderBottom: "1px solid #f4f4f4",
            }}
          >
            <div style={{ textAlign: "end", margin: "12px" }}>
              Hallo, {dataUser.name}!
            </div>
          </div>
          <div>
            <div className="flex-justify-between-align-center">
              <p style={{ fontWeight: "550", margin: "12px 12px 0 12px" }}>
                Keranjang
              </p>
              <img
                src={TrolleyIcon}
                style={{ width: "24px", margin: "12px 12px 0px 0px" }}
              />
            </div>
            <div className="wrapper-keranjang">
              {keranjang &&
                keranjang.map((obj, index) => {
                  return (
                    <div
                      style={{
                        borderBottom: "1px dashed lightgray",
                        padding: "12px 0",
                      }}
                    >
                      <div className="flex-justify-between-align-center">
                        <p
                          style={{
                            fontWeight: "600",
                            fontSize: "24px",
                            margin: "0",
                          }}
                        >
                          {`${index + 1}. ${obj.name}`}
                        </p>
                        <img
                          src={DeleteIcon}
                          style={{
                            width: "20px",
                            height: "20px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDeleteProdukPick(obj.id)}
                        />
                      </div>
                      <div className="flex-justify-between-align-center">
                        <p style={{ margin: "12px 0", fontSize: "18px" }}>
                          Rp. {formatDot(obj.price)} / Pcs
                        </p>

                        <div>
                          <button
                            className="button_plus"
                            style={{
                              marginRight: "12px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleDecreaseItem(obj)}
                          >
                            &#8722;
                          </button>
                          <input
                            type="number"
                            className="input-qty"
                            value={obj.qty}
                            placeholder="Qty"
                            name="qty"
                            onChange={(e) => handleFormChangeJumlah(index, e)}
                            onWheel={(e) => e.target.blur()}
                          />
                          <button
                            className="button_plus"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleIncreaseItem(obj)}
                          >
                            &#43;
                          </button>
                        </div>
                      </div>
                      <p className="sub-total-item">
                        Sub Total : Rp. {formatDot(obj.qty * obj.price)}
                      </p>
                    </div>
                  );
                })}
            </div>

            <div className="wrapper-footer-kasir">
              <div className="wrapper-total-kasir">
                <label style={{ color: "gray", fontSize: "18px" }}>Item</label>
                <label className="text-total-item">{sumItem}</label>
              </div>
              <div className="wrapper-total-kasir">
                <label style={{ color: "gray", fontSize: "18px" }}>Total</label>
                <label className="total-bayar">Rp. {formatDot(sumTotal)}</label>
              </div>

              <div
                className="wrapper-total-kasir"
                style={{ marginBottom: "4px" }}
              >
                <label style={{ color: "gray", fontSize: "18px" }}>
                  Pecahan Uang
                </label>
                <label className="text-total-item">
                  Rp.{" "}
                  <input
                    style={{
                      height: "20px",
                      width: "84px",
                      fontSize: "18px",
                      outline: "none",
                    }}
                    value={formatDot(pecahanUang)}
                    type="text"
                    onChange={(e) => handleChange(e)}
                  />
                </label>
              </div>
              <div className="wrapper-total-kasir">
                <label style={{ color: "gray", fontSize: "18px" }}>
                  Kembalian
                </label>
                <label className="text-total-item">
                  Rp.{" "}
                  {sumTotal && pecahanUang
                    ? formatDot(pecahanUang - sumTotal)
                    : 0}
                </label>
              </div>

              {/* <div className="wrapper-radio">
                <div
                  className="radio-jenis-pembayaran"
                  style={{ marginRight: "24px" }}
                  onClick={() => setJenisPembayaran("Tunai")}
                >
                  <input
                    type="radio"
                    style={{ cursor: "pointer" }}
                    checked={jenisPembayaran === "Tunai"}
                  />
                  <label style={{ cursor: "pointer" }}>Tunai</label>
                </div>
                <div
                  className="radio-jenis-pembayaran"
                  style={{ marginRight: "24px" }}
                  onClick={() => setJenisPembayaran("Transfer")}
                >
                  <input
                    type="radio"
                    style={{ cursor: "pointer" }}
                    checked={jenisPembayaran === "Transfer"}
                  />
                  <label style={{ cursor: "pointer" }}>Transfer</label>
                </div>
                <div
                  className="radio-jenis-pembayaran"
                  onClick={() => setJenisPembayaran("QRIS")}
                >
                  <input
                    type="radio"
                    style={{ cursor: "pointer" }}
                    checked={jenisPembayaran === "QRIS"}
                  />
                  <label style={{ cursor: "pointer" }}>QRIS</label>
                </div>
              </div> */}
              <div className="wrapper-button-bayar">
                <button
                  className="button-bayar"
                  disabled={isDisabled}
                  onClick={() => {
                    setIsDisabled(true);
                    handleBayarPrint();
                  }}
                >
                  Bayar & Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Kasir;
