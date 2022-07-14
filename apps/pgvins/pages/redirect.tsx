import { useRouter } from "next/router";
import { useEffect } from "react";

const Redirect = () => {
  const router = useRouter();
  useEffect(() => {
    if (window.opener) window.close();
    else router.push("/");
  }, [router]);

  return "Redirection...";
};

export default Redirect;
