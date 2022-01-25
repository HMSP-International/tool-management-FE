import React from 'react';
// Component
import { EmployeeDutiesStyled } from './index.styled';
import ListFilterSpaceProjectListDD from 'components/elements/dropDown/ListFilterSpaceProjectListDD/ListFilterSpaceDD';
const DashboardUser: React.FC = () => {
	return (
		<EmployeeDutiesStyled>
			<div className='employee-duties__header'>user --{'>'} Phạm Đức Huy</div>
			<div className='employee-duties__filter'>
				<div className='employee-duties__filter__item'>
					<ListFilterSpaceProjectListDD />
				</div>
				<div className='employee-duties__filter__item'>
					<ListFilterSpaceProjectListDD />
				</div>
				<div className='employee-duties__filter__item'>
					<ListFilterSpaceProjectListDD />
				</div>
			</div>
		</EmployeeDutiesStyled>
	);
};

export default DashboardUser;
