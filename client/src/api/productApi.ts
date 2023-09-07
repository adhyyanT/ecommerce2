import axios from 'axios';

export const getProducts = async (
  page: number,
  size: number,
  search: string
) => {
  try {
    if (!search) search = '';
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:5000/products/all_products?page=${page}&size=${size}&search=${search}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    const res = await axios.request(config);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.status);
      return { total: 0, product: [], errorCode: error.response?.status };
    } else {
      console.error(error);
      return { total: 0, product: [] };
    }
  }
};

export const getProduct = async (id: number) => {
  try {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/products/product/' + id,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    const res = await axios.request(config);
    return res.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      console.error(error.response);
      return { errorCode: error.status };
    } else {
      console.error(error);
      return null;
    }
  }
};

export const search = async (s: string) => {
  try {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/products/search',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      data: {
        search: s,
      },
    };

    const res = await axios.request(config);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response);
      return { errorCode: error.status };
    } else {
      console.error(error);
      return [];
    }
  }
};

export const getProductDetails = async (id: number) => {
  try {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/products/product/' + id,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    const res = await axios.request(config);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response);
      return { errorCode: error.status };
    } else {
      console.error(error);
      return { err: 'Not found' };
    }
  }
};
