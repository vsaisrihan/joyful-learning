// Define the Header Component
class MainHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav>
        <div class="logo">📚 Joyful Learn</div>

        <div class="nav-links">
            <a href="./index.html">Home</a>
            <a href="#">Stories</a>
            <a href="#">Progress</a>
            <a href="#">Achievements</a>
            <a href="#">Contact</a>
        </div>

        <div class="profile">S</div>
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