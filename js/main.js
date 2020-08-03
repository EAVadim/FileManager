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
        $(".list").append(strStart + menu[i].name +'<button class="target" id="addSameLevel '+menu[i].id+'">+</button><button class="target" id="addNextLevel '+menu[i].id+'">добавить на след уровень</button>'+'<button class="target" id="delete '+menu[i].id+'">удалить</button><button class="target" id="edit '+menu[i].id+'">редактировать</button><button class="target" id="hide '+menu[i].id+'">скрыть</button><button class="target" id="show '+menu[i].id+'">открыть</button>' + strEnd);
        }
    }

    renderMenu();

    $(document).on("click", ".target", function(event) {
        if(~event.target.id.indexOf("addSameLevel")){
            for(i = 0; i < menu.length; i++){
                if(menu[i].id == event.target.id.split(' ')[1]){
                    for(j = i; j < menu.length; j++){
                        if(menu[i].level == menu[j].level){
                            if(j-i == 1){
                                menu.splice(i + 1, 0, {name: 'Новая папка' + menu.length, level: menu[i].level, id: menu.length + 1});
                                renderMenu();
                                return;
                            }
                            menu.splice(j + 1, 0, {name: 'Новая папка' + menu.length, level: menu[j].level, id: menu.length + 1});
                            renderMenu();
                        }
                    }
                }
            }
        }

        if(~event.target.id.indexOf("addNextLevel")){
            for(i = 0; i < menu.length; i++){
                if(menu[i].id == event.target.id.split(' ')[1]){
                    menu.splice(i + 1, 0, {name: 'Новая папка' + menu.length, level: menu[i].level + 1, id: menu.length + 1});
                    renderMenu();
                }
            }
        }

        if(~event.target.id.indexOf("delete")){
            for(i = 0; i < menu.length; i++){
                if(menu[i].id == event.target.id.split(' ')[1]){
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
            for(i = 0; i < menu.length; i++){
                if(menu[i].id == event.target.id.split(' ')[1]){
                    menu[i].name = 'Новое имя';
                    renderMenu();
                }
            }
        }

        if(~event.target.id.indexOf("hide")){
            for(i = 0; i < menu.length; i++){
                if(menu[i].id == event.target.id.split(' ')[1]){
                    $('.list').hide();
                    renderMenu();
                }
            }
        }
    });
});