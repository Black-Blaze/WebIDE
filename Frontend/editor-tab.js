const tabs = document.querySelectorAll('.tab')
const tabBars = document.querySelectorAll('.tab-area')

tabs.forEach(tab => {
	tab.addEventListener('dragstart', () => {
		tab.classList.add('dragging')
	})

	tab.addEventListener('dragend', () => {
		tab.classList.remove('dragging')
	})
})

tabBars.forEach(tabBar => 
  	tabBar.addEventListener('dragover', e => {
		e.preventDefault()
		const afterElement = getDragAfterElement(tabBar, e.clientX)
		const tab = document.querySelector('.dragging')
		if (afterElement == null) {
			tabBar.appendChild(tab)
		} else {
			tabBar.insertBefore(tab, afterElement)
		}
	}
));

function getDragAfterElement(tabBar, y) {
	const tabElements = [...tabBar.querySelectorAll('.tab:not(.dragging)')]

	return tabElements.reduce((closest, child) => {
		const box = child.getBoundingClientRect()
		const offset = y - box.left - box.width / 2
		if (offset < 0 && offset > closest.offset) {
			return { offset: offset, element: child }
		} else {
			return closest
		}
	}, { offset: Number.NEGATIVE_INFINITY }).element
}

function activate(tab) {
	if(document.querySelector('.tab.active')) document.querySelectorAll('.tab.active').forEach(active=>active.classList.remove('active'));
	tab.classList.add('active');
	console.log(tab.id)
}

function closeTab(closeButton) {
	tab = closeButton.parentElement;
	tab.parentElement.removeChild(tab);
}