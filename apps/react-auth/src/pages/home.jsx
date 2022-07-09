import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, loading, connected, logout } = useAuth();

  if (loading) return "Chargement..";
  if (!connected)
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        You are not logged in !<br />
        <br />
        <Link to="/login">
          <button>Login</button>
        </Link>
        <div className="custom-hr">
          <span>OR</span>
        </div>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    );

  return (
    <div style={{ marginTop: "20px" }}>
      <p>
        Welcome back, {user.details.firstName} {user.details.lastName}
      </p>
      <button onClick={logout}>Log out</button>
    </div>
  );
};

export default Dashboard;
