/**
 * Created by Vladislav on 28.08.2017.
 */

window.onload = function(){


    var toDoList = [];
    var i;
    var sortType = 'all';
    var sortButtons = document.getElementsByClassName('sort-button');
    var editInput = document.getElementsByClassName('editInput');



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

    var Controller = function () {
        document.getElementById('clearList').onclick =function () {
            localStorage.clear();
            toDoList=[];
            render();
        }

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


            this.check = function () {
                toDoList[idNumber].check = !(toDoList[idNumber].check);
                if (toDoList[idNumber].check) {
                    target.parentNode.classList.add('checked');
                }
                else {
                    target.parentNode.classList.remove('checked');
            }}

            this.deleteTask = function () {
                toDoList.splice(idNumber,1);
                render();
                localStorage.setItem( 'todo' , JSON.stringify(toDoList));
            };
            this.editTask =function () {
                renderRow( idNumber ,editRow( idNumber));
            };
            this.cancelTask = function () {
                renderRow( idNumber ,baseRow(idNumber));
            };
            this.confirmTask = function () {
                var child = document.getElementById(idNumber).getElementsByTagName('input')[1];
                console.log(child.value);
                toDoList[idNumber].todo = child.value;
                renderRow( idNumber ,baseRow( idNumber) );
                localStorage.setItem( 'todo' , JSON.stringify(toDoList));
            };

            var sort = target.getAttribute('data-sort');
            var action = target.getAttribute('data-action');
            if (sort) {
                self[sort]();
            }
            if(action){
                self[action]();
            }


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
        }
    }

    function render () {
        var out="";
        for( var key=0;  key< toDoList.length ; key++){

            switch (sortType) {
                case 'complited':
                    if(toDoList[key].check == true){
                        out += '<li id="'+ key +'"  class="task checked">' +
                            '<input data-action="check" class="checkInput" type="checkbox" checked>' + toDoList[key].todo +
                            '<span data-action="deleteTask" class="delete button">delete</span>' +
                            '<span data-action="editTask" class="edit button">edit</span></li>'  ;
                    }
                    break;
                case 'new':
                    if(toDoList[key].check == false){
                        out += '<li id="'+ key +'"  class="task">' +
                            '<input data-action="check" class="checkInput" type="checkbox">' + toDoList[key].todo +
                            '<span data-action="deleteTask" class="delete button">delete</span>' +
                            '<span data-action="editTask" class="edit button">edit</span></li>'  ;
                    }
                    break;
                case 'all':
                    if(toDoList[key].check == true){
                        out += '<li id="'+ key+'"  class="task checked">' +
                            '<input data-action="check" class="checkInput" type="checkbox" checked>';
                    }
                    else{
                        out += '<li id="'+ key +'"  class="task">' +
                            '<input data-action="check" class="checkInput" type="checkbox">';
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



    function editRow(idNumber) {
        var out = "";
        if(toDoList[idNumber].check == true){
            out += '<input data-action="check" class="checkInput" type="checkbox" checked>';
        }
        else{
            out += '<input data-action="check" class="checkInput" type="checkbox">';
        }
        out += '<input class="editInput" type="text" value="' + toDoList[idNumber].todo + '"/>'+
            '<span data-action="confirmTask" class="confirm button">Confirm</span>' +
            '<span data-action="cancelTask" class="cancel button">Cancel</span>';
        return (out);
    }

    function baseRow( idNumber){
        var out = "";
        if(toDoList[idNumber].check == true){
            out += '<input data-action="check" class="checkInput" type="checkbox" checked>';
        }
        else{
            out += '<input data-action="check" class="checkInput" type="checkbox">';
        }
        out += toDoList[idNumber].todo +
            '<span data-action="deleteTask" class="delete button">delete</span>' +
            '<span data-action="editTask" class="edit button">edit</span></li>'  ;
        return(out);
    }


    function renderRow(idLiNumber , tag) {
        document.getElementById(idLiNumber).innerHTML = tag;
    }

    new Controller();
}