EditSession = ace.require("ace/edit_session").EditSession
sessions = {}
function activate(tab) {
	if(document.querySelector('.tab.active'))
	document.querySelector('.tab.active').classList.add('previous');
	document.querySelector('.tab.active').classList.remove('active');
	tab.classList.add('active');
	sessions[document.querySelector('.tab.previous').id] = ace.edit(document.querySelector('.editor-window').id).session;
	document.querySelector('.tab.previous').classList.remove('previous');
	console.log(tab.id)	
	ace.edit(document.querySelector('.editor-window').id).setSession(sessions[tab.id])
}

function closeTab(closeButton) {
	closeButton.parentElement.parentElement.removeChild(closeButton.parentElement);
}

document.querySelectorAll('.tab').forEach((tab) => {
	sessions[tab.id] = new EditSession("","python")
});