import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [redalert, setRedalert] = useState(false);
  const history = useNavigate();

  function handlesubmit(event) {
    event.preventDefault(); // Prevents the default form submission behavior
    // 127.0.0.1
    try {
      axios
        .post("http://localhost:3001/api/login", { id: id, password: password })
        .then((res) => {
          console.log(res);
          if (res.data.message === "register") {
            setRedalert(true);
            console.log(res);
            console.log("user need to register");
          } else if (res.data.message === "exists") {
            console.log("exists");
            localStorage.setItem(id, JSON.stringify({ id, password }));
            setTimeout(() => {
              history("/home");
            }, 1000);
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  const handlesregister = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    history("/register");
  };

  return (
    <div className={styles.login}>
      <form onSubmit={handlesubmit} className={styles.form}>
        Username/id:<input value={id} onChange={(e) => setId(e.target.value)} />
        Password:<input value={password} onChange={(e) => setPassword(e.target.value)} />
        <button>Submit</button>
        <button type="submit" onClick={handlesregister}>
          register
        </button>
        {redalert && (
          <div>
            <p>user not exist please register </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
