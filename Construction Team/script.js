document.addEventListener('DOMContentLoaded', function() {
    const channelIds = ['testing-channel-1', 'testing-channel-2', 'testing-channel-1', 'testing-channel-2', 'testing-channel-1'];

    channelIds.forEach((channelId, index) => {
        fetchContent(channelId, index + 1);
    });
});

function fetchContent(channelId, columnNumber) {
    const apiUrl = `https://api.are.na/v2/channels/${channelId}/contents`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById(`channel-${columnNumber}`);
            data.contents.forEach(block => {
                const blockElement = document.createElement('div');
                blockElement.className = 'block';

                if (block.source && block.source.url && block.source.url.includes('youtube.com')) {
                    const videoId = extractYouTubeID(block.source.url);
                    if (videoId) {
                        const iframe = createYouTubeIframe(videoId);
                        blockElement.appendChild(iframe);
                    }
                }
                else if (block.image) {
                    const img = document.createElement('img');
                    img.src = block.image.display.url;
                    blockElement.appendChild(img);
                }

                if (block.description) {
                    const bodyText = document.createElement('p');
                    bodyText.className = 'body-text';
                    bodyText.textContent = block.description;
                    blockElement.appendChild(bodyText);
                }

                container.appendChild(blockElement);
            });
        })
        .catch(error => console.error('Error fetching Are.na content:', error));
}

function extractYouTubeID(url) {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11) ? match[2] : null;
}

function createYouTubeIframe(videoId) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.width = '100%';
    iframe.height = '315';
    return iframe;
}