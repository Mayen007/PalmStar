(() => {
  'use strict'

  document.querySelector('#navbarSideCollapse').addEventListener('click', () => {
    document.querySelector('.offcanvas-collapse').classList.toggle('open')
  })
})()

$('#staticBackdrop').modal({
  backdrop: 'static',
  keyboard: false,
  zIndex: 1051 // Adjust the z-index as needed
});
