import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InformationStyled } from './information.styled';
// components
import LoadingView from '../../../shared/loadingView/loadingView';
// graphql
import { useQuery } from '@apollo/client';
import { GET_PROFILE_QUERY } from '../graphql/queries';
// interfaces
import { RootState } from '../../../../app/rootReducer';
import { IInitialStateProfile } from '../../../../features/profile/interfaces';
import { IInitialStateAuth } from '../../../../features/auth/interfaces';

const Information: React.FC = () => {
	const dispatch = useDispatch();
	const profile: IInitialStateProfile = useSelector((state: RootState) => state.profile);
	const auth: IInitialStateAuth = useSelector((state: RootState) => state.auth);
	const { loading } = useQuery(GET_PROFILE_QUERY);

	const [ values, setValues ] = useState({
		displayName: '',
		department: '',
		position: '',
		title: '',
	});

	const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setValues({ ...values, [name]: value });
	};

	if (loading) {
		return <LoadingView />;
	}

	return (
		<InformationStyled>
			<div className='information'>
				<div className='information__avatar'>
					<div className='information__avatar__title'>Avatar</div>
					<div className='information__avatar__img'>
						<img
							src='https://i.pinimg.com/474x/82/ab/35/82ab3533ee71daf256f23c1ccf20ad6f--avatar-maker.jpg'
							alt=''
						/>
					</div>
				</div>
				<div className='information__profile'>
					<div className='information__profile__item'>
						<label className='information__profile__item__title'>Name</label>
						<input
							name='name'
							className='information__profile__item__content'
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
							onChange={handleOnChange}
						/>
					</div>
					<div className='information__profile__item'>
						<label className='information__profile__item__title'>Position</label>
						<input
							name='position'
							className='information__profile__item__content'
							value={values.position}
							onChange={handleOnChange}
						/>
					</div>
					<div className='information__profile__item'>
						<label className='information__profile__item__title'>Title</label>
						<input
							name='title'
							className='information__profile__item__content'
							value={values.title}
							onChange={handleOnChange}
						/>
					</div>
				</div>

				<div className='information__button'>
					<button>Update</button>
				</div>
			</div>
		</InformationStyled>
	);
};

export default Information;
