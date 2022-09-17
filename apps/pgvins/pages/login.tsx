import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { BiEnvelope, BiLockAlt } from "react-icons/bi";
import classNames from "classnames";
import toast from "react-hot-toast";

import styles from "@styles/auth.module.scss";
import { AuthLayout, FieldProps } from "@components/auth/AuthLayout";
import { useAuth } from "@contexts/AuthContext";
import withoutAuth from "hoc/withoutAuth";
import OAuthProviders from "@components/auth/OAuthProviders";

export type LoginInput = {
  email: string;
  password: string;
};

export type FieldType = FieldProps & { name: keyof LoginInput };

const Login = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const {
    watch,
    register: linkInput,
    handleSubmit,
    formState: { errors: fieldErrors },
  } = useForm<LoginInput>();

  const fields: Array<FieldType> = [
    {
      name: "email",
      type: "text",
      icon: <BiEnvelope size={24} />,
      placeholder: "Adresse e-mail",
      requiredMessage: "L'adresse e-mail est obligatoire",
    },
    {
      name: "password",
      type: "password",
      icon: <BiLockAlt size={24} />,
      placeholder: "Mot de passe",
      requiredMessage: "Le mot de passe est obligatoire",
    },
  ];

  useEffect(() => {
    const subscription = watch(() => setError(undefined));
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<LoginInput> = async (credentials) => {
    setLoading(true);
    await login(credentials)
      .then(() => toast.success("Connexion réussie"))
      .catch((err) => {
        setError(err.response?.data?.message);
      });
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Connexion</title>
        <meta name="description" content="Page de connexion" />
      </Head>

      <AuthLayout>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Connexion</h2>

          {fields.map((field) => (
            <div
              key={field.name}
              className={classNames(
                styles.input_group,
                fieldErrors[field.name] && styles.error
              )}
            >
              {field.icon}
              <input
                type={field.type}
                placeholder={field.placeholder}
                {...linkInput(field.name, { required: field.requiredMessage })}
              />
              <small>{fieldErrors[field.name]?.message}</small>
            </div>
          ))}

          {error && <small className={styles.api_error}>{error}</small>}

          <Link href="forgot-password">Mot de passe oublié ?</Link>

          <button type="submit" disabled={loading}>
            {loading ? "Chargement..." : "Se connecter"}
          </button>
          <OAuthProviders />

          <p>
            Vous n&apos;avez pas encore de compte ?{" "}
            <Link href="register">S&apos;inscrire</Link>
          </p>
        </form>
      </AuthLayout>
    </>
  );
};

export default withoutAuth(Login);
