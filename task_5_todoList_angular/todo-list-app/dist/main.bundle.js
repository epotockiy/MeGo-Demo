webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".wrapper {\n  margin-left: auto;\n  margin-right: auto;\n  width: 400px;\n  display: block;\n}\n.todo-manager {\n  margin-bottom: 15px;\n  text-align: center;\n}\n.todo-manager form {\n  text-align: center;\n  margin-bottom: 20px;\n}\n.todo-manager > input {\n  background-color: bisque;\n  padding: 8px;\n  margin: 0 5px;\n  font-size: 15px;\n  box-shadow: 2px 3px 3px rgba(0,0,0,0.5);\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\n  <div class=\"todo-plugin\">\n    <!--manager components-->\n    <div class=\"todo-manager\">\n      <app-new-todo-input (add)=\"onAddTodo($event)\"></app-new-todo-input>\n      <!--<app-todo-filters></app-todo-filters>-->\n    </div>\n    <!--allTodosList components-->\n    <app-todo-list *ngIf=\"todos\"\n                   [todos]=\"todos\"\n                   (toggleStatus)=\"onSwitchStatusTodo($event)\"\n                   (remove)=\"onRemoveTodo($event)\"\n                   (edit)=\"onEditTodo($event)\">\n    </app-todo-list >\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__local_storage_service__ = __webpack_require__("../../../../../src/app/local-storage.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(localStorageService) {
        this.localStorageService = localStorageService;
        // this.todos=this.getTodos();
        //  console.log(document.getElementsByClassName('todos-list')[0]);
    }
    AppComponent.prototype.getTodos = function () {
        return this.localStorageService.getTodos();
    };
    AppComponent.prototype.onAddTodo = function (todo) {
        this.localStorageService.addTodo(todo);
        this.todos = this.getTodos();
    };
    AppComponent.prototype.onSwitchStatusTodo = function (todo) {
        this.localStorageService.editStatusTodo(todo.id, todo.checked);
    };
    // rename from removeTodo
    AppComponent.prototype.onRemoveTodo = function (todo) {
        this.localStorageService.removeTodo(todo.id);
    };
    AppComponent.prototype.onEditTodo = function (todo) {
        //  console.log(todo.text);
        //  this.edit.emit(todo);
        this.localStorageService.editTextTodo(todo.text, todo.id);
    };
    AppComponent.prototype.ngOnInit = function () {
        this.todos = this.getTodos();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")],
        providers: []
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__local_storage_service__["a" /* LocalStorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__local_storage_service__["a" /* LocalStorageService */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__todo_item_todo_item_component__ = __webpack_require__("../../../../../src/app/todo-item/todo-item.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__new_todo_input_new_todo_input_component__ = __webpack_require__("../../../../../src/app/new-todo-input/new-todo-input.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__todo_filters_todo_filters_component__ = __webpack_require__("../../../../../src/app/todo-filters/todo-filters.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__todo_list_todo_list_component__ = __webpack_require__("../../../../../src/app/todo-list/todo-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__local_storage_service__ = __webpack_require__("../../../../../src/app/local-storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__filter_service_service__ = __webpack_require__("../../../../../src/app/filter-service.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







//import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';



var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_3__todo_item_todo_item_component__["a" /* TodoItemComponent */],
            __WEBPACK_IMPORTED_MODULE_4__new_todo_input_new_todo_input_component__["a" /* NewTodoInputComponent */],
            __WEBPACK_IMPORTED_MODULE_5__todo_filters_todo_filters_component__["a" /* TodoFiltersComponent */],
            __WEBPACK_IMPORTED_MODULE_7__todo_list_todo_list_component__["a" /* TodoListComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormsModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_8__local_storage_service__["a" /* LocalStorageService */], __WEBPACK_IMPORTED_MODULE_9__filter_service_service__["a" /* FilterService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/filter-service.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FilterService = FilterService_1 = (function () {
    function FilterService() {
    }
    FilterService.prototype.insertData = function (htmlElement) {
        FilterService_1.alltodosHtmlElement = htmlElement;
    };
    return FilterService;
}());
FilterService.alltodosHtmlElement = null;
FilterService = FilterService_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], FilterService);

var FilterService_1;
//# sourceMappingURL=filter-service.service.js.map

/***/ }),

/***/ "../../../../../src/app/local-storage.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalStorageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LocalStorageService = (function () {
    function LocalStorageService() {
        this.allTodos = [];
        //this.pluginNumber = pluginNumber;
        this.dataBaseName = 'allTodos'; // + pluginNumber;
    }
    LocalStorageService.prototype.writeDataToLocalStorage = function (newTodoList) {
        localStorage.setItem(this.dataBaseName, JSON.stringify(newTodoList));
    };
    LocalStorageService.prototype.getTodos = function () {
        var allTodosStringFormat = localStorage.getItem(this.dataBaseName);
        if (allTodosStringFormat !== null) {
            this.allTodos = JSON.parse(allTodosStringFormat);
        }
        return this.allTodos;
    };
    LocalStorageService.prototype.getCompletedTodos = function () {
        this.allTodos = this.getTodos();
        this.allTodos = this.allTodos.filter(function (element) {
            return element['checked'] === true;
        });
        return this.allTodos;
    };
    LocalStorageService.prototype.getUncompletedTodos = function () {
        this.allTodos = this.getTodos();
        this.allTodos = this.allTodos.filter(function (element) {
            return element['checked'] === false;
        });
        return this.allTodos;
    };
    LocalStorageService.prototype.addTodo = function (newTodo) {
        this.allTodos = this.getTodos();
        this.allTodos.push(newTodo);
        this.writeDataToLocalStorage(this.allTodos);
    };
    LocalStorageService.prototype.removeTodo = function (id) {
        this.allTodos = this.getTodos();
        // this.allTodos.splice(id, 1);
        this.allTodos = this.allTodos.filter(function (obj) {
            return obj['id'] !== id;
        });
        this.writeDataToLocalStorage(this.allTodos);
    };
    LocalStorageService.prototype.editTextTodo = function (editedTodoText, id) {
        this.allTodos = this.getTodos();
        // console.log(editedTodoText);
        this.allTodos.forEach(function (obj) {
            if (obj['id'] === id) {
                obj['text'] = editedTodoText;
                return;
            }
        });
        this.writeDataToLocalStorage(this.allTodos);
    };
    LocalStorageService.prototype.editStatusTodo = function (id, status) {
        this.allTodos = this.getTodos();
        this.allTodos.forEach(function (obj) {
            if (obj['id'] === id) {
                obj['checked'] = status;
                // console.log(obj.checked);
                return;
            }
        });
        // };
        // this.executeFunction();
        this.writeDataToLocalStorage(this.allTodos);
    };
    LocalStorageService.prototype.validateLocalStorage = function () {
        var test = 'test';
        try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        }
        catch (e) {
            return false;
        }
    };
    return LocalStorageService;
}());
LocalStorageService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], LocalStorageService);

