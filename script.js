document.getElementById('openBtn').addEventListener('click', function() {
    document.getElementById('directory').classList.add('slide-in');
});

document.getElementById('closeBtn').addEventListener('click', function() {
    document.getElementById('directory').classList.remove('slide-in');
});
