let cardContainer = document.querySelector('[data-cards]');
let originalResults = [];

fetch('https://randomuser.me/api?results=50')
  .then(data => data.json())
  .then(result => {
    let { results } = result;
    originalResults = [...results]; 
    displayPeople(results);
  });

function displayPeople(people) {
  cardContainer.innerHTML = "";
  people.forEach(person => {
    cardContainer.innerHTML += `
      <div class="card" style="width: 18rem;">
        <img src="${person.picture.large}" class="card-img-top img-fluid" alt="${person.name.first}">
        <div class="card-body">
          <h5 class="card-title">${person.name.title}. ${person.name.first} ${person.name.last}</h5>
          <p class="card-text">Age: ${person.registered.age}</p>
        </div>
      </div>`;
  });
}

function search() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const filteredResults = originalResults.filter(person =>
    `${person.name.first} ${person.name.last}`.toLowerCase().includes(searchTerm)
  );
  displayPeople(filteredResults);
}

function resetSearch() {
  document.getElementById("searchInput").value = "";
  displayPeople(originalResults);
}

function sortPeople() {
  const sortedResults = [...originalResults].sort((a, b) =>
    `${a.name.first} ${a.name.last}`.localeCompare(`${b.name.first} ${b.name.last}`)
  );
  displayPeople(sortedResults);
}
