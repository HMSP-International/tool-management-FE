import React, { useRef, useState } from 'react';
import { BiMailSend } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { mainRouterPage } from 'global/routes/page';
import { ForgotStyled } from './forgot.styled';
const NAME_INPUT = {
	password: 'password',
	email: 'youremail',
};

const validation: { (T: string, Q: string): boolean } = (value: string, name: string) => {
	if (name === NAME_INPUT.email) {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(value).toLowerCase());
	}
	else {
		return true;
	}
};

const Forgot: React.FC = () => {
	const [ isValidEmail, setIsValidEmail ] = useState(true);
	const inputEmailRef = useRef<HTMLInputElement>(null);

	const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;

		const isValid = validation(value, name);

		if (name === NAME_INPUT.email) {
			setIsValidEmail(isValid);
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
		if (inputEmailRef.current) {
			if (inputEmailRef.current.value.length === 0) {
				setIsValidEmail(false);
				return;
			}
		}

		console.log('submited');
	};

	return (
		<ForgotStyled>
			<div className='forgot-page__form-title'>
				<h3>Welcome back!</h3>
			</div>
			<div className='forgot-page__form-field'>
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
			<div className='forgot-page__form-btn'>
				<button onClick={handleSubmit}>Send me the link</button>
			</div>
			<div className='forgot-page__form-signin'>
				<Link className='p' to={`/${mainRouterPage.auth.login}`}>
					or Sign in
				</Link>
			</div>
		</ForgotStyled>
	);
};

export default Forgot;
