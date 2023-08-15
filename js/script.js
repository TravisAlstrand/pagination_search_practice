// ELEMENT SELECTORS
const authorContainer = document.querySelector("#authorContainer");
const paginationList = document.querySelector("#paginationList");

// console.log(authors);
const authorsPerPage = 3;

/* This function will handle calculating how many buttons are
needed and dynamically add them to the page */

function handlePagination(array) {
  const numberOfPages = Math.ceil(array.length / authorsPerPage);

  for (let i = 1; i <= numberOfPages; i++) {
    const html = `
      <li>
        <button>${i}</button>
      </li>
    `;
    paginationList.insertAdjacentHTML("beforeend", html);
  }
}

/* This function will handle calculating how many and which
authors to show on the current page and dynamically add them */

function showPage(array, page) {
  const start = page * authorsPerPage - authorsPerPage;
  const end = page * authorsPerPage - 1;
  authorContainer.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    if (i >= start && i <= end) {
      const html = `
        <div class="author-card">
          <div class="card-header">
            <img src="${authors[i].image}" alt="photo of ${authors[i].name}" />
          </div>
          <div class="card-content">
            <h2 class="title">${authors[i].name}</h2>
            <p>${authors[i].text}</p>
          </div>
        </div>
      `;

      authorContainer.insertAdjacentHTML("beforeend", html);
    }
  }
}

/* This function will handle adding and removing
the active class from the correct buttons */

function handleActiveClass(button) {
  if (!button) {
    button = document.querySelector("button");
    button.classList.add("active");
  } else {
    const activeButton = document.querySelector(".active");
    activeButton.classList.remove("active");
    button.classList.add("active");
  }
}

/* This event listener will handle calling our
functions above to change the page & active button  */

paginationList.addEventListener("click", (e) => {
  const buttonClicked = e.target.closest("button");

  if (buttonClicked) {
    showPage(authors, buttonClicked.innerHTML);
    handleActiveClass(buttonClicked);
  }
});

/* These function calls are needed to initialize the page */

handlePagination(authors);
showPage(authors, 1);
handleActiveClass(null);
