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

const currentTime = () => {
	const date = new Date()
	const h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
	const min =
		date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
	const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

	return `Added at ${h}:${min}:${s}`
}

const isInputEmpty = (textInput) => {
	if (!textInput.trim() == '') return false

	const title = document.querySelector('.todo-app__title')

	title.classList.add('error--text')
	taskAddButton.classList.add('error--button')

	setTimeout(() => {
		title.classList.remove('error--text')
		taskAddButton.classList.remove('error--button')
	}, 1000)

	return true
}

const updateStatusBar = () => {
	updateCheckedNumber()
	updateTasksNumber()
	const percentage = (updateCheckedNumber() * 100) / updateTasksNumber()
	document
		.querySelector('.task-info__checked-bar')
		.style.setProperty('--progress-background', percentage + '%')
}

const updateTasksNumber = () => {
	const totalTasks = document.querySelectorAll('.task').length
	document.querySelector(
		'.task-total-number'
	).textContent = `${totalTasks} done `

	return totalTasks
}

const updateCheckedNumber = () => {
	const totalChecked = Object.values(
		document.querySelectorAll('.task__checkbox')
	)
		.map((checkbox) => checkbox.checked)
		.filter((check) => check).length

	document.querySelector(
		'.task-done-number'
	).textContent = `${totalChecked} of `
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

		name.onblur = () => {
			name.removeAttribute('contenteditable')
			editButton.classList.remove('active')
		}

		name.onkeydown = (event) => {
			if (event.key == 'Enter' || event.key == 'Escape') {
				name.removeAttribute('contenteditable')
				editButton.classList.remove('active')
			}
		}
	})
}

const removeAllTasks = () => {
	document.querySelectorAll('.task').forEach((task) => task.remove())

	updateStatusBar()
}

const removeTask = (event) => {
	document.querySelectorAll('.task').forEach((task) => {
		if (task.contains(event.target)) task.remove()
	})

	updateStatusBar()
}

const checkAllTasks = () => {
	document.querySelectorAll('.task').forEach((task) => {
		const checkbox = task.querySelector('.task__checkbox')

		checkbox.checked = !checkbox.checked
	})

	updateStatusBar()
}

const removeChecked = () => {
	document.querySelectorAll('.task').forEach((task) => {
		if (task.querySelector('.task__checkbox').checked) task.remove()
	})

	updateStatusBar()
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
	taskCheckbox.classList.add('task__checkbox')
	taskCheckbox.setAttribute('type', 'checkbox')
	taskCheckbox.onclick = updateStatusBar

	// Name
	const taskName = document.createElement('p')
	taskName.classList.add('task__name')
	taskName.textContent = name.trim()

	// Abbr
	const taskAbbr = document.createElement('abbr')
	taskAbbr.classList.add('task__abbr')
	taskAbbr.setAttribute('title', currentTime())
	taskAbbr.appendChild(taskName)

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
	editIcon.onclick = editTask

	// Remove button
	const removeButton = document.createElement('button')
	removeButton.classList.add('task__button', 'task__button--remove')

	const removeIcon = document.createElement('i')
	removeIcon.classList.add('fa-solid', 'fa-xmark')
	removeButton.appendChild(removeIcon)

	// Remove task function
	removeIcon.onclick = removeTask

	task.append(taskCheckbox, taskAbbr, buttonsContainer)
	buttonsContainer.append(editButton, removeButton)

	taskTextInput.value = ''
	taskTextInput.focus()
	updateStatusBar()
}

// Event listeners
taskTextInput.addEventListener('keydown', (event) => {
	if (event.key == 'Enter') addTask(taskTextInput.value)
})

taskAddButton.onclick = () => addTask(taskTextInput.value)
removeCheckedButton.onclick = removeChecked
removeAllTasksButton.onclick = removeAllTasks
checkAllTasksButton.onclick = checkAllTasks
