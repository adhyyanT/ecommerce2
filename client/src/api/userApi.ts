import axios from 'axios';

export const login = async (email: string, password: string) => {
  try {
    let data = JSON.stringify({
      password: password,
      email: email,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/user/login',
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
      url: 'http://localhost:5000/user/register',
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
    console.log(error);
    return { ok: false, error, data: null };
  }
};
