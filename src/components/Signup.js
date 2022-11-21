// import React, { useRef } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context/MyContext';

export default function Signup() {
  const { setUser } = useContext(MyContext);
  const navigate = useNavigate();

  // const formRef = useRef();

  const registerUser = (event) => {
    event.preventDefault();

    // console.log(formRef.current);
    // console.log(formRef.current.firstName.value);
    // console.log(formRef.current.lastName.value);
    // console.log(formRef.current.email.value);
    // console.log(formRef.current.password.value);
    // console.log(formRef.current.image.files[0]);

    // method: 1
    // let userData = {
    //   firstName: formRef.current.firstName.value,
    //   lastName: formRef.current.lastName.value,
    //   email: formRef.current.email.value,
    //   password: formRef.current.password.value,
    //   image: formRef.current.image.files[0],
    // };

    // console.log(userData);
    // let formData = new FormData();

    // for (const key of userData) {
    //   formData.append(key, userData[key]);
    // }

    // method: 2
    const data = new FormData(event.target);
    // send data to backend

    fetch('http://localhost:4000/users', {
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' }, // method:1
      // headers: { 'Content-Type': 'multipart/form-data' }, // method:2
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setUser(result.user);
          navigate('/records');
        } else {
          alert(JSON.stringify(result.message));
        }
        // console.log(result);
      });

    // console.log('form submitted');
    // const data = new FormData(event.target);
    // console.log(data);
    // for (const pair of data) {
    //   console.log(pair);
    // }
  };

  return (
    <div>
      <h1>Login/Register User</h1>
      {/* <form onSubmit={registerUser} ref={formRef}> */}
      <form onSubmit={registerUser}>
        <label>
          First Name: <input type="text" name="firstName" required />
        </label>
        <br />
        <label>
          Last Name: <input type="text" name="lastName" required />
        </label>
        <br />
        <label>
          Email: <input type="email" name="email" required />
        </label>
        <br />
        <label>
          Password: <input type="password" name="password" required />
        </label>
        <br />
        <label>
          Profile Image: <input type="file" name="image" />
        </label>
        <br />
        <button>Register/Signup</button>
      </form>
    </div>
  );
}
