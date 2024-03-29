// AJAX request to fetch image URLs from the JSON file
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        // Parse JSON response
        var data = JSON.parse(xhr.responseText);

        // Extract image URLs from the JSON data
        var imageUrls = data.imageUrls;

        // Object to store grouped image URLs
        var groupedImages = {};

        // Grouping images based on the subfolder within the "test" folder
        imageUrls.forEach(function(imageUrl) {
            // Extract the subfolder name (between "test/" and the next "/")
            var subfolder = imageUrl.match(/test\/([^/]+)/)[1];

            // Check if the subfolder already exists as a key in groupedImages
            if (groupedImages[subfolder]) {
                // If the key exists, push the imageUrl to the corresponding array
                groupedImages[subfolder].push(imageUrl);
            } else {
                // If the key doesn't exist, create a new array with the imageUrl
                groupedImages[subfolder] = [imageUrl];
            }
        });

        // Output the grouped images
        console.log(groupedImages);
    }
};
xhr.open("GET", "imageUrls.json", true);
xhr.send();
