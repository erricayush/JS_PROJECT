// console.log('hello ji')

 const newElement=document.createElement('h2');
//  console.log(newElement)
newElement.textContent="Strike is coming";
// console.log(newElement)
newElement.style.color='green';

const ele=document.querySelector('.first');
ele.after(newElement);

const newElement2=document.createElement('h3');
newElement2.textContent='holi is coming';
newElement2.classList.add('holi','diwali');
console.log(newElement2)
ele.before(newElement2);
