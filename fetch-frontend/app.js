const $form = document.getElementById('user-form');
const userURL = 'http://localhost:3000/users';

$form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData($form);
  const name = formData.get('name');
  const age = formData.get('age');

  console.log(name, age);

  fetch(userURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      age
    })
  })
    .then(parseJSON)
    .then(userToElement)
    .then(appendUsers);

  event.target.reset();
});

fetch(userURL)
  .then(parseJSON)
  .then(displayUsers);

function parseJSON(response) {
  return response.json();
}

function displayUsers(users) {
  users
    .map(userToElement)
    .forEach(appendUsers);
}

function userToElement(user) {
  const $user = document.createElement('div');
  const h1 = document.createElement('h1');
  const p = document.createElement('p');
  const button = document.createElement('button');

  h1.textContent = user.name;
  p.textContent = user.age;
  button.textContent = 'DELETE';

  $user.append(h1, p, button);

  button.addEventListener('click', (even) => {
    $user.remove();
    fetch(`${userURL}/${user.id}`, {
      method: 'DELETE'
    });
  });

  return $user;
}

function appendUsers($user) {
  document.body.append($user);
}