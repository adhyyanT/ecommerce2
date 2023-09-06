import axios from 'axios';

export const validatePayment = async (sessionId: string) => {
  try {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:5000/order/purchase_order?session_id=${sessionId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    await axios.request(config);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
