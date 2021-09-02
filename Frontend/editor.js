function updateEditors() {
		ace.edit(document.querySelector('#main-editor').id).setOptions({
			autoScrollEditorIntoView: true,
			copyWithEmptySelection: true,
			fontFamily: 'Ubuntu Mono',
			fontSize: "16px",
		});
		ace.edit(document.querySelector('#main-editor').id).session.setMode("ace/mode/python");

		document.addEventListener( "contextmenu", function(e) {
			e.preventDefault(); 

            if (document.getElementById("contextMenu") .style.display == "block"){ 
                hideMenu();
            }else{ 
                var menu = document.getElementById("contextMenu")      
                menu.style.display = 'block'; 
                menu.style.left = e.pageX + "px"; 
                menu.style.top = e.pageY + "px"; 
            } 	
		});
}


function run_code() {
	document.querySelector("iframe.output").src = "run_code.html?code=" + encodeURIComponent(ace.edit(document.querySelector('.editor-window')).getValue())
	document.querySelector("iframe.output").contentWindow.postMessage({
		pane_color: oldPNC,
		background_color: oldBGC,
		color: document.documentElement.style.color
	}, "*")
}
document.addEventListener('load', updateEditors());