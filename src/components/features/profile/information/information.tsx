import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CHANGE_INFORMATION_MUTAIION } from 'apis/profile/mutations';
// components
import Image from 'components/shared/image/image';
// helpers
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
// Redux
import { useSelector } from 'react-redux';
import { RootState } from 'global/redux/rootReducer';
// Interfaces
import { IInitialStateUser } from 'slices/user/interfaces';
import { InformationStyled } from './information.styled';
import LoadingView from '../../../shared/loadingView/loadingView';

const Information: React.FC = () => {
	const [ onChangeInformation, { loading } ] = useMutation(CHANGE_INFORMATION_MUTAIION);
	const userRedux: IInitialStateUser = useSelector((state: RootState) => state.user);
	const [ isSubmit, setIsSubmit ] = useState(true);
	const [ values, setValues ] = useState({
		displayName: '',
		department: '',
		position: '',
		title: '',
	});

	useEffect(
		() => {
			const profile = userRedux.profile;
			setValues(profile);
		},
		[ userRedux ],
	);

	useEffect(
		() => {
			setIsSubmit(userRedux.profile.displayName !== values.displayName);
		},
		[ values, userRedux.profile ],
	);

	if (loading) return <LoadingView />;
	// handle event --------------------------------------------------------------
	const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = async () => {
		const { isError } = await fetchDataAndShowNotify({
			fnFetchData: onChangeInformation,
			variables:
				{
					changeInformationInput:
						{
							displayName: values.displayName,
						},
				},
		});

		if (isError) {
			setValues(userRedux.profile);
		}
	};

	return (
		<InformationStyled>
			<div className='information'>
				<div className='information__avatar'>
					<div className='information__avatar__title'>Avatar</div>
					<div className='information__avatar__img'>
						<Image w={50} h={50} public_id={userRedux.profile.avatar} />
					</div>
				</div>
				<div className='information__profile'>
					<div className='information__profile__item'>
						<label className='information__profile__item__title'>Name</label>
						<input
							name='displayName'
							className='information__profile__item__content-public'
							value={values.displayName}
							onChange={handleOnChange}
						/>
					</div>
					<div className='information__profile__item'>
						<label className='information__profile__item__title'>Department</label>
						<input
							name='department'
							className='information__profile__item__content'
							value={values.department}
							readOnly
						/>
					</div>
					<div className='information__profile__item'>
						<label className='information__profile__item__title'>Position</label>
						<input
							name='position'
							className='information__profile__item__content'
							value={values.position}
							readOnly
						/>
					</div>
					<div className='information__profile__item'>
						<label className='information__profile__item__title'>Title</label>
						<input
							name='title'
							className='information__profile__item__content'
							value={values.title}
							readOnly
						/>
					</div>
				</div>

				<div className={isSubmit ? 'information__button__suscess' : 'information__button'}>
					<button onClick={handleSubmit}>Update</button>
				</div>
			</div>
		</InformationStyled>
	);
};

export default Information;
