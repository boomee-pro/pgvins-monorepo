import Image from "next/image";
import { useEffect, useState } from "react";

import { useAuth } from "@contexts/AuthContext";
import styles from "@styles/auth.module.scss";
import googleProvider from "@images/auth/google-provider.png";

const OAuthProviders = () => {
  const { fetchUser } = useAuth();
  const [externalPopup, setExternalPopup] = useState<Window | null>();

  const openOAuth2Popup = (provider: string) => {
    const popup = window.open(
      `http://localhost:8080/auth/${provider}`,
      "_blank",
      "width=500,height=500"
    );
    setExternalPopup(popup);
  };

  useEffect(() => {
    if (!externalPopup) {
      return;
    }

    const timer = setInterval(() => {
      if (!externalPopup) {
        timer && clearInterval(timer);
        return;
      }

      if (externalPopup.closed) {
        fetchUser();
        timer && clearInterval(timer);
        setExternalPopup(null);
      }
    }, 500);
  }, [externalPopup, fetchUser]);

  return (
    <button
      type="button"
      className={styles.provider}
      onClick={() => openOAuth2Popup("google")}
    >
      <Image
        src={googleProvider}
        alt=""
        layout="fixed"
        height={20}
        width={20}
      />
      Se connecter avec Google
    </button>
  );
};

export default OAuthProviders;
