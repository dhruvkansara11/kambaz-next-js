import { ListGroup } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
export default function TodoList() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { todos } = useSelector((state: any) => state.todosReducer);
  return (
    <div>
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        {todos.map((todo: { id: string; title?: string }) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
        {/* <ListGroupItem>
          <Button
            onClick={() => addTodo(todo)}
            id="wd-add-todo-click"
            className="btn-success float-end ms-2"
          >
            Add
          </Button>
          <Button
            onClick={() => updateTodo(todo)}
            id="wd-update-todo-click"
            className="btn-warning float-end"
          >
            Update
          </Button>
          <FormControl
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            className="w-50 float-start"
          />
        </ListGroupItem>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id}>
            <Button
              onClick={() => deleteTodo(todo.id)}
              id="wd-delete-todo-click"
              className="btn-danger float-end ms-2"
            >
              Delete
            </Button>
            <Button
              onClick={() => setTodo(todo)}
              id="wd-set-todo-click"
              className="btn-primary float-end"
            >
              Edit
            </Button>
            {todo.title}
          </ListGroupItem>
        ))} */}
      </ListGroup>
      <hr />
    </div>
  );
}
