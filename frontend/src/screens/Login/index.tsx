import { useState } from 'react';
import { FiLock, FiMail, FiSend } from 'react-icons/fi';
import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import logoTrybe from '../../assets/logo-dark-green.svg';
import bondinho from '../../assets/bondinho.jpg';
import logoExpress from '../../assets/logo-expresso17.svg';
import { CustomInput } from '../../components/Input';
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

interface LoginFormData {
  email: string;
  password: string;
}

const loginSchema = object({
  email: string().required('E-mail obrigatório').email('E-mail inválido'),
  password: string()
    .required('Senha obrigatória')
    .min(6, 'No mínimo 6 caracteres'),
}).required();

export function Login() {
  const { signIn } = useAuth();

  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (dataForm: LoginFormData) => {
    signIn(dataForm);
  };

  function showPassword() {
    setIsShowingPassword(!isShowingPassword);
  }

  return (
    <div className="flex h-screen">
      <div className="md:hidden lg:flex flex-1 flex-col justify-between items-center">
        <img
          className="w-[20%] my-[100px]"
          src={logoTrybe}
          alt="Logo da Trybe com letras escuras"
        />
        <img
          className="lg:w-[80%] xl:w-[50%]"
          src={bondinho}
          alt="Mulher no Rio de Janeiro perto do morro pão de açúcar"
        />
      </div>
      <div className="md:w-full lg:max-w-2xl flex flex-col items-center p-16 bg-green-900">
        <img
          className="sm:w-[40%] lg:w-[60%] mb-16"
          src={logoExpress}
          alt="Logo da expresso 17"
        />

        <div className="sm:hidden xl:block bg-green w-full h-px mb-12"></div>
        <h1 className="text-6xl mb-6 text-white">Login</h1>
        <form
          autoComplete="off"
          autoCapitalize="off"
          className="w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <CustomInput
            label="E-mail"
            Icon={FiMail}
            {...register('email')}
            error={errors.email}
          />
          <CustomInput
            isPassword
            label="Senha"
            type={isShowingPassword ? 'text' : 'password'}
            Icon={FiLock}
            {...register('password')}
            error={errors.password}
            showPassword={showPassword}
            isShowingPassword={isShowingPassword}
          />

          <div className="flex items-center justify-between">
            <Link to="/register" className="text-white hover:text-green">
              criar uma conta
            </Link>
            <Button title="Entrar" icon={<FiSend />} />
          </div>
        </form>
      </div>
    </div>
  );
}
