document.getElementById('yearSlider').oninput = function() {
    var bubble = document.getElementById('yearBubble');
    bubble.textContent = this.value;
    bubble.style.left = (this.value - this.min) / (this.max - this.min) * 100 + "%";
}

document.getElementById('yearSlider').onchange = function() {
    fetchEvents(this.value);
    markYear(this.value);
}

function fetchEvents(year) {
    var url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&exintro&explaintext&redirects=1&titles=${year}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            var pages = data.query.pages;
            var eventsList = document.getElementById('eventsList');
            eventsList.innerHTML = ''; // Clear previous results
            for (var key in pages) {
                var event = document.createElement('li');
                event.innerHTML = pages[key].extract;
                eventsList.appendChild(event);
            }
        })
        .catch(error => console.error('Error fetching data: ', error));
}

function markYear(year) {
    var eventsList = document.getElementById('eventsList');
    var marker = document.createElement('li');
    marker.style.listStyleType = "circle";
    marker.textContent = year + " (selected)";
    eventsList.appendChild(marker);
}
