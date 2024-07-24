const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const nav_item = $$('.nav-item')
const menus = $$('.menu')



nav_item.forEach((tab, index) => {
    const menu =menus[index]
    
    tab.onclick = function(){
        
        nav_item.forEach(item => item.classList.add('opacity'));
        $('.col-md-8.center-div.display-none.display-block.menu.border-radius15px ').classList.remove('display-block')

        this.classList.remove('opacity');
        menu.classList.add('display-block')
    }
})