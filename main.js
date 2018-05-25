let $slierBox = $('.slider-box');
let $buttons = $('.buttons-box span');
let $wrap = $('.slider-wrap');
let n = 0;
let setTimer;

//定义自动播放函数
const autoSlide = time => {
  setTimer = setInterval(()=>{
    n++;
    n = n%$buttons.length;
    $buttons.eq(n).trigger('click');
  },time);
}

//添加点击事件
$buttons.on('click',function(){
  let $this = $(this);
  let index = $this.index();
  let x = index*(-800);
  $slierBox.css({'transform': 'translateX('+x+'px)'})
              .addClass('active')
              .siblings('.active').removeClass('active'); 
  n = index;
})

//开启自动播放
autoSlide(2500);

//鼠标进入，清除定时器，停止滚动
$wrap.on('mouseenter',function(){
  clearInterval(setTimer);
})
//鼠标离开，启动定时器，开启自动播放
$wrap.on('mouseleave',function(){
  autoSlide(2500);
})



