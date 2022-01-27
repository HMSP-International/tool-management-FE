import React from 'react';
// 3rd Components
// Styled Components
import { WorkSpaceStyled } from './container.styled';
// redux
import { useSelector } from 'react-redux';
// graphql
// helper

// interfaces
import { RootState } from 'global/redux/rootReducer';
import { IInitialStateProject } from 'slices/project/interfaces';

import { EmployeeDutiesStyled } from '../index.styled';
import ListFilterSpaceProjectListDD from 'components/elements/dropDown/ListFilterSpaceProjectListDD/ListFilterSpaceDD';

const Container: React.FC = ({ children }) => {
	const { currentProject: project }: IInitialStateProject = useSelector((state: RootState) => state.project);

	return (
		<React.Fragment>
			<WorkSpaceStyled className='workspace'>
				<section className='workspace__header'>
					<div className='workspace__header__top'>
						<div>User / {'huy ne'}</div>
					</div>
					<div className='workspace__header__assign'>
						<EmployeeDutiesStyled>
							<div className='employee-duties__filter'>
								<div className='employee-duties__filter__container'>
									<div className='employee-duties__filter__name'>
										<p>Work Space</p>
									</div>
									<div className='employee-duties__filter__item'>
										<ListFilterSpaceProjectListDD />
									</div>
								</div>
								<div className='employee-duties__filter__container'>
									<div className='employee-duties__filter__name'>
										<p>Project</p>
									</div>
									<div className='employee-duties__filter__item'>
										<ListFilterSpaceProjectListDD />
									</div>
								</div>
								<div className='employee-duties__filter__container'>
									<div className='employee-duties__filter__name'>
										<p>List</p>
									</div>
									<div className='employee-duties__filter__item'>
										<ListFilterSpaceProjectListDD />
									</div>
								</div>
							</div>
						</EmployeeDutiesStyled>;
					</div>
				</section>

				{children}
			</WorkSpaceStyled>
		</React.Fragment>
	);
};

export default Container;
