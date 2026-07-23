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
                    <a href="index.html#stories" class="nav-link" id="storiesNavLink">Stories</a>
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

const STORY_SUBMISSION_EMAIL = "v.sai.srihan@gmail.com";

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

    const storySubmissionForm = document.getElementById("storySubmissionForm");

    if (storySubmissionForm) {
        storySubmissionForm.addEventListener("submit", submitStoryByEmail);
    }

    const storiesNavLink = document.getElementById("storiesNavLink");

    if (storiesNavLink) {
        storiesNavLink.addEventListener("click", (event) => {
            const isIndexPage = window.location.pathname.endsWith("/index.html") || window.location.pathname.endsWith("/");

            if (isIndexPage) {
                event.preventDefault();
                window.location.href = "index.html#stories";
                window.location.reload();
            }
        });
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
});

