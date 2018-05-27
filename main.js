let $wrap = $('.slider-wrap');
let $images = $('.slider-box img');
let $btnLeft = $('#btn_left');
let $btnRight = $('#btn_right');
let run = false;
let n = 0;
let timer;

init();

autoSlide();

//监听鼠标移入，移出事件
$wrap.on('mouseenter',function(){
  clearInterval(timer);
})
$wrap.on('mouseleave',function(){
  autoSlide();
})

//监听按钮点击
$btnLeft.on('click',function(){
  if(!run){
    slideToLeft();
    run = true;
  }
})

$btnRight.on('click',function(){
  if(!run){
    slideToRight();
    run = true;
  }
})
//初始化
function init(){
  $images.eq(0).addClass('current')
  .siblings().addClass('enter');
}
//自动滚动
function autoSlide(){
  timer = setInterval(()=>{
    slideToRight();
  },3000)
}
//向右移动
function slideToRight(){
  makeNextAll(n)
  makePrevious(n)
  makeCurrent(n+1).one('transitionend',() => run = false)
  n++;
}
//向左移动 
function slideToLeft(){
  makePreviousAll(n)
  makeNext(n,'left')
  makeCurrent(n-1).one('transitionend',() => run = false)
  n--;
}
//控制 下标
function limitIndex(n){
  if(n<0){
    n = n+4;
  }
  return n%4;
}
//状态机 Previous
function makePrevious(index,type){
  let node = $images.eq(limitIndex(index));
  if(type === 'left'){
    return node.removeClass('current enter up-level').addClass('leave')
  }
  return node.removeClass('current enter').addClass('leave up-level')
}
//状态机 Current
function makeCurrent(index){
  let node = $images.eq(limitIndex(index))
  return node.removeClass('enter leave').addClass('current up-level')
}
//状态机 Next
function makeNext(index,type){
  let node = $images.eq(limitIndex(index));
  if(type === 'left'){
    return node.removeClass('leave current').addClass('enter up-level');
  }
  return node.removeClass('leave current up-level').addClass('enter');
}

//把所有状态设为Previous
function makePreviousAll(index){
  for(let i = 0;i < $images.length ; i++){
    if(i !== limitIndex(index) || i !== limitIndex(index+1)){
      makePrevious(i,'left')
    }
  }
}
//把所有状态设为Next
function makeNextAll(index){
  for(let i = 0;i < $images.length ; i++){
    if(i !== limitIndex(index) || i !== limitIndex(index-1)){
      makeNext(i)
    }
  }
}