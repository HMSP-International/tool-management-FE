import React, { useRef, useState } from 'react';
// graphql
import { useMutation } from '@apollo/client';
import { CHANGE_NAME_PROJECT_MUTATION } from 'apis/projects/mutations';
// Styled Components
import { ProjectModalStyled } from './changeProjectModal.styled';
// components
import LoadingView from 'components/shared/loadingView/loadingView';
// helpers
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
import { convertProject } from 'helpers/formatData/convertProject';
// redux
import { useDispatch } from 'react-redux';
import { changeProject, currentProject } from 'slices/project/slice';

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	projectId: string;
}

const ChangeProjectModal: React.FC<IProps> = ({ hidden, setHidden, projectId }) => {
	// graphql
	const [ onChangeNameProject, { loading: loadingChangeNameProject } ] = useMutation(CHANGE_NAME_PROJECT_MUTATION);
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
				handleSubmitProjectModal(inputRef.current.value);
			}
		}
	};

	const handleSubmitProjectModal = async (name: string) => {
		const { data, isError } = await fetchDataAndShowNotify({
			fnFetchData: onChangeNameProject,
			variables: { changeNameProjectInput: { _projectId: projectId, name } },
		});

		if (!isError) {
			const newProjects = convertProject([ data ]);
			dispatch(changeProject(newProjects));
			dispatch(currentProject(data));
			setHidden(false);
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

	if (loadingChangeNameProject) {
		return <LoadingView />;
	}

	return (
		<React.Fragment>
			<ProjectModalStyled centered visible={hidden} footer={null} className='modal__project-modal'>
				<div className='project-modal__container'>
					<div className='project-modal__header'>
						<div className='project-modal__header__title'>Change Project</div>
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

export default ChangeProjectModal;
