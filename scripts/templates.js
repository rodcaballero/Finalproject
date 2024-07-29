const templates = {
    movieGridItem: `
        <div class="movie" data-id="{{id}}">
            <img src="https://image.tmdb.org/t/p/w200{{poster_path}}" alt="{{title}}">
            <h3>{{title}}</h3>
        </div>
    `,
    movieListItem: `
        <div class="movie" data-id="{{id}}">
            <img src="https://image.tmdb.org/t/p/w200{{poster_path}}" alt="{{title}}" style="float: left; margin-right: 10px;">
            <h3>{{title}}</h3>
            <p>{{overview}}</p>
        </div>
    `,
    movieDetails: `
        <h2>{{title}}</h2>
        <p>{{overview}}</p>
        <p>Release Date: {{release_date}}</p>
        <p>Rating: {{vote_average}}</p>
        <h3>Cast</h3>
        <ul>
            {{#credits.cast}}
            <li>{{name}} as {{character}}</li>
            {{/credits.cast}}
        </ul>
        <h3>Reviews</h3>
        <ul>
            {{#reviews.results}}
            <li>{{content}} - <em>{{author}}</em></li>
            {{/reviews.results}}
        </ul>
    `,
    personDetails: `
        <h2>{{name}}</h2>
        <p>{{biography}}</p>
        <h3>Known For</h3>
        <ul>
            {{#known_for}}
            <li>{{title}}</li>
            {{/known_for}}
        </ul>
    `
};

