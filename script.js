const taskTextInput = document.querySelector('.add-task__text-input')
const taskAddButton = document.querySelector('.add-task__button')

const checkAllTasksButton = document.querySelector(
	'.task-functions__button.check-all'
)
const removeAllTasksButton = document.querySelector(
	'.task-functions__button.clear-all'
)

const removeCheckedButton = document.querySelector(
	'.task-info__remove-checked-button'
)

const isInputEmpty = (textInput) => {
	if (textInput.trim() == '') {
		const title = document.querySelector('.todo-app__title')

		title.classList.add('error--text')
		taskAddButton.classList.add('error--button')

		setTimeout(() => {
			title.classList.remove('error--text')
			taskAddButton.classList.remove('error--button')
		}, 1000)

		return true
	}
	return false
}

const refreshStatusBar = () => {
	const percentage = (refreshCheckedNumber() * 100) / refreshTasksNumber()
	document
		.querySelector('.task-info__checked-bar')
		.style.setProperty('--progress-background', percentage + '%')
}

const refreshTasksNumber = () => {
	document.querySelector('.task-total-number').textContent =
		document.querySelectorAll('.task').length + ' done'

	return document.querySelectorAll('.task').length
}

const refreshCheckedNumber = () => {
	let totalChecked = 0
	document.querySelectorAll('.task__checkbox').forEach((checkbox) => {
		if (checkbox.checked) totalChecked++
	})
	document.querySelector('.task-done-number').textContent = totalChecked + ' of '
	return totalChecked
}

const editTask = (event) => {
	const editButton = event.target

	document.querySelectorAll('.task').forEach((task) => {
		if (!task.contains(editButton)) return

		editButton.classList.add('active')

		const name = task.querySelector('.task__name')
		name.setAttribute('contenteditable', 'true')
		name.focus()

		name.addEventListener('keydown', (event) => {
			if (event.key == 'Enter' || event.key == 'Escape') {
				name.removeAttribute('contenteditable')
				editButton.classList.remove('active')
			}
		})
	})
}

const removeAllTasks = () => {
	document.querySelectorAll('.task').forEach((task) => task.remove())

	refreshStatusBar()
	refreshTasksNumber()
	refreshCheckedNumber()
}

const removeTask = (event) => {
	document.querySelectorAll('.task').forEach((task) => {
		if (task.contains(event.target)) task.remove()
	})

	refreshStatusBar()
	refreshTasksNumber()
	refreshCheckedNumber()
}

const checkAllTasks = () => {
	document.querySelectorAll('.task').forEach((task) => {
		const checkbox = task.querySelector('.task__checkbox')

		checkbox.checked = checkbox.checked == true ? false : true
	})

	refreshStatusBar()
	refreshCheckedNumber()
}

const removeChecked = () => {
	document.querySelectorAll('.task').forEach((task) => {
		if (task.querySelector('.task__checkbox').checked) task.remove()
	})

	refreshStatusBar()
	refreshTasksNumber()
	refreshCheckedNumber()
}

const addTask = (name) => {
	if (isInputEmpty(name)) return

	const taskList = document.querySelector('.task-list')

	// Single task
	const task = document.createElement('li')
	task.classList.add('task')
	taskList.appendChild(task)

	// Checkbox
	const taskCheckbox = document.createElement('input')
	taskCheckbox.setAttribute('type', 'checkbox')
	taskCheckbox.classList.add('task__checkbox')
	taskCheckbox.onclick = refreshCheckedNumber
	taskCheckbox.onclick = refreshStatusBar

	// Name
	const taskName = document.createElement('p')
	taskName.classList.add('task__name')
	taskName.textContent = name.trim()

	// Buttons
	const buttonsContainer = document.createElement('div')
	buttonsContainer.classList.add('task-list__button-container')

	// Edit button
	const editButton = document.createElement('button')
	editButton.classList.add('task__button', 'task__button--edit')

	const editIcon = document.createElement('i')
	editIcon.classList.add('fa-solid', 'fa-pencil')
	editButton.appendChild(editIcon)

	// Add edit function
	editIcon.addEventListener('click', editTask)

	// Remove button
	const removeButton = document.createElement('button')
	removeButton.classList.add('task__button', 'task__button--remove')

	const removeIcon = document.createElement('i')
	removeIcon.classList.add('fa-solid', 'fa-xmark')
	removeButton.appendChild(removeIcon)

	// Remove task function
	removeIcon.addEventListener('click', removeTask)

	task.append(taskCheckbox, taskName, buttonsContainer)
	buttonsContainer.append(editButton, removeButton)

	taskTextInput.value = ''
	taskTextInput.focus()
	refreshTasksNumber()
	refreshCheckedNumber()
}

// Event listeners
taskTextInput.addEventListener('keydown', (event) => {
	if (event.key == 'Enter') addTask(taskTextInput.value)
})

taskAddButton.addEventListener('click', () => addTask(taskTextInput.value))

removeCheckedButton.onclick = removeChecked
removeAllTasksButton.onclick = removeAllTasks
checkAllTasksButton.onclick = checkAllTasks
