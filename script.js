// Main application logic
class PetAnimalDirectory {
    constructor() {
        this.allAnimals = animalsData;
        this.filteredAnimals = [...this.allAnimals];
        this.initializeElements();
        this.attachEventListeners();
        this.displayAnimals(this.allAnimals);
        this.updateStats();
    }

    initializeElements() {
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.typeFilter = document.getElementById('typeFilter');
        this.sizeFilter = document.getElementById('sizeFilter');
        this.activityFilter = document.getElementById('activityFilter');
        this.careFilter = document.getElementById('careFilter');
        this.clearFiltersBtn = document.getElementById('clearFilters');
        this.resultsContainer = document.getElementById('resultsContainer');
        this.totalCount = document.getElementById('totalCount');
        this.filteredCount = document.getElementById('filteredCount');
    }

    attachEventListeners() {
        this.searchBtn.addEventListener('click', () => this.performSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performSearch();
        });
        this.searchInput.addEventListener('input', () => this.performSearch());

        this.typeFilter.addEventListener('change', () => this.applyFilters());
        this.sizeFilter.addEventListener('change', () => this.applyFilters());
        this.activityFilter.addEventListener('change', () => this.applyFilters());
        this.careFilter.addEventListener('change', () => this.applyFilters());

        this.clearFiltersBtn.addEventListener('click', () => this.clearAllFilters());
    }

    performSearch() {
        const searchTerm = this.searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            this.filteredAnimals = [...this.allAnimals];
        } else {
            this.filteredAnimals = this.allAnimals.filter(animal => 
                animal.name.toLowerCase().includes(searchTerm) ||
                animal.type.toLowerCase().includes(searchTerm) ||
                animal.origin.toLowerCase().includes(searchTerm) ||
                animal.description.toLowerCase().includes(searchTerm) ||
                animal.size.toLowerCase().includes(searchTerm) ||
                animal.activity.toLowerCase().includes(searchTerm) ||
                animal.care.toLowerCase().includes(searchTerm)
            );
        }

        this.applyFilters();
    }

    applyFilters() {
        let filtered = [...this.filteredAnimals];

        // Apply type filter
        const typeValue = this.typeFilter.value;
        if (typeValue) {
            filtered = filtered.filter(animal => animal.type === typeValue);
        }

        // Apply size filter
        const sizeValue = this.sizeFilter.value;
        if (sizeValue) {
            filtered = filtered.filter(animal => animal.size === sizeValue);
        }

        // Apply activity filter
        const activityValue = this.activityFilter.value;
        if (activityValue) {
            filtered = filtered.filter(animal => animal.activity === activityValue);
        }

        // Apply care filter
        const careValue = this.careFilter.value;
        if (careValue) {
            filtered = filtered.filter(animal => animal.care === careValue);
        }

        this.displayAnimals(filtered);
        this.updateStats(filtered.length);
    }

    displayAnimals(animals) {
        this.resultsContainer.innerHTML = '';

        if (animals.length === 0) {
            this.showNoResults();
            return;
        }

        animals.forEach(animal => {
            const animalCard = this.createAnimalCard(animal);
            this.resultsContainer.appendChild(animalCard);
        });
    }

    createAnimalCard(animal) {
        const card = document.createElement('div');
        card.className = 'animal-card';
        card.innerHTML = `
            <h3>${animal.name}</h3>
            <span class="animal-type">${animal.type}</span>
            
            <div class="animal-info">
                <div class="info-item">
                    <span class="info-label">Size:</span>
                    <span class="info-value">${this.capitalizeFirst(animal.size)}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Activity Level:</span>
                    <span class="info-value">${this.capitalizeFirst(animal.activity)}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Care Level:</span>
                    <span class="info-value">${this.capitalizeFirst(animal.care)}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Lifespan:</span>
                    <span class="info-value">${animal.lifespan}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Weight:</span>
                    <span class="info-value">${animal.weight}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Origin:</span>
                    <span class="info-value">${animal.origin}</span>
                </div>
            </div>
            
            <div class="animal-description">
                ${animal.description}
            </div>
        `;

        // Add click event for detailed view
        card.addEventListener('click', () => this.showAnimalDetails(animal));

        return card;
    }

    showAnimalDetails(animal) {
        alert(`${animal.name}\n\nType: ${animal.type}\nSize: ${animal.size}\nActivity: ${animal.activity}\nCare: ${animal.care}\nLifespan: ${animal.lifespan}\nWeight: ${animal.weight}\nOrigin: ${animal.origin}\n\nDescription: ${animal.description}`);
    }

    showNoResults() {
        this.resultsContainer.innerHTML = `
            <div class="no-results">
                <h3>🔍 No animals found</h3>
                <p>Try adjusting your search terms or filters to find more animals.</p>
            </div>
        `;
    }

    updateStats(filteredCount = null) {
        this.totalCount.textContent = this.allAnimals.length;
        this.filteredCount.textContent = filteredCount !== null ? filteredCount : this.allAnimals.length;
    }

    clearAllFilters() {
        this.searchInput.value = '';
        this.typeFilter.value = '';
        this.sizeFilter.value = '';
        this.activityFilter.value = '';
        this.careFilter.value = '';
        
        this.filteredAnimals = [...this.allAnimals];
        this.displayAnimals(this.allAnimals);
        this.updateStats();
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PetAnimalDirectory();
});

// Add some utility functions for enhanced functionality
function getAnimalsByType(type) {
    return animalsData.filter(animal => animal.type === type);
}

function getAnimalsBySize(size) {
    return animalsData.filter(animal => animal.size === size);
}

function getAnimalsByActivity(activity) {
    return animalsData.filter(animal => animal.activity === activity);
}

function getAnimalsByCare(care) {
    return animalsData.filter(animal => animal.care === care);
}

function searchAnimals(query) {
    const searchTerm = query.toLowerCase();
    return animalsData.filter(animal => 
        animal.name.toLowerCase().includes(searchTerm) ||
        animal.type.toLowerCase().includes(searchTerm) ||
        animal.origin.toLowerCase().includes(searchTerm) ||
        animal.description.toLowerCase().includes(searchTerm)
    );
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Focus search input with Ctrl+F or Cmd+F
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
    
    // Clear filters with Ctrl+R or Cmd+R
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        document.getElementById('clearFilters').click();
    }
});
