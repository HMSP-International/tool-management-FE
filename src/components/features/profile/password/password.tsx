import React from 'react';
import { PasswordStyled } from './password.styled';
const Password: React.FC = () => {
	return (
		<PasswordStyled>
			<div className='password__form'>
				<div className='password__form__item'>
					<label className='password__form__title'>New Password</label>
					<input className='password__form__content' type='password' />
				</div>
				<div className='password__form__item'>
					<label className='password__form__title'>Comfirm Password</label>
					<input className='password__form__content' type='password' />
				</div>
				<div className='password__form__item'>
					<label className='password__form__title'>Current Password</label>
					<input className='password__form__content' type='password' />
				</div>
			</div>

			<div className='password__button'>
				<button>Update</button>
			</div>
		</PasswordStyled>
	);
};

export default Password;