//# sourceMappingURL=local-storage.service.js.map

/***/ }),

/***/ "../../../../../src/app/new-todo-input/new-todo-input.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "form {\n  text-align: center;\n  margin-bottom: 20px;\n}\n.task-input {\n  font-size: 15px;\n  padding: 4px;\n}\n.add-button {\n  font-size: 15px;\n  padding: 5px 22px;\n  background-color: bisque;\n\n}\n::-webkit-input-placeholder {\n  color: #000000;\n}\ninput[type=\"text\"] {\n   border: 1px solid #ddd;\n }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/new-todo-input/new-todo-input.component.html":
/***/ (function(module, exports) {

module.exports = "<form>\n  <input class=\"task-input\" type=\"text\" name=\"task\" placeholder=\"New task\" [(ngModel)]=\"newTodo.text\" (keyup.enter)=\"addTodo()\" />\n  <input class=\"add-button\" (click)=\"addTodo()\" data-action=\"addNewTodo\" type=\"button\" value=\"Add\"/>\n</form>\n<!--to-do:\n add functionality to clean input field-->\n"

/***/ }),

/***/ "../../../../../src/app/new-todo-input/new-todo-input.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewTodoInputComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__todo__ = __webpack_require__("../../../../../src/app/todo.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NewTodoInputComponent = (function () {
    function NewTodoInputComponent() {
        this.add = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.newTodo = new __WEBPACK_IMPORTED_MODULE_1__todo__["a" /* Todo */]();
    }
    NewTodoInputComponent.prototype.addTodo = function () {
        if (this.validateTextInput(this.newTodo.text)) {
            this.newTodo.id = this.getNewId();
            this.add.emit(this.newTodo);
            this.newTodo = new __WEBPACK_IMPORTED_MODULE_1__todo__["a" /* Todo */]();
            //this.taskInputHtmlElement.value = '';
        }
    };
    NewTodoInputComponent.prototype.validateTextInput = function (inputText) {
        if (inputText === '') {
            alert('enter some text');
            return false;
        }
        return true;
    };
    NewTodoInputComponent.prototype.getNewId = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
    };
    NewTodoInputComponent.prototype.ngOnInit = function () {
    };
    return NewTodoInputComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]) === "function" && _a || Object)
], NewTodoInputComponent.prototype, "add", void 0);
NewTodoInputComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-new-todo-input',
        template: __webpack_require__("../../../../../src/app/new-todo-input/new-todo-input.component.html"),
        styles: [__webpack_require__("../../../../../src/app/new-todo-input/new-todo-input.component.css")]
    }),
    __metadata("design:paramtypes", [])
], NewTodoInputComponent);

