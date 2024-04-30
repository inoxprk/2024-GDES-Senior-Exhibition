    // Function to fetch project data based on the person's name
    function fetchProjectDataByPerson(personName, projects) {
        return projects.find(function(project) {
            return project.Name.toLowerCase() === personName.toLowerCase();
        });
    }

    // Function to display project on the web page and change the title
    function displayProject(projectData) {
        var carouselContainer = document.querySelector(".carousel-container");
        var studentInfo = document.querySelector(".overflow-hidden");

        // Select project elements
        var artistName = studentInfo.querySelector(".name");
        var projectTitle = studentInfo.querySelector(".project-title");
        var projectDescription = studentInfo.querySelector(".project-description");

        // website and instagram links
        var artistInstagram = document.createElement("a");
        artistInstagram.href = projectData.Instagram;
        artistInstagram.innerHTML = "instagram";

        var artistWebsite = document.createElement("a");
        artistWebsite.href = projectData.Website;
        artistWebsite.innerHTML = "website"; 

        // Clear any existing content
        artistName.innerHTML = "";
        // projectTitle.innerHTML = "";
        projectDescription.innerHTML = "";

        // Set project information
        artistName.textContent = projectData.Name + " | ";
        artistName.appendChild(artistWebsite);
        artistName.innerHTML += " | ";
        artistName.appendChild(artistInstagram);

        projectDescription.innerHTML = projectData["Project Description"];

        // Display the current image in the carousel
        let currentImageIndex = 0;
        const images = projectData.URLs.map(url => {
            const img = new Image();
            img.src = url;
            img.classList.add('image-carousel'); // Add the class 'image-carousel'
            return img;
        });

        function showCurrentImage() {
            const carousel = document.querySelector('.carousel');
            carousel.innerHTML = ''; // Clear previous images
            images.forEach((img, index) => {
                if (index < projectData.URLs.length && projectData.URLs[index]) {
                    img.style.display = index === currentImageIndex ? "block" : "none";
                    carousel.appendChild(img); // Append each valid image to the carousel
                }
            });
        }
        

        // Navigate to the next image
        function nextImage() {
            let nextIndex = currentImageIndex + 1;
            // Find the next valid image index
            while (nextIndex < images.length && (!projectData.URLs[nextIndex] || projectData.URLs[nextIndex] === "")) {
                nextIndex++;
            }
            currentImageIndex = nextIndex % images.length;
            showCurrentImage();
        }
        

        // Initialize carousel display
        showCurrentImage();

        // Control image navigation
        var nextButton = document.getElementById("nextButton");
        nextButton.addEventListener("click", nextImage);

        // Define colors for hover effects
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

        // Set hover and mouseout events for openBtn and nextButton
        setHoverEffect("openBtn", postItColors);
        setHoverEffect("nextButton", postItColors);

        // Function to apply hover effects
        function setHoverEffect(buttonId, colors) {
            var button = document.getElementById(buttonId);
            button.addEventListener("mouseover", function () {
                this.style.backgroundColor = getRandomColor(colors);
            });
            button.addEventListener("mouseout", function () {
                this.style.backgroundColor = "white";
            });
        }

        // Get a random color from an array
        function getRandomColor(colors) {
            return colors[Math.floor(Math.random() * colors.length)];
        }

        // Change document title
        document.title = projectData.Name.split(' ')[0].toUpperCase().split('').join(' ');

        // Room name skew logic
        // Skewing functions
        var classesToSkew = ["button-link"];
        classesToSkew.forEach(function (className) {
          var elements = document.querySelectorAll("." + className);
          elements.forEach(function (element) {
            wrapTextInSpan(element);
            var span = element.querySelector("span");
            if (span) {
              applyRandomSkew(span);
            }
          });
        });
    
        function wrapTextInSpan(element) {
          if (element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE) {
            var text = element.childNodes[0].nodeValue.trim();
            var span = document.createElement("span");
            span.textContent = text;
            element.innerHTML = "";
            element.appendChild(span);
          }
        }
    
        function applyRandomSkew(span) {
          var maxSkew = 25;
          var skewX = (Math.random() - 0.5) * maxSkew;
          var skewY = (Math.random() - 0.5) * maxSkew;
          span.style.display = "inline-block";
          span.style.transform = `skew(${skewX}deg, ${skewY}deg)`;
        }

    }

    // AJAX request to fetch the JSON data
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var projects = JSON.parse(this.responseText);

            // Get the person's name from the URL
            var pathname = window.location.pathname;
            console.log("Pathname:", pathname); // Check the pathname for debugging

            var personName = pathname.split('/').pop().replace('.html', '').replace(/-/g, ' ');
            console.log("Person name:", personName); // Check the person's name for debugging

            // Fetch project data based on the person's name
            var projectData = fetchProjectDataByPerson(personName, projects);
            console.log("Project data:", projectData); // Check the project data for debugging

            // Display project on the web page
            if (projectData) {
                displayProject(projectData);
            } else {
                console.error("Project not found");
            }
        }
    };
    xhr.open("GET", "../../data.json", true); // Adjusted URL to fetch data.json from the root
    xhr.send();
