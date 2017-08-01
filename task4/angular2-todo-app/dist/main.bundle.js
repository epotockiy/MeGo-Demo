webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<app-todo></app-todo>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__todo_todo_component__ = __webpack_require__("../../../../../src/app/todo/todo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_3__todo_todo_component__["a" /* TodoComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* ReactiveFormsModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/todo/todo.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/icon?family=Material+Icons);", ""]);

// module
exports.push([module.i, ".clearfix:after {\n  content: '';\n  display: block;\n  clear: both;\n  overflow: hidden;\n}\n\n.todo {\n  font-size: 0;\n  max-width: 1000px;\n  margin: 0 auto;\n  text-align: center;\n  padding: 20px;\n  width: 100%;\n  box-sizing: border-box;\n}\n\n.todo .task-input {\n  padding: 12px 20px;\n  color: #1d1d1d;\n  font-family: 'Helvetica', sans-serif;\n  font-size: 20px;\n}\n\n.todo .task-input:focus {\n  outline: none;\n}\n\n.todo .add-task-btn {\n  background: #2d89ef;\n  border: 1px solid #2d89ef;\n  color: #eff4ff;\n  font-size: 20px;\n  padding: 13px 40px;\n  cursor: pointer;\n  transition: background .4s;\n}\n\n.todo .add-task-btn:hover {\n  background: #2b5797;\n}\n\n.todo .add-task-btn:disabled {\n  background: #2d89ef;\n  cursor: not-allowed;\n}\n\n.todo-list {\n  width: 60%;\n  margin: 0 auto;\n}\n\n.todo-list ul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n.todo-list .task {\n  background: #eff4ff;\n  display: none;\n  margin-top: 20px;\n  padding: 5px;\n  width: 100%;\n}\n\n.todo-list .task > * {\n  box-sizing: border-box;\n}\n\n.todo-list .task.active {\n  display: inline-block;\n}\n\n.todo-list .task.done p {\n  text-decoration: line-through;\n}\n\n.todo-list .task.done .task-edit-btn {\n  cursor: not-allowed;\n}\n\n.todo-list .task.done .task-edit-btn:hover {\n  color: #bbb;\n}\n\n.todo-list .task .task-done-icon,\n.todo-list .task p {\n  float: left;\n}\n\n.todo-list .task .task-edit-btn,\n.todo-list .task .task-close-icon {\n  float: right;\n}\n\n.todo-list .task .task-done-icon {\n  color: #bbb;\n  cursor: pointer;\n  font-size: 36px;\n  transition: color .4s;\n  width: 7%;\n}\n\n.todo-list .task .task-done-icon:hover {\n  color: #2d89ef;\n}\n\n.todo-list .task .task-done-icon.active {\n  color: #2d89ef;\n}\n\n.todo-list .task .task-done-icon.active:hover {\n  color: #bbb;\n}\n\n.todo-list .task p {\n  color: #1d1d1d;\n  font-family: 'Helvetica', sans-serif;\n  font-size: 18px;\n  margin: 0;\n  padding: 7px 10px;\n  width: 71%;\n  overflow-x: auto;\n}\n\n.todo-list .task .task-edit-btn {\n  color: #bbb;\n  cursor: pointer;\n  padding: 8px 20px;\n  background: none;\n  border: none;\n  font-size: 18px;\n  transition: color .4s;\n  width: 15%;\n\n  \n}\n\n.todo-list .task .task-edit-btn:focus {\n  outline: none;\n}\n\n.todo-list .task .task-edit-btn:hover {\n  color: #2d89ef;\n}\n\n.todo-list .task .task-close-icon {\n  color: #bbb;\n  cursor: pointer;\n  font-size: 36px;\n  transition: color .4s;\n  width: 7%;\n}\n\n.todo-list .task .task-close-icon:hover {\n  color: #2d89ef;\n}\n\n.edit {\n  display: none;\n  position: absolute;\n  background: #eee;\n  border: 1px solid #aaa;\n  top: 10%;\n  width: 30%;\n  margin: 0 calc(10% - 40px);\n  padding: 0 40px 40px;\n  box-shadow: 0 0 100px #333;\n  z-index: 101;\n}\n\n.edit.active {\n   display: block;\n }\n\n.edit .edit-input {\n  color: #1d1d1d;\n  font-size: 20px;\n  padding: 5px 15px;\n}\n\n.edit .edit-input:focus {\n  outline: none;\n}\n\n.edit h4 {\n  color: #1d1d1d;\n  font-family: 'Helvetica', sans-serif;\n  font-size: 22px;\n  font-weight: normal;\n  margin: 0;\n  padding: 20px 0;\n}\n\n.edit .save-btn {\n  background: #2d89ef;\n  border: 1px solid #2d89ef;\n  color: #eff4ff;\n  cursor: pointer;\n  font-size: 20px;\n  padding: 6px 30px;\n  transition: background .4s;\n}\n\n.edit .save-btn:hover {\n  background: #2b5797;\n}\n\n.edit .save-btn:disabled {\n  background: #2d89ef;\n  cursor: not-allowed;\n}\n\n.edit .save-btn:disabled:hover {\n  background: #2d89ef;\n}\n\n.edit .edit-close-icon {\n  position: absolute;\n  font-size: 24px;\n  font-weight: bold;\n  color: #aaa;\n  top: 10px;\n  right: 10px;\n  border: none;\n  cursor: pointer;\n  background: none;\n  transition: color .4s;\n}\n\n.edit .edit-close-icon:hover {\n  color: #ccc;\n}\n\n.todo-list .overlay {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  z-index: 100;\n  background: #333;\n  opacity: 0.5;\n  display: none;\n}\n\n.todo-list .overlay.active {\n  display: block;\n}\n\n.filter-btns {\n  padding-top: 20px;\n  font-size: 0;\n}\n\n.filter-btns button:focus {\n  outline: none;\n}\n\n.filter-btns button {\n  cursor: pointer;\n  font-size: 20px;\n  padding: 10px 20px;\n  background: #eff4ff;\n  border: 1px solid #eff4ff;\n  color: #1d1d1d;\n  margin: 0 5px;\n  transition: all .4s;\n}\n\n.filter-btns button:hover {\n   background: #2d89ef;\n   border: 1px solid #2d89ef;\n   color: #eff4ff;\n}\n\n.filter-btns button.active {\n   background: #2d89ef;\n   border: 1px solid #2d89ef;\n   color: #eff4ff;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/todo/todo.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"todo\">\n  <form [formGroup]=\"todoForm\" (ngSubmit)=\"addNewTask(todoForm.value)\">\n    <input class=\"task-input\"\n           type=\"text\"\n           placeholder=\"Enter task name...\"\n           [formControl]=\"todoForm.controls['taskName']\" />\n    <button type=\"submit\"\n            class=\"add-task-btn\"\n            [disabled]=\"!todoForm.valid\">\n      Add\n    </button>\n  </form>\n\n  <div class=\"todo-list\">\n    <div class=\"overlay\" [ngClass]=\"openEditBlock ? 'active' : ''\"></div>\n\n    <div class=\"filter-btns\">\n      <button class=\"all-filter\"\n              [class.active]=\"currentFilter === 'all'\"\n              (click)=\"currentFilter = 'all'\">\n        All\n      </button>\n      <button class=\"progress-filter\"\n              [class.active]=\"currentFilter === 'progress'\"\n              (click)=\"currentFilter = 'progress'\">\n        In progress\n      </button>\n      <button class=\"done-filter\"\n              [class.active]=\"currentFilter === 'done '\"\n              (click)=\"currentFilter = 'done'\">\n        Done\n      </button>\n    </div>\n\n    <ul [ngClass]=\"currentFilter\">\n      <li *ngFor=\"let task of tasksArray; let i = index\"\n          class=\"task clearfix\"\n          [class.done]=\"checkTaskForDone(task)\"\n          [class.active]=\"checkFilter(task)\">\n        <i class=\"material-icons task-done-icon\" [ngClass]=\"task.done ? 'active' : ''\" (click)=\"onDoneClick(i)\">done</i>\n        <p>{{task.name}}</p>\n        <i class=\"material-icons task-close-icon\" (click)=\"onRemoveTask(i)\">close</i>\n        <button class=\"task-edit-btn\"\n                [disabled]=\"task.done\"\n                (click)=\"currentTask = i; openEditBlock = !openEditBlock\">\n          Edit\n        </button>\n      </li>\n    </ul>\n\n    <form [formGroup]=\"editForm\"\n          class=\"edit\"\n          *ngIf=\"openEditBlock\"\n          [ngClass]=\"openEditBlock ? 'active' : ''\">\n      <h4>Edit task</h4>\n      <input class=\"edit-input\"\n             type=\"text\"\n             [value]=\"tasksArray[currentTask].name\"\n             [formControl]=\"editForm.controls['newTaskName']\" />\n      <button type=\"submit\"\n              class=\"save-btn\"\n              [disabled]=\"!editForm.valid\"\n              (click)=\"onSaveClick($event)\">\n        Save\n      </button>\n      <i class=\"material-icons edit-close-icon\" (click)=\"openEditBlock = !openEditBlock\">close</i>\n    </form>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/todo/todo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TodoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TodoComponent = (function () {
    function TodoComponent(_formBuilder) {
        this._formBuilder = _formBuilder;
        this.tasksArray = [];
        this.isStorageAvailable = false;
        this.currentFilter = 'all';
        this.todoForm = this._formBuilder.group({
            'taskName': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required]
        });
        this.editForm = this._formBuilder.group({
            'newTaskName': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required]
        });
    }
    TodoComponent.prototype.ngOnInit = function () {
        this.getListFromStorage();
    };
    TodoComponent.prototype.getListFromStorage = function () {
        if (typeof localStorage !== 'undefined') {
            this.tasksArray = JSON.parse(localStorage.getItem('tasksArray')) || [];
            this.isStorageAvailable = true;
        }
        else {
            console.log('Local storage is not available.');
            this.isStorageAvailable = false;
        }
    };
    TodoComponent.prototype.saveListToStorage = function () {
        localStorage.setItem('tasksArray', JSON.stringify(this.tasksArray));
    };
    TodoComponent.prototype.addNewTask = function (form) {
        this.tasksArray.unshift({
            name: form.taskName,
            done: false
        });
        if (this.isStorageAvailable) {
            this.saveListToStorage();
        }
        this.todoForm.reset();
    };
    TodoComponent.prototype.onDoneClick = function (index) {
        this.tasksArray[index].done = !this.tasksArray[index].done;
        if (this.isStorageAvailable) {
            this.saveListToStorage();
        }
    };
    TodoComponent.prototype.onRemoveTask = function (index) {
        this.tasksArray.splice(index, 1);
        if (this.isStorageAvailable) {
            this.saveListToStorage();
        }
    };
    TodoComponent.prototype.onSaveClick = function (event) {
        event.preventDefault();
        this.tasksArray[this.currentTask].name = this.editForm.controls['newTaskName'].value;
        this.openEditBlock = false;
        if (this.isStorageAvailable) {
            this.saveListToStorage();
        }
    };
    TodoComponent.prototype.checkFilter = function (task) {
        if (task.done) {
            if (this.currentFilter === 'all' || this.currentFilter === 'done') {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if (this.currentFilter === 'all' || this.currentFilter === 'progress') {
                return true;
            }
            else {
                return false;
            }
        }
    };
    TodoComponent.prototype.checkTaskForDone = function (task) {
        return !!task.done;
    };
    return TodoComponent;
}());
TodoComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'app-todo',
        template: __webpack_require__("../../../../../src/app/todo/todo.component.html"),
        styles: [__webpack_require__("../../../../../src/app/todo/todo.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormBuilder */]) === "function" && _a || Object])
], TodoComponent);

var _a;
//# sourceMappingURL=todo.component.js.map

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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map