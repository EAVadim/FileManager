$(document).ready(function(){
    menu = [{name: 'Новая папка0',level: 0,id: 1}, {name: 'Новая папка1',level: 0,id: 2}, {name: 'Новая папка2',level: 0,id: 3}];

    function renderMenu() {
        $('.list').empty();
        for (i = 0; i < menu.length; i++) {
            let strStart = "";
            strEnd = "";
            for (j = 0; j <= menu[i].level; j++){
                strStart+="<ul>";
                strEnd+="</ul>";
            }
            $(".list").append(strStart + menu[i].name +'<button class="target" id="addSameLevel '+menu[i].id+'">Добавить</button><button class="target" id="addNextLevel '+menu[i].id+'">Добавить сабуровень</button>'+'<button class="target" id="delete '+menu[i].id+'">Удалить</button><button class="target" id="edit '+menu[i].id+'">Редактировать</button>' + strEnd);
        }
    }

    function logAction(action){
        $(".logs").append("<p>" + new Date().toLocaleString() + " Вызвано действие " + action + "</p>");
    }

    renderMenu();

    $(document).on("click", ".target", function(event) {
        if(~event.target.id.indexOf("addSameLevel")){
        logAction(event.target.id.split(' ')[0]);
            for(i = 0; i < menu.length; i++){
                if(menu[i].id == event.target.id.split(' ')[1]){
                    j = i;
                    while(j < menu.length - 1){
                        if(menu[i].level >= menu[j].level){
                            if(j - i == 1){
                                menu.splice(i + 1, 0, {name: 'Новая папка' + menu.length, level: menu[i].level, id: menu.length + 1});
                                renderMenu();
                                return;
                            }
                        }
                        j++;
                    }
                    menu.splice(j + 1, 0, {name: 'Новая папка' + menu.length, level: menu[i].level, id: menu.length + 1});
                    renderMenu();
                }
            }
        }

        if(~event.target.id.indexOf("addNextLevel")){
        logAction(event.target.id.split(' ')[0]);
            for(i = 0; i < menu.length; i++){
                if(menu[i].id == event.target.id.split(' ')[1]){
                    menu.splice(i + 1, 0, {name: 'Новая папка' + menu.length, level: menu[i].level + 1, id: menu.length + 1});
                    renderMenu();
                }
            }
        }

        if(~event.target.id.indexOf("delete")){
        logAction(event.target.id.split(' ')[0]);
            for(i = 0; i < menu.length; i++){
                if(menu[i].id == Number(event.target.id.split(' ')[1])){
                    currentLevel = menu[i].level;
                    menu.splice($.inArray(menu[i],menu) ,1);
                    while (i < menu.length && menu[i].level != currentLevel){
                        menu.splice($.inArray(menu[i],menu) ,1);
                    }
                    renderMenu();
                }
            }
        }

        if(~event.target.id.indexOf("edit")){
            $('.modal-content').append('<button id="newNameButton ' + event.target.id.split(' ')[1] + '" class="target">Ок</button>');
            $('.dialogWindowId').show();
        }

        if(~event.target.id.indexOf("newNameButton")){
            logAction(event.target.id.split(' ')[0]);
            for(i = 0; i < menu.length; i++){
                if(menu[i].id == Number(event.target.id.split(' ')[1])){
                    menu[i].name = $('#newName').val();
                    $("#newName").val("");
                    $(this).remove();
                }
            }
            $('.dialogWindowId').hide();
            renderMenu();
        }
    });

    $(document).on('click','.close',function(){
       $('.dialogWindowId').hide();
    });

});