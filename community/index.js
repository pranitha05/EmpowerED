const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");
const searchContainer = document.getElementById("search-container");
const errorContainer = document.getElementById("error-message-container");
const formContainer = document.getElementById('search-form');

const postContainer = document.getElementById("card-container");
const datasets = [{
    src: "./assets/typescript.png",
    title: "Typescript",
    desc: "TypeScript is a free and open-source high-level programming language developed by Microsoft that adds static typing with optional type annotations to JavaScript."
}, 
{
    src: "./assets/typescript.png",
    title: "Typescript",
    desc: "TypeScript is a free and open-source high-level programming language developed by Microsoft that adds static typing with optional type annotations to JavaScript."
}, 
{
    src: "./assets/typescript.png",
    title: "Typescript",
    desc: "TypeScript is a free and open-source high-level programming language developed by Microsoft that adds static typing with optional type annotations to JavaScript."
}]

function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function addPostToPage(posts) {
    for(let post of posts) {
        const postCardDiv = document.createElement("div");
        postCardDiv.classList.add("card");

        postCardDiv.innerHTML = `
        <a href="/community/posts/${post.title.toLowerCase()}">
            <img height="30px" width="30px" src=${post.src} alt=${post.alt}>
            <h2 class="card-title">${post.title}</h2>
            <p class="card-desc">${post.desc}</p>
        </a>
        `
        postContainer.append(postCardDiv)
    }
}


function errorHandler(message) {
    deleteChildElements(errorContainer)
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("message")
    cardDiv.textContent = message;
    errorContainer.appendChild(cardDiv);

}

function searchEvent(evt) {
    evt.preventDefault();
    deleteChildElements(postContainer);
    if(!searchInput.value) {
        showAllPosts()
        return;
    }
    const post = datasets.filter(post => post.title.toLowerCase() === searchInput.value.toLowerCase());
    if(!post.length) {
        errorHandler(`No posts name with '${searchInput.value}' were found`);
        return;
    }
    addPostToPage(post)
    deleteChildElements(errorContainer)
    searchInput.value = "";
}

function showAllPosts() {
    deleteChildElements(postContainer);
    deleteChildElements(errorContainer)
    addPostToPage(datasets)
}

formContainer.addEventListener("submit", searchEvent)
showAllPosts()
