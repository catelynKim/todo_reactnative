"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var v1_1 = require("uuid/v1");
var TodoListStore = /** @class */ (function () {
    function TodoListStore() {
        var _this = this;
        this.todoList = [];
        this.deleteTodoItem = function (id) {
            _this.todoList = _this.todoList.filter(function (item) {
                return item.id !== id;
            });
        };
        this.modifyTodoItem = function (id, text) {
            var item = _this.todoList.find(function (item) {
                return item.id === id;
            });
            item.text = text;
        };
        this.setTodoItemDone = function (id, done) {
            var item = _this.todoList.find(function (item) {
                return item.id === id;
            });
            item.isDone = done;
        };
    }
    TodoListStore.prototype.addTodoItem = function (text) {
        console.log("[store::addTodoItem] text :t " + text);
        this.todoList.push({
            id: v1_1.default(),
            text: text,
            isDone: false
        });
    };
    __decorate([
        mobx_1.observable
    ], TodoListStore.prototype, "todoList", void 0);
    return TodoListStore;
}());
exports.default = new TodoListStore();
