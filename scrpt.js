document.addEventListener('DOMContentLoaded', function(){
  const slides = document.querySelectorAll('.slide');
  const prevBtn=document.querySelector('.prev');
  const nextBtn=document.querySelector('.next');
  const indicatorsConainer=
  document.querySelector('.carousel-indicators');
  const slidesContainer=
  document.querySelector('.carousel-slides');

  let currentIndex=0;
  let autoPlayInterval;
  const slideInterval=3000;//3 seconds

  //create indicators
  slides.forEach((slide, index) =>{
    const indicator=document.createElement('div');
    indicator.classList.add('indicator');
    if(index===0)indicator.classList.add('active');
    indicator.addEventListener('click',()=> goToSlide(index));
    indicatorsConainer.appendChild(indicator);
  });

  const indicators=document.querySelectorAll('.indicator');

  //start autoplay
  startAutoPlay();


  //Navigation functions
  function goToSlide(index) {
    //Wrap around if at ends
    if(index >=slides.length){
      currentIndex=0;
    } else if (index<0){
      currentIndex=slides.length-1;
    }else{
      currentIndex=index;
    }
    //update slide position
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

    //update active classes
    updateActiveClasses();

    //Reset autoplay timer when manually navigating 
    resetAutoPlay();
  }
  function nextSlide(){
    goToSlide(currentIndex+1);
  }
  function prevSlide(){
    goToSlide(currentIndex-1);
  }

  function updateActiveClasses(){
    slides.forEach((slide,index)=>{
      slide.classList.toggle('active',index===currentIndex);
    });
  }

  //autoplay functions
  function startAutoPlay(){
    autoPlayInterval=setInterval(nextSlide,slideInterval);
    }
  
    function resetAutoPlay(){
      clearInterval(autoPlayInterval);
      startAutoPlay();
    }

    //Event listeners
    nextBtn,this.addEventListener('click',()=>{
      nextSlide();
    });

    prevBtn.addEventListener('click',()=> {
      prevSlide();
    });

    //Pause on hover
    const carousel=
    document.querySelector('.carousel-container');
    carousel.addEventListener('mouseenter',()=>{
      clearInterval(autoPlayInterval);
    });

    carousel.addEventListener('mouseleave',()=>{
      startAutoPlay();
    });
    //Keyboard navigation
    document.addEventListener('keydown',(e)=>{
      if(e.key==='ArrowRight'){
        nextSlide();
      }else if (e.key==='ArrowLeft'){
        prevSlide();
      }
    });

    //Touch events for mobile 
    let touchStarX=0;
    let touchEndX=0;

    carousel.addEventListener('touchstart',(e)=>{
      touchStarX=e.changedTouches[0].screenX;
    },{passive:true});

    carousel.addEventListener('touchend',(e)=>{
      touchEndX=e.changedTouches[0].screenX;handleSwipe();
    },{passive:true});

    function handleSwipe(){
      if(touchEndX<touchStarX-50){
        nextSlide();//Swipe left
      }else if(touchEndX>touchStarX+50){
        prevSlide();//Swipe right
      }
    }

})