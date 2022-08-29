var foo = document.querySelector('#root');
var main = document.createElement('main');
var header = document.createElement('h1');
header.innerText = 'Test';
main.appendChild(header);
foo === null || foo === void 0 ? void 0 : foo.appendChild(main);
