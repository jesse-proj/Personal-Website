const graphFallback = document.querySelector('.github-graph-fallback');
const graphRoot = document.querySelector('.github-graph');

let contributionData = null;

function renderGraph() {
    if (!contributionData) return;

    graphRoot.innerHTML = '';
    graphRoot.classList.add('active');

    const contributionWeeks = contributionData.data.viewer.contributionsCollection.contributionCalendar.weeks;
    
    // Check if mobile viewport
    const isMobile = window.innerWidth < 768;
    const visibleWeeks = isMobile ? contributionWeeks.slice(-22) : contributionWeeks;
    
    visibleWeeks.forEach(week => {
    	const contributionDays = week.contributionDays;

	contributionDays.forEach(days => {
	    const dayDiv = document.createElement('div');

	    dayDiv.classList.add('github-day');
	    dayDiv.classList.add(days.contributionLevel);
	    dayDiv.setAttribute('data-level', days.contributionLevel);
	    
	    graphRoot.appendChild(dayDiv);
	});
    });
}

fetch(window.GITHUB_DATA_URL)
.then(response => {

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json()
})
.catch(error => {
    console.warn('Using fallback API due to fetch failure:', error.message);

    graphFallback.classList.add('active');

    return {
	status: 500 
    }
})
.then(data => {
    if (!data || data.status == 500) {
        return undefined;
    }
    
    contributionData = data;
    renderGraph();
});

// Watch resize to re-render when crossing mobile/desktop screen threshold
let lastIsMobile = window.innerWidth < 768;
window.addEventListener('resize', () => {
    const isMobile = window.innerWidth < 768;
    if (isMobile !== lastIsMobile) {
        lastIsMobile = isMobile;
        renderGraph();
    }
});