var _a;
//# sourceMappingURL=new-todo-input.component.js.map

/***/ }),

/***/ "../../../../../src/app/todo-filters/todo-filters.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*.uncompleted-tasks li {*/\n  /*display: block;*/\n/*}*/\n\n/*.uncompleted-tasks .completed-task {*/\n  /*display: none;*/\n/*}*/\ninput {\n  background-color: bisque;\n  padding: 8px;\n  margin: 0 5px;\n  font-size: 15px;\n  box-shadow: 2px 3px 3px rgba(0,0,0,0.5);\n}\n.active-filter {\n  background-color: #b79976;\n}\ninput:hover{\n  background-color: #b58900;\n}\n\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/todo-filters/todo-filters.component.html":
/***/ (function(module, exports) {

module.exports = "<input class=\"all-tasks-btn active-filter\" type=\"button\" (click)=\"showTodosList($event)\" value=\"All\">\n<input class=\"completed-tasks-btn\" type=\"button\" (click)=\"applyCompletedTaskFilter($event)\" value=\"completed tasks\">\n<input class=\"uncompleted-tasks-btn\" type=\"button\" (click)=\"applyUncompletedTaskFilter($event)\"  value=\"uncompleted-tasks\">\n"

/***/ }),

/***/ "../../../../../src/app/todo-filters/todo-filters.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TodoFiltersComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__filter_service_service__ = __webpack_require__("../../../../../src/app/filter-service.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TodoFiltersComponent = (function () {
    function TodoFiltersComponent(filterService) {
        this.filterService = filterService;
    }
    TodoFiltersComponent.prototype.applyUncompletedTaskFilter = function (e) {
        //let unCompletedTaskButton=e.target;
        this.switchActiveFilterClass(this.unCompletedTaskButton, [this.completedTaskButton, this.allTaskButton]);
        this.removeEditModeClass(this.allTodosHtmlElement.childNodes);
        this.hideCompletedTodos();
    };
    TodoFiltersComponent.prototype.applyCompletedTaskFilter = function () {
        this.switchActiveFilterClass(this.completedTaskButton, [this.unCompletedTaskButton, this.allTaskButton]);
        this.allTodosHtmlElement.classList.remove('uncompleted-tasks');
        this.allTodosHtmlElement.classList.add('completed-tasks');
    };
    ;
    TodoFiltersComponent.prototype.hideCompletedTodos = function () {
        this.allTodosHtmlElement.classList.remove('completed-tasks');
        this.allTodosHtmlElement.classList.add('uncompleted-tasks');
        // hideListItems(allTodos, true);
    };
    ;
    TodoFiltersComponent.prototype.switchActiveFilterClass = function (activeElement, notActiveElements) {
        activeElement.classList.add('active-filter');
        notActiveElements.forEach(function (element) {
            element.classList.remove('active-filter');
        });
    };
    TodoFiltersComponent.prototype.removeEditModeClass = function (allTodosChildNodes) {
        for (var i = 0; i < allTodosChildNodes.length; i++) {
            if (allTodosChildNodes[i].className === 'edit-mode') {
                allTodosChildNodes[i].classList.remove('edit-mode');
            }
        }
    };
    TodoFiltersComponent.prototype.showTodosList = function () {
        this.switchActiveFilterClass(this.allTaskButton, [this.unCompletedTaskButton, this.completedTaskButton]);
        // this.allTodos = this.localStorageService.getAllTodos();
        this.allTodosHtmlElement.classList.remove('uncompleted-tasks');
        this.allTodosHtmlElement.classList.remove('completed-tasks');
        this.removeEditModeClass(this.allTodosHtmlElement.childNodes);
        // this.buildTodosList(this.allTodos);
    };
    ;
    TodoFiltersComponent.prototype.ngOnInit = function () {
        // this.allTodosHtmlElement = this.filterService.getAllTodosHtmlElement();
        this.completedTaskButton = document.getElementsByClassName('completed-tasks-btn')[0];
        this.unCompletedTaskButton = document.getElementsByClassName('uncompleted-tasks-btn')[0];
        this.allTodosHtmlElement = document.getElementsByClassName('todos-list')[0];
        //this.allTodosHtmlElement = FilterService.alltodosHtmlElement;
        //console.log( this.allTodosHtmlElement);
    };
    return TodoFiltersComponent;
}());
TodoFiltersComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-todo-filters',
        template: __webpack_require__("../../../../../src/app/todo-filters/todo-filters.component.html"),
        styles: [__webpack_require__("../../../../../src/app/todo-filters/todo-filters.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__filter_service_service__["a" /* FilterService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__filter_service_service__["a" /* FilterService */]) === "function" && _a || Object])
], TodoFiltersComponent);

