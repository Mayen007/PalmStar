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
