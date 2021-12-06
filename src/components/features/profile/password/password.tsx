import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import LoadingView from '../../../shared/loadingView/loadingView';
import { CHANGE_PASSWORD_MUTAIION } from '../../../../apis/profile/mutations';
import { PasswordStyled } from './password.styled';
import { openNotification } from '../../../../global/helpers/notification';
import { handleApolloError } from '../../../../global/helpers/apolloError';

const Password: React.FC = () => {
	const [ onLogin, { loading } ] = useMutation(CHANGE_PASSWORD_MUTAIION);
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

	const sendPasswordToServer = async () => {
		try {
			await onLogin({
				variables:
					{
						changePasswordInput:
							{
								newPassword: values.newPassword,
								currentPassword: values.currentPassword,
							},
					},
			});

			openNotification({
				title: 'Susscessfully',
				extensions: [ 'changed password' ],
			});
		} catch (error) {
			const showing = handleApolloError(error);
			openNotification(showing, true);
		}
	};

	const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = async () => {
		sendPasswordToServer();
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