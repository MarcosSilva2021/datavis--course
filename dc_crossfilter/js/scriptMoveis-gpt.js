d3.json("data/movies.json").then(function(data) {
    // Exibe os primeiros dados para garantir que o arquivo foi carregado corretamente
    console.log(data);

    // Converte os dados para os tipos corretos (garantir que sejam numéricos)
    data.forEach(function(d) {
        d.Year = +d.Year;  // Garantir que o ano seja numérico
        d.Worldwide_Gross_M = +d.Worldwide_Gross_M;  // Garantir que a bilheteira seja numérica
        d.Budget_M = +d.Budget_M;  // Garantir que o orçamento seja numérico
    });

    // Criar o Crossfilter para os dados
    let ndx = crossfilter(data);

    // Criando as dimensões
    let yearDimension = ndx.dimension(function(d) { return d.Year; });
    let genreDimension = ndx.dimension(function(d) { return d.Genre; });

    // Criando os grupos para somar as bilheteiras (Worldwide_Gross_M)
    let totalByYearGroup = yearDimension.group().reduceSum(function(d) { return d.Worldwide_Gross_M; });
    let totalByGenreGroup = genreDimension.group().reduceSum(function(d) { return d.Worldwide_Gross_M; });

    // Agora, criaremos os gráficos para exibição
    createByYearChart(totalByYearGroup, yearDimension);
    createByGenreChart(totalByGenreGroup, genreDimension);
});

function createByYearChart(group, dimension) {
    let byYearChart = dc.barChart("#by_genre");

    byYearChart
        .width(800)  // Largura do gráfico
        .height(400)  // Altura do gráfico
        .margins({ top: 30, right: 50, bottom: 40, left: 50 })  // Margens
        .dimension(dimension)  // Dimensão baseada no ano
        .group(group)  // Grupo baseado na soma das bilheteiras por ano
        .x(d3.scaleBand())  // Usando escala ordinal no eixo X para os anos
        .xUnits(dc.units.ordinal)  // Definindo unidades ordinais para o eixo X
        .xAxisLabel("Year")  // Rótulo do eixo X
        .yAxisLabel("Total Box Office (M$)")  // Rótulo do eixo Y
        .renderLabel(true)  // Exibe rótulos nas barras
        .brushOn(false)  // Desativa a interação de seleção (brush)
        .renderHorizontalGridLines(true)  // Linhas horizontais de grade
        .legend(dc.legend().x(680).y(10).itemHeight(13).gap(5))  // Legenda
        .ordinalColors(["#3498db"]);  // Cor das barras

    dc.renderAll();  // Renderiza o gráfico
}

