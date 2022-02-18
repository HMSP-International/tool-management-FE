import React from 'react';
// import { AiFillCloseSquare } from 'react-icons/ai';
// graphql
// components
import Image from 'components/shared/image/image';
import { ICustomerDashboard } from 'slices/dashboard/interfaces';
import { ManageProjectForCustomerStyled } from './manageProject.styled';
import ListSpaceAndProjectDD from 'components/elements/dropDown/listSpaceAndProjectDD/listSpaceAndProjectDD';
import { Link } from 'react-router-dom';
// helpers
// redux

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	customer: ICustomerDashboard;
}

const ManageProjectForCustomer: React.FC<IProps> = ({ hidden, setHidden, customer }) => {
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
					<div className='modal__manageProject__container__currentProject__item'>
						<div className='name'>HMSP</div>
						<div className='menu'>
							<ul>
								<li>
									<Link to='#'>Profile Information</Link>
								</li>
								<li>
									<Link to='#'>Change Password</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className='modal__manageProject__container__currentProject__item'>
						<div className='name'>HMSP</div>
						<div className='menu'>
							<ul>
								<li>
									<Link to='#'>Profile Information</Link>
								</li>
								<li>
									<Link to='#'>Change Password</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className='modal__manageProject__container__currentProject__item'>
						<div className='name'>HMSP</div>
						<div className='menu'>
							<ul>
								<li>
									<Link to='#'>Profile Information</Link>
								</li>
								<li>
									<Link to='#'>Change Password</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className='modal__manageProject__container__currentProject__item'>
						<div className='name'>HMSP</div>
						<div className='menu'>
							<ul>
								<li>
									<Link to='#'>Profile Information</Link>
								</li>
								<li>
									<Link to='#'>Change Password</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className='modal__manageProject__container__dropdown'>
					<ListSpaceAndProjectDD />
				</div>
			</div>
		</ManageProjectForCustomerStyled>
	);
};

export default ManageProjectForCustomer;
