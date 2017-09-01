/**
 * Created by Vladislav on 28.08.2017.
 */

window.onload = function(){

    function TodoList () {

        var toDoList = [];
        var i;
        var sortType = 'all';
        var sortButtons = document.getElementsByClassName('sort-button'),
            editInputClass = document.getElementsByClassName('editInput'),
            liTaskClass = document.getElementsByClassName('task');

        var checkInput = document.createElement('input'),
            editInput =  document.createElement('input'),
            editButton = document.createElement('span'),
            deleteButton = document.createElement('span'),
            confirmButton = document.createElement('span'),
            taskContainer = document.createElement('span'),
            cancelButton = document.createElement('span'),
            liTask = document.createElement('li');


        if(localStorage.getItem('todo') != undefined){
            toDoList = JSON.parse(localStorage.getItem('todo'));
            for(var key in toDoList){
                console.log(toDoList[key]);
                renderRow(toDoList[key]);
            }
        }

        function removeSortActive() {
            for(var i=0 ; i<sortButtons.length ; i++){
                if(sortButtons[i].classList.contains('active')) {
                    sortButtons[i].classList.remove('active');
                }
            }
        }

        document.getElementById('clearList').addEventListener( 'click' , function () {
            localStorage.clear();
            toDoList=[];
        });





        document.getElementById('addNote').addEventListener( 'click' , function () {
            var d = "";
            if(document.getElementById('newNote').value != ""){
                d = document.getElementById('newNote').value.toString();
                var temp = {};
                i = toDoList.length;
                temp.todo = d;
                temp.check = false;
                temp.number = i;
                toDoList[i] = temp;
                renderRow(temp);
                console.log(toDoList);
                document.getElementById('newNote').value = "";
                localStorage.setItem( 'todo' , JSON.stringify(toDoList));
            }
            else{
                alert("Field is empty!");
            }
        });

        function render() {
            for( var key=0;  key < toDoList.length ; key++){
                renderRow('toDoList', row(key));
            }
        }

        function renderRow(temp) {
            var list = document.getElementById('toDoList');
            list.insertBefore( row(temp) , list.firstChild);
        }

        function row(temp) {
            var isChecked = '';
            if(temp.check) {
                isChecked = 'checked';
                editInput.checked = isChecked;
                liTask.className = isChecked;
            }
            liTask.className = 'task';
            checkInput.className = 'checkInput';
            checkInput.type = "checkbox";
            checkInput.dataset.action="setCheck";
            editInput.className = 'editInput';
            editInput.type = "text";
            taskContainer.className = 'task-container';
            taskContainer.innerText = temp.todo;
            editButton.className = 'button edit';
            editButton.innerHTML = "edit";
            editButton.dataset.action="editTask";
            confirmButton.className = 'button confirm';
            confirmButton.innerHTML = "confirm";
            confirmButton.dataset.action="confirmTask";
            cancelButton.className = 'button cancel';
            cancelButton.innerHTML = "cancel";
            cancelButton.dataset.action="cancelTask";
            deleteButton.className = 'button delete';
            deleteButton.innerHTML = "delete";
            deleteButton.dataset.action="deleteTask";

            liTask.appendChild(checkInput);
            liTask.appendChild(editInput);
            liTask.appendChild(taskContainer);
            liTask.appendChild(editButton);
            liTask.appendChild(confirmButton);
            liTask.appendChild(cancelButton);
            liTask.appendChild(deleteButton);

            return(liTask);
            // '<input data-action="setCheck" class="checkInput" type="checkbox" '+ isChecked+ ' >' +
            // '<input class="editInput" type="text" value="' + toDoList[idNumber].todo + '"/>'+
            // '<span class="task-container"><xmp>'+ toDoList[idNumber].todo + '</xmp></span>' +
            // '<span data-action="deleteTask" class="delete button">delete</span>' +
            // '<span data-action="editTask" class="edit button">edit</span>' +
            // '<span data-action="confirmTask" class="confirm button  ">Confirm</span>' +
            // '<span data-action="cancelTask" class="cancel button">Cancel</span>');
        }


        document.getElementById('container').onclick = function(e) {
            var self = this;
            var target = e.target;
            var child;
            var idNumber = target.parentNode.id;

            this.all = function() {
                sortItem('all');
                removeSortActive();
                target.classList.add('active');
            };
            this.new = function() {
                sortItem('new');
                removeSortActive();
                target.classList.add('active');
            };
            this.completed = function() {
                sortItem('completed');
                removeSortActive();
                target.classList.add('active');
            };


            this.setCheck = function () {
                target.parentNode.classList.add('checked');
                var inputCheck = target.parentNode.getElementsByTagName('input')[0].checked;
                if (inputCheck) {
                    target.parentNode.classList.add('checked');
                    target.checked = true;
                }
                else {
                    target.parentNode.classList.remove('checked');
                    target.checked = false;
                }
            };

            this.deleteTask = function () {
                toDoList.splice(idNumber,1);
                render();
            };
            this.editTask =function () {
                if(target.parentNode.classList.contains('checked') == false) {
                    target.parentNode.classList.add('edit-mode');
                }
            };
            this.cancelTask = function () {
                child = document.getElementById(idNumber).getElementsByTagName('input')[1];
                child.value = toDoList[idNumber].todo;
                target.parentNode.classList.remove('edit-mode');
            };
            this.confirmTask = function () {
                child = document.getElementById(idNumber).getElementsByTagName('input')[1];
                toDoList[idNumber].todo = child.value;
                target.parentNode.classList.remove('edit-mode');
                renderRow( idNumber , row(idNumber));
            };


            var sort = target.getAttribute('data-sort');
            var action = target.getAttribute('data-action');
            if (sort) {
                self[sort]();
            }
            if(action){
                self[action]();
            }
            localStorage.setItem( 'todo' , JSON.stringify(toDoList));
        };





        function sortItem(type) {
            for( var i=0;  i < liTask.length ; i++) {
                switch (type) {
                    case 'completed':
                        if (liTask[i].classList.contains('checked') == true) {
                            if (liTask[i].classList.contains('hide')) {
                                liTask[i].classList.remove('hide');
                            }
                        }
                        else {
                            if (liTask[i].classList.contains('hide') == false) {
                                liTask[i].classList.add('hide');
                            }
                        }
                        break;

                    case 'new':
                        console.log(liTask[i]);
                        if (liTask[i].classList.contains('checked') == false){
                            if (liTask[i].classList.contains('hide')) {
                                liTask[i].classList.remove('hide');
                            }
                        }
                        else{
                            if(liTask[i].classList.contains('hide') == false) {
                                liTask[i].classList.add('hide');
                            }
                        }
                        break;

                    case 'all':
                        if (liTask[i].classList.contains('hide')) {
                            liTask[i].classList.remove('hide');
                        }
                        break;
                    default:
                        alert('Problems with Render function');
                        break;
                }
            }
        }
    }

    new TodoList();
};