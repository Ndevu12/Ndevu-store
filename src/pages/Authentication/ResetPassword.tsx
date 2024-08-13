import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { resetPassword } from '../../redux/actions/passwordResetActions';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetState } from '../../redux/reducers/passwordResetReducer';
import toast from 'react-hot-toast';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

interface ResetPasswordData {
  newPassword: string;
  confirmPassword: string;
}

export const ResetPassword: React.FC = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, resetPassword: registerResponse } = useSelector((state: RootState) => state.password);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<ResetPasswordData>();

  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const userId = params.get('userid');
  const email = params.get('email');

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetState());
    }
    if (registerResponse) {
      toast.success(registerResponse.data.message);
      reset();
      dispatch(resetState());
      navigate('/login');
    }
  }, [error, registerResponse, dispatch, reset, navigate]);

  const onSubmit: SubmitHandler<ResetPasswordData> = () => {
    if (!userId || !email) return toast.error('Password reset link is required');

    dispatch(resetPassword({ email, userId, confirmPassword: confirmPass, newPassword: password }));
  };

  const password = watch('newPassword', '');
  const confirmPass = watch('confirmPassword', '');

  const passwordRequirements = (
    <ul className="text-grey2 text-sm mt-1">
      <li className={password.length >= 8 ? 'text-green-600' : ''}>- At least 8 characters</li>
      <li className={/[A-Z]/.test(password) ? 'text-green-600' : ''}>- One uppercase letter</li>
      <li className={/[a-z]/.test(password) ? 'text-green-600' : ''}>- One lowercase letter</li>
      <li className={/\d/.test(password) ? 'text-green-600' : ''}>- One number</li>
      <li className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-600' : ''}>- One special character</li>
    </ul>
  );

  const isEmailValid = password !== '' && confirmPass !== '';

  return (
    <div className="min-h-[100vh] h-auto w-full flex items-center justify-center py-10 px-4  bg-transparent1">
      <form
        className="min-w-[90%] flex flex-col items-center justify-start gap-y-4 bg-white p-12 md:min-w-[500px] md:max-w-[500px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex flex-col items-start justify-start gap-y-2">
          <h1 className="text-black1 font-Poppins text-2xl">Reset your password</h1>
          <p className="text-black1 text-sm">New password</p>
          <div className="w-full min-h-[50px] flex items-center justify-between gap-x-1 px-4 py-2 border border-grey1 bg-white">
            <input
              className="w-full h-[100%] border-none outline-none bg-white text-grey2 text-lg"
              data-testid="newPassword"
              type={showNewPassword ? 'text' : 'password'}
              placeholder="----------"
              {...register('newPassword', {
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
            {showNewPassword ? (
              <EyeOff
                data-testid="eye-icon"
                strokeWidth={1.5}
                className="text-grey2 cursor-pointer"
                onClick={() => setShowNewPassword(!showNewPassword)}
              />
            ) : (
              <Eye
                data-testid="eye-icon"
                strokeWidth={1.5}
                className="text-grey2 cursor-pointer"
                onClick={() => setShowNewPassword(!showNewPassword)}
              />
            )}
          </div>
          {password && passwordRequirements}
          {errors.newPassword && <span className="text-orange">{errors.newPassword.message}</span>}

          <p className="text-black1 text-sm">Confirm password</p>
          <div className="w-full min-h-[50px] flex items-center justify-between gap-x-1 px-4 py-2 border border-grey1 bg-white">
            <input
              className="w-full h-[100%] border-none outline-none bg-white text-grey2 text-lg"
              type={showConfirmPassword ? 'text' : 'password'}
              data-testid="confirmPassword"
              placeholder="----------"
              {...register('confirmPassword', {
                required: 'Password confirmation is required',
                validate: (value) => value === password || 'Passwords do not match'
              })}
            />
            {showConfirmPassword ? (
              <EyeOff
                data-testid="eye-icon2"
                strokeWidth={1.5}
                className="text-grey2 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            ) : (
              <Eye
                data-testid="eye-icon2"
                strokeWidth={1.5}
                className="text-grey2 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            )}
          </div>
          {errors.confirmPassword && <span className="text-orange">{errors.confirmPassword.message}</span>}
        </div>
        <button
          type={loading ? 'button' : 'submit'}
          disabled={!isEmailValid || loading}
          className={`w-full min-h-[50px] flex items-center rounded-3xl justify-center bg-primary text-white text-lg font-medium mt-2 ${loading ? 'cursor-not-allowed' : ''}`}
        >
          {loading ? 'Loading...' : 'Reset Password'}
        </button>

        <p className="text-sm text-black1 md:text-base">
          Remember your credentials?{' '}
          <a href="/login" className="ml-1 text-orange">
            login here
          </a>
        </p>
      </form>
    </div>
  );
};
