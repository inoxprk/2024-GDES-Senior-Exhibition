document.getElementById('openBtn').addEventListener('click', function() {
    document.getElementById('directory').classList.add('slide-in');
});

document.getElementById('closeBtn').addEventListener('click', function() {
    document.getElementById('directory').classList.remove('slide-in');
});


// ajax stuff below

// Function to fetch project data based on the person's name
function fetchProjectDataByPerson(personName, projects) {
    return projects.find(function(project) {
        return project.Name.toLowerCase() === personName.toLowerCase();
    });
}

// Function to display project on the web page
function displayProject(projectData) {
    var projectContainer = document.querySelector(".work-container");
    var projectInfoContainer = document.querySelector(".info-container");

    // Clear any existing content
    projectContainer.innerHTML = "";
    projectInfoContainer.innerHTML = "";

    // Create project elements
    var projectName = document.createElement("h1");
    var projectTitle = document.createElement("h2");
    var projectDescription = document.createElement("p");

    // Set project information
    projectName.textContent = projectData.Name;
    projectTitle.textContent = projectData["Project Description"];
    projectDescription.textContent = projectData.Description;

    // Append project elements to their containers
    projectInfoContainer.appendChild(projectName);
    projectInfoContainer.appendChild(projectTitle);
    projectInfoContainer.appendChild(projectDescription);

    // Create carousel elements
    var carousel = document.createElement("div");
    carousel.classList.add("carousel");
    projectContainer.appendChild(carousel);

    // Add images to the carousel
    projectData.URLs.forEach(function(imageURL) {
        if (imageURL) {
            var img = document.createElement("img");
            img.src = imageURL;
            carousel.appendChild(img);
        }
    });

    // Add navigation arrows
    var prevArrow = document.createElement("button");
    prevArrow.classList.add("prev-arrow");
    prevArrow.textContent = "<";
    projectContainer.appendChild(prevArrow);

    var nextArrow = document.createElement("button");
    nextArrow.classList.add("next-arrow");
    nextArrow.textContent = ">";
    projectContainer.appendChild(nextArrow);

    // Initialize carousel functionality
    initCarousel();
}

// Function to initialize carousel functionality
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    let currentImageIndex = 0;

    // Hide all images except the first one
    const images = carousel.querySelectorAll('img');
    images.forEach((img, index) => {
        if (index !== currentImageIndex) {
            img.style.display = 'none';
        }
    });

    // Event listeners for navigation arrows
    prevArrow.addEventListener('click', function() {
        images[currentImageIndex].style.display = 'none';
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        images[currentImageIndex].style.display = 'block';
    });

    nextArrow.addEventListener('click', function() {
        images[currentImageIndex].style.display = 'none';
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].style.display = 'block';
    });
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
