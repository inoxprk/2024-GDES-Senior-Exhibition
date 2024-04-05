// Set the start and end dates of the exhibition
var exhibitionStartDate = new Date("May 3, 2024 00:00:00").getTime();
var exhibitionEndDate = new Date("May 10, 2024 23:59:59").getTime();

// Update the countdown every 1 second
var x = setInterval(function() {

    // Get the current date and time
    var now = new Date().getTime();

    // Calculate time remaining for the start and end dates
    var timeToStart = exhibitionStartDate - now;
    var timeToEnd = exhibitionEndDate - now;

    // If the exhibition has started but not ended
    if (timeToStart <= 0 && timeToEnd > 0) {
        // Calculate remaining time for the end date
        var days = Math.floor(timeToEnd / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeToEnd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeToEnd % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeToEnd % (1000 * 60)) / 1000);
        // Display the remaining time
        document.getElementById("countdown").innerHTML = "Exhibition ends in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s";
    } else if (timeToStart > 0) {
        // If the exhibition hasn't started yet
        // Calculate remaining time for the start date
        var days = Math.floor(timeToStart / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeToStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeToStart % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeToStart % (1000 * 60)) / 1000);
        // Display the remaining time until the start date
        document.getElementById("countdown").innerHTML = "Exhibition starts in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s";
    } else {
        // If the exhibition has ended
        document.getElementById("countdown").innerHTML = "Exhibition has ended";
    }
}, 1000);