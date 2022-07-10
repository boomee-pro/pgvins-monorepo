import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import { useForm, SubmitHandler } from "react-hook-form";
import { Row, Col, Hidden } from "react-grid-system";
import { BiEnvelope, BiLockAlt } from "react-icons/bi";

import bannerImage from "@/images/auth/banner.png";
import styles from "@/styles/auth.module.scss";

type LoginInput = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register: linkInput,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>Connexion</title>
        <meta name="description" content="Page de connexion" />
      </Head>

      <Row className={styles.container}>
        <Hidden xs sm>
          <Col md={6} className={styles.banner}>
            <Image src={bannerImage} alt="" layout="fill" objectFit="cover" />
          </Col>
        </Hidden>

        <Col md={6} className={styles.form_container}>
          <h2>Connexion</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className={classNames(
                styles.input_group,
                errors.email && styles.error
              )}
            >
              <BiEnvelope size={24} />
              <input
                type="text"
                placeholder="Adresse e-mail"
                {...linkInput("email", { required: "Email requise" })}
              />
              <small>{errors.email && errors.email.message}</small>
            </div>

            <div
              className={classNames(
                styles.input_group,
                errors.password && styles.error
              )}
            >
              <BiLockAlt size={24} />
              <input
                type="password"
                placeholder="Mot de passe"
                {...linkInput("password", { required: "Mot de passe requis." })}
              />
              <small>{errors.password && errors.password.message}</small>
            </div>

            <Link href="forgot-password">Mot de passe oublié ?</Link>

            <button type="submit">Se connecter</button>

            <p>
              Vous n&apos;avez pas encore de compte ?{" "}
              <Link href="register">S&apos;inscrire</Link>
            </p>
          </form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
