/**
 * Created by Vladislav on 28.08.2017.
 */

window.onload = function(){

    function TodoList () {

        var toDoList = [];
        var i;
        var sortType = 'all';
        var sortButtons = document.getElementsByClassName('sort-button'),
            editInput = document.getElementsByClassName('editInput');



        if(localStorage.getItem('todo') != undefined){
            toDoList = JSON.parse(localStorage.getItem('todo'));
            render();
        }

        function removeSortActive() {
            for(var i=0 ; i<sortButtons.length ; i++){
                if(sortButtons[i].classList.contains('active')){
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
                d = document.getElementById('newNote').value;
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
            var idNumber = target.parentNode.id;

            this.all = function() {
                sortType = 'all';
                removeSortActive();
                target.classList.add('active');
                render();
            };
            this.new = function() {
                sortType = 'new';
                removeSortActive();
                target.classList.add('active');
                render();
            };
            this.complited = function() {
                sortType = 'complited';
                removeSortActive();
                target.classList.add('active');
                render();
            };

            this.setCheck = function () {
                toDoList[idNumber].check = !(toDoList[idNumber].check);
                if (toDoList[idNumber].check) {
                    target.parentNode.classList.add('checked');
                }
                else {
                    target.parentNode.classList.remove('checked');
            }};
            this.deleteTask = function () {
                toDoList.splice(idNumber,1);
                render();
            };
            this.editTask =function () {
                renderRow( idNumber ,rowView( idNumber,true));
            };
            this.cancelTask = function () {
                renderRow( idNumber ,rowView(idNumber,false));
            };
            this.confirmTask = function () {
                var child = document.getElementById(idNumber).getElementsByTagName('input')[1];
                toDoList[idNumber].todo = child.value;
                renderRow( idNumber ,rowView( idNumber,false) );
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

        function render () {
            var out="";
            for( var key=0;  key < toDoList.length ; key++){
                switch (sortType) {
                    case 'complited':
                        if(toDoList[key].check == true){
                            out += '<li id="'+ key +'"  class="task checked">' +
                                '<input data-action="setCheck" class="checkInput" type="checkbox" checked>' + toDoList[key].todo +
                                '<span data-action="deleteTask" class="delete button">delete</span>' +
                                '<span data-action="editTask" class="edit button">edit</span></li>'  ;
                        }
                        break;
                    case 'new':
                        if(toDoList[key].check == false){
                            out += '<li id="'+ key +'"  class="task">' +
                                '<input data-action="setCheck" class="checkInput" type="checkbox">' + toDoList[key].todo +
                                '<span data-action="deleteTask" class="delete button">delete</span>' +
                                '<span data-action="editTask" class="edit button">edit</span></li>'  ;
                        }
                        break;
                    case 'all':
                        if(toDoList[key].check == true){
                            out += '<li id="'+ key+'"  class="task checked">' +
                                '<input data-action="setCheck" class="checkInput" type="checkbox" checked>';
                        }
                        else{
                            out += '<li id="'+ key +'"  class="task">' +
                                '<input data-action="setCheck" class="checkInput" type="checkbox">';
                        }
                        out += toDoList[key].todo + '' +
                            '<span data-action="deleteTask" class="delete button">delete</span>' +
                            '<span data-action="editTask" class="edit button">edit</span></li>'  ;
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


        function rowView(idNumber, editInput) {
            var out = "";
            if(toDoList[idNumber].check == true){
                out += '<input data-action="setCheck" class="checkInput" type="checkbox" checked>';
            }
            else{
                out += '<input data-action="setCheck" class="checkInput" type="checkbox">';
            }
            if(editInput){
                out+= '<input class="editInput" type="text" value="' + toDoList[idNumber].todo + '"/>'+
                    '<span data-action="confirmTask" class="confirm button">Confirm</span>' +
                    '<span data-action="cancelTask" class="cancel button">Cancel</span>';
            }
            else{
                out+= toDoList[idNumber].todo +
                    '<span data-action="deleteTask" class="delete button">delete</span>' +
                    '<span data-action="editTask" class="edit button">edit</span>';
            }
            return (out);
        }

        function renderRow(idLiNumber , tag) {
            document.getElementById(idLiNumber).innerHTML = tag;
        }
    }

    new TodoList();
};