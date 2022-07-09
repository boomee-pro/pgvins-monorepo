import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "@/pages/styles.css";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(userData)
      .then(() => navigate("/"))
      .catch((err) => {
        setErrors(err.response.data.message);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="title">
          <h3>Register</h3>
        </div>
        <div className="field">
          <label>Forename:</label>
          <input
            type="text"
            name="firstName"
            onChange={handleChange}
            required
          />
          <br />
        </div>
        <div className="field">
          <label>Surname:</label>
          <input type="text" name="lastName" onChange={handleChange} required />
          <br />
        </div>
        <div className="field">
          <label>Mail: </label>
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
        <button type="submit" className="submit-btn">
          Register
        </button>
        <label id="error-message">{errors}</label>
      </form>
      <p>
        Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
      </p>
    </>
  );
};

export default Register;
