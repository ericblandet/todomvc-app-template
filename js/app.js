
window.todoStore = {
    todos: JSON.parse(localStorage.getItem('todo-store') || '[]'),

    save() {
        localStorage.setItem('todo-store', JSON.stringify(this.todos));
    },
}

window.todosApp = function () {
    return {
        ...todoStore,
        editedTodo: null,
        activeFilter: 'all',
        newTodoContent: '',

        get todosToDisplay() {
            return {
                all: this.todos,
                completed: this.completedTodos,
                active: this.activeTodos
            }[this.activeFilter]
        },

        get cleanNewTodoContent() {
            return this.newTodoContent.trim()
        },

        get activeTodos() {
            return this.todos.filter(todo => !todo.completed)
        },

        get completedTodos() {
            return this.todos.filter(todo => todo.completed)
        },

        get allComplete() {
            return this.todos.length == this.completedTodos.length
        },

        editTodo(todo) {
            this.todo.cachedContent = todo.content
            this.editedTodo = todo
        },

        patchTodo(todo) {
            if (this.editedTodo.content?.trim() == '') {
                this.removeTodo(todo)
            } else {
                todo.content = this.editedTodo.content
                this.save()
            }
            this.editedTodo = null
        },

        cancelEditTodo(todo) {
            todo.content = todo.cachedContent
            this.editedTodo = null
        },

        createTodo() {
            if (this.cleanNewTodoContent) {
                this.todos.push({ id: Date.now(), content: this.cleanNewTodoContent, completed: false })
                this.editedTodo = null
                this.newTodoContent = ''
                this.save()
            }
        },

        clearCompleted() {
            this.todos = this.activeTodos
            this.save()
        },

        removeTodo(todo) {
            const position = this.todos.indexOf(todo)
            this.todos.splice(position, 1)
            this.save()
        },

        toggleAllAsComplete() {
            if (this.todos.every(todo => todo.completed == true)) {
                this.todos.forEach(todo => todo.completed = false)
                return;
            }
            this.todos.forEach(todo => todo.completed = true)
            this.save()
        }

    }
}
