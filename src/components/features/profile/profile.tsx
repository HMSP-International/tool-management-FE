import React, { useRef, useState, useEffect } from 'react';
import { ProfileStyled } from './profile.styled';
// redux
import { useDispatch } from 'react-redux';
import { getProfile } from 'slices/user/slice';
// components
import Email from './email/email';
import Information from './information/information';
import Password from './password/password';
import LoadingView from 'components/shared/loadingView/loadingView';
// graphql
import { useQuery } from '@apollo/client';
import { GET_PROFILE_QUERY } from 'apis/profile/queries';
// interfaces
import { IInitialStateProfile } from 'slices/user/interfaces';

const Profile: React.FC = () => {
	const dispatch = useDispatch();

	const { loading, data, error } = useQuery(GET_PROFILE_QUERY);

	const [ currentTab, setCurrentTab ] = useState(0);
	const tabRef = useRef([ <Information />, <Email />, <Password /> ]);

	const handleChooseTab = (id: number) => {
		setCurrentTab(id);
	};

	const renderClassName = (id: number) => {
		const classNameGroupTab = 'profile-page__header__group-tab__item';
		return currentTab === id ? classNameGroupTab + ' border-bottom' : classNameGroupTab;
	};

	// hook ----------------------------------------------------------------------
	useEffect(
		() => {
			if (!data) return;
			const profile: IInitialStateProfile = data.getProfile;

			dispatch(getProfile(profile));
		},
		[ data, dispatch ],
	);

	// render
	if (loading) {
		return <LoadingView />;
	}
	if (error) return null;

	return (
		<ProfileStyled>
			<section className='profile-page'>
				<section className='profile-page__header'>
					<div className='profile-page__header__group-tab'>
						<div className={renderClassName(0)} onClick={() => handleChooseTab(0)}>
							Information
						</div>
						<div className={renderClassName(1)} onClick={() => handleChooseTab(1)}>
							Email
						</div>
						<div className={renderClassName(2)} onClick={() => handleChooseTab(2)}>
							Password
						</div>
					</div>
				</section>
				<section className='profile-page__body'>{tabRef.current[currentTab]}</section>
			</section>
		</ProfileStyled>
	);
};

export default Profile;
