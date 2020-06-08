window.addEventListener('load', function(){
  document.querySelector('.preloader').classList.add('opacity-0');
  setTimeout( function(){
    document.querySelector('.preloader').style.display='none';
  }, 1000);
})

// Portifolio Item Filter
const filterContainer = document.querySelector(".portifolio-filter"),
      filterBtns=filterContainer.children,
      totalfilterBtn = filterBtns.length;
      portfolioItems=document.querySelectorAll('.portifolio-item'),
      totalPortfolioItem=portfolioItems.length;

for(let i=0; i<totalfilterBtn; i++){
  filterBtns[i].addEventListener('click', function() {
    filterContainer.querySelector('.active').classList.remove('active')
    this.classList.add('active');

    const filterValue = this.getAttribute('data-filter')
    
    for (let k=0; k<totalPortfolioItem; k++){
      if(filterValue === portfolioItems[k]
        .getAttribute('data-category')){
          portfolioItems[k].classList.remove('hide');
          portfolioItems[k].classList.add('show');
      }else {
        portfolioItems[k].classList.remove('show')
        portfolioItems[k].classList.add('hide')
      }
      if (filterValue === "all"){
        portfolioItems[k].classList.remove('hide');
        portfolioItems[k].classList.add('show');
      }
    }
  })
}

// Portifolio Ligthbox
const lightbox=document.querySelector('.lightbox'),
      lightboxImg=lightbox.querySelector('.lightbox-img'),
      lightboxClose=lightbox.querySelector('.lightbox-close'),
      lightboxText=lightbox.querySelector('.caption-text'),
      lightboxCounter=lightbox.querySelector('.caption-counter');
let itemIndex=0;

for(let i=0; i<totalPortfolioItem; i++){
  portfolioItems[i].addEventListener('click', function() {
    itemIndex=i;
    changeItem();
    toggleLightbox();
  })
}

function nextItem(){
  if(itemIndex === totalPortfolioItem-1){
    itemIndex=0;
  }else{
    itemIndex++
  }
  changeItem();
}

function prevItem(){
  if(itemIndex === 0){
    itemIndex=totalPortfolioItem-1;
  }else{
    itemIndex--
  }
  changeItem();
}

function toggleLightbox(){
  lightbox.classList.toggle("open")
}
function changeItem(){
  imgSrc=portfolioItems[itemIndex]
    .querySelector('.portifolio-img img')
    .getAttribute('src');
  lightboxImg.src=imgSrc;
  lightboxText.innerHTML=portfolioItems[itemIndex]
    .querySelector('h4').innerHTML;
  lightboxCounter.innerHTML = (itemIndex+1) + ' de ' + totalPortfolioItem;
};

// Close Lightbox

lightbox.addEventListener('click', function(event){
  if(event.target === lightboxClose || event.target === lightbox){
    toggleLightbox();
  }
})

// Aside Navbar 

 const nav=document.querySelector('.nav'),
       navList=nav.querySelectorAll('li'),
       totalNavList=navList.length,
       allSelection=document.querySelectorAll('.section'),
       totalSection=allSelection.length;

  for(let i=0; i<totalNavList; i++){
   const a = navList[i].querySelector('a')
    a.addEventListener('click', function(){
      // Remove back-section Class
      removeBackSectionClass();

      for(let j=0; j<totalNavList; j++){
        if(navList[j].querySelector('a').classList.contains('active')){
          // ADD back-section Class
         addBackSectionClass(j);
        }
        navList[j].querySelector('a').classList.remove('active');
      }
      this.classList.add('active');
      showSection(this);

      if(window.innerWidth <1200){
        asideSectionTogglerBtn();
      }
    })
  }

  
  function removeBackSectionClass(){
    for(let i=0; i<totalSection; i++){
      allSelection[i].classList.remove('back-section');
    }
  }

  function addBackSectionClass(num){
    allSelection[num].classList.add('back-section');  
  }

  function showSection(element){
    for(let i=0; i<totalSection; i++){
      allSelection[i].classList.remove('active');
    }
    const target= element.getAttribute('href').split('#')[1];
    document.querySelector('#'+target).classList.add('active');
  }

  function updateNav(element) {
    for(let i=0; i<totalNavList; i++){
      navList[i].querySelector('a').classList.remove('active');
      const target = element.getAttribute('href').split('#')[1];
      if(target === navList[i].querySelector('a').getAttribute('href').split('#')[1]){
        navList[i].querySelector('a').classList.add('active');
      }
    }
  }
  
  document.querySelector('.hire-me').addEventListener('click', function(){
    const sectionIndex=this.getAttribute('data-section-index');
    
    showSection(this);
    updateNav(this);
    removeBackSectionClass();
    addBackSectionClass(sectionIndex);
  })

  const navTogglerBtn=document.querySelector('.nav-toggler'),
        aside=document.querySelector('.aside');

        navTogglerBtn.addEventListener('click', asideSectionTogglerBtn);

  function asideSectionTogglerBtn(){
    aside.classList.toggle('open');
    navTogglerBtn.classList.toggle('open');
    for(let i=0; i<totalSection; i++){
      allSelection[i].classList.toggle('open');
    }
  }

