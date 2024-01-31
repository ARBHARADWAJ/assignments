import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./Homepage.module.css";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const history = useNavigate();
  const [rpass, setRpass] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(0);
  const [alert1, setAlert1] = useState(true);
  const [alert2, setAlert2] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.post("http://localhost:3001/api/read", {
        id: id,
        password: password,
      });

      console.log(res);

      if (res.data === "found") {
        console.log(res.data);
        // setAge(res.data.age);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const submit = async () => {
    console.log("entered");
    try {
      await axios
        .post("http://localhost:3001/api/data/update", {
          username: id,
          password: password,
          age: age,
        })
        .then((res) => {
          console.log(res);
          if (res.data) {
            setAge(res.data.age);
            setAlert1(false);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (e) => {
    e.preventDefault();

    if (id && password) {
      try {
        const res = await axios.delete("http://localhost:3001/api/data", {
          data: { username: id, password: password },
        });
        console.log(res);
        if (res.data.message === "deleted") {
          setAlert2(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.homepage}>
      <form className={styles.form}>
        <input
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {/* <button onClick={fetchData}>Check</button> */}
        <input
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          Update
        </button>
        <div>
          <p>
            {" "}
            If you want to delete the user, please check user credentials and
            enter the password again in the below field.
          </p>
          {/* <input
            type="password"
            value={rpass}
            onChange={(e) => {
              setRpass(e.target.value);
              rpass === password && setAlert2(false);
            }}
          /> */}
          <button onClick={deleteUser}>
            {/* disabled={alert2}> */}
            Delete
          </button>
        </div>
        {alert2 && <p>user is deleted</p>}
      </form>
    </div>
  );
};

export default Homepage;
