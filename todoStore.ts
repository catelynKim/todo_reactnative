import { observable } from "mobx"
import uuidv1 from "uuid/v1";

interface Todo {
    id: string,
    text: string,
    isDone: boolean
}

class TodoListStore {

    @observable todoList : Todo[] = [];

    addTodoItem (text : string) {
        console.log(`[store::addTodoItem] text :t ${text}`);
        this.todoList.push({
            id: uuidv1(),
            text,
            isDone: false
        })
    }

    deleteTodoItem = (id : string) => {
        this.todoList = this.todoList.filter((item) => {
            return item.id !== id;
        })
    }

    modifyTodoItem = (id : string, text : string) => {
        let item = this.todoList.find((item) => {
            return item.id === id
        });
        item.text = text;
    }

    setTodoItemDone = (id : string, done : boolean) => {
        let item = this.todoList.find((item) => {
            return item.id === id
        });
        item.isDone = done;
    }

}

export default new TodoListStore();