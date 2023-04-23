const todosApp = () => {
    return {
        todos:[
            {id:1, content:'Go to the bakery', completed:false},
            {id:2, content:'Ride and Die', completed:false},
            ],

        editedTodo:null,

        activeFilter: 'all',

        newTodoContent: '',

        get todosToDisplay() {
            return {
                all:this.todos,
                completed: this.completedTodos,
                active: this.activeTodos
            }[this.activeFilter]
        },

        get cleanNewTodoContent() {
            return this.newTodoContent.trim()
        },

        get activeTodos() {
            return this.todos.filter(todo=>!todo.completed)
        },

        get completedTodos() {
            return this.todos.filter(todo=>todo.completed)
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
            }

            this.editedTodo = null
        },

        cancelEditTodo(todo) {
            todo.content = todo.cachedContent
            this.editedTodo = null
        },

        createTodo() {
            if (this.cleanNewTodoContent) {
                this.todos.push({id:this.todos.length+1, content:this.cleanNewTodoContent, completed:false})
                this.editedTodo=null
                this.newTodoContent = ''
            }
        },

        clearCompleted() {
            this.todos = this.activeTodos
        },

        removeTodo(todo) {
            const position = this.todos.indexOf(todo)
            this.todos.splice(position,1)
        },

        toggleAllAsComplete() {
            if (this.todos.every(todo=>todo.completed==true)) {
                this.todos.forEach(todo=>todo.completed=false)
                return;
            }
            this.todos.forEach(todo=>todo.completed=true)
        }

        }
    }
