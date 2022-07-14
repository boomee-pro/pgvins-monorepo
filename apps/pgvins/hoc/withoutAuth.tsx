import { useEffect } from "react";

const { useAuth } = require("contexts/AuthContext");
const { useRouter } = require("next/router");

const withoutAuth = (Component: any) => {
  const Check = (props: any) => {
    const { connected } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (connected) {
        router.push("/");
        return;
      }
    });

    if (!connected) return <Component {...props} />;
  };
  return Check;
};

export default withoutAuth;
