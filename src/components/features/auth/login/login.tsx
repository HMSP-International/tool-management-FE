import React from 'react';
import { BiMailSend } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { LoginStyled } from './login.styled';

const Login: React.FC = () => {
	return (
		<LoginStyled>
			<div className='login-page__form-title'>
				<h3>Welcome back!</h3>
			</div>
			<div className='login-page__form-field'>
				<label htmlFor='youremail'>Email</label>
				<div>
					<BiMailSend className='icon' />
					<input type='text' name='youremail' placeholder='Enter your email' />
				</div>
			</div>
			<div className='login-page__form-field login-page__form-password'>
				<label htmlFor='password'>Password</label>
				<div>
					<BiMailSend className='icon' />
					<input type='password' name='password' placeholder='Enter password' />
				</div>
			</div>
			<div className='login-page__form-btn'>
				<button>Log In</button>
			</div>
			<div className='login-page__form-forget'>
				<Link className='p' to={'/auth/forgot'}>
					or Sign in
				</Link>
			</div>
		</LoginStyled>
	);
};

export default Login;
