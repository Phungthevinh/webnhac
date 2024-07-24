
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const nav_item = $$('.nav-item');
const listimage = $('.list-image')
const imglide = $$('.img-slide')
const btnleft = $('.btn-left')
const btnrigth = $('.btn-right')
const itemContainer = $('.item-container');
const albums = $('.albums')
const btnleftalbum = $('.btnleftalbum')
const btnrightalbum = $('.btnrightalbum')
const listfeeling =$$('.listfeeling')
const musics = $('.musics')
const music =$$('.music')

const menu = $$('.menu')

const btnmusichotleft = $('.btn-music-hot-left')
const btnmusichotright = $('.btn-music-hot-right')

let listalbum = $$('.list-album');




 var slidetranform = 'transform 0.5s ease';
 
 let currentMusic = 0
 let currentAlbum = 0;
 let current = 0
let intervalalbum 
let intervalmusic
listimage.style.transition = slidetranform;
albums.style.transition = slidetranform
musics.style.transition = slidetranform


imglide.forEach( (img) => {
    img.classList.add('border-radius15px')
})







//xử lý trang chủ
//xử lý img slide








const app = {

    slidealbums:[
        {
            img: '../image/98bdd00496ac3cda1ae1794a6427d6d4.jpg',
            name: ' List-Thế Vinh '
        },
        {
            img: '../image/f5f76bf874cd941b271bdda2288ead52.jpg',
            name: ' Những kẻ thất tình'
        },
        {
            img: '../image/anh.jpg',
            name: 'Nạp lại năng lượng '
        },
        {
            img: '../image/7b6fe15e9832fb4e91f331e5815536bb.jpg',
            name: 'chill'
        },
        {
            img: '../image/a14ebd0894bc68b7899df2bf7d62d52c.jpg',
            name: 'đôi mắt long lanh'
        },
    ],      


    
    


    createItems: function() {
        imglide.forEach((img, index) => {
            const item = document.createElement('div');
            item.classList.add('item');
            if (index === 0) item.classList.add('active');
           

            item.onclick = () => {
                clearInterval(intervalId);
                current = index;
                this.updateSlide();
                this.startSlide();
            };

            itemContainer.appendChild(item);
        });
    },

    updateItems: function() {
        const items = $$('.item');
        items.forEach((item, index) => {
            item.classList.toggle('active', index === current);
        });
    },

    updateSlide: function() {
        let width = imglide[0].offsetWidth;
        listimage.style.transform = `translateX(${width * -1 * current}px)`;
        this.updateItems();
    },

    imgslide: function() {
        current++;
        if (current >= imglide.length) {
            current = 0;
        }
        let width = imglide[0].offsetWidth;
        listimage.style.transform = `translateX(${width * -1 * current}px)`;
        this.updateSlide();
    },

    startSlide: function() {
        intervalId = setInterval(() => {
            this.imgslide();
        }, 4000);
    },
    //xử lý phần album

   

    listalbum: function() {
        currentAlbum++;
        if (currentAlbum >= listalbum.length) {
            currentAlbum = 0;
        }
        let width = listalbum[0].offsetWidth + 30;
        albums.style.transform = `translateX(${width * -1 * currentAlbum}px)`;
    },

   
    startalbum: function() {
        intervalalbum = setInterval(() => {
            this.listalbum();
        }, 2500);
    },

    //xử lú hot music
    listmusic: function(){
        currentMusic++
        let width = music[0].offsetWidth + 15
        if(currentMusic >= music.length){
            currentMusic = 0
        }
        musics.style.transform = `translateX(${width * -1 * currentMusic}px)`;
    },
    startmusic: function(){
        intervalmusic = setInterval(() => {
            this.listmusic()
        }, 2500)
    },




//phần xử lý event
handelEvent: function(){
    //xử lý sự kiện phần tâm trang
    listfeeling.forEach((tab, index) => {
        tab.style.color = 'white'
         tab.style.textDecoration  = 'none'
        tab.onmouseover = function(){
            this.style.transition = 'background-position 0.5s ease-out'
            this.style.cursor = 'pointer'
        }
    } )

    listalbum.forEach((tab) => {
        tab.onmouseover = function(){
            this.style.cursor = 'pointer'
           
           
        }
    })

    albums.onclick = () =>{
        alert('tính năng đang phát triển')
    }
    
    

 //xử lý active của nav
 nav_item.forEach((tab, index) => {
    const menus = menu[index]
    tab.onclick = function() {
       
        // Thêm class 'opacity' vào tất cả các tabs
        nav_item.forEach(item => item.classList.add('opacity'));
        $('.col-md-8.center-div.display-none.display-block.menu.border-radius15px').classList.remove('display-block')
        // Xóa class 'opacity' từ tab hiện tại
        this.classList.remove('opacity');
        menus.classList.add('display-block')
    }
});
//right img slide btn
if (btnrigth) {

    btnrigth.onclick = (e) => {
        clearInterval(intervalId);
        this.imgslide();
        this.startSlide();
        
    };
}
if (btnleft) {
    btnleft.onclick = (e) => {
        clearInterval(intervalId);
        current--
        if(current <0){
           current = imglide.length -1
        }
        let width = imglide[0].offsetWidth
        listimage.style.transform = `translateX(${width *-1 * current}px)`;
        this.startSlide();
    };
    
}

//xử lý nút qua lại của album
//right
btnrightalbum.onclick = (e) => {
    clearInterval(intervalalbum)
    this.listalbum()
    this.startalbum()
}
//left
btnleftalbum.onclick = () => {
    clearInterval(intervalalbum)
    currentAlbum--;
    
    if(currentAlbum < 0){
        currentAlbum = listalbum.length -1 
    }
    let width = listalbum[0].clientWidth
    albums.style.transform = `translateX(${width *-1 * currentAlbum}px)`;
    this.startalbum()
   
}

//xử lý nút bẩm hot music
btnmusichotright.onclick = () => {
    clearInterval(intervalmusic)
    this.listmusic()
    this.startmusic()
}

btnmusichotleft.onclick = () => {
    clearInterval(intervalmusic)
    currentMusic--
    if(    currentMusic
        < 0){
            currentMusic = music.length - 1
    }
    let width = music[0].offsetWidth + 15
    musics.style.transform = `translateX(${width *-1 * currentMusic}px)`;
    this.startmusic()
}


},

   


render: function(){
    const htmls = this.slidealbums.map( slidealbum => {
     return `
         <div  class="list-album" >
                         <img src="${slidealbum.img}" width="100%" height="100%" alt="">    
                         <h6>${slidealbum.name}</h6>
                     </div>
     `
    })
    albums.innerHTML = htmls.join('')
    listalbum = $$('.list-album');
 },
 



//phần chạy ứng dụng
start: function(){
    this.handelEvent()
    this.render();
    
    this.startalbum();
    this.handelEvent()
    this.createItems();
    this.startSlide();
    this.startmusic();
    

}
}

app.start();