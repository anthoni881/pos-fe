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

  const [lastOrder, setLastOrder] = useState();

  const [filterKasir, setFilterKasir] = useState();
  const [dataFinalisasiTransaksi, setDataFinalisasiTransaksi] = useState();
  const componentRef = useRef(null);

  const handleChange = (e) => {
    const replace = e.target.value.replace(/[^0-9]/g, "");

    setPecahanUang(Number(replace));
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

      postAxios(
        `${process.env.REACT_APP_ENDPOINT}/getLastOrder`,
        { id: dataUser.id },
        dataUser.auth,
        setLastOrder,
        ""
      );
      setIsReload(false);
    } else if (subMenu === "Riwayat" && dataUser.role === "god_mode") {
      postAxios(
        `${process.env.REACT_APP_ENDPOINT}/getHistoryKasir`,
        {
          filterDate: filterDateRiwayat,
          role: dataUser.role,
          id: dataUser.id,
        },
        dataUser.auth,
        setListRiwayat,
        ""
      );
      postAxios(
        `${process.env.REACT_APP_ENDPOINT}/getFinalisasiTransaksi`,
        { id: filterKasir, filterDate: filterDateRiwayat },
        dataUser.auth,
        setDataFinalisasiTransaksi,
        ""
      );
      setIsReload(false);
    }
  }, [isReload, subMenu, filterDateRiwayat, filterKasir]);

  const handleTambahItem = (data) => {
    let obj = [...keranjang];

    const findIndex = obj && obj.findIndex((obj) => obj.kode === data.kode);
    const foundObject = obj && obj.find((obj) => obj.kode === data.kode);

    if (findIndex === -1) {
      obj.push({
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

    const findIndex = obj && obj.findIndex((obj) => obj.kode === data.kode);
    const foundObject = obj && obj.find((obj) => obj.kode === data.kode);
    let calculate = foundObject.qty + 1;

    obj[findIndex][`qty`] = calculate;

    setKeranjang(obj);
  };

  const handleDecreaseItem = (data) => {
    let obj = [...keranjang];

    const findIndex = obj && obj.findIndex((obj) => obj.kode === data.kode);
    const foundObject = obj && obj.find((obj) => obj.kode === data.kode);
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
        return i.kode === id;
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
          if (!value || !value.name) return;
          const nameMatches = value.name
            .toLowerCase()
            .includes(filterSearch.toLowerCase());
          const codeMatches =
            value.kode &&
            String(value.kode)
              .toLowerCase()
              .includes(filterSearch.toLowerCase());
          if (nameMatches || codeMatches) {
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
    setKeranjang([]);
    setPecahanUang();
  };

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

  const handleBayarPrint = () => {
    if (keranjang.length > 0 && pecahanUang) {
      postAxios(
        `${process.env.REACT_APP_ENDPOINT}/addNewTransaction`,
        {
          data: keranjang,
          pecahanUang: pecahanUang,
          kasir: dataUser.name,
        },
        dataUser.auth,
        "",
        ""
      );
      printFn();
      handleResetKasir();
      setPopUpBayar(true);
      setIsReload(true);
    }
  };

  const detectKeyDown = useCallback(
    (e) => {
      if (e.key === "F2" && pecahanUang > 0) {
        e.preventDefault();
        handleBayarPrint();
      }
      if (e.key === "F4") {
        e.preventDefault();
        setTimeout(() => {
          const input = document.getElementById("myInput");
          input.focus();
          input.select();
        }, 10); // delay 10ms
      }
    },
    [pecahanUang, handleBayarPrint]
  );

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown, true);
    return () => {
      document.removeEventListener("keydown", detectKeyDown, true);
    };
  }, [detectKeyDown]);

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

  const handleChangeFinalisasi = (e) => {
    const replace = e.target.value.replace(/[^0-9]/g, "");

    setFinalisasi(Number(replace));
  };

  const uniqueIds = [
    ...new Set(listRiwayat && listRiwayat.map((item) => item.id)),
  ];

  const uniqueArray =
    uniqueIds &&
    uniqueIds.map((id) => {
      return listRiwayat && listRiwayat.find((item) => item.id === id);
    });

  const searchFeatureKasir = () => {
    if (filterKasir) {
      let searchName = [];
      listRiwayat &&
        listRiwayat.forEach((value) => {
          if (value.id === filterKasir) {
            searchName.push(value);
          }
        });
      return searchName;
    } else {
      return listRiwayat && listRiwayat;
    }
  };

  let dataTempRiwayatKasir = searchFeatureKasir();

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
    lastOrder,
    printFn,
    uniqueArray,
    filterKasir,
    setFilterKasir,
    dataFinalisasiTransaksi,
    dataTempRiwayatKasir,
  };
};
