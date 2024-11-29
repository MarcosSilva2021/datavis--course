d3.csv(
    "https://gist.githubusercontent.com/emanueles/d8df8d875edda71aa2e2365fae2ce225/raw/1e949d3da02ed6caa21fe3a7a12a4e5a611a4bab/stocks.csv"
).then(function (data)){
    // formatando os dados
    let parseDate = d3.timeParse("%Y/%m/%d");
    data.forEach(function (d)  {
        d.date = parseDate(d.date);
        d.google = +d.google;
        d.facebook = +d.facebook;
    });

    // Criando uma instancia de crossfilter
    let ndx = crossfilter(data);

    // criando as dimensões e grupos
    let dateDimension = ndx.dimension((d) => d.date);
    
    let googleDimension = ndx.dimension((d) => d.google);

    let googleByDayGroup = dateDimension.group().reduceSum((d) => d.google);

    let facebookByDayGroup = dateDimension.group().reduceSum((d) => d.facebook);

    let lineChart = dc.lineChart(document.querySelector("#chart"));
    let xScale = d3
        .scaleTime()
        .domain([dateDimension.bottom(1)[0].date, dateDimension.top(1)[0].date]);

    lineChart
        .width(800)
        .height(400)
        .dimension(dateDimension)
        
        .margim({})
}