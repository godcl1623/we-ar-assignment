const foo = document.querySelector('#root');
const main = document.createElement('main');
const header = document.createElement('h1');
header.innerText = 'Test';
main.appendChild(header);
foo?.appendChild(main);
