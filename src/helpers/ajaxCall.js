import axios from "axios";

const ajaxCall = async (url, fetchObj = {}) => {
  try {
    const response = await axios({
      url: `https://peekly.in/blog/api${url}`,
      ...fetchObj,
    });

    return {
      status: response.status,
      isError: false,
      isNetwork: false,
      data: response.data,
    };
  } catch (error) {
    return {
      status: error.response?.status,
      isError: true,
      isNetwork: !error.response,
      data: null,
      error,
    };
  }
};

export default ajaxCall;
