/**
 * Created by Vladislav on 28.08.2017.
 */

window.onload = function(){

    function TodoList () {

        var toDoList = [];
        var sortType = 'all' , i;
        var sortButtons = document.getElementsByClassName('sort-button');
        var taskClasses = document.getElementsByClassName('task');
        var checkInput , editInput ,  editButton , deleteButton ,
            confirmButton , taskContainer , cancelButton ,  liTask ;

        function removeSortActive() {
            for(var i=0 ; i<sortButtons.length ; i++){
                if(sortButtons[i].classList.contains('active')) {
                    sortButtons[i].classList.remove('active');
                }
            }
        }
        function render(){
            console.log("render");
            for(var key in toDoList){
                console.log("Empty row" , toDoList[key]);
                renderRow(toDoList[key]);
            }
        }
        function renderRow(temp) {
            var ul = document.getElementById('toDoList');
            sortItem(sortType);
            ul.insertBefore( row(temp) , ul.firstChild);
        }
        function row(temp) {
            checkInput = document.createElement('input');
            editInput =  document.createElement('input');
            editButton = document.createElement('span');
            deleteButton = document.createElement('span');
            confirmButton = document.createElement('span');
            taskContainer = document.createElement('span');
            cancelButton = document.createElement('span');
            liTask = document.createElement('li');
            liTask.className = 'task';
            liTask.dataset.information = temp.number;
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

            var isChecked = '';
            if(temp.check) {
                isChecked = 'checked';
                checkInput.checked = isChecked;
                liTask.classList = (isChecked + ' task');
            }
            liTask.appendChild(checkInput);
            liTask.appendChild(editInput);
            liTask.appendChild(taskContainer);
            liTask.appendChild(editButton);
            liTask.appendChild(confirmButton);
            liTask.appendChild(cancelButton);
            liTask.appendChild(deleteButton);

            return(liTask);
        }
        function findKey(dataNumber){
            for(var key in toDoList){
                if(toDoList[key].number == dataNumber){
                    return key;
                }
            }
            return 0;
        }
        function sortItem() {
            for( var i=0;  i < taskClasses.length ; i++) {
               switch (sortType) {
                    case 'completed':
                        if (taskClasses[i].classList.contains('checked') == true) {
                            if (taskClasses[i].classList.contains('hide')) {
                                taskClasses[i].classList.remove('hide');
                            }
                        }
                        else {
                            if (taskClasses[i].classList.contains('hide') == false) {
                                taskClasses[i].classList.add('hide');
                            }
                        }
                        break;

                    case 'new':
                        if (taskClasses[i].classList.contains('checked') == false){
                            if (taskClasses[i].classList.contains('hide')) {
                                taskClasses[i].classList.remove('hide');
                            }
                        }
                        else{
                            if(taskClasses[i].classList.contains('hide') == false) {
                                taskClasses[i].classList.add('hide');
                            }
                        }
                        break;

                    case 'all':
                        if (taskClasses[i].classList.contains('hide')) {
                            taskClasses[i].classList.remove('hide');
                        }
                        break;
                    default:
                        alert('Problems with Render function');
                        break;
                }
            }
        }
        document.getElementById('container').addEventListener('click' , function(e) {

            var target = e.target;
            var child , number;
            if(target.id == "clearList" || target.parentNode.id == "clearList") {
                localStorage.clear();
                toDoList=[];
                render();
            }
            if(target.id == "addNote" || target.parentNode.id == "addNote"){
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
                    document.getElementById('newNote').value = "";
                    localStorage.setItem( 'todo' , JSON.stringify(toDoList));
                }
                else{
                    alert("Field is empty!");
                }
            }
            if(target.dataset.sort == 'all'){
                sortType = 'all';
                sortItem();
                removeSortActive();
                target.classList.add('active');
            }
            if(target.dataset.sort =='new'){
                sortType = 'new';
                sortItem();
                removeSortActive();
                target.classList.add('active');
            }
            if(target.dataset.sort == 'completed'){
                sortType = 'completed';
                sortItem();
                removeSortActive();
                target.classList.add('active');
            }
            if(target.classList.contains('checkInput')) {
                var inputCheck = target.parentNode.getElementsByTagName('input')[0].checked;
                number = findKey(target.parentNode.dataset.information);
                if (inputCheck) {
                    target.parentNode.classList.add('checked');
                    toDoList[number].check = true;
                }
                else {
                    target.parentNode.classList.remove('checked');
                    toDoList[number].check = false;
                }

            }
            if(target.classList.contains('edit')){
                if(target.parentNode.classList.contains('checked') == false) {
                    target.parentNode.classList.add('edit-mode');
                    number = findKey(target.parentNode.dataset.information);
                    child = target.parentNode.getElementsByTagName('input')[1];
                    child.value = toDoList[number].todo;
                }
            }
            if(target.classList.contains('cancel')){
                number = findKey(target.parentNode.dataset.information);
                child = target.parentNode.getElementsByTagName('input')[1];
                child.value = toDoList[number].todo;
                target.parentNode.classList.remove('edit-mode');
            }
            if(target.classList.contains('delete')){
                target.parentNode.remove();
            }
            if(target.classList.contains('confirm')){
                number = findKey(target.parentNode.dataset.information);
                child = target.parentNode.getElementsByTagName('input')[1];
                toDoList[number].todo = child.value;
                target.parentNode.getElementsByTagName('span')[0]
                    .innerText = toDoList[number].todo;
                target.parentNode.classList.remove('edit-mode');
                child.value = "";
                console.log(true);
            }
            localStorage.setItem( 'todo' , JSON.stringify(toDoList));
        });

        if(localStorage.getItem('todo') != undefined){
            toDoList = JSON.parse(localStorage.getItem('todo'));
            render();
        }

    }
    new TodoList();
};