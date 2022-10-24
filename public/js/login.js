/* eslint-disable */
// import axios from 'axios';
// import { showAlert } from './alerts';

// console.log('here');

// document.querySelector('.form').addEventListener('submit', (e) => {
//   e.preventDefault();
//   console.log('CLICKEDD');
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;
//   login(email, password);
// });

// // const login = (email, password) => {
// //   alert(email);
// //   alert(password);
// //   alert('yes');
// // };

// const login = async (email, password) => {
//   console.log('connect login');
//   try {
//     const res = await axios({
//       method: 'POST',
//       url: 'http://127.0.0.1:3000/api/v1/users/login',
//       data: {
//         email,
//         password,
//       },
//     });

//     if (res.data.status === 'success') {
//       showAlert('success', 'Logged in successfully!');
//       alert('success', 'Logged in successfully!');
//       console.log('nice');
//       window.setTimeout(() => {
//         location.assign('/');
//       }, 1500);
//     }
//   } catch (err) {
//     showAlert('error', err.response.data.message);
//   }
// };

const REQUEST_TIMEOUT_SEC = 5;

const formEl = document.querySelector('.form');

const timeout = (sec) =>
  new Promise((_, reject) => {
    setTimeout(
      () => reject(Error(`Request timed out. Please try again later...`)),
      sec * 1000
    );
  });

const useFetch = async (url, uploadData = null) => {
  try {
    const req = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([req, timeout(REQUEST_TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw Error(data.message);
    console.log(res);
    return data;
  } catch (err) {
    console.log(err);
    if (err.message === 'Failed to fetch')
      err.message = `Unable to reach the server. Please check your internet connection...`;
    throw err;
  }
};

const login = async (email, password) => {
  try {
    const res = await useFetch('http://localhost:3000/api/v1/users/login', {
      email,
      password,
    });

    if (res.status !== 'success') return;

    // setTimeout(() => window.location.replace('/'), 1000);
  } catch (err) {
    console.error(err.message);
  }
};

const handleSubmit = (e) => {
  e.preventDefault();

  const email = e.target.email?.value;
  const password = e.target.password?.value;

  login(email, password);

  formEl.reset();
};
formEl.addEventListener('submit', handleSubmit);
