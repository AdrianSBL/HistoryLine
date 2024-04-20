function fetchEvents() {
    var year = document.getElementById('yearInput').value;
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
