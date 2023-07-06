$(".search-button").on("click", function () {
  $.ajax({
    url: "http://www.omdbapi.com/?apikey=bba7d0dd&s=" + $(".input-keyword").val(),
    success: (results) => {
      const movie = results.Search;
      let cards = "";
      movie.forEach((m) => {
        cards += film(m);
      });
      $(".movie-container").html(cards);

      // tombol detail di klik
      $(".tombol-detail").on("click", function () {
        $.ajax({
          url: "http://www.omdbapi.com/?apikey=bba7d0dd&i=" + $(this).data("imdbid"),
          success: (m) => {
            const movieDetail = detailFilm(m);
            $(".modal-body").html(movieDetail);
          },
          error: (e) => e.responseText,
        });
      });
    },
    error: (e) => console.log(e.responseText),
  });
});

function film(m) {
  return `<div class="col-md-4 my-5">
            <div class="card">
                <img src="${m.Poster}" class="card-img-top" alt="" />
                <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                    <a href="#" class="btn btn-primary tombol-detail" data-bs-toggle="modal" data-bs-target="#detailMovieModal" data-imdbid="${m.imdbID}">Show Details</a>
                </div>
            </div>
        </div>`;
}

function detailFilm(m) {
  return `<div class="container-fluid">
            <div class="row">
                <div class="col-md-3">
                    <img class="img-fluid" src="${m.Poster}" alt="" />
                </div>

                <div class="col-md">
                    <ul class="list-group">
                        <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                        <li class="list-group-item"><strong>Director:</strong> ${m.Director}</li>
                        <li class="list-group-item"><strong>Writer:</strong> ${m.Writer}</li>
                        <li class="list-group-item"><strong>Actors:</strong> ${m.Actors}</li>
                        <li class="list-group-item"><strong>Plot:</strong><br />${m.Plot}</li>
                    </ul>
                </div>
            </div>
        </div>`;
}
