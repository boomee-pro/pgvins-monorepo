import { useState } from "react";

import "@/pages/styles.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const oauth = (type) => {
    window.open(`http://localhost:8080/auth/${type}`, "_self");
  };

  const handleChange = (e) => {
    setErrors();
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials)
      .then(() => navigate("/"))
      .catch((err) => {
        setErrors(err.response.data.message);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="title">
          <h3>Login</h3>
        </div>
        <div className="field">
          <label>Email:</label>
          <input type="text" name="email" onChange={handleChange} required />
          <br />
        </div>
        <div className="field">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <button type="submit" className="submit-btn">
            Login
          </button>
        </div>
        <label id="error-message">{errors}</label>
      </form>
      <div className="custom-hr">
        <span>OU</span>
      </div>
      <button
        onClick={() => oauth("google")}
        className="submit-btn"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <img
          src={"https://bit.ly/3yormGf"}
          alt="Google"
          style={{ maxWidth: "30px" }}
        />
        Login avec Google
      </button>
      <button
        onClick={() => oauth("github")}
        className="submit-btn"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <img
          src={"https://bit.ly/3yw11WM"}
          alt="Google"
          style={{ maxWidth: "30px" }}
        />
        Login avec Github
      </button>
      <button
        onClick={() => oauth("facebook")}
        className="submit-btn"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <img
          src={"https://bit.ly/3IyCh52"}
          alt="Google"
          style={{ maxWidth: "30px" }}
        />
        Login avec Facebook
      </button>
      <p>
        Vous n'avez pas de compte ? <Link to="/register">S'inscrire</Link>
      </p>
    </>
  );
};

export default Login;
