import axios from 'axios';
const backend = import.meta.env.VITE_backend;

export const putItemInCart = async (id: number) => {
  try {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${backend}/cart/add/` + id,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    await axios.request(config);
    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false };
  }
};

export const getCart = async () => {
  try {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${backend}/cart/getcart`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    const res = await axios.request(config);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.status);
      return { errorCode: error.response?.status };
    } else {
      console.error(error);
    }
    return null;
  }
};
export const removeFromCart = async (id: number) => {
  try {
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${backend}/cart/remove/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    await axios.request(config);
    return { ok: true };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.status);
      return { errorCode: error.response?.status, ok: false };
    } else {
      console.error(error);
    }
    return { ok: false };
  }
};

export const checkout = async () => {
  try {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/cart/checkout',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    const res = await axios.request(config);
    return res.data.url;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.status);
      return { errorCode: error.response?.status };
    } else {
      console.error(error);
    }
    return '';
  }
};
