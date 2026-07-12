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
                    <a href="patchnotes.html" class="nav-cta">Add a Story</a>
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

