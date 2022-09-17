import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import classNames from "classnames";
import {
  useForm,
  SubmitHandler,
  ValidationRule,
  Validate,
} from "react-hook-form";
import { BiEnvelope, BiLockAlt, BiUser } from "react-icons/bi";
import toast from "react-hot-toast";

import styles from "@styles/auth.module.scss";
import { AuthLayout, FieldProps } from "@components/auth/AuthLayout";
import googleProvider from "@images/auth/google-provider.png";
import { useAuth } from "@contexts/AuthContext";
import withoutAuth from "hoc/withoutAuth";

export type RegisterInput = {
  email: string;
  password: string;
  verifyPassword: string;
  firstName: string;
  lastName: string;
};

type FieldType = FieldProps & {
  name: keyof RegisterInput;
  size?: number;
  passwordLength?: ValidationRule<number>;
  passwordVerify?: Validate<string>;
};

const Register = () => {
  const { register } = useAuth();
  const [error, setError] = useState<string>();

  const {
    register: linkInput,
    handleSubmit,
    watch,
    formState: { errors: fieldErrors },
  } = useForm<RegisterInput>();

  const fields: Array<FieldType> = [
    {
      name: "lastName",
      type: "text",
      icon: <BiUser size={24} />,
      placeholder: "Nom",
      requiredMessage: "Le nom est obligatoire",
      size: 6,
    },
    {
      name: "firstName",
      type: "text",
      icon: <BiUser size={24} />,
      placeholder: "Prénom",
      requiredMessage: "Le prénom est obligatoire",
      size: 6,
    },
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
      passwordLength: {
        value: 8,
        message: "Le mot de passe doit contenir 8 caractères au minimum.",
      },
    },
    {
      name: "verifyPassword",
      type: "password",
      icon: <BiLockAlt size={24} />,
      placeholder: "Confirmation mot de passe",
      requiredMessage: "La confirmation est obligatoire",
      passwordVerify: (value) => {
        if (value !== watch("password")) {
          return "Les mots de passe ne correspondent pas.";
        }
      },
    },
  ];

  useEffect(() => {
    const subscription = watch(() => setError(undefined));
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<RegisterInput> = (credentials) => {
    register(credentials)
      .then(() => toast.success("Inscription réussie"))
      .catch((err) => setError(err.response?.data?.message));
  };

  return (
    <div>
      <Head>
        <title>Inscription</title>
        <meta name="description" content="Page d'inscription" />
      </Head>

      <AuthLayout>
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Inscription</h2>

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
                  {...linkInput(field.name, {
                    required: field.requiredMessage,
                    ...(field.passwordLength && {
                      minLength: field.passwordLength,
                    }),
                    ...(field.passwordVerify && {
                      validate: field.passwordVerify,
                    }),
                  })}
                />
                <small>{fieldErrors[field.name]?.message}</small>
              </div>
            ))}

            {error && <small className={styles.api_error}>{error}</small>}

            <button type="submit">S&apos;inscrire</button>
            <button type="button" className={styles.provider}>
              <Image
                src={googleProvider}
                alt=""
                layout="fixed"
                height={20}
                width={20}
              />
              S&apos;inscrire avec Google
            </button>

            <p>
              Vous avez déjà un compte ? <Link href="login">Se connecter</Link>
            </p>
          </form>
        </>
      </AuthLayout>
    </div>
  );
};

export default withoutAuth(Register);
