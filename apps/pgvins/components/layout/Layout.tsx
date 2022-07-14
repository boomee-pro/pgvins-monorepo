import { useEffect, useState } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
  noLayout: boolean;
  noCart: boolean;
};

const Layout = ({ children, noCart, noLayout }: Props) => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight(
      window.innerHeight -
        (!noLayout ? document.querySelector("#navbar")?.clientHeight ?? 0 : 0)
    );
  }, [noLayout]);

  return (
    <>
      <div>
        {!noLayout && <Navbar />}
        <main style={{ position: "relative" }}>
          <div
            id="content"
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: height,
            }}
          >
            <main style={{ flex: 1 }}>{children}</main>
            {!noLayout && <Footer />}
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;
