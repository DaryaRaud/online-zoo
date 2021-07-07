
/*Dark theme*/
function theme() {
  const toggleTheme = document.querySelector ('.header_checkbox')
 
 let el = document.documentElement

  toggleTheme.addEventListener('click', () => {
    if(el.hasAttribute('data-theme')) {
      el.removeAttribute('data-theme')
      localStorage.removeItem('theme')
    } else {
      el.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    }
  })

  if(localStorage.getItem('theme') !== null) {
    el.setAttribute('data-theme', 'dark')
    toggleTheme.checked = true
    }
}

theme();


//карусель 2//



const petsWrapper = document.querySelector('.pets_in_zoo-gallery');
const petsInput = document.querySelector('#range3');

const petsSlider = transitionSlider(petsWrapper);

petsWrapper.addEventListener('click', (e) => {
  if (e.target.classList.contains('pets_in_zoo-vector2')) {
    petsSlider.move('right');
  } else if (e.target.classList.contains('pets_in_zoo-vector1')) {
    petsSlider.move('left');
  } else if (e.target.classList.contains('pets_in_zoo_text')) {
    let nextSlide = parseInt(e.target.parentElement.dataset.slide, 10);
    petsSlider.move(null, nextSlide);
  }
  
})

petsInput.addEventListener('change', (e) => {
  let inputVal = parseInt(e.target.value, 10);
  petsSlider.move(null, inputVal);
})

function transitionSlider(wrapper) {
  let nextSlide;
  let activeSlide = 0;
  let transition = 0;

  return {
    move(direction, next=null) {
      const slides = wrapper.querySelectorAll('.pets_in_zoo-pic');
      slides[activeSlide].classList.remove('active');
      

      if (next === null) {
        if (direction === 'right') nextSlide = (activeSlide + 1 + slides.length) % slides.length;
        if (direction === 'left') nextSlide = (activeSlide - 1 + slides.length) % slides.length;
      } else {
        nextSlide = next;
        if (nextSlide > activeSlide) direction = 'right';
        else direction = 'left';
      }
  
      const sliderRect = wrapper.children[1].getBoundingClientRect();
      const elRect = slides[nextSlide].getBoundingClientRect();

      if (elRect.right > sliderRect.right || elRect.left < sliderRect.left) {
        let deltaX = parseFloat(sliderRect[direction]) - parseFloat(elRect[direction]);
        if (deltaX) {
          if (nextSlide === 0) {
            transition = 0;
          } else if (nextSlide === slides.length - 1) {
            transition += parseFloat(sliderRect['right']) - parseFloat(elRect['right'])
          } else {
            transition += deltaX;
          }

          slides.forEach((el) => {
            el.style.transform = `translateX(${transition}px)`;
          })
        }
      }
      slides[nextSlide].classList.add('active');
      activeSlide = nextSlide;

      wrapper.nextElementSibling.querySelector('.pets_in_zoo_scroll').innerText = `0${activeSlide + 1}/`;
      wrapper.nextElementSibling.querySelector('#range3').value = activeSlide;

      return activeSlide;
    }
  }
}

function arrowStateChanger(wrapper, elIndex) {
  if(elIndex > 0) {
    wrapper.children[0].classList.remove('disabled');
  } else {
    wrapper.children[0].classList.add('disabled');    
  }
  
  if (elIndex >= wrapper.children[1].children.length - 1) {
    wrapper.children[2].classList.add('disabled');
  } else {
    wrapper.children[2].classList.remove('disabled');
  }
}
