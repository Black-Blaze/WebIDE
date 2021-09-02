function updateSplits() {
	document.querySelectorAll("div.split-horizontal").forEach(split => {
		split.addEventListener('dragstart', (ev) => {
			split.classList.add('dragging')
            document.querySelectorAll("iframe").forEach(iframe => iframe.style.pointerEvents = 'none');
            ev.dataTransfer.setDragImage(document.createElement("img"),window.clientWidth,window.clientHeight)
		})
		split.addEventListener('dragend', () => {
			split.classList.remove('dragging')
            document.querySelectorAll("iframe").forEach(iframe => iframe.style.pointerEvents = 'unset');
		})
        split.setAttribute('currX',split.parentElement.offsetLeft)
	})
}

document.addEventListener("dragover",(ev) => {
    split = document.querySelector("div.split-horizontal.dragging")
    posX = ev.screenX - split.parentElement.offsetLeft
    transform = "translate("+ posX +"px)";
    if(split.offsetLeft > split.parentElement.offsetLeft && split.offsetleft + 100 < (split.parentElement.offsetLeft + split.parentElement.offsetWidth))
    split.parentElement.style.transform = transform;
    
    leftTarget = split.parentElement.previousElementSibling
    leftTarget.style.width = leftTarget.getBoundingClientRect().width + posX + "px";
    
    rightTarget = split.parentElement.nextElementSibling
    rightTarget.style.width = rightTarget.parentElement.getBoundingClientRect().width - leftTarget.getBoundingClientRect().width + "px";
});

document.addEventListener('load', updateSplits());