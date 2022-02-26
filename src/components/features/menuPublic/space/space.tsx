import React from 'react';
import { SpaceStyled } from './space.styled';
// modals
// components
import SpaceInvited from './spaceInvited/spaceInvited';
// interfaces

const Space: React.FC = () => {
	// state

	return (
		<React.Fragment>
			<SpaceStyled>
				<SpaceInvited />
			</SpaceStyled>
		</React.Fragment>
	);
};

export default Space;
