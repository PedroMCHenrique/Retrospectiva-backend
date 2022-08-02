import {
  forwardRef,
  ForwardRefRenderFunction,
  useState,
  InputHTMLAttributes,
  useCallback,
} from 'react';
import { FieldError } from 'react-hook-form';
import { IconType } from 'react-icons';
import { FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  Icon?: IconType;
  isPassword?: boolean;
  error?: FieldError;
  showPassword?: () => void;
  isShowingPassword?: boolean;
}

const InputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  CustomInputProps
> = (
  {
    label,
    Icon,
    isPassword = false,
    error,
    showPassword,
    isShowingPassword = false,
    ...rest
  },
  ref
) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = (event: any) => {
    setIsFocused(false);
    setIsFilled(!!event.target.value);
  };

  return (
    <div className="flex flex-col w-full mb-6">
      <label className="text-white">{label}</label>
      <div
        className={` border-transparent
        ${isFocused && '!border-green'} 
        ${
          error && '!border-red-400'
        } border-2  relative  rounded w-full px-4 flex h-16 bg-[#ffffff24] items-center`}
      >
        {Icon && (
          <Icon
            size={24}
            className={` ${isFilled ? 'text-green' : 'text-gray-400'} ${
              error && 'text-red-400'
            }`}
          />
        )}

        <input
          {...rest}
          className={`h-16 bg-transparent text-slate-50 border-2 border-transparent rounded  outline-none block w-full px-4`}
          placeholder={label}
          ref={ref}
          onFocus={handleInputFocus}
          onBlur={(event) => handleInputBlur(event)}
        />

        {isPassword &&
          (!isShowingPassword ? (
            <FiEye onClick={showPassword} size="24" className="text-gray-400 hover:text-green" />
          ) : (
            <FiEyeOff onClick={showPassword} size="24" className="text-gray-400 hover:text-green" />
          ))}
      </div>
      {error && (
        <div className="flex items-center mt-1 text-red-400">
          <FiAlertCircle className="mr-2 " />
          <p className="text-sm">{error.message}</p>
        </div>
      )}
    </div>
  );
};

export const CustomInput = forwardRef(InputBase);
