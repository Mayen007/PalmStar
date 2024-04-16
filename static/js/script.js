(() => {
  'use strict'

  document.querySelector('#navbarSideCollapse').addEventListener('click', () => {
    document.querySelector('.offcanvas-collapse').classList.toggle('open')
  })
})()

$('#staticBackdrop').modal({
  backdrop: 'static',
  keyboard: false,
  zIndex: 1050 // Adjust the z-index as needed
});

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll('.animated');

  function checkViewport() {
    sections.forEach(section => {
      const sectionPosition = section.getBoundingClientRect().top;
      const screenHeight = window.innerHeight;

      if (sectionPosition < screenHeight * 0.75) {
        section.classList.add('fadeIn');
      }
    });
  }

  window.addEventListener('scroll', checkViewport);
  checkViewport();
});
