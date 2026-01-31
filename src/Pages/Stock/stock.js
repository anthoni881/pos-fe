import React, { useState, useRef, useEffect } from "react";
import MenuComponent from "../../Components/MenuComponent/MenuComponent";
import PopUpComponent from "../../Components/PopUp/PopUpComponent";
import { useStock } from "./useStock";
import { formatDot } from "../../util/helperFunction";
import EditLogo from "../../Assets/editLogo.png";
import BarcodeLogo from "../../Assets/barcode-icon.png";
import DeleteIcon from "../../Assets/delete_icon.png";
import RefreshIcon from "../../Assets/refresh-icon.png";
import Select from "react-select";
import { ComponentBarcodeToPrint } from "../../Components/ComponentBarcodeToPrint/ComponentBarcodeToPrint";
import axios from "axios";
import * as XLSX from "xlsx";
import "./stock.css";

const Stock = () => {
  const {
    dataUser,
    popUpNewProduk,
    setPopUpNewProduk,
    name,
    setName,
    kode,
    setKode,
    stok,
    setStok,
    harga,
    setHarga,
    toko,
    setToko,
    handleKirimNewProduk,
    isDisabled,
    setIsDisabled,
    filterSearch,
    setFilterSearch,
    dataTemp,
    handleCloseAddNewProduk,
    popUpEditProduk,
    setPopUpEditProduk,
    editName,
    setEditName,
    editKode,
    setEditKode,
    editStok,
    setEditStok,
    editHarga,
    setEditHarga,
    handlePickEdit,
    handleKirimEdit,
    handleCloseEditProduk,

    popUpDelete,
    setPopUpDelete,
    setPickDelete,
    handleDeleteStock,
    setIsReload,
    subMenu,
    setSubMenu,
    statusBarang,
    setStatusBarang,

    namaBarangPickTemp,
    setNamaBarangPickTemp,
    namaBarangTemp,
    setNamaBarangTemp,
    kodeTemp,
    setKodeTemp,
    hargaTemp,
    setHargaTemp,
    tokoTemp,
    setTokoTemp,
    jumlahTemp,
    setJumlahTemp,
    handleChangeBlockDot,
    isDisabledBelanja,
    setIsDisabledBelanja,
    errBelanja,
    handleKirimBelanja,
    reFormat,
    setIsReloadBelanja,
    filterToko,
    setFilterToko,
    dataFilterToko,
    printFn,
    componentRef,
    filterDateBelanja,
    setFilterDateBelanja,
    dataPrintBarcode,
  } = useStock();

  const [menu, setMenu] = useState("stok");
  const [file, setFile] = useState(null);
  const [visibleProdukCount, setVisibleProdukCount] = useState(30);
  const [isLoadingMoreProduk, setIsLoadingMoreProduk] = useState(false);
  const loadMoreProdukTimeoutRef = useRef(null);
  const produkTableWrapperRef = useRef(null);

  useEffect(() => {
    setVisibleProdukCount(30);
    setIsLoadingMoreProduk(false);
    if (loadMoreProdukTimeoutRef.current) {
      clearTimeout(loadMoreProdukTimeoutRef.current);
      loadMoreProdukTimeoutRef.current = null;
    }
  }, [filterSearch, dataTemp?.length]);

  useEffect(() => {
    return () => {
      if (loadMoreProdukTimeoutRef.current) {
        clearTimeout(loadMoreProdukTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const el = produkTableWrapperRef.current;
    if (!el) return;
    if (!dataTemp || dataTemp.length === 0) return;
    if (visibleProdukCount >= dataTemp.length) return;

    const isScrollable = el.scrollHeight > el.clientHeight + 1;
    if (isScrollable) return;

    setVisibleProdukCount((prev) => Math.min(prev + 30, dataTemp.length));
  }, [dataTemp?.length, visibleProdukCount]);

  const data = [
    {
      kode: "123",
      nama: "BUKU TULIS",
      price: 10000,
    },
    {
      kode: "123",
      nama: "BUKU TULIS",
      price: 10000,
    },
    {
      kode: "123",
      nama: "BUKU TULIS",
      price: 10000,
    },
    {
      kode: "123",
      nama: "BUKU TULIS",
      price: 10000,
    },
    {
      kode: "123",
      nama: "BUKU TULIS",
      price: 10000,
    },
  ];

  const handleConvert = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        await axios.post(
          `${process.env.REACT_APP_ENDPOINT}/bulkUploadStock`,
          { data: json },
          {
            headers: {
              Authorization: `Bearer ${dataUser.auth}`,
            },
          }
        );
      };
      reader.readAsBinaryString(file);
    }
  };

  return (
    <>
      <MenuComponent setMenu={setMenu} menu={menu} />
      {popUpDelete ? (
        <PopUpComponent>
          <p>Apakah Kamu Yakin ingin menghapus produk ini?</p>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button
              onClick={() => setPopUpDelete(false)}
              style={{ marginRight: "12px", background: "red" }}
              className="button-popUp-stock"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDeleteStock()}
              className="button-popUp-stock"
              style={{ background: "green" }}
            >
              Hapus
            </button>
          </div>
        </PopUpComponent>
      ) : (
        ""
      )}
      {popUpNewProduk ? (
        <PopUpComponent>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ marginRight: "12px" }}>
              <p style={{ margin: "12px 0" }}>
                Nama Produk <label style={{ color: "red" }}>*</label>
              </p>
              <input
                type="text"
                style={{ height: "24px" }}
                placeholder="Nama Produk"
                value={name}
                onChange={(e) => setName(e.target.value.toUpperCase())}
              />
            </div>
            <div style={{ marginRight: "12px" }}>
              <p style={{ margin: "12px 0" }}>
                Kode <label style={{ color: "red" }}>*</label>
              </p>
              <input
                placeholder="Kode Produk"
                type="text"
                style={{ height: "24px" }}
                value={kode}
                onChange={(e) => setKode(e.target.value.toUpperCase())}
              />
            </div>
            <div style={{ marginRight: "12px" }}>
              <p style={{ margin: "12px 0" }}>Stok</p>
              <input
                type="number"
                style={{ height: "24px" }}
                placeholder="Stok (1000)"
                value={stok}
                onChange={(e) => setStok(e.target.value)}
              />
            </div>
            <div style={{ marginRight: "12px" }}>
              <p style={{ margin: "12px 0" }}>
                Harga <label style={{ color: "red" }}>*</label>
              </p>
              <input
                type="text"
                placeholder="Harga"
                style={{ height: "24px" }}
                value={formatDot(harga)}
                onChange={(e) => handleChangeBlockDot(e, setHarga)}
              />
            </div>
            <div
              style={{
                marginRight: "12px",
                display: "flex",
                alignItems: "end",
              }}
            >
              <div
                style={{
                  marginRight: "12px",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setToko("Tenar")}
              >
                <input
                  style={{
                    cursor: "pointer",
                  }}
                  type="radio"
                  checked={toko === "Tenar"}
                />
                <label
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Tenar
                </label>
              </div>
              <div
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => setToko("TigaHarga")}
              >
                <input
                  style={{
                    cursor: "pointer",
                  }}
                  type="radio"
                  checked={toko === "TigaHarga"}
                />
                <label
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Tiga Harga
                </label>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button
              onClick={() => handleCloseAddNewProduk()}
              style={{ marginRight: "12px", background: "red" }}
              className="button-popUp-stock"
            >
              Cancel
            </button>
            <button
              disabled={isDisabled}
              onClick={() => {
                setIsDisabled(true);
                handleKirimNewProduk();
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
      {popUpEditProduk ? (
        <PopUpComponent>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ marginRight: "12px" }}>
              <p style={{ margin: "12px 0" }}>
                Nama Produk <label style={{ color: "red" }}>*</label>
              </p>
              <input
                type="text"
                style={{ height: "24px" }}
                placeholder="Nama Produk"
                value={editName}
                onChange={(e) => setEditName(e.target.value.toUpperCase())}
              />
            </div>
            <div style={{ marginRight: "12px" }}>
              <p style={{ margin: "12px 0" }}>
                Kode <label style={{ color: "red" }}>*</label>
              </p>
              <input
                placeholder="Kode Produk"
                type="text"
                style={{ height: "24px" }}
                value={editKode}
                onChange={(e) => setEditKode(e.target.value.toUpperCase())}
              />
            </div>
            <div style={{ marginRight: "12px" }}>
              <p style={{ margin: "12px 0" }}>Stok</p>
              <input
                type="number"
                style={{ height: "24px" }}
                placeholder="Stok (1000)"
                value={editStok}
                onChange={(e) => setEditStok(e.target.value)}
              />
            </div>
            <div style={{ marginRight: "12px" }}>
              <p style={{ margin: "12px 0" }}>
                Harga <label style={{ color: "red" }}>*</label>
              </p>
              <input
                type="text"
                placeholder="Harga"
                style={{ height: "24px" }}
                value={formatDot(editHarga)}
                onChange={(e) => handleChangeBlockDot(e, setEditHarga)}
              />
            </div>
            <div
              style={{
                marginRight: "12px",
                display: "flex",
                alignItems: "end",
              }}
            >
              <div
                style={{
                  marginRight: "12px",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => setToko("Tenar")}
              >
                <input
                  style={{
                    cursor: "pointer",
                  }}
                  type="radio"
                  checked={toko === "Tenar"}
                />
                <label
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Tenar
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => setToko("TigaHarga")}
              >
                <input
                  style={{
                    cursor: "pointer",
                  }}
                  type="radio"
                  checked={toko === "TigaHarga"}
                />
                <label
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Tiga Harga
                </label>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button
              onClick={() => handleCloseEditProduk()}
              style={{ marginRight: "12px", background: "red" }}
              className="button-popUp-stock"
            >
              Cancel
            </button>
            <button
              disabled={isDisabled}
              onClick={() => {
                setIsDisabled(true);
                handleKirimEdit();
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
      <div className="container-stock">
        {dataUser.role === "god_mode" ? (
          <div className="wrapper-sub-menu-kasir">
            <p
              className={subMenu === "stock" ? "submenu-active" : ""}
              style={{ margin: 0, cursor: "pointer" }}
              onClick={() => setSubMenu("stock")}
            >
              Stock
            </p>
            <p
              style={{ margin: 0, cursor: "pointer" }}
              className={subMenu === "belanja" ? "submenu-active" : ""}
              onClick={() => setSubMenu("belanja")}
            >
              Belanja
            </p>
          </div>
        ) : (
          ""
        )}
        {subMenu === "stock" ? (
          <>
            {/* <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                margin: "12px 12px 0 0",
              }}
            >
              <input
                type="file"
                accept=".xls,.xlsx"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ cursor: "pointer", width: "25%", marginRight: "6px" }}
              />
              <button
                style={{
                  cursor: "pointer",
                  padding: "12px",
                  cursor: "pointer",
                  background: "gold",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "bold",
                }}
                onClick={handleConvert}
              >
                IMPORT
              </button>
            </div> */}
            <div className="wrapper-search-bar">
              <div style={{ padding: "0 12px", width: "80%" }}>
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
              <div style={{ padding: "0 12px" }}>
                <label
                  style={{ marginLeft: "-32px", height: "36px" }}
                  className="button-add-new-item"
                  onClick={() => setPopUpNewProduk(true)}
                >
                  New Produk
                </label>
              </div>
            </div>

            <div>
              <div className="flex-center-stock">
                <p style={{ fontWeight: "550", margin: "24px 12px" }}>
                  List Produk
                </p>
                <img
                  src={RefreshIcon}
                  className="refresh-button"
                  onClick={() => setIsReload(true)}
                />
              </div>
              <div
                className="wrapper-table-kasir"
                ref={produkTableWrapperRef}
                style={{ height: "70vh" }}
                onScroll={(e) => {
                  const el = e.currentTarget;
                  const isScrollable = el.scrollHeight > el.clientHeight + 1;
                  const isNearBottom =
                    el.scrollHeight - (el.scrollTop + el.clientHeight) < 200;

                  if (!isScrollable) return;
                  if (!isNearBottom) return;
                  if (!dataTemp || dataTemp.length === 0) return;
                  if (visibleProdukCount >= dataTemp.length) return;
                  if (isLoadingMoreProduk) return;

                  setIsLoadingMoreProduk(true);
                  loadMoreProdukTimeoutRef.current = setTimeout(() => {
                    setVisibleProdukCount((prev) =>
                      Math.min(prev + 30, dataTemp.length)
                    );
                    setIsLoadingMoreProduk(false);
                    loadMoreProdukTimeoutRef.current = null;
                  }, 120);
                }}
              >
                <table
                  className="font10-mobile-bpb"
                  style={{ width: "100%", borderSpacing: 0 }}
                >
                  <tr style={{ textAlign: "left" }}>
                    <th style={{ padding: "12px 0 12px 12px" }}>No.</th>
                    <th style={{ padding: "12px 0 12px 12px" }}>Produk</th>
                    <th style={{ padding: "12px 0 12px 12px" }}>Kode</th>
                    <th style={{ padding: "12px 0 12px 12px" }}>Stok</th>
                    <th style={{ padding: "12px 0 12px 12px" }}>Harga</th>
                    <th style={{ padding: "12px 0 12px 12px" }}>Toko</th>
                    <th style={{ padding: "12px 0 12px 12px" }}></th>
                    <th style={{ padding: "12px 0 12px 12px" }}></th>
                    <th style={{ padding: "12px 0 12px 12px" }}></th>
                  </tr>
                  {dataTemp &&
                    dataTemp.slice(0, visibleProdukCount).map((ele, index) => {
                      return (
                        <tr
                          key={ele?.id ?? ele?.kode ?? index}
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
                    })}
                  {dataTemp && dataTemp.length > visibleProdukCount && (
                    <tr>
                      <td
                        colSpan={9}
                        style={{
                          padding: "12px",
                          textAlign: "center",
                          color: "#666",
                        }}
                      >
                        {isLoadingMoreProduk
                          ? "Loading..."
                          : "Scroll untuk load lebih banyak"}
                      </td>
                    </tr>
                  )}
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            <button onClick={() => printFn()}>Print</button>
            {/* <div
            style={{
              visibility: "hidden",
              top: "-9999px",
              position: "absolute",
            }}
            > */}
            <ComponentBarcodeToPrint
              ref={componentRef}
              data={data}
              // data={dataPrintBarcode && dataPrintBarcode}
            />
            {/* </div> */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "end",
                padding: "0 12px",
              }}
            >
              <div style={{ marginRight: "12px" }}>
                <p style={{ marginLeft: "6px", fontWeight: "550" }}>
                  Status Barang
                </p>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "12px",
                    }}
                    onClick={() => setStatusBarang("ada")}
                  >
                    <input
                      style={{ cursor: "pointer" }}
                      type="radio"
                      checked={statusBarang === "ada"}
                    />
                    <label style={{ cursor: "pointer" }}>Sudah Ada</label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => setStatusBarang("belum")}
                  >
                    <input
                      style={{ cursor: "pointer" }}
                      type="radio"
                      checked={statusBarang === "belum"}
                    />
                    <label style={{ cursor: "pointer" }}>Belum Ada</label>
                  </div>
                </div>
              </div>

              {statusBarang === "ada" ? (
                <div style={{ marginRight: "12px", width: "284px" }}>
                  <p
                    style={
                      errBelanja
                        ? { color: "red", fontWeight: "550" }
                        : { fontWeight: "550" }
                    }
                  >
                    Nama Barang
                  </p>
                  <Select
                    placeholder="Pilih Barang"
                    options={reFormat}
                    value={namaBarangPickTemp || ""}
                    onChange={setNamaBarangPickTemp}
                  />
                </div>
              ) : (
                <div style={{ display: "flex", marginRight: "12px" }}>
                  <div style={{ marginRight: "12px" }}>
                    <p
                      style={
                        errBelanja
                          ? { color: "red", fontWeight: "550" }
                          : { fontWeight: "550" }
                      }
                    >
                      Nama Barang
                    </p>
                    <input
                      type="text"
                      placeholder="Nama Barang"
                      value={namaBarangTemp ? namaBarangTemp : ""}
                      className="input-belanja-text"
                      style={
                        errBelanja
                          ? {
                              border: "1px solid red",
                            }
                          : {
                              border: "1px solid black",
                            }
                      }
                      onChange={(e) =>
                        setNamaBarangTemp(e && e.target.value.toUpperCase())
                      }
                    />
                  </div>
                  <div style={{ marginRight: "12px" }}>
                    <p
                      style={
                        errBelanja
                          ? { color: "red", fontWeight: "550" }
                          : { fontWeight: "550" }
                      }
                    >
                      Kode
                    </p>
                    <input
                      type="number"
                      placeholder="Kode (Number)"
                      value={kodeTemp ? kodeTemp : ""}
                      className="input-belanja-text"
                      style={
                        errBelanja
                          ? {
                              border: "1px solid red",
                            }
                          : {
                              border: "1px solid black",
                            }
                      }
                      onChange={(e) => setKodeTemp(e && e.target.value)}
                    />
                  </div>
                  <div style={{ marginRight: "12px" }}>
                    <p
                      style={
                        errBelanja
                          ? { color: "red", fontWeight: "550" }
                          : { fontWeight: "550" }
                      }
                    >
                      Harga
                    </p>
                    <input
                      type="text"
                      placeholder="Harga (Number)"
                      className="input-belanja-text"
                      style={
                        errBelanja
                          ? {
                              border: "1px solid red",
                            }
                          : {
                              border: "1px solid black",
                            }
                      }
                      value={hargaTemp ? formatDot(hargaTemp) : ""}
                      onChange={(e) => handleChangeBlockDot(e, setHargaTemp)}
                    />
                  </div>
                  <div>
                    <p style={{ marginLeft: "6px", fontWeight: "550" }}>Toko</p>
                    <div style={{ display: "flex", alignItems: "end" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginRight: "12px",
                        }}
                        onClick={() => setTokoTemp("TigaHarga")}
                      >
                        <input
                          style={{ cursor: "pointer" }}
                          type="radio"
                          checked={tokoTemp === "TigaHarga"}
                        />
                        <label style={{ cursor: "pointer" }}>TIGA HARGA</label>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                        onClick={() => setTokoTemp("Tenar")}
                      >
                        <input
                          style={{ cursor: "pointer" }}
                          type="radio"
                          checked={tokoTemp === "Tenar"}
                        />
                        <label style={{ cursor: "pointer" }}>TENAR</label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div style={{ marginRight: "12px" }}>
                <p
                  style={
                    errBelanja
                      ? { color: "red", fontWeight: "550" }
                      : { fontWeight: "550" }
                  }
                >
                  Qty (Pcs)
                </p>
                <input
                  type="text"
                  placeholder="Qty (Number)"
                  value={jumlahTemp ? formatDot(jumlahTemp) : ""}
                  className="input-belanja-text"
                  style={
                    errBelanja
                      ? {
                          border: "1px solid red",
                        }
                      : {
                          border: "1px solid black",
                        }
                  }
                  onChange={(e) => handleChangeBlockDot(e, setJumlahTemp)}
                />
              </div>

              <button
                className="button-kirim-belanja"
                onClick={() => {
                  setIsDisabledBelanja(true);
                  handleKirimBelanja();
                }}
              >
                Kirim
              </button>
            </div>

            <div className="flex-center-stock">
              <div>
                <input
                  type="date"
                  value={filterDateBelanja}
                  onChange={(e) => setFilterDateBelanja(e.target.value)}
                  style={{ margin: "24px 12px 12px 12px", height: "24px" }}
                />
                <select
                  style={{
                    height: "29px",
                    outline: "none",
                    cursor: "pointer",
                    marginRight: "12px",
                  }}
                  onChange={(e) => setFilterToko(e.target.value)}
                  value={filterToko ? filterToko : "Pilih Toko"}
                >
                  <option selected disabled>
                    Pilih Toko
                  </option>
                  <option value="TigaHarga">Tiga Harga</option>
                  <option value="Tenar">Tenar</option>
                </select>
                <button
                  className="reset-button"
                  onClick={() => setFilterToko("Pilih Toko")}
                >
                  Reset
                </button>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={BarcodeLogo}
                  onClick={() => printFn()}
                  style={{
                    width: "32px",
                    cursor: "pointer",
                    marginRight: "24px",
                  }}
                />
                <img
                  src={RefreshIcon}
                  className="refresh-button"
                  onClick={() => setIsReloadBelanja(true)}
                />
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
                  <th style={{ padding: "12px 0 12px 12px" }}>Harga</th>
                  <th style={{ padding: "12px 0 12px 12px" }}>Qty</th>
                  <th style={{ padding: "12px 0 12px 12px" }}>Toko</th>
                  <th style={{ padding: "12px 0 12px 12px" }}></th>
                </tr>
                {dataFilterToko &&
                  dataFilterToko.map((ele, index) => {
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
                          Rp. {formatDot(ele.price)}
                        </td>
                        <td style={{ padding: "12px 0px 12px 12px" }}>
                          {formatDot(ele.qty)} Pcs
                        </td>
                        <td style={{ padding: "12px 0px 12px 12px" }}>
                          {ele.toko}
                        </td>
                        <td style={{ padding: "12px 0px 12px 12px" }}>
                          {ele.kasir}
                        </td>
                        <td style={{ padding: "12px 0px 12px 12px" }}></td>
                      </tr>
                    );
                  })}
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Stock;
