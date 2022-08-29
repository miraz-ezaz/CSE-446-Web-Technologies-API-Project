import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles_signin.module.css";
import authService from "../services/AuthService";
import authHeader from "../services/authHeader";

export default function AddBankScreen() {
  const [data, setData] = useState({ accno: "", pin: "" });
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [validity, setValidity] = useState([]);
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const user = authService.getCurrentUser();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "api/user/verifybank";
      const response = await axios.post(url, data);
      setValidity(response.data);
      console.log(response.data);
      // navigate("/");
      // window.location.reload();
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  const addAccount = async (e) => {
    e.preventDefault();
    try {
      
      const url = "api/user/addacc";
      const req_body = { userId: user._id, accno: data.accno };
      const response = await axios.put(url, req_body, { headers: authHeader });
      console.log(response.data);
      const string = JSON.stringify(response.data.data);
      localStorage.setItem("user",string);
      navigate("/");
      //window.location.reload();    
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Add Your Bank Account</h1>
            <input
              type="text"
              placeholder="Account Number"
              name="accno"
              onChange={handleChange}
              value={data.phone}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="PIN"
              name="pin"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {<div className={styles.error_msg}>{validity.validity}</div>}
            <button type="submit" className={styles.green_btn}>
              Verify
            </button>
          </form>
        </div>
        <div className={styles.right}>
          {validity.validity === "Valid" ? (
            <button
              type="button"
              className={styles.white_btn}
              onClick={addAccount}
            >
              Add Account
            </button>
          ) : (
            <button type="button" className={styles.white_btn} disabled>
              Add Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
