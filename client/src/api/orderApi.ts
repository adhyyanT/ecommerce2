import axios from 'axios';
const backend = import.meta.env.VITE_backend;

export const validatePayment = async (sessionId: string) => {
  try {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${backend}/order/purchase_order?session_id=${sessionId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    await axios.request(config);
    return { val: true, errorCode: 0 };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.status);
      return { val: false, errorCode: error.response?.status };
    } else {
      console.error(error);
      return { val: false, errorCode: 500 };
    }
    // return false;
  }
};
export const allOrders = async () => {
  try {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${backend}/order/all_orders/`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    const res = await axios.request(config);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.status);
      return { data: [], errorCode: error.response?.status };
    } else {
      console.error(error);
    }
    return { data: [], errorCode: 500 };
  }
};
export const getOrderDetails = async (orderId: number) => {
  try {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${backend}/order/past_order/${orderId}`,
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
    return [];
  }
};
