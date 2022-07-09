import { useForm, SubmitHandler } from "react-hook-form";

type LoginInput = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginInput>();

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" defaultValue="test@mail.com" {...register("email")} />
      <input
        type="password"
        defaultValue="test@mail.com"
        {...register("email", { required: true })}
      />
    </form>
  );
};

export default LoginPage;
