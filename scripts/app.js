$(document).ready(function() {
    const apiKey = 'YOUR_TMDB_API_KEY';
    const resultsPerPage = 10;
    let currentPage = 1;
    let query = '';
    let view = 'grid';

    $('#search-button').on('click', function() {
        query = $('#search-bar').val();
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
        $('#pagination').remove();
        const pagination = $('<div id="pagination"></div>');
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = $(`<button>${i}</button>`);
            if (i === currentPage) pageLink.addClass('active');
            pageLink.on('click', function() {
                currentPage = i;
                searchMovies(query, currentPage);
            });
            pagination.append(pageLink);
        }
        $('main').append(pagination);
    }

    $('#search-results').on('click', '.movie', function() {
        const movieId = $(this).data('id');
        $.getJSON(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits,reviews`, function(data) {
            const html = Mustache.render(templates.movieDetails, data);
            $('#movie-details').html(html);
            toggleSection('#movie-details');
        });
    });

    $('#movie-details').on('click', '.cast-member', function() {
        const personId = $(this).data('id');
        $.getJSON(`https://api.themoviedb.org/3/person/${personId}?api_key=${apiKey}`, function(data) {
            const html = Mustache.render(templates.personDetails, data);
            $('#person-details').html(html);
            toggleSection('#person-details');
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
