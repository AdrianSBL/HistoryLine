document.getElementById('yearSlider').addEventListener('input', function() {
    var bubble = document.getElementById('yearBubble');
    bubble.textContent = this.value;
    bubble.style.left = (this.value - this.min) / (this.max - this.min) * 100 + "%";
});

document.getElementById('yearSlider').addEventListener('change', function() {
    fetchEvents(this.value);
});

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
                event.innerHTML = `<strong>${year}</strong>: ${pages[key].extract} <a href="https://en.wikipedia.org/?curid=${key}" target="_blank">Read more</a>`;
                eventsList.appendChild(event);
            }
        })
        .catch(error => console.error('Error fetching data: ', error));
}
