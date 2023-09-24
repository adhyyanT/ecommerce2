import axios from 'axios';
const backend = import.meta.env.VITE_backend;

export const getProducts = async (
  page: number,
  size: number,
  search: string,
  filters: string[]
) => {
  try {
    if (!search) search = '';
    let url = `${backend}/api/products/all_products?page=${page}&size=${size}&search=${search}`;
    if (filters.length !== 0) {
      url += '&filters=';
      filters.map((f) => {
        url += f + ',';
      });
    }
    url = url.substring(0, url.length - 1);
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url,
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
      url: `${backend}/api/products/product/${id}`,
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
      url: `${backend}/api/products/search`,
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
      url: `${backend}/api/products/product/${id}`,
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
