document.addEventListener('DOMContentLoaded', () => {
    const linkCards = document.querySelectorAll('.link-card');
    const noLinkSelected = document.getElementById('noLinkSelected');
    const linkSelected = document.getElementById('linkSelected');
    const clickCount = document.getElementById('clickCount');
    const clickDetails = document.getElementById('clickDetails');
    const createdAt = document.getElementById('createdAt');
    const lastClicked = document.getElementById('lastClicked');
    const isLoding = document.getElementById('isLoding');
    const linkCard = document.getElementsByClassName('link-card');

    linkCards.forEach(card => {
        card.addEventListener('click', async function () {
            const shortUrl = this.dataset.shortened;
            // Resetingh the background color to normal color
            Array.from(linkCard).forEach(card => {
                card.style.backgroundColor = 'rgba(148, 148, 148, 0.61)';
            });
            // Set the clicked link color
            this.style.backgroundColor = 'rgba(101, 255, 87, 0.61)';

            try {
                // Show loading state
                isLoding.style.display = 'block';
                linkSelected.style.display = 'block';
                noLinkSelected.style.display = 'none';
                document.querySelector('.stats-container').style.display = 'none';

                const response = await fetch(`/api/statistics/${shortUrl}`);
                if (!response.ok) throw new Error('Failed to fetch statistics');

                const data = await response.json();
                // console.log(data);



                // Clear previous click details
                clickDetails.innerHTML = '';

                clickCount.innerText = data[0].clicks.length ? data[0].clicks.length : 0;

                // Add new click details if available
                if (data[0].clicks && data[0].clicks.length) {
                    data[0].clicks.forEach(click => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${new Date(click.clickedAt).toLocaleString()}</td>
                            <td>${click.userAgent || 'N/A'}</td>
                            <td>${click.ipAddress || 'N/A'}</td>
                        `;
                        clickDetails.appendChild(row);
                    });
                } else {
                    clickDetails.innerHTML = '<tr><td colspan="3">No click data available</td></tr>';
                }

                // Update timestamps
                createdAt.textContent = data[0].createdAt ?
                    new Date(data[0].createdAt).toLocaleString() : 'N/A';
                lastClicked.textContent = data[0].lastClicked ?
                    new Date(data[0].lastClicked).toLocaleString() : 'N/A';

                // Show the stats container and hide loading message
                document.querySelector('.stats-container').style.display = 'block';
                // Removing lodingState
                isLoding.style.display = 'none';

            } catch (error) {
                console.error('Error fetching statistics:', error);
                document.querySelector('.stats-container').style.display = 'none';
                linkSelected.innerHTML = '<p class="error">Failed to load statistics</p>';
                linkSelected.style.display = 'block';
                noLinkSelected.style.display = 'none';
                // Removing lodingState
                isLoding.style.display = 'none';
            }
        });
    });
});

function copyText() {
    const textToCopy = this.previousElementSibling.textContent;
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            const originalIcon = this.innerHTML;
            this.innerHTML = '<i class="fa-solid fa-check"></i>';
            setTimeout(() => {
                this.innerHTML = originalIcon;
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
}
