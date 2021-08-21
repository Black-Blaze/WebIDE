function updateEditors() {
	document.querySelectorAll('.editor-window').forEach(editor => {
		ace.edit(editor.id).setOptions({
			autoScrollEditorIntoView: true,
			copyWithEmptySelection: true,
		});
	})
}

document.addEventListener('load', updateEditors());