import { useState, useRef, useCallback, useEffect } from "react";
import { postAxios } from "../../util/apiCall";
import { formatDate } from "../../util/helperFunction";
import Cookies from "js-cookie";
import { useReactToPrint } from "react-to-print";

export const useKasir = () => {
  // const userToken = Cookies.get("auth");
  // console.log(userToken);
  const dataAuth = localStorage.getItem("auth");
  const dataUser = JSON.parse(dataAuth);

  const [keranjang, setKeranjang] = useState([]);
  const [filterSearch, setFilterSearch] = useState("");

  const [jenisPembayaran, setJenisPembayaran] = useState("Tunai");
  const [popUpBayar, setPopUpBayar] = useState(false);
  const [listStok, setListStok] = useState();
  const [isDisabled, setIsDisabled] = useState(false);

  const [isReload, setIsReload] = useState(false);

  const [subMenu, setSubMenu] = useState("Input");
  const [listRiwayat, setListRiwayat] = useState();
  const [filterDateRiwayat, setFilterDateRiwayat] = useState(formatDate);

  const [popUpFinalisasi, setPopUpFinalisasi] = useState(false);
  const [finalisasi, setFinalisasi] = useState();
  const [isDisabledFinalisasi, setIsDisabledFinalisasi] = useState(false);

  const [pecahanUang, setPecahanUang] = useState();

  const [result, setResult] = useState("");

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown, true);
  }, []);
  const componentRef = useRef(null);

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
  const detectKeyDown = (e) => {
    if (e.key === "F2") {
      printFn();
    }
    if (e.key === "F4") {
      e.preventDefault();
      setTimeout(() => {
        const input = document.getElementById("myInput");
        input.focus();
        input.select();
      }, 10); // delay 10ms
    }
  };

  useEffect(() => {
    if (subMenu === "Input") {
      postAxios(
        `${process.env.REACT_APP_ENDPOINT}/getStok`,
        {},
        dataUser.auth,
        setListStok,
        ""
      );
      setIsReload(false);
    } else if (subMenu === "Riwayat" && dataUser.role === "god_mode") {
      postAxios(
        `${process.env.REACT_APP_ENDPOINT}/getHistoryKasir`,
        { filterDate: filterDateRiwayat, role: dataUser.role, id: dataUser.id },
        dataUser.auth,
        setListRiwayat,
        ""
      );
      setIsReload(false);
    }
  }, [isReload, subMenu, filterDateRiwayat]);

  const handleTambahItem = (data) => {
    let obj = [...keranjang];

    const findIndex = obj && obj.findIndex((obj) => obj.id === data.id);
    const foundObject = obj && obj.find((obj) => obj.id === data.id);

    if (findIndex === -1) {
      obj.push({
        id: data.id,
        userId: dataUser.id,
        isFinal: false,
        name: data.name,
        kode: data.kode,
        qty: 1,
        price: data.price,
        toko: data.toko,
      });
      setKeranjang(obj);
    } else {
      let calculate = foundObject.qty + 1;
      obj[findIndex][`qty`] = calculate;
      setKeranjang(obj);
    }
  };

  const handleIncreaseItem = (data) => {
    let obj = [...keranjang];

    const findIndex = obj && obj.findIndex((obj) => obj.id === data.id);
    const foundObject = obj && obj.find((obj) => obj.id === data.id);
    let calculate = foundObject.qty + 1;

    obj[findIndex][`qty`] = calculate;

    setKeranjang(obj);
  };

  const handleDecreaseItem = (data) => {
    let obj = [...keranjang];

    const findIndex = obj && obj.findIndex((obj) => obj.id === data.id);
    const foundObject = obj && obj.find((obj) => obj.id === data.id);
    let calculate = foundObject.qty - 1;

    if (calculate > 0) {
      obj[findIndex][`qty`] = calculate;
      setKeranjang(obj);
    }
  };

  const handleDeleteProdukPick = (id) => {
    let data = [...keranjang];
    data.splice(
      data.findIndex(function (i) {
        return i.id === id;
      }),
      1
    );

    setKeranjang(data);
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

  const handleFormChangeJumlah = (index, event) => {
    let data = [...keranjang];

    data[index][event.target.name] = Number(event.target.value);

    setKeranjang(data);
  };

  const handleResetKasir = () => {
    setIsDisabled(false);
  };

  const handleBayarPrint = () => {
    if (keranjang.length > 0 && pecahanUang) {
      // postAxios(
      //   `${process.env.REACT_APP_ENDPOINT}/addNewTransaction`,
      //   {
      //     data: keranjang,
      //     pecahanUang: pecahanUang,
      //     kasir: dataUser.name,
      //   },
      //   dataUser.auth,
      //   "",
      //   ""
      // );
      handleResetKasir();
      setPopUpBayar(true);
      setIsReload(true);
      printFn();
    }
  };

  const handleCancelFinalisasi = () => {
    setIsDisabledFinalisasi(false);
    setFinalisasi();
    setPopUpFinalisasi(false);
  };

  const handleKirimFinalisasi = () => {
    if (finalisasi) {
      postAxios(
        `${process.env.REACT_APP_ENDPOINT}/finalisasiLaporan`,
        {
          id: dataUser.id,
          filterDate: formatDate,
          total: Number(finalisasi),
        },
        dataUser.auth,
        "",
        ""
      );
      handleCancelFinalisasi();
    } else {
      setIsDisabledFinalisasi(false);
    }
  };

  const handleChange = (e) => {
    const replace = e.target.value.replace(/[^0-9]/g, "");

    setPecahanUang(Number(replace));
  };

  const handleChangeFinalisasi = (e) => {
    const replace = e.target.value.replace(/[^0-9]/g, "");

    setFinalisasi(Number(replace));
  };

  return {
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
    pecahanUang,
    handleChange,
    handleChangeFinalisasi,
    setIsReload,
    componentRef,
    result,
    setResult,
    listStok,
    setKeranjang,
  };
};
