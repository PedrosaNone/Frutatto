
document.addEventListener('DOMContentLoaded', function() {
    const produtosGrid = document.querySelector('.produtos-grid');
    const nextButton = document.querySelector('.next-button');
    const prevButton = document.querySelector('.prev-button');

    if (nextButton) {
        nextButton.addEventListener('click', function() {
            produtosGrid.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', function() {
            produtosGrid.scrollBy({ left: -300, behavior: 'smooth' });
        });
    }
});
