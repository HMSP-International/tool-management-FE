import React from 'react';
import { EmailStyled } from './email.styled';

const Email: React.FC = () => {
	return (
		<EmailStyled>
			<div className='email__form'>
				<label className='email__form__title'>Email</label>
				<input className='email__form__content' value={'Huy.hmsp@gmail.com'} readOnly />
			</div>
			<div className='email__form'>
				<label className='email__form__title'>Verify</label>
				<label className='email__form__content'>Yes</label>
			</div>

			<div className='email__button'>
				<button>Update</button>
			</div>
		</EmailStyled>
	);
};

export default Email;
