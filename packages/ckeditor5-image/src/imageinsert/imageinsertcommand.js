/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ImageUploadCommand from '@ckeditor/ckeditor5-image/src/imageupload/imageuploadcommand';
import { isImageAllowed } from '../image/utils';

/**
 * @module image/imageinsert/imageinsertcommand
 */

// TODO?
/**
 * The image upload command.
 *
 * The command is registered by the {@link module:image/imageinsert/imageinsertediting~ImageUploadEditing} plugin as `'imageUpload'`.
 *
 * In order to upload an image at the current selection position
 * (according to the {@link module:widget/utils~findOptimalInsertionPosition} algorithm),
 * execute the command and pass the native image file instance:
 *
 *		this.listenTo( editor.editing.view.document, 'clipboardInput', ( evt, data ) => {
 *			// Assuming that only images were pasted:
 *			const images = Array.from( data.dataTransfer.files );
 *
 *			// Upload the first image:
 *			editor.execute( 'imageUpload', { file: images[ 0 ] } );
 *		} );
 *
 * It is also possible to insert multiple images at once:
 *
 *		editor.execute( 'imageUpload', {
 *			file: [
 *				file1,
 *				file2
 *			]
 *		} );
 *
 * @extends module:core/command~Command
 */
export default class ImageInsertCommand extends ImageUploadCommand {
	/**
	 * @inheritDoc
	 */
	refresh() {
		const imageElement = this.editor.model.document.selection.getSelectedElement();
		const isImage = imageElement && imageElement.name === 'image' || false;

		this.isEnabled = isImageAllowed( this.editor.model ) || isImage;
	}
}
