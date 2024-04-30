document.addEventListener("DOMContentLoaded", function () {
    var panel = document.getElementById("directoryPanel");
    panel.style.transform = "translateY(-100%)"; // Ensure initial state is set for JavaScript

    var postItColors = [
        "#ffadad",
        "#ffd6a5",
        "#fdffb6",
        "#caffbf",
        "#9bf6ff",
        "#a0c4ff",
        "#bdb2ff",
        "#ffc6ff",
    ];

    // Apply random skew to the text inside openBtn
    var openBtnText = document.querySelector("#openBtn span");
    openBtnText.style.display = "inline-block"; // Make sure the span behaves like an inline element that can transform independently
    openBtnText.style.transform = getRandomSkew();

    // Function to generate random skew for text
    function getRandomSkew() {
        var skewX = Math.random() * 25 - 10; // Skew range between -10deg to 10deg
        var skewY = Math.random() * 25 - 10;
        return "skew(" + skewX + "deg, " + skewY + "deg)";
    }

    // Apply random skew to openBtn text on load
    var openBtnText = document.querySelector("#openBtn span");
    openBtnText.style.transform = getRandomSkew();

    // Function to generate random coordinates within the name-container
    function getRandomCoordinates(container) {
        var containerRect = container.getBoundingClientRect();
        var padding = 10; // Assume a padding of 10px on all sides if any
        var diameter = 100; // Diameter of the circle (name tag)

        // Adjust the range to ensure the entire name tag stays within the viewport
        var x = Math.random() * (containerRect.width - diameter - padding * 2) + padding;
        var y = Math.random() * (containerRect.height - diameter - padding * 2) + padding;

        return { x: x, y: y };
    }

    // Function to remove and reposition name tags
    function refreshNameTags(container) {
        // Remove existing name tags
        const existingTags = container.querySelectorAll(".name-tag");
        existingTags.forEach(function (tag) {
            tag.parentNode.removeChild(tag);
        });

        // Recreate and reposition name tags
        createAndPositionNames(container);
    }

    // Function to create and position the name tags within the container
    function createAndPositionNames(container) {
        var postItColors = [
            "#ffadad",
            "#ffd6a5",
            "#fdffb6",
            "#caffbf",
            "#9bf6ff",
            "#a0c4ff",
            "#bdb2ff",
            "#ffc6ff",
        ];
        
        namesAndLinks.forEach(function (item) {
            // Convert name to lowercase and replace spaces with hyphens
            var lowercaseName = item.name.toLowerCase().replace(/\s+/g, '-');
            // Create link using lowercase hyphenated name
            var link = "project-pages/" + lowercaseName + ".html";
        
            var coordinates = getRandomCoordinates(container);
            var nameLink = document.createElement("a");
            nameLink.href = link; // Assign the new link
            var nameTag = document.createElement("div");
            nameTag.textContent = item.name;
            nameTag.classList.add("name-tag");
            nameTag.style.left = coordinates.x + "px";
            nameTag.style.top = coordinates.y + "px";
            nameTag.style.transform = getRandomSkew(); // Apply random skew
        
            // Add event listeners for hover effects
            nameTag.addEventListener("mouseover", function () {
                var randomColor = postItColors[Math.floor(Math.random() * postItColors.length)];
                this.style.backgroundColor = randomColor;
                this.style.color = "black"; // Change text color to black on hover
            });
        
            nameTag.addEventListener("mouseout", function () {
                this.style.backgroundColor = ""; // Revert to default background color
                this.style.color = "white"; // Revert text color to white
            });
        
            nameLink.appendChild(nameTag);
            container.appendChild(nameLink);
        });
        
    }

    // Initial creation and positioning of names
    var nameContainer = document.querySelector(".name-container");
    createAndPositionNames(nameContainer);

    // Event listener for window resize
    window.addEventListener("resize", function () {
        refreshNameTags(nameContainer);
    });

    // Toggle panel visibility
    var openBtn = document.getElementById("openBtn");
    openBtn.addEventListener("click", function () {
        if (panel.style.transform === "translateY(-100%)") {
            panel.style.backgroundColor = postItColors[Math.floor(Math.random() * postItColors.length)];
            panel.style.transform = "translateY(0%)"; // Slide down
        } else {
            panel.style.transform = "translateY(-100%)"; // Slide up
        }
    });

    // Set hover and mouseout events for openBtn
    openBtn.addEventListener("mouseover", function () {
        var randomColor = postItColors[Math.floor(Math.random() * postItColors.length)];
        this.style.backgroundColor = randomColor;
    });

    openBtn.addEventListener("mouseout", function () {
        this.style.backgroundColor = ""; // Revert to default or specify a default color
    });

    // Light switch event listener
    var lightSwitch = document.getElementById("lightSwitch");
    lightSwitch.addEventListener('change', function () {
        if (this.checked) {
            document.body.style.backgroundColor = '#FFFF99'; // Light mode
            document.body.style.color = '#000000'; // Adjust text color if needed
        } else {
            document.body.style.backgroundColor = ''; // Default mode
            document.body.style.color = ''; // Default text color
        }
    });
});
