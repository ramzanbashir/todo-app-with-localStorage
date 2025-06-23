 var getUI = document.querySelector("#ul");

    function loadTodos() {
        var todos = localStorage.getItem("todos");
        if (todos !== null) {
            var todoArray = JSON.parse(todos);
            getUI.innerHTML = "";
            for (var i = 0; i < todoArray.length; i++) {
                getUI.innerHTML += "<li>" +
                    "<span class='todo-text'>" + todoArray[i] + "</span>" +
                    "<div class='btn-group'>" +
                    "<button onclick='editItem(this)'>Edit</button>" +
                    "<button onclick='delItem(this)'>Delete</button>" +
                    "</div></li>";
            }
        }
    }

    function addTodo() {
        var getInp = document.querySelector("#inp");
        var value = getInp.value;
        if (value !== "") {
            var todos = localStorage.getItem("todos");
            if (todos !== null) {
                var todoArray = JSON.parse(todos);
            } else {
                var todoArray = [];
            }
            todoArray.push(value);
            localStorage.setItem("todos", JSON.stringify(todoArray));
            getInp.value = "";
            loadTodos();
        } else {
            alert("Please enter a todo");
        }
    }

    function delItem(btn) {
        var li = btn.parentElement.parentElement;
        // console.log(li);
        var text = li.querySelector(".todo-text").textContent;
        var todos = JSON.parse(localStorage.getItem("todos"));
        var newTodos = [];
        for (var i = 0; i < todos.length; i++) {
            if (todos[i] !== text) {
                newTodos.push(todos[i]);
            }
        }
        localStorage.setItem("todos", JSON.stringify(newTodos));
        loadTodos();
    }

    function editItem(btn) {
        var li = btn.parentElement.parentElement;
        var span = li.querySelector(".todo-text");
        var oldText = span.textContent;
        var newText = prompt("Edit your todo:", oldText);
        if (newText !== null && newText !== "") {
            var todos = JSON.parse(localStorage.getItem("todos"));
            for (var i = 0; i < todos.length; i++) {
                if (todos[i] === oldText) {
                    todos[i] = newText;
                    break;
                }
            }
            localStorage.setItem("todos", JSON.stringify(todos));
            loadTodos();
        }
    }
    window.onload = loadTodos;