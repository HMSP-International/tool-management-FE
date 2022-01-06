import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import { TinyStyled } from './tinyMce.styled';

interface IProps {
	initialValue?: string;
	onGetText?: (T: string) => void;
	marginTop?: string;
}

const TinyMce: React.FC<IProps> = ({ initialValue, onGetText, marginTop }) => {
	const editorRef = useRef<any>(null);

	const getText = () => {
		if (editorRef && editorRef.current) {
			if (onGetText) {
				onGetText(editorRef.current.getContent());
			}
		}
	};

	return (
		<TinyStyled marginTop={marginTop}>
			<Editor
				onInit={(evt, editor) => (editorRef.current = editor)}
				initialValue={initialValue}
				apiKey={process.env.REACT_APP_TINY_API_KEY}
				init={{
					height: 400,
					menubar: false,
					plugins:
						[
							'advlist autolink lists link image charmap print preview anchor',
							'searchreplace visualblocks code fullscreen',
							'insertdatetime media table paste code help wordcount',
						],
					toolbar:
						'undo redo | formatselect | ' +
						'bold italic backcolor | alignleft aligncenter ' +
						'alignright alignjustify | bullist numlist outdent indent | ' +
						'removeformat | help',
					content_style: 'body { font-family: SegoeUI; font-size: 16px;}',
				}}
			/>

			<div className='btn-get-text'>
				<span className='btn' onClick={getText}>
					Save
				</span>
			</div>
		</TinyStyled>
	);
};

export default TinyMce;
