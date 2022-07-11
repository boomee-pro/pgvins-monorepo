import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import { useForm, SubmitHandler } from "react-hook-form";
import { BiEnvelope, BiLockAlt } from "react-icons/bi";

import styles from "@styles/auth.module.scss";
import { AuthLayout, FieldProps } from "@components/AuthLayout";

export type LoginInput = {
  email: string;
  password: string;
};

export type FieldTypes = FieldProps & { name: keyof LoginInput };

const Login = () => {
  const {
    register: linkInput,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  const fields: Array<FieldTypes> = [
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

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    console.log(data);
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
                errors[field.name] && styles.error
              )}
            >
              {field.icon}
              <input
                type={field.type}
                placeholder={field.placeholder}
                {...linkInput(field.name, { required: field.requiredMessage })}
              />
              <small>{errors[field.name]?.message}</small>
            </div>
          ))}

          <Link href="forgot-password">Mot de passe oublié ?</Link>

          <button type="submit">Se connecter</button>

          <p>
            Vous n&apos;avez pas encore de compte ?{" "}
            <Link href="register">S&apos;inscrire</Link>
          </p>
        </form>
      </AuthLayout>
    </>
  );
};

export default Login;
