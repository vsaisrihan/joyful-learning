// Define the Header Component
class MainHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="site-nav">
                <a class="logo" href="index.html">
                    <img src="./i.png" alt="Joyful Learn logo" />
                    <span>Kids Stories</span>
                </a>

                <div class="nav-links">
                    <a href="./index.html" class="nav-link nav-active">Home</a>
                    <a href="./index.html#stories" class="nav-link">Stories</a>
                    <a href="#" class="nav-link">Progress</a>
                    <a href="#" class="nav-link">Achievements</a>
                    <a href="contact.html" class="nav-link">Contact</a>
                    <a href="addstory.html" class="nav-cta">Add a Story</a>
                </div>

                <span class="cart-spacer" aria-hidden="true"></span>
            </nav>
            <div class="season-announcement" role="status">
                <span aria-hidden="true">✦</span>
                Season 20 Celebration — New stories, brighter adventures, bigger imagination!
                <span aria-hidden="true">✦</span>
            </div>
        `;
    }
}

// Define the Footer Component
class MainFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
           <footer>
        © 2026 Joyful Learn. All Rights Reserved.

    </footer>

        `;
    }
}

// Register the custom tags so the browser understands them
customElements.define('main-header', MainHeader);
customElements.define('main-footer', MainFooter);

const GOOGLE_ANALYTICS_ID = "G-FP3E6RRYEH";
const GOOGLE_ADS_CLIENT_ID = "ca-pub-6378941290908904";

function loadGoogleAnalytics() {
    if (!GOOGLE_ANALYTICS_ID || GOOGLE_ANALYTICS_ID === "G-XXXXXXXXXX") {
        return;
    }

    if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}"]`)) {
        return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
        window.dataLayer.push(arguments);
    }

    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GOOGLE_ANALYTICS_ID);
}

loadGoogleAnalytics();

function hasRealGoogleAdsClient() {
    return GOOGLE_ADS_CLIENT_ID && !GOOGLE_ADS_CLIENT_ID.includes("XXXXXXXX");
}

