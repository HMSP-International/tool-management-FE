// components
import { ReporterStyled } from './reporter.styled';
import Image from 'components/shared/image/image';
// redux
import { RootState } from 'global/redux/rootReducer';
import { useSelector } from 'react-redux';
// interfaces
import { IInitialStateUser } from 'slices/user/interfaces';

interface IProps {}
const Reporter: React.FC<IProps> = () => {
	const userRedux: IInitialStateUser = useSelector((state: RootState) => state.user);
	return (
		<ReporterStyled className='reporter'>
			<div className='left'>Reporter</div>
			<div className='right'>
				<div className='right__avt'>
					<Image
						public_id={userRedux.profile.avatar}
						w={40}
						h={40}
						styles={{ borderRadius: '100rem' }}
						tooltip={userRedux.profile.email}
						placement={'rightBottom'}
					/>
				</div>
				<div className='right__name'>{userRedux.profile.displayName}</div>
			</div>
		</ReporterStyled>
	);
};

export default Reporter;
