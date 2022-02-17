import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CHANGE_INFORMATION_MUTAIION } from 'apis/profile/mutations';
// components
import Image from 'components/shared/image/image';
// helpers
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'global/redux/rootReducer';
// Interfaces
import { IInitialStateUser } from 'slices/user/interfaces';
import { InformationStyled } from './information.styled';
import LoadingView from '../../../shared/loadingView/loadingView';
import { setNewAvatar } from 'slices/user/slice';
import { CHANGE_AVATAR_MUTATION } from 'apis/users/mutations';

const Information: React.FC = () => {
	const dispatch = useDispatch();

	const [ onChangeInformation, { loading: loadingChangeInformation } ] = useMutation(CHANGE_INFORMATION_MUTAIION);
	const [ onChangeAvatar, { loading: loadingChangeAvatar } ] = useMutation(CHANGE_AVATAR_MUTATION);
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

	if (loadingChangeInformation) return <LoadingView />;
	// handle event --------------------------------------------------------------
	const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = async () => {
		const { isError } = await fetchDataAndShowNotify({
			fnFetchData: onChangeInformation,
			variables: { changeInformationInput: { displayName: values.displayName } },
		});

		if (isError) {
			setValues(userRedux.profile);
		}
	};

	const handleChangeAvatar = (e: any) => {
		let file = e.target.files[0];

		let reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onloadend = function () {
			if (reader.result) {
				postNewAvatar(reader.result);
			}
		};
	};

	const postNewAvatar = async (image: string | ArrayBuffer) => {
		const { isError, data } = await fetchDataAndShowNotify({
			fnFetchData: onChangeAvatar,
			variables: { changeAvatarInput: { avatar: image } },
		});

		if (isError) {
			dispatch(setNewAvatar(data));
		}
	};

	return (
		<InformationStyled>
			<div className='information'>
				<div className='information__avatar'>
					<div className='information__avatar__title'>Avatar</div>
					<div className='information__avatar__img'>
						{loadingChangeAvatar === true ? (
							<LoadingView />
						) : (
							<React.Fragment>
								<label htmlFor='change-avatar'>
									<Image w={50} h={50} public_id={userRedux.profile.avatar} />
								</label>
								<input
									id='change-avatar'
									name='avatar'
									type='file'
									style={{ display: 'none' }}
									onChange={handleChangeAvatar}
								/>
							</React.Fragment>
						)}
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
