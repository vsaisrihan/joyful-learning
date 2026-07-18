// Define the Header Component
class MainHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="site-nav">
                <a class="logo" href="index.html">
                    <img src="./joyful.png" alt="Joyful Learn logo" />
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

const profileBtn = document.getElementById("profileBtn");
const overlay = document.getElementById("profileOverlay");
const closeBtn = document.getElementById("closeProfile");
const avatar = document.getElementById("avatarPreview");
const input = document.getElementById("profileName");

profileBtn.onclick = () => overlay.classList.add("active");

closeBtn.onclick = () => overlay.classList.remove("active");

overlay.onclick = (e) => {
    if (e.target === overlay) {
        overlay.classList.remove("active");
    }
};
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
    const container = document.getElementById("storyContainer");

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

