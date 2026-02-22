import { useState, useRef, useCallback, useEffect } from "react";
import { postAxios } from "../../util/apiCall";
import { useReactToPrint } from "react-to-print";
import { formatDate } from "../../util/helperFunction";

export const useStock = () => {
  const dataAuth = localStorage.getItem("auth");
  const dataUser = JSON.parse(dataAuth);

  const [popUpNewProduk, setPopUpNewProduk] = useState(false);

  const [name, setName] = useState();
  const [kode, setKode] = useState();
  const [stok, setStok] = useState();
  const [harga, setHarga] = useState();
  const [toko, setToko] = useState("Tenar");

  const [err, setErr] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [listStok, setListStok] = useState();
  const [filterSearch, setFilterSearch] = useState("");

  const [isReload, setIsReload] = useState(false);

  const [popUpEditProduk, setPopUpEditProduk] = useState(false);
  const [editName, setEditName] = useState();
  const [editKode, setEditKode] = useState();
  const [editStok, setEditStok] = useState();
  const [editHarga, setEditHarga] = useState();
  const [dataPickEdit, setDataPickEdit] = useState();

  const [popUpDelete, setPopUpDelete] = useState(false);
  const [pickDelete, setPickDelete] = useState();

  const [subMenu, setSubMenu] = useState("stock");
  const [statusBarang, setStatusBarang] = useState("ada");

  const [namaBarangPickTemp, setNamaBarangPickTemp] = useState();
  const [namaBarangTemp, setNamaBarangTemp] = useState();
  const [kodeTemp, setKodeTemp] = useState();
  const [hargaTemp, setHargaTemp] = useState();
  const [tokoTemp, setTokoTemp] = useState("TigaHarga");
  const [jumlahTemp, setJumlahTemp] = useState();
  const [isDisabledBelanja, setIsDisabledBelanja] = useState(false);
  const [errBelanja, setErrBelanja] = useState(false);

  const [isReloadBelanja, setIsReloadBelanja] = useState(false);

  const [listBelanja, setListBelanja] = useState();
  const [filterToko, setFilterToko] = useState("Pilih Toko");
  const [filterDateBelanja, setFilterDateBelanja] = useState(formatDate);

  const [errMsgBelanja, setErrMsgBelanja] = useState("");

  const [dataBarcodePrint, setDataBarcodePrint] = useState();

  const componentRef = useRef(null);

  useEffect(() => {
    if (subMenu === "stock") {
      postAxios(
        `${process.env.REACT_APP_ENDPOINT}/getStok`,
        {},
        dataUser.auth,
        setListStok,
        ""
      );
      setIsReload(false);
    }
  }, [isReload, subMenu]);

  useEffect(() => {
    if (subMenu === "belanja") {
      postAxios(
        `${process.env.REACT_APP_ENDPOINT}/getListBelanja`,
        { filterDate: filterDateBelanja },
        dataUser.auth,
        setListBelanja,
        ""
      );
      setIsReloadBelanja(false);
    }
  }, [isReloadBelanja, subMenu, filterDateBelanja]);

  const handleCloseAddNewProduk = () => {
    setToko("Tenar");
    setHarga();
    setStok();
    setKode();
    setName();
    setIsDisabled(false);
    setErr(false);
    setPopUpNewProduk(false);
  };

  const handleKirimNewProduk = () => {
    if (name && kode && harga && toko) {
      postAxios(
        `${process.env.REACT_APP_ENDPOINT}/addNewStok`,
        {
          name: name,
          kode: kode,
          stock: stok ? Number(stok) : 0,
          price: Number(harga),
          toko: toko,
        },
        dataUser.auth,
        "",
        ""
      );
      setIsReload(true);

      handleCloseAddNewProduk();
    } else {
      setIsDisabled(false);
      setErr(true);
    }
  };

  const searchFeature = () => {
    if (filterSearch !== "") {
      let searchName = [];
      listStok &&
        listStok.forEach((value) => {
          if (value.name.toLowerCase().includes(filterSearch.toLowerCase())) {
            searchName.push(value);
          } else if (
            value.kode.toLowerCase().includes(filterSearch.toLowerCase())
          ) {
            searchName.push(value);
          }
        });
      return searchName;
    } else {
      return listStok && listStok;
    }
  };
  let dataTemp = searchFeature(filterSearch);

  const handlePickEdit = (data) => {
    setDataPickEdit(data);
    setPopUpEditProduk(true);

    setEditName(data.name);
    setEditKode(data.kode);
    setEditStok(data.stock);
    setEditHarga(data.price);
    setToko(data.toko);
  };

  const handleCloseEditProduk = () => {
    setToko("Tenar");
    setEditHarga();
    setEditStok();
    setEditKode();
    setEditName();
    setIsDisabled(false);
    setErr(false);
    setPopUpEditProduk(false);
  };

  const handleKirimEdit = () => {
    if (editStok && editKode && editName && editHarga) {
      postAxios(
        `${process.env.REACT_APP_ENDPOINT}/editStok`,
        {
          id: dataPickEdit.id,
          editName: editName,
          editKode: editKode,
          editStock: Number(editStok),
          editHarga: Number(editHarga),
          editToko: toko,
        },
        dataUser.auth,
        "",
        ""
      );
      handleCloseEditProduk();
      setIsReload(true);
    } else {
      setErr(true);
    }
  };

  const handleDeleteStock = () => {
    postAxios(
      `${process.env.REACT_APP_ENDPOINT}/deleteStock`,
      {
        kode: pickDelete.kode,
        name: pickDelete.name,
      },
      dataUser.auth,
      "",
      ""
    );
    setIsReload(true);
    setPopUpDelete(false);
    setPickDelete();
  };

  const handleChangeBlockDot = (e, set) => {
    const replace = e.target.value.replace(/[^0-9]/g, "");

    set(Number(replace));
  };

  let reFormat = [];
  listStok &&
    listStok.forEach((element) => {
      reFormat.push({
        value: element.kode,
        label: `${element.name} - ${element.kode}`,
      });
    });

  const handleKirimBelanja = () => {
    if (statusBarang === "ada") {
      if (namaBarangPickTemp && jumlahTemp) {
        postAxios(
          `${process.env.REACT_APP_ENDPOINT}/belanja`,
          {
            name: namaBarangPickTemp,
            jumlah: jumlahTemp,
            statusBarang: statusBarang,
          },
          dataUser.auth,
          "",
          ""
        );
        setIsReloadBelanja(true);
        setNamaBarangPickTemp();
        setJumlahTemp();
        setIsDisabledBelanja(false);
        setErrBelanja(false);
      } else {
        setErrBelanja(true);
        setIsDisabledBelanja(false);
      }
    } else {
      if (namaBarangTemp && kodeTemp && hargaTemp && tokoTemp && jumlahTemp) {
        postAxios(
          `${process.env.REACT_APP_ENDPOINT}/belanja`,
          {
            name: namaBarangTemp,
            kode: kodeTemp,
            harga: hargaTemp,
            toko: tokoTemp,
            jumlah: jumlahTemp,
            statusBarang: statusBarang,
          },
          dataUser.auth,
          "",
          setErrMsgBelanja
        );
        if (!errMsgBelanja) {
          setIsReloadBelanja(true);
          setNamaBarangTemp();
          setKodeTemp();
          setHargaTemp();
          setJumlahTemp();
          setIsDisabledBelanja(false);
          setErrBelanja(false);
        }
      } else {
        setErrBelanja(true);
        setIsDisabledBelanja(false);
      }
    }
  };

  const handleFilterToko = () => {
    if (filterToko !== "Pilih Toko") {
      let searchName = [];
      listBelanja &&
        listBelanja.forEach((value) => {
          if (value.toko === filterToko) {
            searchName.push(value);
          }
        });
      return searchName;
    } else {
      return listBelanja && listBelanja;
    }
  };

  let dataFilterToko = handleFilterToko();

  const handleAfterPrint = useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = useCallback(() => {
    console.log("`onBeforePrint` called");
    return Promise.resolve();
  }, []);

  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "",
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
  });

  let dataPrintBarcode = [];

  dataFilterToko &&
    dataFilterToko.forEach((ele) => {
      for (let index = 0; index < ele.qty; index++) {
        dataPrintBarcode.push(ele);
      }
      dataPrintBarcode.push({
        id: "",
        kode: "",
        name: "",
        price: 0,
        qty: 0,
        timeStamp: "",
        toko: "",
      });
    });

  return {
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
    handlePickEdit,
    editName,
    setEditName,
    editKode,
    setEditKode,
    editStok,
    setEditStok,
    editHarga,
    setEditHarga,
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
    isDisabledBelanja,
    setIsDisabledBelanja,
    handleChangeBlockDot,
    errBelanja,
    handleKirimBelanja,
    namaBarangPickTemp,
    setNamaBarangPickTemp,
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
    dataBarcodePrint,
    setDataBarcodePrint,
  };
};
