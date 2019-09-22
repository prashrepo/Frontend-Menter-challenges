import '../sass/main.scss';

(() => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav__links');

  burger.addEventListener('click', () => {
    nav.classList.toggle('nav__active');

    burger.classList.toggle('toggle');
  });
})();
