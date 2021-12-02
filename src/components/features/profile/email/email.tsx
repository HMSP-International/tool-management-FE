import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/rootReducer';
import { IInitialStateUser } from '../../../../slices/user/interfaces';
import { EmailStyled } from './email.styled';

const Email: React.FC = () => {
	const userRedux: IInitialStateUser = useSelector((state: RootState) => state.user);
	const [ values, setValues ] = useState({ email: '' });

	useEffect(
		() => {
			const profile = userRedux.profile;
			setValues(profile);
		},
		[ userRedux ],
	);

	// handle event --------------------------------------------------------------
	const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setValues({ ...values, [name]: value });
	};

	return (
		<EmailStyled>
			<div className='email__form'>
				<label className='email__form__title'>Email</label>
				<input
					className='email__form__content'
					onChange={handleOnChange}
					value={values.email}
				/>
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