var _a;
//# sourceMappingURL=todo-filters.component.js.map

/***/ }),

/***/ "../../../../../src/app/todo-item/todo-item.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "input[type=\"text\"] {\n  border: 1px solid #ddd;\n\n}\ninput[type=\"checkbox\"] {\n  display: inline-block;\n}\n\n/* Task list */\nli input[type='text'] {\n  font-size: 15px;\n}\nli > label {\n  display: inline-block;\n  margin-left: 5px;\n  vertical-align: bottom;\n  margin-bottom: 5px;\n  width: 247px;\n\n  overflow: auto;\n}\nli > input[type=\"text\"] {\n  width: 99%;\n}\nli input[type=text] {\n  display: none;\n}\n\n li:nth-child(2n) {\n  margin: 5px;\n  background-color: burlywood;\n}\n\n li:nth-child(2n-1) {\n  margin: 5px;\n  background-color: #b18c5c;\n}\n\n\n\ninput[type=checkbox] + label {\n  text-decoration: none;\n\n}\n\ninput[type=checkbox]:checked + label {\n  color: #f00;\n  font-style: normal;\n  text-decoration: line-through;\n}\n.edit-mode .edit {\n  color: transparent;\n\n}\n\n.edit-mode .edit:before {\n  content: \"Confirm\";\n  padding-left: 22px;\n  color: black;\n}\nli.edit-mode input[type=text] {\n  display: block;\n\n}\nli.edit-mode label {\n  display: none;\n}\n.cancel {\n  display: none;\n}\n\n.edit-mode .cancel {\n  padding:5px 28px;\n  background-color: bisque;\n  display: inline-block;\n  float: right;\n  margin-right: 20px;\n}\n\n.edit-mode .delete {\n  display: none;\n}\n\n.completed-tasks li {\n  display: none;\n}\n\n.completed-tasks .completed-task {\n  display: block;\n}\n\n.edit-mode input[type=checkbox] {\n  display: none;\n}\n\n.uncompleted-tasks li {\n  display: block;\n}\n\n.uncompleted-tasks .completed-task {\n  display: none;\n}\n\n.edit {\n  margin-left: 20px;\n  padding: 5px;\n  display: inline-block;\n  background-color: bisque;\n}\n\n.delete {\n  border-left: 1px solid #b18c5c;\n  padding: 5px 7px;\n  display: inline-block;\n  background-color: bisque;\n}\n\nli * {\n  font-size: 15px;\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/todo-item/todo-item.component.html":
/***/ (function(module, exports) {

module.exports = "<li [id]=\"todo.id\" [class.completed-task]=\"todo.checked\">\n  <input type=\"checkbox\" class=\"statusToggler\" [checked]=\"todo.checked\" (click)=\"switchStatusTodo(todo,$event)\">\n  <label>{{todo.text}}</label>\n  <input type=\"text\">\n  <button class=\"edit\" (click)=\"editTodo(todo,$event)\">Edit</button>\n  <button class=\"cancel\" (click)=\"cancelEditing(todo,$event)\" >Cancel</button>\n  <button class=\"delete\" (click)=\"removeTodo(todo,$event)\">Delete</button>\n</li>\n"

/***/ }),

/***/ "../../../../../src/app/todo-item/todo-item.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TodoItemComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__todo__ = __webpack_require__("../../../../../src/app/todo.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import {LocalStorageService} from "../local-storage.service";
var TodoItemComponent = (function () {
    function TodoItemComponent() {
        this.remove = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.toggleStatus = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.edit = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
    }
    TodoItemComponent.prototype.switchStatusTodo = function (todo, e) {
        var checkboxElement = e.target;
        console.log(checkboxElement);
        if (checkboxElement.checked) {
            checkboxElement.parentNode.classList.add('completed-task');
            todo.checked = true;
            this.toggleStatus.emit(todo);
            // this.localStorageService.editStatusTodo(checkboxElement.parentNode.id, true);
        }
        else {
            checkboxElement.parentNode.classList.remove('completed-task');
            todo.checked = false;
            this.toggleStatus.emit(todo);
            // this.localStorageService.editStatusTodo(checkboxElement.parentNode.id, false);
        }
    };
    //e=== eventObject
    TodoItemComponent.prototype.editTodo = function (todo, e) {
        var listElement = e.target.parentNode;
        var editInput = listElement.querySelector('input[type=text]');
        var label = listElement.querySelector("label");
        var temp = '';
        if (todo.checked !== true) {
            temp = editInput.value;
            if (listElement.classList.contains("edit-mode")) {
                if (label.innerText !== temp) {
                    if (this.validateTextInput(temp)) {
                        label.innerText = temp;
                        todo.text = temp;
                        this.edit.emit(todo);
                    }
                    else {
                        return;
                    }
                }
            }
            else {
                editInput.value = label.innerText;
            }
            listElement.classList.toggle("edit-mode");
        }
    };
    TodoItemComponent.prototype.validateTextInput = function (inputText) {
        if (inputText === '') {
            alert('enter some text');
            return false;
        }
        return true;
    };
    TodoItemComponent.prototype.removeTodo = function (todo, e) {
        var listElement = e.target.parentNode;
        listElement.remove();
        // console.log(e.taret.parentNode);
        this.remove.emit(todo);
    };
    TodoItemComponent.prototype.cancelEditing = function (todo, e) {
        var listElement = e.target.parentNode;
        listElement.classList.remove("edit-mode");
    };
    TodoItemComponent.prototype.ngOnInit = function () {
    };
    return TodoItemComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__todo__["a" /* Todo */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__todo__["a" /* Todo */]) === "function" && _a || Object)
], TodoItemComponent.prototype, "todo", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]) === "function" && _b || Object)
], TodoItemComponent.prototype, "remove", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]) === "function" && _c || Object)
], TodoItemComponent.prototype, "toggleStatus", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */])(),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]) === "function" && _d || Object)
], TodoItemComponent.prototype, "edit", void 0);
TodoItemComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-todo-item',
        template: __webpack_require__("../../../../../src/app/todo-item/todo-item.component.html"),
        styles: [__webpack_require__("../../../../../src/app/todo-item/todo-item.component.css")]
    }),
    __metadata("design:paramtypes", [])
], TodoItemComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=todo-item.component.js.map

