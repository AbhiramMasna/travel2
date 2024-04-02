// Function to fetch data from JSON file
async function fetchData() {
    try {
        const response = await fetch('travel.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to display search results
function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    } else {
        results.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');

            const itemName = document.createElement('h3');
            itemName.textContent = item.name;

            const itemImage = document.createElement('img');
            itemImage.src = item.imageUrl;
            itemImage.alt = item.name;

            const itemDescription = document.createElement('p');
            itemDescription.textContent = item.description;

            resultItem.appendChild(itemName);
            resultItem.appendChild(itemImage);
            resultItem.appendChild(itemDescription);

            resultsContainer.appendChild(resultItem);
        });
    }
}

// Function to handle search functionality
async function search() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const data = await fetchData();

    // Filter data based on search input and category
    const filteredResults = data.countries.flatMap(country => country.cities)
                                          .concat(data.temples)
                                          .concat(data.beaches)
                                          .filter(item => item.name.toLowerCase().includes(searchInput));

    // Display filtered results
    displayResults(filteredResults);
}

// Function to reset search bar
function resetSearch() {
    document.getElementById('searchInput').value = '';
    search(); // Reset and display all results
}

// Event listener for search input
document.getElementById('searchInput').addEventListener('input', search);

// Event listener for reset button
document.getElementById('reset').addEventListener('click', resetSearch);

// Initial call to fetch and display all data
search();
