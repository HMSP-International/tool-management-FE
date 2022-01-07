import Image from 'components/shared/image/image';
import { IComment } from 'slices/comment/interfaces';
import { CommentStyled } from './comment.styled';

interface IProps {
	comments: IComment[];
}

const Comment: React.FC<IProps> = ({ comments }) => {
	return (
		<CommentStyled>
			<div className='comment__title'>Comments</div>
			<div className='comment__group-input'>
				{comments.map((comment, index) => (
					<div className='comment__group-input__item' key={index}>
						<div className='comment__group-input__item__avt'>
							<Image
								public_id={comment._userId.avatar}
								w={40}
								h={40}
								styles={{ borderRadius: '100rem' }}
								tooltip={comment._userId.email}
								placement={'top'}
							/>
						</div>
						<div className='comment__group-input__item__input'>
							<div className='html-tags' dangerouslySetInnerHTML={{ __html: comment.content }} />
						</div>
					</div>
				))}
			</div>
			<div>123</div>
		</CommentStyled>
	);
};

export default Comment;