/***/ }),

/***/ "../../../../../src/app/todo-list/todo-list.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\ninput {\n  background-color: bisque;\n  padding: 8px;\n  margin: 0 5px;\n  font-size: 15px;\n  box-shadow: 2px 3px 3px rgba(0,0,0,0.5);\n}\n.filters-buttons{\n  text-align: center;\n  margin-bottom: 20px;\n}\n.todo-manager .active-filter{\n  background-color: #b79976;\n}\n.active-filter {\n  background-color: #b79976;\n}\n\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/todo-list/todo-list.component.html":
/***/ (function(module, exports) {

module.exports = "<!--<section *ngIf=\"todos.length > 0\">-->\n<div class=\"filters-buttons\">\n<input class=\"all-tasks-btn active-filter\" type=\"button\" (click)=\"showTodosList($event)\" value=\"All\">\n<input class=\"completed-tasks-btn\" type=\"button\" (click)=\"applyCompletedTaskFilter($event)\" value=\"completed tasks\">\n<input class=\"uncompleted-tasks-btn\" type=\"button\" (click)=\"applyUncompletedTaskFilter($event)\"  value=\"uncompleted-tasks\">\n</div>\n  <ul class=\"todos-list\">\n    <app-todo-item\n      *ngFor=\"let todo of todos\"\n      [todo]=\"todo\"\n      (toggleStatus)=\"onSwitchStatusTodo($event)\"\n      (remove)=\"onRemoveTodo($event)\"\n      (edit)=\"onEditTodo($event)\">\n    </app-todo-item>\n  </ul>\n<!--</section>-->\n"

/***/ }),

