import axios from 'axios';

export const getProducts = async (page: number, size: number) => {
  try {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:5000/products/all_products?page=${page}&size=${size}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    const res = await axios.request(config);
    return res.data;
  } catch (error) {
    console.log(error);
    return { total: 0, product: [] };
  }
};
