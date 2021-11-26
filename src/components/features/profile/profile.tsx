import React, { useRef, useState } from 'react';
import { ProfileStyled } from './profile.styled';

import Email from './email/email';
import Information from './information/information';
import Password from './password/password';

const Profile: React.FC = () => {
	const [ currentTab, setCurrentTab ] = useState(0);
	const tabRef = useRef([ <Information />, <Email />, <Password /> ]);

	const handleChooseTab = (id: number) => {
		setCurrentTab(id);
	};

	const renderClassName = (id: number) => {
		const classNameGroupTab = 'profile-page__header__group-tab__item';
		return currentTab === id ? classNameGroupTab + ' border-bottom' : classNameGroupTab;
	};
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
