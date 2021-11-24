import React, { useState, useRef } from 'react';

// Styled Components
import { ShareModalStyled } from './shareModal.styled';

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	onSubmit(): void;
	onBack(): void;
}

const ShareModal: React.FC<IProps> = ({ hidden, setHidden, onSubmit, onBack }) => {
	return (
		<React.Fragment>
			<ShareModalStyled
				centered
				visible={hidden}
				footer={null}
				className='modal__share-modal'
			>
				<div className='share-modal__header'>
					<div className='share-modal__header__back' onClick={onBack}>
						{'<'}
					</div>
					<div className='share-modal__header__title'>{'Share HMSP'}</div>
					<div className='share-modal__header__close' onClick={() => setHidden(false)}>
						{'X'}
					</div>
				</div>
				<div className='share-modal__body'>
					<div className='share-modal__option'>
						<div className='share-modal__option__private'>
							<img
								src='https://cdn.w600.comps.canstockphoto.com/private-stamp-eps-vector_csp6202764.jpg'
								alt=''
							/>
						</div>
					</div>
					<div className='share-modal__share'>
						<div className='share-modal__share__text'>Share only with:</div>
						<div className='share-modal__share__img'>
							<div>
								<img src='' alt='' />
							</div>
							<div>
								<img src='' alt='' />
							</div>
							<div>
								<img src='' alt='' />
							</div>
						</div>
						<div className='share-modal__share__add'>Add people</div>
					</div>
					<div className='share-modal__share__next'>
						<button>NEXT</button>
					</div>
				</div>
			</ShareModalStyled>
		</React.Fragment>
	);
};

export default ShareModal;
