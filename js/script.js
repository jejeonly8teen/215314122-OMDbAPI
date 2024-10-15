function SearchMovies() {
    $.ajax({
      url: "https://www.omdbapi.com",
      type: "get",
      dataType: "json",
      data: {
        apikey: "7aef3ca8",
        s: $("#search-input").val(),
      },
      success: function (result) {
        if (result.Response == "True") {
          let movies = result.Search;
          $("#movie-list").html("");
          $.each(movies, function (i, data) {
            $("#movie-list").append(`
              <div class="col-md-4">
                <div class="card mb-3">
                  <img src="${data.Poster}" class="card-img-top">
                  <div class="card-body">
                    <h5 class="card-title">${data.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                    <a href="#" class="btn btn-primary">Detail</a>
                  </div>
                </div>
              </div>
            `);
          });
        } else {
          // Jika tidak ada hasil
          $("#movie-list").html(
            '<h1 class="text-center">' + result.Error + "</h1>"
          );
        }
      },
      error: function () {
        // Penanganan error
        $("#movie-list").html(
          '<h1 class="text-center">Error retrieving data</h1>'
        );
      },
    });
  }
  
  $("#search-button").on("click", function () {
    SearchMovies();
  });
  $("#search-input").on("keyup", function (e) {
    if (e.keyCode == 13) {
      SearchMovies();
    }
  });
  