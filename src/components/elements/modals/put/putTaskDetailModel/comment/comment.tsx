import { useState } from 'react';
// components
import { CommentStyled } from './comment.styled';
import Image from 'components/shared/image/image';
import TinyMce from 'components/shared/tinyMce/tinyMce';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { addNewComment, changeComment, deleteComment } from 'slices/task/slice';
// graphql
import { useMutation } from '@apollo/client';
import {
	CHANGE_COMMENT_BY_COMMENTID_MUTATION,
	CREATE_COMMENT_MUTATION,
	DELETE_COMMENT_MUTATION,
} from 'apis/comments/mutations';
// interfaces
import { RootState } from 'global/redux/rootReducer';
import { IInitialStateUser } from 'slices/user/interfaces';
import { ITask } from 'slices/task/interfaces';
// helpers
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';

interface IProps {
	task: ITask;
}

const Comment: React.FC<IProps> = ({ task }) => {
	const [ isShowComment, setShowComment ] = useState(false);
	const [ showEditComment, setShowEditComment ] = useState(-1);
	// redux
	const dispatch = useDispatch();
	const userRedux: IInitialStateUser = useSelector((state: RootState) => state.user);
	// graphql
	const [ onCreateComment ] = useMutation(CREATE_COMMENT_MUTATION);
	const [ onDeleteComment ] = useMutation(DELETE_COMMENT_MUTATION);
	const [ onChangeContentComment ] = useMutation(CHANGE_COMMENT_BY_COMMENTID_MUTATION);

	const handleGetComment = async (text: string) => {
		if (text.trim().length !== 0) {
			const { data, isError } = await fetchDataAndShowNotify({
				fnFetchData: onCreateComment,
				variables: { createCommentInput: { _taskId: task._id, content: text } },
			});

			if (!isError) {
				dispatch(addNewComment(data));
			}
		}
		setShowComment(false);
	};

	const handleDeleteTask = async (_commentId: string) => {
		const { data, isError } = await fetchDataAndShowNotify({
			fnFetchData: onDeleteComment,
			variables: { deleteCommentInput: { _commentId } },
		});

		if (!isError) {
			dispatch(deleteComment(data));
		}
	};

	const handlePutComment = async (text: string) => {
		if (text !== task.comments[showEditComment].content) {
			const { data, isError } = await fetchDataAndShowNotify({
				fnFetchData: onChangeContentComment,
				variables: { putChangeCommentInput: { _commentId: task.comments[showEditComment]._id, content: text } },
			});
			if (!isError) {
				dispatch(changeComment(data));
			}
		}
		setShowEditComment(-1);
	};

	return (
		<CommentStyled>
			<div className='comment__title'>Comments</div>
			<div className='comment__group-input'>
				{task.comments.map((comment, index) => {
					if (showEditComment === index) {
						return <TinyMce onGetText={handlePutComment} marginTop='20px' initialValue={comment.content} />;
					}

					return (
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
								{comment._userId._id === task.reporter._id && (
									<div className='action'>
										<AiOutlineEdit
											className='action__edit'
											onClick={() => setShowEditComment(index)}
										/>
										<AiOutlineDelete
											className='action__delete'
											onClick={() => handleDeleteTask(comment._id)}
										/>
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>

			{!isShowComment && (
				<div className='click-to-comment'>
					<div className='click-to-comment__avatar'>
						<Image public_id={userRedux.profile.avatar} w={36} h={36} styles={{ borderRadius: '100rem' }} />
					</div>
					<div className='click-to-comment__box'>
						<input type='text' placeholder='Click to comment ...' onClick={() => setShowComment(true)} />
					</div>
				</div>
			)}

			{isShowComment && <TinyMce onGetText={handleGetComment} marginTop='20px' initialValue={''} />}
		</CommentStyled>
	);
};

export default Comment;
