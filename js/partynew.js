(function () {

    function partyBoomFullPage() {
        const container = document.createElement("div");
        container.className = "party-boom-container";
        document.body.appendChild(container);

        const colors = [
            "#ff3b3b", "#ffdd00", "#4dff4d",
            "#4da6ff", "#ff66ff", "#ffffff"
        ];

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        for (let i = 0; i < 180; i++) {
            const sparkle = document.createElement("div");
            sparkle.className = "party-boom-sparkle";

            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 400 + 100;

            sparkle.style.left = centerX + "px";
            sparkle.style.top = centerY + "px";

            sparkle.style.background =
                colors[Math.floor(Math.random() * colors.length)];

            sparkle.style.boxShadow = `0 0 12px ${sparkle.style.background}`;

            sparkle.style.setProperty("--x", Math.cos(angle) * distance + "px");
            sparkle.style.setProperty("--y", Math.sin(angle) * distance + "px");

            container.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 1400);
        }

        setTimeout(() => container.remove(), 1500);
    }

    // 🚀 AUTO RUN ON PAGE LOAD
    window.addEventListener("load", () => {
        setTimeout(partyBoomFullPage, 300);
    });

})();