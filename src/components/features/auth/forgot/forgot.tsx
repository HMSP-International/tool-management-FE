import React from 'react';
import { BiMailSend } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import { ForgotStyled } from './forgot.styled';

const Forgot: React.FC = () => {
	return (
		<ForgotStyled>
			<div className='forgot-page__form-title'>
				<h3>Welcome back!</h3>
			</div>
			<div className='forgot-page__form-field'>
				<label htmlFor='youremail'>Email</label>
				<div>
					<BiMailSend className='icon' />
					<input type='text' name='youremail' placeholder='Enter your email' />
				</div>
			</div>
			<div className='forgot-page__form-btn'>
				<button>Send me the link</button>
			</div>
			<div className='forgot-page__form-signin'>
				<Link className='p' to={'/auth/login'}>
					or Sign in
				</Link>
			</div>
		</ForgotStyled>
	);
};

export default Forgot;
