// Define the Header Component
class MainHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="site-nav">
                <a class="logo" href="index.html">
                    <img src="./i.png" alt="Joyful Learn logo" />
                    <span>Joyful Learn</span>
                </a>

                <div class="nav-links">
                    <a href="./index.html" class="nav-link">Home</a>
                    <a href="#stories" class="nav-link">Stories</a>
                    <a href="#" class="nav-link">Progress</a>
                    <a href="#" class="nav-link">Achievements</a>
                    <a href="contact.html" class="nav-link">Contact</a>
                    <a href="addstory.html" class="nav-cta">Add a Story</a>
                </div>
            </nav>
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

const GOOGLE_ANALYTICS_ID = "G-XXXXXXXXXX";

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

function createAdSlot(type, label) {
    const ad = document.createElement("aside");
    ad.className = `ad-slot ad-slot-${type}`;
    ad.setAttribute("aria-label", "Advertisement placeholder");
    ad.innerHTML = `
        <span>Advertisement</span>
        <strong>${label}</strong>
        <small>Ad placeholder</small>
    `;
    return ad;
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll([
        ".hero-text",
        ".hero img",
        ".section-title",
        ".search-box",
        ".card",
        ".stat-box",
        ".ad-slot",
        ".story-image-card",
        ".story-card",
        ".buttons",
        ".contact-container > h1",
        ".contact-container > p",
        ".contact-card"
    ].join(", "));

    if (!animatedElements.length) {
        return;
    }

    animatedElements.forEach((element, index) => {
        element.classList.add("scroll-reveal");
        element.style.setProperty("--reveal-delay", `${Math.min(index % 8, 7) * 55}ms`);
    });

    if (!("IntersectionObserver" in window)) {
        animatedElements.forEach(element => element.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.14,
        rootMargin: "0px 0px -70px 0px"
    });

    animatedElements.forEach(element => observer.observe(element));
}

window.addEventListener("DOMContentLoaded", () => {
    const isHomePage = document.querySelector(".hero") && document.querySelector(".cards");
    const isStoryPage = document.querySelector(".story-image-card") && document.querySelector(".story-card");

    if (isHomePage && !document.querySelector(".ad-slot-home-top")) {
        const hero = document.querySelector(".hero");
        const cards = document.querySelector(".cards");

        hero.insertAdjacentElement("afterend", createAdSlot("home-top", "Learning Partner Space"));
        cards.insertAdjacentElement("afterend", createAdSlot("home-wide", "Featured Sponsor Space"));
    }

    if (isStoryPage && !document.querySelector(".ad-slot-story")) {
        const content = document.querySelector(".content");
        content.insertAdjacentElement("afterend", createAdSlot("story", "Story Sponsor Space"));
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
// Open form
function openStoryForm() {
    document.getElementById("storyForm").style.display = "flex";
}

// Close form
function closeStoryForm() {
    document.getElementById("storyForm").style.display = "none";
}

// Save story
function saveStory() {
    const title = document.getElementById("storyTitle").value;
    const desc = document.getElementById("storyDesc").value;
    const age = document.getElementById("storyAge").value;
    const image = document.getElementById("storyImageUrl").value;
    const link = document.getElementById("storyLink").value;

    if (!title || !desc || !age || !image || !link) {
        alert("Please fill all fields");
        return;
    }

    const story = { title, desc, age, image, link };

    let stories = JSON.parse(localStorage.getItem("customStories")) || [];
    stories.push(story);
    localStorage.setItem("customStories", JSON.stringify(stories));

    addStoryToPage(story);
    closeStoryForm();

    // Clear form
    document.getElementById("storyTitle").value = "";
    document.getElementById("storyDesc").value = "";
    document.getElementById("storyAge").value = "";
    document.getElementById("storyImageUrl").value = "";
    document.getElementById("storyLink").value = "";
}

// Add story card to page
function addStoryToPage(story) {
    const container = document.getElementById("storyContainer") || document.querySelector(".cards");

    if (!container) {
        return;
    }

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <img src="${story.image}" alt="${story.title}">
        <div class="card-content">
            <h3>${story.title}</h3>
            <p>${story.desc}</p>
            <p>${story.age}</p>
            <button class="read-btn" onclick="window.location.href='${story.link}'">
                Read Story
            </button>
        </div>
    `;

    container.appendChild(card);
}

// Load saved stories when page opens
window.addEventListener("DOMContentLoaded", function () {
    let stories = JSON.parse(localStorage.getItem("customStories")) || [];
    stories.forEach(addStoryToPage);
    initScrollAnimations();
});

