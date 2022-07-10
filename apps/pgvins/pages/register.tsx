import Head from "next/head";
import { useForm, SubmitHandler } from "react-hook-form";

type RegisterInput = {
  email: string;
  password: string;
  verifyPassword: string;
  firstName: string;
  lastName: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>();

  const onSubmit: SubmitHandler<RegisterInput> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Head>
        <title>Connexion</title>
        <meta name="description" content="Page de connexion" />
      </Head>
      <ul>
        {errors.email && <li>{errors.email.message}</li>}
        {errors.firstName && <li>{errors.firstName.message}</li>}
        {errors.lastName && <li>{errors.lastName.message}</li>}
        {errors.password && <li>{errors.password.message}</li>}
        {errors.verifyPassword && <li>{errors.verifyPassword.message}</li>}
      </ul>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          style={{ display: "block" }}
          placeholder="Email"
          {...register("email", { required: "Email requise" })}
        />

        <input
          type="text"
          placeholder="Prénom"
          style={{ display: "block" }}
          {...register("firstName", {
            required: "Prénom requis.",
          })}
        />

        <input
          type="text"
          placeholder="Nom"
          style={{ display: "block" }}
          {...register("lastName", {
            required: "Nom requis.",
          })}
        />

        <input
          type="password"
          style={{ display: "block" }}
          placeholder="Mot de passe"
          {...register("password", {
            required: "Mot de passe requis.",
            minLength: {
              value: 8,
              message: "Le mot de passe doit contenir 8 caractères au minimum.",
            },
          })}
        />

        <input
          type="password"
          style={{ display: "block" }}
          placeholder="Vérifier le mot de passe."
          {...register("verifyPassword", {
            required: "Vérifiez votre mot de passe.",
            validate: (value) => {
              if (value !== watch("password")) {
                return "Les mots de passe ne correspondent pas.";
              }
            },
          })}
        />

        <input type="submit" />
      </form>
    </div>
  );
};

export default Register;
