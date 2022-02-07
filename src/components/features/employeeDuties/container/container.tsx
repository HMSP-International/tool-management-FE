import React, { useState } from 'react';
import { WorkSpaceStyled } from './container.styled';

import { EmployeeDutiesStyled } from '../index.styled';
import ListFilterSpaceDD, {
	IPropsDefaultValue,
} from 'components/elements/dropDown/ListFilterSpaceProjectListDD/ListFilterSpaceDD/ListFilterSpaceDD';

const Container: React.FC = ({ children }) => {
	const [ space, setSpace ] = useState<IPropsDefaultValue>({
		label: 'All Projects',
		value: '-1',
	});
	const [ project, setProject ] = useState<IPropsDefaultValue>({
		label: 'All Projects',
		value: '-1',
	});

	const handleChangeProject = (e: any) => {
		setProject(e);
	};

	const handleChangeSpace = (e: any) => {
		setSpace(e);
		if (e.value !== space.value) {
			setProject({
				label: 'All Projects',
				value: '-1',
			});
		}
	};

	return (
		<React.Fragment>
			<WorkSpaceStyled className='workspace'>
				<section className='workspace__header'>
					<div className='workspace__header__top'>
						<div>User / {'--name--'}</div>
					</div>
					<div className='workspace__header__assign'>
						<EmployeeDutiesStyled>
							<div className='employee-duties__filter'>
								<div className='employee-duties__filter__container'>
									<div className='employee-duties__filter__name'>
										<p>Work Space</p>
									</div>
									<div className='employee-duties__filter__item'>
										<ListFilterSpaceDD defaultValue={space} onChangeData={handleChangeSpace} />
									</div>
								</div>
								{space.value !== '-1' && (
									<div className='employee-duties__filter__container'>
										<div className='employee-duties__filter__name'>
											<p>Project</p>
										</div>
										<div className='employee-duties__filter__item'>
											<ListFilterSpaceDD
												defaultValue={project}
												onChangeData={handleChangeProject}
											/>
										</div>
									</div>
								)}
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
