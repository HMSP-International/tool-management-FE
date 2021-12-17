import React, { useState, useRef } from 'react';
import { BiMailSend } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
// components
import { LoginStyled } from './login.styled';
import LoadingView from '../../../shared/loadingView/loadingView';
// graphql
import { LOGIN_MUTAIION } from 'apis/auth/mutaions';
import { useMutation } from '@apollo/client';
// redux
import { useDispatch } from 'react-redux';
import { login } from 'slices/auth/slice';
// helpers
import { fetchDataAndShowNotify } from 'global/helpers/graphql/fetchDataAndShowNotify';

const NAME_INPUT = {
	password: 'password',
	email: 'youremail',
};

const validation: { (T: string, Q: string): boolean } = (value: string, name: string) => {
	if (name === NAME_INPUT.email) {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(value).toLowerCase());
	}
	else if (name === NAME_INPUT.password) {
		return value.length === 0 ? false : true;
	}
	return true;
};

const Login: React.FC = () => {
	const [ isValidEmail, setIsValidEmail ] = useState(true);
	const [ isValidPass, setIsValidPass ] = useState(true);
	const inputEmailRef = useRef<HTMLInputElement>(null);
	const inputPasswordRef = useRef<HTMLInputElement>(null);
	const [ onLogin, { loading } ] = useMutation(LOGIN_MUTAIION);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	if (loading) return <LoadingView />;

	const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;

		const isValid = validation(value, name);

		if (name === NAME_INPUT.email) {
			setIsValidEmail(isValid);
		}
		else if (name === NAME_INPUT.password) {
			setIsValidPass(isValid);
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
		let isValid = true;

		if (inputPasswordRef.current) {
			if (inputPasswordRef.current.value.length === 0) {
				setIsValidPass(false);
				isValid = false;
			}
		}
		if (inputEmailRef.current) {
			if (inputEmailRef.current.value.length === 0) {
				setIsValidEmail(false);
				isValid = false;
			}
		}
		if (!isValid) {
			return;
		}

		handleSaveTokenToLocalStorage();
	};

	const handleSaveTokenToLocalStorage = async () => {
		let email = '';
		let password = '';

		if (inputEmailRef.current !== null && inputPasswordRef.current !== null) {
			email = inputEmailRef.current.value;
			password = inputPasswordRef.current.value;
		}

		const { data, isError } = await fetchDataAndShowNotify({
			fnFetchData: onLogin,
			variables:
				{
					signinInput:
						{
							email,
							password,
						},
				},
			message: 'Logined',
		});

		if (!isError) {
			dispatch(login(data));
			navigate('/', { replace: true });
		}
	};

	return (
		<LoginStyled>
			<div className='login-page__form-title'>
				<h3>Welcome back!</h3>
			</div>
			<div className='login-page__form-field'>
				<label htmlFor='youremail'>Email</label>
				<div>
					<BiMailSend className={isValidEmail ? 'icon' : 'icon text-error'} />
					<input
						type='text'
						name={NAME_INPUT.email}
						placeholder='Enter your email'
						onChange={handleChangeInput}
						className={isValidEmail ? '' : 'border-error'}
						ref={inputEmailRef}
					/>
				</div>
				{!isValidEmail && <p className='text-error'>Your email invalid!!</p>}
			</div>
			<div className='login-page__form-field login-page__form-password'>
				<label htmlFor='password'>Password</label>
				<div>
					<BiMailSend className={isValidPass ? 'icon' : 'icon text-error'} />
					<input
						type='password'
						name={NAME_INPUT.password}
						placeholder='Enter password'
						onChange={handleChangeInput}
						ref={inputPasswordRef}
					/>
				</div>
				{!isValidPass && <p className='text-error'>Please enter your password!!</p>}
			</div>
			<div className='login-page__form-btn'>
				<button onClick={handleSubmit}>Log In</button>
			</div>
			<div className='login-page__form-forget'>
				<Link className='p' to={'/auth/forgot'}>
					forgot password???
				</Link>
			</div>
		</LoginStyled>
	);
};

export default Login;
