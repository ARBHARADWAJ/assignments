import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Register.module.css"

const Register = () => {
  const [id, setId] = useState(null);
  const [password, setPassword] = useState(null);
  const [age, setAge] = useState(0);
  const [alert1, setAlert1] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const history=useNavigate();
  function handleregister(e) {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:3001/api/data", {
          id: id,
          password: password,
          age: age,
        })
        .then((res) => {
          if (res.data.message === "registered") {
            setTimeout(() => {
              setAlert2(true);
            }, 2000);
          } else if (res.data.message === "exists") {
            setAlert1(true);
          }
        });
    } catch (e) {console.log(e);}
  }
  return (
    <div className={styles.register}>
      <form onSubmit={handleregister} className={styles.form}>
        <input
          type="text"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <input
          type="text"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="number"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <button>SignUp</button>
        <button
          onClick={() => {
            history("/");
          }}
        >
          Login
        </button>
        {alert1 && <div>user already exist ,please login</div>}
        {alert2 && (
          <div>
            User successfully registed ,this page is redirected to login
            page,please wait...
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
