import React, { useRef, useState } from 'react';
// graphql
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT_MUTATION } from 'apis/projects/mutations';
import { CREATE_LIST_MUTATION } from 'apis/taskList/mutations';
// Styled Components
import { ProjectModalStyled } from './createProjectModal.styled';
// components
import LoadingView from 'components/shared/loadingView/loadingView';
// helpers
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
import { convertProject } from 'helpers/formatData/convertProject';
// redux
import { useDispatch } from 'react-redux';
import { createProject } from 'slices/project/slice';
import { IProject } from 'slices/project/interfaces';

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	spaceId: string;
}

const CreateProjectModal: React.FC<IProps> = ({ hidden, setHidden, spaceId }) => {
	// graphql
	const [ onCreateProject, { loading: loadingCreateProject } ] = useMutation(CREATE_PROJECT_MUTATION);
	const [ onCreateList ] = useMutation(CREATE_LIST_MUTATION);
	// state
	const [ isValidName, setInValidName ] = useState(true);
	const [ messageError, setMessageError ] = useState('');
	// ref
	const inputRef = useRef<HTMLInputElement>(null);
	// redux
	const dispatch = useDispatch();

	const handleSubmit = () => {
		if (inputRef && inputRef.current) {
			if (inputRef.current.value.length === 0) {
				setMessageError('Please enter your project name');
				setInValidName(false);
			}
			else {
				// query Backend

				handleSubmitProjectModal(inputRef.current.value);
			}
		}
	};

	const handleSubmitProjectModal = async (nameProject: string) => {
		const { data, isError } = await fetchDataAndShowNotify({
			fnFetchData: onCreateProject,
			variables:
				{
					createProjectInput:
						{
							name: nameProject,
							_spaceId: spaceId,
						},
				},
			message: 'Created project',
		});

		if (!isError) {
			const project: IProject = data;
			const newProjects = convertProject([ project ]);
			dispatch(createProject(newProjects));
			setHidden(false);

			handleCreateList([ 'To Do', 'Doing', 'Review', 'Done', 'Pending' ], project._id);
		}
	};

	const handleChangeInput = () => {
		if (inputRef && inputRef.current) {
			if (inputRef.current.value.length > 0) {
				setMessageError('');
				setInValidName(true);
			}
			else {
				setMessageError('Please enter your project name');
				setInValidName(false);
			}
		}
	};

	const handleCreateList = async (names: string[], _projectId: string) => {
		for (let name of names) {
			await fetchDataAndShowNotify({
				fnFetchData: onCreateList,
				variables:
					{
						createListInput:
							{
								_projectId,
								name,
							},
					},
			});
		}
	};

	if (loadingCreateProject) {
		return <LoadingView />;
	}

	return (
		<React.Fragment>
			<ProjectModalStyled centered visible={hidden} footer={null} className='modal__project-modal'>
				<div className='project-modal__container'>
					<div className='project-modal__header'>
						<div className='project-modal__header__title'>Create Project</div>
						<div className='project-modal__header__close' onClick={() => setHidden(false)}>
							X
						</div>
					</div>
					<div className='project-modal__body'>
						<div className='project-modal__body__input'>
							<label htmlFor='list' className={isValidName ? '' : 'text-error'}>
								Project Name
							</label>
							<input
								type='text'
								name='project'
								onChange={handleChangeInput}
								ref={inputRef}
								placeholder='Enter your project'
							/>
							{!isValidName && (
								<label htmlFor='' className={isValidName ? '' : 'text-error'}>
									{messageError}
								</label>
							)}
						</div>
					</div>
					<div className='project-modal__footer'>
						<div className='project-modal__footer__button'>
							<button onClick={handleSubmit}>Create Project</button>
						</div>
					</div>
				</div>
			</ProjectModalStyled>
		</React.Fragment>
	);
};

export default CreateProjectModal;
