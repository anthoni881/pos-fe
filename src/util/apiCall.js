import axios from "axios";

export const postAxios = async (
  url,
  obj,
  getToken,
  setDataPost,
  setErrMsgPost,
  otherData
) => {
  try {
    const { data } = await axios.post(url, obj, {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    });
    const nothing = () => {};

    const handlePostTrue = () => {
      setDataPost(data.data);
      if (setErrMsgPost !== "") {
        setErrMsgPost(data);
      }
    };

    if (data.code === 200) {
      {
        setDataPost === "" ? nothing() : handlePostTrue();
      }
    } else {
      {
        setErrMsgPost === "" ? nothing() : setErrMsgPost(data);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
