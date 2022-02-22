import React, { useState } from 'react';
// import { AiFillCloseSquare } from 'react-icons/ai';
// graphql
// components
import Image from 'components/shared/image/image';
import { ICustomerDashboard } from 'slices/dashboard/interfaces';
import { ManageProjectForCustomerStyled } from './manageProject.styled';
import ListSpaceAndProjectDD from 'components/elements/dropDown/listSpaceAndProjectDD/listSpaceAndProjectDD';
// helpers
// redux
import { useSelector } from 'react-redux';
// interfaces
// import { IProject } from 'slices/project/interfaces';
import { RootState } from 'global/redux/rootReducer';
import { IInitialStateSpace } from 'slices/space/interfaces';
import { IInitialStateProject } from 'slices/project/interfaces';

const classNames = {
	menuInvited: 'menu__li-invited',
	menuDisabled: 'menu__li-disable',
};

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	customer: ICustomerDashboard;
}

const ManageProjectForCustomer: React.FC<IProps> = ({ hidden, setHidden, customer }) => {
	const spaceRedux: IInitialStateSpace = useSelector((state: RootState) => state.space);
	const projectRedux: IInitialStateProject = useSelector((state: RootState) => state.project);
	const [ dropdownIndex, setDropdownIndex ] = useState(-1);
	// const [ projectsInvited, setProjectsInvited ] = useState<IProject[]>([]);

	const handleSetDropdownIndex = (index: number) => {
		if (dropdownIndex === index) setDropdownIndex(-1);
		else setDropdownIndex(index);
	};

	const handleChangeColor = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
		const className = e.currentTarget.className;

		if (className === classNames.menuInvited) {
			e.currentTarget.className = classNames.menuDisabled;
		}
		else if (className === classNames.menuDisabled) {
			e.currentTarget.className = classNames.menuInvited;
		}
	};

	return (
		<ManageProjectForCustomerStyled
			centered
			visible={hidden}
			footer={null}
			className='modal__manageProject'
			onCancel={() => setHidden(false)}
		>
			<div className='modal__manageProject__container'>
				<div className='modal__manageProject__container__image'>
					<Image h={100} w={100} public_id={customer.avatar} styles={{ borderRadius: '100rem' }} />
				</div>
				<div className='modal__manageProject__container__displayname'>
					<p>{customer.displayName}</p>
				</div>
				<div className='modal__manageProject__container__email'>
					<p>{customer.email}</p>
				</div>

				<div className='modal__manageProject__container__currentProject'>
					{spaceRedux.spaces.map((space, index) => (
						<div className='modal__manageProject__container__currentProject__item'>
							<div className='name' onClick={() => handleSetDropdownIndex(index)}>
								{space.name}
							</div>
							{dropdownIndex === index && (
								<div className='menu'>
									<ul>
										{projectRedux.projects[space._id].map((project, index) => (
											<li
												className='menu__li-invited'
												key={index}
												onClick={e => handleChangeColor(e)}
											>
												{project.name}
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					))}
				</div>

				<div className='modal__manageProject__container__dropdown'>
					<ListSpaceAndProjectDD spaceInvited={spaceRedux.spaces} />
				</div>
			</div>
		</ManageProjectForCustomerStyled>
	);
};

export default ManageProjectForCustomer;
