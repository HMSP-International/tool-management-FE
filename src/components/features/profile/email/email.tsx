import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'global/redux/rootReducer';
import { IInitialStateUser } from 'slices/user/interfaces';
import { EmailStyled } from './email.styled';
// graphql
import { CHANGE_EMAIL_MUTATION } from 'apis/users/mutations';
import { useMutation } from '@apollo/client';
import LoadingView from 'components/shared/loadingView/loadingView';
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
import { setEmail } from 'slices/user/slice';

const Email: React.FC = () => {
	const userRedux: IInitialStateUser = useSelector((state: RootState) => state.user);
	const [ values, setValues ] = useState({ newEmail: '', password: '' });
	const [ onChangeEmail, { loading: loadingChangeEmail } ] = useMutation(CHANGE_EMAIL_MUTATION);
	const dispatch = useDispatch();

	useEffect(
		() => {
			const profile = userRedux.profile;
			setValues({ ...values, newEmail: profile.email });
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ userRedux ],
	);

	// handle event --------------------------------------------------------------
	const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = async () => {
		const { isError, data } = await fetchDataAndShowNotify({
			fnFetchData: onChangeEmail,
			variables: { changeEmailInput: { ...values } },
		});

		if (!isError) {
			dispatch(setEmail(data));
			setValues({ newEmail: data.email, password: '' });
		}
	};

	if (loadingChangeEmail) return <LoadingView />;

	return (
		<EmailStyled>
			<div className='group__form'>
				<div className='group__form__item'>
					<label className='group__form__item__title'>Email</label>
					<input
						className='group__form__item__content'
						onChange={handleOnChange}
						value={values.newEmail}
						name='newEmail'
					/>
				</div>

				{userRedux.profile.email !== values.newEmail && (
					<div className='group__form__item'>
						<label className='group__form__item__title'>Comfirm password</label>
						<input
							className='group__form__item__content'
							onChange={handleOnChange}
							value={values.password}
							name='password'
							type='password'
						/>
					</div>
				)}
			</div>

			<div className={userRedux.profile.email !== values.newEmail ? 'button-update__suscess' : 'button-update'}>
				<button onClick={handleSubmit}>Update</button>
			</div>
		</EmailStyled>
	);
};

export default Email;
