import { useState, useEffect } from "react";
import { postAxios } from "../../util/apiCall";

export const useUser = () => {
  const dataAuth = localStorage.getItem("auth");
  const dataUser = JSON.parse(dataAuth);

  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const [toko, setToko] = useState();

  const [listUser, setListUser] = useState();
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    postAxios(
      `${process.env.REACT_APP_ENDPOINT}/getListUser`,
      {},
      dataUser.auth,
      setListUser,
      ""
    );
  }, [isRefresh]);

  const handleAddNewuser = () => {
    postAxios(
      `${process.env.REACT_APP_ENDPOINT}/addNewUser`,
      {
        name: name,
        username: name,
        password: password,
        role: role,
        toko: toko,
      },
      dataUser.auth,
      "",
      ""
    );
    setToko();
    setRole();
    setPassword();
    setName();
    setIsRefresh(true);
  };

  const handleDeleteUser = (id) => {
    postAxios(
      `${process.env.REACT_APP_ENDPOINT}/deleteUser`,
      {
        id: id,
      },
      dataUser.auth,
      "",
      ""
    );

    setIsRefresh(true);
  };

  return {
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
  };
};
