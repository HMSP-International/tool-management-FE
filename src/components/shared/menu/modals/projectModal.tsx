import React, { useRef, useState } from 'react';

// Styled Components
import { ProjectModalStyled } from './projectModal.styled';

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	onSubmit(projectName: string): void;
}

const ProjectModal: React.FC<IProps> = ({ hidden, setHidden, onSubmit }) => {
	const [ isValidName, setInValidName ] = useState(true);

	const [ messageError, setMessageError ] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = () => {
		if (inputRef && inputRef.current) {
			if (inputRef.current.value.length === 0) {
				setMessageError('Please enter your project name');
				setInValidName(false);
			}
			else {
				// query Backend
				if (true) {
					onSubmit(inputRef.current.value);
				}
				else {
					// return error from DB
				}
			}
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

	return (
		<React.Fragment>
			<ProjectModalStyled
				centered
				visible={hidden}
				footer={null}
				className='modal__project-modal'
			>
				<div className='project-modal__container'>
					<div className='project-modal__header'>
						<div className='project-modal__header__title'>Create Project</div>
						<div
							className='project-modal__header__close'
							onClick={() => setHidden(false)}
						>
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

export default ProjectModal;
