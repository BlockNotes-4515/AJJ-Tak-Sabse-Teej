const API_URL = "http://localhost:3000/news";  // Proxy server URL

window.addEventListener("load", () => fetchNews("India")); // Load news articles for default query

/* Making of the Reload Function! */
function reload() {
    window.location.reload(); // Reload the page
}

async function fetchNews(query) {
    try {
        const res = await fetch(`${API_URL}?q=${query}`); // Corrected API URL
        if (!res.ok) {
            throw new Error('Network response was not ok: ' + res.statusText);
        }
        const data = await res.json();
        bindData(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
        alert('Failed to fetch news articles. Please try again later.'); // User-friendly error message
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = ''; // Clear previous articles

    articles.forEach((article) => {
        if (!article.urlToImage) return; // Skip articles without an image
        const cardClone = newsCardTemplate.content.cloneNode(true); // Use content to clone the template
        fillDataInCard(cardClone, article); // Fill the cloned card with article data
        cardsContainer.appendChild(cardClone); // Append the cloned card to the container
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage; // Set image source
    newsTitle.innerHTML = article.title; // Set article title
    newsDesc.innerHTML = article.description; // Set article description

    // Format and set the publication date and source
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });
    newsSource.innerHTML = `${article.source.name} · ${date}`; // Set source name and publication date

    // Open article in a new tab when the card is clicked
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;

function onNavItemClick(id) {
    fetchNews(id); // Fetch news for the selected category
    const navItem = document.getElementById(id);
    if (curSelectedNav) {
        curSelectedNav.classList.remove("active"); // Remove active class from previous nav item
    }
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active"); // Add active class to the current nav item
}

// Search functionality
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value.trim(); // Trim whitespace from query
    if (!query) return; // Exit if the query is empty
    fetchNews(query); // Fetch news based on the search query
    if (curSelectedNav) {
        curSelectedNav.classList.remove("active"); // Remove active class from previous nav item
        curSelectedNav = null; // Reset current selected nav
    }
});
