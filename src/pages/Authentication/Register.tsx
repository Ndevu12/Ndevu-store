import React, { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RegisterData } from '../../types/registerType';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { registerUser } from '../../redux/actions/registerAction';
import { resetState } from '../../redux/reducers/registerReducer';
import toast from 'react-hot-toast';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<RegisterData>();

  const dispatch = useDispatch<AppDispatch>();
  const { register: registerResponse, loading, error } = useSelector((state: RootState) => state.register);

  const onSubmit: SubmitHandler<RegisterData> = (userData: RegisterData) => {
    userData.userType = 'Buyer';
    dispatch(registerUser(userData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetState());
    }
    if (registerResponse) {
      toast.success(registerResponse.data.message);
      reset();
      dispatch(resetState());
    }
  }, [error, registerResponse, dispatch, reset]);

  const password = watch('password', '');

  const passwordRequirements = (
    <ul className="text-grey2 text-sm mt-1">
      <li className={password.length >= 8 ? 'text-green-600' : ''}>- At least 8 characters</li>
      <li className={/[A-Z]/.test(password) ? 'text-green-600' : ''}>- One uppercase letter</li>
      <li className={/[a-z]/.test(password) ? 'text-green-600' : ''}>- One lowercase letter</li>
      <li className={/\d/.test(password) ? 'text-green-600' : ''}>- One number</li>
      <li className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-600' : ''}>- One special character</li>
    </ul>
  );

  return (
    <div className="min-h-[100vh] h-auto w-full flex items-center justify-center py-10 px-4  bg-transparent1">
      <form
        className="min-w-[90%] flex flex-col items-center justify-start gap-y-4 bg-white p-12 md:min-w-[500px] md:max-w-[500px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="min-w-[100%] text-black1 text-2xl font-medium">Sign up</h1>

        <div className="mt-2 w-full flex flex-col items-start justify-start gap-y-2">
          <p className="text-black1 text-lg">First name</p>
          <div className="w-full min-h-[50px] flex items-center justify-between gap-x-1 px-4 py-2 border border-grey1 bg-white">
            <input
              className="w-full h-[100%] border-none outline-none bg-white text-grey2 text-lg"
              type="text"
              placeholder="John"
              {...register('firstName', { required: true })}
            />
          </div>
          {errors.firstName && <span className="text-orange">Firstname is required</span>}
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-y-2">
          <p className="text-black1 text-lg">Last name</p>
          <div className="w-full min-h-[50px] flex items-center justify-between gap-x-1 px-4 py-2 border border-grey1 bg-white">
            <input
              className="w-full h-[100%] border-none outline-none bg-white text-grey2 text-lg"
              type="text"
              placeholder="Doe"
              {...register('lastName', { required: true })}
            />
          </div>
          {errors.lastName && <span className="text-orange">Lastname is required</span>}
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-y-2">
          <p className="text-black1 text-lg">Email Address</p>
          <div className="w-full min-h-[50px] flex items-center justify-between gap-x-1 px-4 py-2 border border-grey1 bg-white">
            <input
              className="w-full h-[100%] border-none outline-none bg-white text-grey2 text-lg"
              type="email"
              placeholder="johnDoe@gmail.com"
              {...register('email', { required: true })}
            />
          </div>
          {errors.email && <span className="text-orange">Email is required</span>}
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-y-2">
          <p className="text-black1 text-lg">Phone number</p>
          <div className="w-full min-h-[50px] flex items-center justify-between gap-x-1 px-4 py-2 border border-grey1 bg-white">
            <input
              className="w-full h-[100%] border-none outline-none bg-white text-grey2 text-lg"
              type="text"
              placeholder="0788302145"
              {...register('phoneNumber', { required: true })}
            />
          </div>
          {errors.phoneNumber && <span className="text-orange">Phone number is required</span>}
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-y-2">
          <p className="text-black1 text-lg">Gender</p>
          <div className="w-full min-h-[50px] flex items-center justify-between gap-x-1 px-4 py-2 border border-grey1 bg-white">
            <select
              className="w-full h-[100%] border-none outline-none bg-white text-grey2 text-lg"
              {...register('gender', { required: true })}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-y-2">
          <p className="text-black1 text-lg">Create password</p>
          <div className="w-full min-h-[50px] flex items-center justify-between gap-x-1 px-4 py-2 border border-grey1 bg-white">
            <input
              className="w-full h-[100%] border-none outline-none bg-white text-grey2 text-lg"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long'
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                  message: 'Password must include uppercase, lowercase, number, and special character'
                }
              })}
            />
            {showPassword ? (
              <EyeOff
                data-testid="eye-icon"
                strokeWidth={1.5}
                className="text-grey2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <Eye
                data-testid="eye-icon"
                strokeWidth={1.5}
                className="text-grey2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          {password && passwordRequirements}
          {errors.password && <span className="text-orange">{errors.password.message}</span>}
        </div>

        <button
          type={loading ? 'button' : 'submit'}
          className={`w-full min-h-[50px] flex items-center justify-center bg-primary text-white text-2xl font-medium mt-2 ${loading ? 'cursor-not-allowed' : 'cu'}`}
        >
          {loading ? 'Loading...' : 'Register'}
        </button>

        <p className="text-small text-black1 md:text-lg">
          Already have an account?{' '}
          <a href="/login" className="ml-1 text-orange">
            login here
          </a>
        </p>

        <p className="text-small text-black1 md:text-lg">
          <a href="/register-vendor" className="ml-1 text-orange">
            Become a vendor
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;
