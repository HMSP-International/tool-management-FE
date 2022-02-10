import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { WorkSpaceStyled } from './container.styled';
import { EmployeeDutiesStyled } from '../index.styled';
import { AiOutlineArrowRight } from 'react-icons/ai';
// components
import ListFilterSpaceDD from 'components/elements/dropDown/ListFilterSpaceProjectDD/ListFilterSpaceDD/ListFilterSpaceDD';
import ListFilterProjectDD from 'components/elements/dropDown/ListFilterSpaceProjectDD/ListFilterProjectDD/ListFilterProjectDD';
import LoadingView from 'components/shared/loadingView/loadingView';
import ErrorView from 'components/shared/errorView/errorView';
// redux
import { RootState } from 'global/redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { setProject, setSpace } from 'slices/employeeDuties/slice';
// interface
import { IInitialStateEmployeeDuties } from 'slices/employeeDuties/interfaces';
import { PROJECT_DEFAULT } from 'slices/employeeDuties/initialState';
import { useQuery } from '@apollo/client';
import { IUser } from 'slices/dashboard/interfaces';
// graphql
import { GET_USER_BY_ID_QUERY } from 'apis/users/queries';
// helpers
import { getFirstKey } from 'helpers/object/getFirstKey';

const Container: React.FC = ({ children }) => {
	const { _userId } = useParams();

	const {
		loading: loadingGetUserById,
		error: errorGetUserById,
		data: onGetUserById,
	} = useQuery(GET_USER_BY_ID_QUERY, { variables: { getUserByIdInput: { _userId } } });

	const currentUser: IUser = getFirstKey(onGetUserById);

	const employeeDutiesRedux: IInitialStateEmployeeDuties = useSelector((state: RootState) => state.employeeDuties);
	const dispatch = useDispatch();

	const handleChangeSpace = (e: any) => {
		dispatch(setSpace(e));

		if (e.value !== employeeDutiesRedux.space.value) {
			dispatch(setProject(PROJECT_DEFAULT));
		}
	};

	const handleChangeProject = (e: any) => {
		dispatch(setProject(e));
	};

	if (loadingGetUserById) return <LoadingView />;
	if (errorGetUserById) return <ErrorView error={errorGetUserById} />;

	return (
		<React.Fragment>
			<WorkSpaceStyled className='workspace'>
				<section className='workspace__header'>
					<div className='workspace__header__top'>
						<div>
							<Link to='/dashboard-staff'>User</Link> <AiOutlineArrowRight /> {currentUser.displayName}
						</div>
					</div>
					<div className='workspace__header__assign'>
						<EmployeeDutiesStyled>
							<div className='employee-duties__filter'>
								<div className='employee-duties__filter__container'>
									<div className='employee-duties__filter__name'>
										<p>Work Space</p>
									</div>
									<div className='employee-duties__filter__item'>
										<ListFilterSpaceDD
											defaultValue={employeeDutiesRedux.space}
											onChangeData={handleChangeSpace}
										/>
									</div>
								</div>
								{employeeDutiesRedux.space.value !== '-1' && (
									<div className='employee-duties__filter__container'>
										<div className='employee-duties__filter__name'>
											<p>Project</p>
										</div>
										<div className='employee-duties__filter__item'>
											<ListFilterProjectDD
												defaultValue={employeeDutiesRedux.project}
												onChangeData={handleChangeProject}
												space={employeeDutiesRedux.space}
											/>
										</div>
									</div>
								)}
							</div>
						</EmployeeDutiesStyled>;
					</div>
				</section>

				{employeeDutiesRedux.space.value !== '-1' && employeeDutiesRedux.project.value !== '-1' && children}
			</WorkSpaceStyled>
		</React.Fragment>
	);
};

export default Container;
