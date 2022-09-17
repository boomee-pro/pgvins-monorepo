import Image from "next/image";
import { Row, Col, Hidden } from "react-grid-system";

import bannerImg from "@images/auth/banner.png";
import styles from "@styles/auth.module.scss";

export const AuthLayout = ({ children }: any) => {
  return (
    <Row className={styles.container}>
      <Hidden xs sm>
        <Col md={6} className={styles.banner}>
          <Image src={bannerImg} alt="" layout="fill" objectFit="cover" />
        </Col>
      </Hidden>

      <Col md={6} className={styles.form_container}>
        {children}
      </Col>
    </Row>
  );
};

export type FieldProps = {
  type: string;
  icon: JSX.Element;
  placeholder: string;
  requiredMessage: string;
};
