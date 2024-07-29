$(document).ready(function() {
    const apiKey = '31cb83f245bf4abc5d8ad01db946618b';
    const resultsPerPage = 10;
    let currentPage = 1;
    let query = '';
    let view = 'grid';

    $('#search-button').on('click', function() {
        query = $('#search-bar').val();
        searchMovies(query, currentPage);
    });

    $('#view-grid').on('click', function() {
        view = 'grid';
        $('#search-results').removeClass('view-list').addClass('view-grid');
        searchMovies(query, currentPage);
    });

    $('#view-list').on('click', function() {
        view = 'list';
        $('#search-results').removeClass('view-grid').addClass('view-list');
        searchMovies(query, currentPage);
    });

    $('#favorites-button').on('click', function() {
        toggleSection('#favorites-list');
    });

    $('#watchlist-button').on('click', function() {
        toggleSection('#watchlist');
    });

    function toggleSection(sectionId) {
        $('main > div').addClass('hidden');
        $(sectionId).removeClass('hidden');
    }

    function searchMovies(query, page) {
        const startIndex = (page - 1) * resultsPerPage;
        $.getJSON(`https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}&api_key=${apiKey}`, function(data) {
            displayResults(data.results);
            setupPagination(data.total_pages);
        });
    }

    function displayResults(movies) {
        $('#search-results').empty();
        if (movies) {
            movies.forEach(movie => {
                const template = view === 'grid' ? templates.movieGridItem : templates.movieListItem;
                const html = Mustache.render(template, movie);
                $('#search-results').append(html);
            });
        }
    }

    function setupPagination(totalPages) {
        $('#pagination').empty();
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = $(`<button>${i}</button>`);
            if (i === currentPage) pageLink.addClass('active');
            pageLink.on('click', function() {
                currentPage = i;
                searchMovies(query, currentPage);
            });
            $('#pagination').append(pageLink);
        }
    }

    $('#search-results').on('click', '.movie', function() {
        const movieId = $(this).data('id');
        $.getJSON(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits,reviews`, function(data) {
            const html = Mustache.render(templates.movieDetails, data);
            $('#movie-details').html(html).removeClass('hidden');
            toggleSection('#movie-details');
        });
    });

    function displayFavorites() {
        // Fetch and display user's favorite movies
    }

    function displayWatchlist() {
        // Fetch and display user's watchlist
    }

    displayFavorites();
    displayWatchlist();
});
