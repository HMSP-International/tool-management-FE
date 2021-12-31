import React, { useEffect, useState } from 'react';
// graphql
import { useMutation } from '@apollo/client';
import { CHANGE_PASSWORD_MUTAIION } from 'apis/profile/mutations';
// components
import LoadingView from '../../../shared/loadingView/loadingView';
import { PasswordStyled } from './password.styled';
// helpers
import { fetchDataAndShowNotify } from '../../../../helpers/graphql/fetchDataAndShowNotify';

const Password: React.FC = () => {
	const [ onChangePassword, { loading } ] = useMutation(CHANGE_PASSWORD_MUTAIION);
	const [ isSubmit, setIsSubmit ] = useState(false);
	const [ values, setValues ] = useState({
		currentPassword: '',
		newPassword: '',
		comfirmPassword: '',
	});

	useEffect(
		() => {
			const { currentPassword, newPassword, comfirmPassword } = values;
			setIsSubmit(newPassword === comfirmPassword && currentPassword.length >= 6);
		},
		[ values ],
	);

	if (loading) return <LoadingView />;

	const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = async () => {
		await fetchDataAndShowNotify({
			fnFetchData: onChangePassword,
			variables:
				{
					changePasswordInput:
						{
							newPassword: values.newPassword,
							currentPassword: values.currentPassword,
						},
				},
			message: 'Changed password',
		});
	};

	return (
		<PasswordStyled>
			<div className='password__form'>
				<div className='password__form__item'>
					<label className='password__form__title'>New Password</label>
					<input
						className='password__form__content'
						type='password'
						name='newPassword'
						onChange={handleOnChange}
					/>
				</div>
				<div className='password__form__item'>
					<label className='password__form__title'>Comfirm Password</label>
					<input
						className='password__form__content'
						type='password'
						name='comfirmPassword'
						onChange={handleOnChange}
					/>
				</div>
				<div className='password__form__item'>
					<label className='password__form__title'>Current Password</label>
					<input
						className='password__form__content'
						type='password'
						name='currentPassword'
						onChange={handleOnChange}
					/>
				</div>
			</div>

			<div className={isSubmit ? 'password__button__sucess' : 'password__button'}>
				<button onClick={handleSubmit}>Update</button>
			</div>
		</PasswordStyled>
	);
};

export default Password;