function loadGoogleAds() {
    if (!hasRealGoogleAdsClient()) {
        return;
    }

    if (document.querySelector(`script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GOOGLE_ADS_CLIENT_ID}"]`)) {
        return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GOOGLE_ADS_CLIENT_ID}`;
    document.head.appendChild(script);
}

// Auto ads uses this one site-wide script; placement is managed in AdSense.
loadGoogleAds();

const STORY_SUBMISSION_EMAIL = "v.sai.srihan@gmail.com";
const FAVORITE_STORIES_KEY = "favoriteStories";

let showingFavoriteStories = false;

function getFavoriteStories() {
    return JSON.parse(localStorage.getItem(FAVORITE_STORIES_KEY)) || [];
}

function saveFavoriteStories(favorites) {
    localStorage.setItem(FAVORITE_STORIES_KEY, JSON.stringify(favorites));
}

function getStoryIdFromCard(card) {
    const title = card.querySelector("h3")?.textContent || "";
    return title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function decorateStoryCard(card) {
    if (!card || card.querySelector(".favorite-btn")) {
        return;
    }

    const storyId = getStoryIdFromCard(card);

    if (!storyId) {
        return;
    }

    card.dataset.storyId = storyId;

    const button = document.createElement("button");
    button.className = "favorite-btn";
    button.type = "button";
    button.setAttribute("aria-label", "Add story to favorites");
    button.setAttribute("aria-pressed", "false");
    button.textContent = "♡";

    button.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleFavoriteStory(storyId);
    });

    card.appendChild(button);
}

function updateFavoriteControls() {
    const favorites = getFavoriteStories();
    const favoriteCount = document.getElementById("favoriteCount");
    const favoriteToggle = document.getElementById("favoriteToggle");

    document.querySelectorAll(".cards .card").forEach(card => {
        const storyId = card.dataset.storyId || getStoryIdFromCard(card);
        const isFavorite = favorites.includes(storyId);
        const button = card.querySelector(".favorite-btn");

        card.classList.toggle("is-favorite", isFavorite);

        if (button) {
            button.textContent = isFavorite ? "♥" : "♡";
            button.setAttribute("aria-label", isFavorite ? "Remove story from favorites" : "Add story to favorites");
            button.setAttribute("aria-pressed", String(isFavorite));
        }
    });

    if (favoriteCount) {
        favoriteCount.textContent = favorites.length;
    }

    if (favoriteToggle) {
        favoriteToggle.classList.toggle("active", showingFavoriteStories);
        favoriteToggle.textContent = showingFavoriteStories ? "Show All Stories" : "Show Favorites";
    }
}

function toggleFavoriteStory(storyId) {
    const favorites = getFavoriteStories();
    const nextFavorites = favorites.includes(storyId)
        ? favorites.filter(id => id !== storyId)
        : [...favorites, storyId];

    saveFavoriteStories(nextFavorites);
    updateFavoriteControls();
    applyStoryFilters();
}

function applyStoryFilters() {
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const favorites = getFavoriteStories();
    let visibleCount = 0;

    document.querySelectorAll(".cards .card").forEach(card => {
        const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
        const storyId = card.dataset.storyId || getStoryIdFromCard(card);
        const matchesSearch = title.includes(searchTerm);
        const matchesFavorite = !showingFavoriteStories || favorites.includes(storyId);
        const isVisible = matchesSearch && matchesFavorite;

        card.style.display = isVisible ? "" : "none";

        if (isVisible) {
            visibleCount++;
        }
    });

    const emptyState = document.getElementById("favoritesEmptyState");

    if (emptyState) {
        emptyState.classList.toggle("active", visibleCount === 0);
    }
}

function initFavorites() {
    const cardsContainer = document.querySelector(".cards");
    const searchBox = document.querySelector(".search-box");

    if (!cardsContainer || !searchBox) {
        return;
    }

    if (!document.querySelector(".favorites-toolbar")) {
        const toolbar = document.createElement("div");
        toolbar.className = "favorites-toolbar";
        toolbar.innerHTML = `
            <button id="favoriteToggle" type="button">Show Favorites</button>
            <span><strong id="favoriteCount">0</strong> saved favorites</span>
        `;
        searchBox.insertAdjacentElement("afterend", toolbar);

        document.getElementById("favoriteToggle").addEventListener("click", () => {
            showingFavoriteStories = !showingFavoriteStories;
            updateFavoriteControls();
            applyStoryFilters();
        });
    }

    if (!document.getElementById("favoritesEmptyState")) {
        const emptyState = document.createElement("p");
        emptyState.id = "favoritesEmptyState";
        emptyState.className = "favorites-empty";
        emptyState.textContent = "No stories match this view yet.";
        cardsContainer.insertAdjacentElement("afterend", emptyState);
    }

    document.querySelectorAll(".cards .card").forEach(decorateStoryCard);
    updateFavoriteControls();
    applyStoryFilters();
}

function submitStoryByEmail(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const status = document.getElementById("storySubmitStatus");

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const data = new FormData(form);
    const title = data.get("storyTitle").trim();
    const body = [
        "New Joyful Learn Story Submission",
        "",
        `Submitted by: ${data.get("submitterName").trim()}`,
        `Email: ${data.get("submitterEmail").trim()}`,
        "",
        `Story title: ${title}`,
        `Description: ${data.get("storyDescription").trim()}`,
        `Thumbnail: ${data.get("storyThumbnail").trim() || "Not provided"}`,
        `Age group: ${data.get("storyAge").trim() || "Not provided"}`,
        "",
        "Full story:",
        data.get("storyText").trim()
    ].join("\n");

    const subject = `Story Submission: ${title}`;
    const mailto = `mailto:${STORY_SUBMISSION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    status.textContent = "Your email app is opening with the story details ready to send.";
}

window.addEventListener("DOMContentLoaded", () => {
    const storySubmissionForm = document.getElementById("storySubmissionForm");

    if (storySubmissionForm) {
        storySubmissionForm.addEventListener("submit", submitStoryByEmail);
    }

});

window.addEventListener("DOMContentLoaded", () => {
    const profileBtn = document.getElementById("profileBtn");
    const overlay = document.getElementById("profileOverlay");
    const closeBtn = document.getElementById("closeProfile");

    if (!profileBtn || !overlay || !closeBtn) {
        return;
    }

    profileBtn.onclick = () => overlay.classList.add("active");

    closeBtn.onclick = () => overlay.classList.remove("active");

    overlay.onclick = (e) => {
        if (e.target === overlay) {
            overlay.classList.remove("active");
        }
    };
});
// Add story card to page
function addStoryToPage(story) {
    const container = document.getElementById("storyContainer") || document.querySelector(".cards");

    if (!container) {
        return;
    }

    const card = document.createElement("div");
    card.className = "card";
    const storyLink = story.link || `story.html?story=${encodeURIComponent(story.id)}`;

    card.innerHTML = `
        <img src="${story.image}" alt="${story.title}">
        <div class="card-content">
            <h3>${story.title}</h3>
            <p>${story.desc}</p>
            <p>${story.age}</p>
            <button class="read-btn" onclick="window.location.href='${storyLink}'">
                Read Story
            </button>
        </div>
    `;

    container.appendChild(card);
    decorateStoryCard(card);
    updateFavoriteControls();
    applyStoryFilters();
}

// Load saved stories when page opens
window.addEventListener("DOMContentLoaded", function () {
    let stories = JSON.parse(localStorage.getItem("customStories")) || [];
    const extraStories = window.JOYFUL_EXTRA_STORIES || [];

    extraStories.forEach(addStoryToPage);
    stories.forEach(addStoryToPage);
    initFavorites();
});

window.applyStoryFilters = applyStoryFilters;
