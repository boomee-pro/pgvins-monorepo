import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import {
  useForm,
  SubmitHandler,
  ValidationRule,
  Validate,
} from "react-hook-form";
import { Row, Col } from "react-grid-system";
import { BiEnvelope, BiLockAlt, BiUser } from "react-icons/bi";

import styles from "@styles/auth.module.scss";
import { AuthLayout, FieldProps } from "@components/auth/AuthLayout";
import googleProvider from "@images/auth/google-provider.png";

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

  const onSubmit: SubmitHandler<RegisterInput> = (data) => {
    console.log(data);
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

export default Register;
