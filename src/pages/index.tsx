import ContainerPage from '../components/shared/containerPage/containerPage';
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

function HomePage () {
	const editorRef = useRef<any>(null);
	const log = () => {
		if (editorRef && editorRef.current) {
			console.log(editorRef.current.getContent());
		}
	};

	return (
		<ContainerPage title='HomePage'>
			<main>
				<Editor
					onInit={(evt, editor) => (editorRef.current = editor)}
					initialValue='<p>This is the initial content of the editor.</p>'
					apiKey={process.env.REACT_APP_TINY_API_KEY}
					init={{
						height: 500,
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
						content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
					}}
				/>
				<button onClick={log}>Log editor content</button>
			</main>
		</ContainerPage>
	);
}

export default HomePage;
