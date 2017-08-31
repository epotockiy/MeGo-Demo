/**
 * Created by Vladislav on 28.08.2017.
 */

window.onload = function(){

    function TodoList () {

        var toDoList = [];
        var i;
        var sortType = 'all';
        var sortButtons = document.getElementsByClassName('sort-button'),
            editInput = document.getElementsByClassName('editInput'),
            liTask = document.getElementsByClassName('task');

        if(localStorage.getItem('todo') != undefined){
            toDoList = JSON.parse(localStorage.getItem('todo'));
            render();
        }

        function removeSortActive() {
            for(var i=0 ; i<sortButtons.length ; i++){
                if(sortButtons[i].classList.contains('active')) {
                    sortButtons[i].classList.remove('active');
                }
            }
        }

        document.getElementById('clearList').onclick =function () {
            localStorage.clear();
            toDoList=[];
            render();
        };

        document.getElementById('addNote').onclick = function () {
            var d = "";
            if(document.getElementById('newNote').value != ""){
                d = document.getElementById('newNote').value.toString();
                console.log(d);
                var temp = {};
                i = toDoList.length;
                temp.todo = d;
                temp.check = false;
                temp.number = i;
                toDoList[i] = temp;
                render();
                document.getElementById('newNote').value = "";
                console.log(toDoList.length);
                localStorage.setItem( 'todo' , JSON.stringify(toDoList));
            }
            else{
                alert("Field is empty!");
            }
        };

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
                toDoList[idNumber].check = !(toDoList[idNumber].check);
                console.log(toDoList[idNumber].check );
                if (toDoList[idNumber].check) {
                    target.parentNode.classList.add('checked');
                    target.checked = true ;
                }
                else {
                    target.parentNode.classList.remove('checked');
                    target.checked = false;
            }};

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

        function render (target) {
            var out="";
            var p = "";
            for( var key=0;  key < toDoList.length ; key++){
                p = toDoList[key].todo.toString();

                switch (sortType) {
                    case 'complited':
                        if(liTask.classList.contains('checked')) {
                            target.parentNode.classList.add('hide');
                        }
                        break;

                    case 'new':
                        if(toDoList[key].check == false)
                            out += '<li id="'+ key +'"  class="task">' + row(key);
                        break;

                    case 'all':
                        if(toDoList[key].check == true)
                            out += '<li id="'+ key+'"  class="task checked ">';
                        else
                            out += '<li id="'+ key +'"  class="task ">';
                        out += row(key);
                        break;
                    default:
                        alert('Problems with Render function');
                        break;
                }
            }
            if(out != "") {
                document.getElementById('toDoList').innerHTML = out;
            }
            else{
                document.getElementById('toDoList').innerHTML = '<h4>List empty</h4>';
            }
        }


        function renderRow(idLiNumber , tag) {
            document.getElementById(idLiNumber).innerHTML = tag;
        }


        function row(idNumber) {
            var isChecked = '';
            console.log("" + toDoList[idNumber].todo);
            if(toDoList[idNumber].check) {
                isChecked = 'checked'
            }
            return(
            '<input data-action="setCheck" class="checkInput" type="checkbox" '+ isChecked+ ' >' +
            '<input class="editInput" type="text" value="' + toDoList[idNumber].todo + '"/>'+
            '<span class="task-container"><xmp>'+ toDoList[idNumber].todo + '</xmp></span>' +
            '<span data-action="deleteTask" class="delete button">delete</span>' +
            '<span data-action="editTask" class="edit button">edit</span>' +
            '<span data-action="confirmTask" class="confirm button  ">Confirm</span>' +
            '<span data-action="cancelTask" class="cancel button">Cancel</span>');
        }

        function sortItem(type) {
            console.log(liTask);
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