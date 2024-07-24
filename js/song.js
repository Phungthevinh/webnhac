    
const Songtamtrang = document.querySelector('.Songtamtrang')
const btn_random_svg = document.querySelector('.btn-random svg')
const btn_random = document.querySelector('.btn-random')
const repeatBtn = document.querySelector('.repeatBtn')
const repeatBtn_svg = document.querySelector('.repeatBtn svg')
const list_Songs = document.querySelector('.list-Songs')
const list_song = document.querySelector('.list-song')
const musicSong = {
    currentIndex : 0,
    isRandom : false,
    isRepeat: false,

    // phần nhạc
    songs: [
        {
            // nhạc tâm trạng
            SongTamTrang : [
                {
                    name:'Đừng làm trái tim anh đau',
                    img: './image/7b6fe15e9832fb4e91f331e5815536bb.jpg',
                    singer: 'Sơn Tùng MT-P',
                    path: './mp3/dunglamtraitimanhdau.mp3'

                },
                {
                    name:'Răng khôn',
                    img: './image/răng khôn.jpg',
                    singer: 'Bích Phương',
                    path: './mp3/videoplayback.mp3'

                },
                {
                    name:'Kimi no toriko',
                    img: './image/siêu cô đơn.jpg',
                    singer: 'Nhật Bản',
                    path: './mp3/Kimi no toriko♪ • Summertime - Maggie (ft. Nyan) _ Lyrics Video.mp3'

                },
                {
                    name:'Sơn Thủy Trùng Mây',
                    img: './image/98bdd00496ac3cda1ae1794a6427d6d4.jpg',
                    singer: 'Sinkra remix',
                    path: './mp3/SƠN THỦY TRÙNG MÂY REMIX  - JENA FT. ANH RỒNG __ SINKRA REMIX.mp3'

                },
                {
                    name:'Siêu cô đơn remix',
                    img: './image/a14ebd0894bc68b7899df2bf7d62d52c.jpg',
                    singer: 'Yan Nguyễn',
                    path: './mp3/AMV _ Siêu Cô Đơn Remix Nightcore _ Yan Nguyễn.mp3'

                },
                {
                    name:'Dành cho em ',
                    img: './image/roi bao dem.jpg',
                    singer: 'Hoàng Dũng x Orange',
                    path: './mp3/Hoàng Dũng x Orange - Dành Cho Em - Live at yên Concert.mp3'

                },
                {
                    name:'Xe đạp ',
                    img: './image/d1ad3542162d1b8a3a9f5a295238b6e6.jpg',
                    singer: 'Thuỳ Chi ft. Hoàng Dũng',
                    path: './mp3/XE ĐẠP _ Thuỳ Chi ft. Hoàng Dũng [at CONCERT 25].mp3'

                },
                {
                    name:'Đường tôi trở em về ',
                    img: './image/đường tôi chở em về.jpg',
                    singer: 'Bùi Trường Linh',
                    path: './mp3/ĐƯỜNG TÔI CHỞ EM VỀ - Bùi Trường Linh _ Live at ISLE OF ART.mp3'

                },
               
            ]
        }
    ],
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[0].SongTamTrang[this.currentIndex];
                
            }
           
        });
        
    },
    

    render: function(){
       
        if (list_Songs) {
            const htmlslist_Songs = this.songs[0].SongTamTrang.map((song, index) => {
                return `
                <div class=" mt-3 list-song container row ${index === this.currentIndex ? 'active-green' : ''}" data-index = "${index}" >
                    <div class="col-md-2">
                        <img class="imgsong" src="${song.img}" width="100%" height="100%" alt="">
                    </div>
                    <div class="col-md-10 color-white">
                        <p class="mt-4 mb-1">${song.name}</p>
                        <p>${song.singer}</p>
                    </div>

                    </div>
                `;
            }).join('');
            list_Songs.innerHTML = htmlslist_Songs;
        }
        
    },
   

    


    loadcurrentsong: function(){
        const imgsong = document.querySelector('.img-song')
        const titlesongName = document.querySelector('.title-song h5')
        const titlesongSinger = document.querySelector('.title-song p')
        const audio = document.getElementById('audio')
        console.log(imgsong)
       if(imgsong){
        imgsong.src = this.currentSong.img
        
       }
       if(titlesongName){
        titlesongName.textContent = this.currentSong.name
       }
       if(titlesongSinger){
        titlesongSinger.textContent = this.currentSong.singer
       }
       if(audio){
        audio.src = this.currentSong.path
       }
       
    },

    playSong: function(){
        const play = document.querySelector('.play')
        const pause = document.querySelector('.pause')
        play.onclick = function(){
            play.classList.add('display-none')
            pause.classList.add('display-block')
            audio.play()
        }
        pause.onclick = function(){
            play.classList.remove('display-none')
            pause.classList.remove('display-block')
            audio.pause()
        }
        audio.ontimeupdate = function(){
            const progress = document.querySelector('#progress')
            
            if(audio.duration){
                progress.value = audio.currentTime / audio.duration *100
            }
        }
        //xử lý khi tua
        progress.onchange = function(){
            
            if(audio.duration){
                const seekTime = progress.value / 100 * audio.duration
                audio.currentTime = seekTime
            }
           
        }
        
        const nextBtn = document.querySelector('.nextSong')
        nextBtn.onclick = () => {
            if(musicSong.isRandom){
                musicSong.playRandomSong()
            }else{
                this.nextSongs()
                
                
               
            }
            
            audio.play()
            this.loadcurrentsong()  
            play.onclick()
            this.render()
            this.scrollSongsActive()
            
        }   

        //xử lý khi bài hát hết
        // Lắng nghe sự kiện ended để chuyển bài hát khi bài hiện tại kết thúc
        audio.onended = () => {
            if(musicSong.isRepeat){
                audio.play()
            }else{
                this.nextSongs()
            }
            
            this.loadcurrentsong()
            audio.play()
        }

        //xử lý sự kiện quay lại nhạc trước
        const prevSong = document.querySelector('.prevSong')
        prevSong.onclick = () => {

            if(musicSong.isRandom){
                musicSong.playRandomSong()
            }else{
                this.prevSongs()
            }
            
            this.loadcurrentsong()
            audio.play()
            play.onclick()
            this.render()
            this.scrollSongsActive()
        }
        //xử lý phần random bài hát
        btn_random.onclick = function(e){
            musicSong.isRandom = !musicSong.isRandom
            btn_random_svg.querySelector('path').setAttribute('fill', musicSong.isRandom ? 'red' : '#ffffff')

        }
        //xử lý phần lặp lại bài hát khi kết thúc
        repeatBtn.onclick = () =>{
            musicSong.isRepeat = !musicSong.isRepeat
            repeatBtn_svg.querySelector('path').setAttribute('fill', musicSong.isRepeat ? 'red' : '#ffffff')
        }

        list_Songs.onclick = function(e){
           const songnote = e.target.closest('.list-song:not(.active-green) ')
            if(songnote){
                musicSong.currentIndex = Number(songnote.getAttribute('data-index'))
                musicSong.loadcurrentsong()
                audio.play()
                play.onclick()
                musicSong.render()
               
            }
        }

        
    },

    scrollSongsActive: function () {
        setTimeout(() => {
            const activeSong = document.querySelector('.list-song .active-green');
            if (activeSong) {
                activeSong.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        });
    },

    nextSongs: function(){
        this.currentIndex++
        if(this.currentIndex >= this.songs[0].SongTamTrang.length){
            this.currentIndex = 0
        }
        
    },
    prevSongs: function() {
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs[0].SongTamTrang.length - 1
        }
        
    },
    playRandomSong: function(){
        let newIndex 
        do{
            newIndex = Math.floor(Math.random() * this.songs[0].SongTamTrang.length)
        }while(newIndex === this.currentIndex)
            this.currentIndex = newIndex
            this.loadcurrentsong()
    },
  

    //update thời lượng bài hát
    
    start: function(){
        
        this.defineProperties()
        this.render()
        this.loadcurrentsong()
        this.playSong()
    }
}

musicSong.start()

