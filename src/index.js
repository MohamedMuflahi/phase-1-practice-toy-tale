const cardCollection = document.getElementById("toy-collection");
const nameInput = document.getElementById("nameInput");
const imageInput = document.getElementById("imageInput");
const submitButton = document.getElementById("submitButton");
submitButton.addEventListener('click', ()=>{
  addObject();
});
let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
  RenderObjects();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
function RenderObjects(){
  // renders objects from DB
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => {
      //console.log(data[0].name); THIS GETS WOODY
      data.forEach(element => {
        let card = document.createElement('div');
        card.className = "card";
        card.innerHTML = `
      <h2>${element.name}</h2>
      <img src="${element.image}" class="toy-avatar" />
      <p>${element.likes} Likes</p>
      <button class="like-btn" id="${element.id}">Like ❤️</button>
      `;
      cardCollection.appendChild(card);
      let button = document.getElementById(element.id);
      let x = (element.likes +1);
      button.addEventListener('click',() => {
        fetch(`http://localhost:3000/toys/${element.id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            likes: x,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then((response) => response.json())
          .then((json) => {
            location.reload();
          });
      });
      })
      
      
  });
}
function addObject(){
  console.log('addObjext called');
  fetch('http://localhost:3000/toys', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: nameInput.value,
    image: imageInput.value,
    likes: 0,

  }),
})
.then(response => response.json())
.then(data => {
  console.log('success');
  location.reload();
})
.catch((error) => {
  console.error('Error:', error);
});
}

 // http://localhost:3000/toys