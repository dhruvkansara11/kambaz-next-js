import { Button, ListGroupItem } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
export default function TodoItem({
  todo,
}: {
  todo: { id: string; title?: string | undefined };
}) {
  const dispatch = useDispatch();

  return (
    <ListGroupItem key={todo.id}>
      <Button
        onClick={() => dispatch(deleteTodo(todo.id))}
        id="wd-delete-todo-click"
        className="btn-danger float-end ms-2"
      >
        Delete
      </Button>
      <Button
        onClick={() => dispatch(setTodo(todo))}
        id="wd-set-todo-click"
        className="btn-primary float-end"
      >
        Edit
      </Button>
      {todo.title}
    </ListGroupItem>
  );
}
