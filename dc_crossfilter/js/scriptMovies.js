d3.json("data/movies.json")
 .then(function (data) {
    try {
        var ndx = crossfilter(data);

        // Dimensão e grupo por ano
        var yearDimension = ndx.dimension(function (d) {
            return d.Year;
        })

    }
 } )