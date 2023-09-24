import axios from 'axios';
const backend = import.meta.env.VITE_backend;

export const login = async (email: string, password: string) => {
  try {
    let data = JSON.stringify({
      password: password,
      email: email,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${backend}/api/user/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    const res = await axios.request(config);
    localStorage.setItem('token', res.data.token);
    return { ok: true, data: res.data, error: null };
  } catch (error) {
    console.log(error);
    return { ok: false, error, data: null };
  }
};

export const register = async (
  name: string,
  email: string,
  password: string,
  username: string
) => {
  try {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${backend}/api/user/register`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email,
        name,
        password,
        username,
      },
    };

    const res = await axios.request(config);
    localStorage.setItem('token', res.data.token);
    return { ok: true, data: res.data, error: null };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.status);
      return { errorMsg: error.response?.data, ok: false, error };
    } else {
      console.error(error);
    }
    return { ok: false, error, data: null };
  }
};