/***/ "../../../../../src/app/todo-list/todo-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TodoListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TodoListComponent = (function () {
    function TodoListComponent() {
        this.remove = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.toggleStatus = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.edit = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
    }
    TodoListComponent.prototype.ngOnInit = function () {
        //this.filterService.insertData(document.getElementsByClassName('todos-list')[0]);// console.log(this.todos[1].text);
        // console.log(this.filterService.alltodosHtmlElement);
        ///////
        this.allTaskButton = document.getElementsByClassName('all-tasks-btn')[0];
        this.completedTaskButton = document.getElementsByClassName('completed-tasks-btn')[0];
        this.unCompletedTaskButton = document.getElementsByClassName('uncompleted-tasks-btn')[0];
        this.allTodosHtmlElement = document.getElementsByClassName('todos-list')[0];
    };
    TodoListComponent.prototype.onSwitchStatusTodo = function (todo) {
        this.toggleStatus.emit(todo);
    };
    TodoListComponent.prototype.onRemoveTodo = function (todo) {
        this.remove.emit(todo);
    };
    TodoListComponent.prototype.onEditTodo = function (todo) {
        this.edit.emit(todo);
    };
    ////////////////
    TodoListComponent.prototype.applyUncompletedTaskFilter = function (e) {
        //let unCompletedTaskButton=e.target;
        this.switchActiveFilterClass(this.unCompletedTaskButton, [this.completedTaskButton, this.allTaskButton]);
        this.removeEditModeClass(this.allTodosHtmlElement.childNodes);
        this.hideCompletedTodos();
    };
    TodoListComponent.prototype.applyCompletedTaskFilter = function () {
        this.switchActiveFilterClass(this.completedTaskButton, [this.unCompletedTaskButton, this.allTaskButton]);
        this.allTodosHtmlElement.classList.remove('uncompleted-tasks');
        this.allTodosHtmlElement.classList.add('completed-tasks');
    };
    ;
    TodoListComponent.prototype.hideCompletedTodos = function () {
        this.allTodosHtmlElement.classList.remove('completed-tasks');
        this.allTodosHtmlElement.classList.add('uncompleted-tasks');
        // hideListItems(allTodos, true);
    };
    ;
    TodoListComponent.prototype.switchActiveFilterClass = function (activeElement, notActiveElements) {
        activeElement.classList.add('active-filter');
        notActiveElements.forEach(function (element) {
            element.classList.remove('active-filter');
        });
    };
    TodoListComponent.prototype.removeEditModeClass = function (allTodosChildNodes) {
        for (var i = 0; i < allTodosChildNodes.length; i++) {
            if (allTodosChildNodes[i].className === 'edit-mode') {
                allTodosChildNodes[i].classList.remove('edit-mode');
            }
        }
    };
    TodoListComponent.prototype.showTodosList = function () {
        this.switchActiveFilterClass(this.allTaskButton, [this.unCompletedTaskButton, this.completedTaskButton]);
        // this.allTodos = this.localStorageService.getAllTodos();
        this.allTodosHtmlElement.classList.remove('uncompleted-tasks');
        this.allTodosHtmlElement.classList.remove('completed-tasks');
        this.removeEditModeClass(this.allTodosHtmlElement.childNodes);
        // this.buildTodosList(this.allTodos);
    };
    ;
    return TodoListComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Array)
], TodoListComponent.prototype, "todos", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]) === "function" && _a || Object)
], TodoListComponent.prototype, "remove", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]) === "function" && _b || Object)
], TodoListComponent.prototype, "toggleStatus", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]) === "function" && _c || Object)
], TodoListComponent.prototype, "edit", void 0);
TodoListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-todo-list',
        template: __webpack_require__("../../../../../src/app/todo-list/todo-list.component.html"),
        styles: [__webpack_require__("../../../../../src/app/todo-list/todo-list.component.css")]
    }),
    __metadata("design:paramtypes", [])
], TodoListComponent);

var _a, _b, _c;
//# sourceMappingURL=todo-list.component.js.map

/***/ }),

/***/ "../../../../../src/app/todo.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Todo; });
var Todo = (function () {
    function Todo() {
        this.text = '';
        this.checked = false;
        this.id = '';
    }
    return Todo;
}());

//# sourceMappingURL=todo.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map