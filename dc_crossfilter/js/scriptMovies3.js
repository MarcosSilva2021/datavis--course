// Carregando o arquivo CSV
d3.csv("Stock_data.csv").then(function (data) {
    // Formatando os dados
    let parseDate = d3.timeParse("%Y-%m-%d"); // Ajuste o formato da data conforme o arquivo
    data.forEach(function (d) {
        d.date = parseDate(d.date); // Converte string de data para objeto Date
        d.open = +d.open;          // Converte "open" para número
        d.close = +d.close;        // Converte "close" para número
    });

    // Criando a instância do Crossfilter
    let ndx = crossfilter(data);

    // Criando dimensão baseada na data
    let dateDimension = ndx.dimension((d) => d.date);

    // Criando grupos para valores "open" e "close"
    let openGroup = dateDimension.group().reduceSum((d) => d.open);
    let closeGroup = dateDimension.group().reduceSum((d) => d.close);

    // Configurando o gráfico composto
    let compositeChart = dc.compositeChart("#chart");

    // Configurando a escala do eixo X (escala temporal)
    let xScale = d3.scaleTime()
        .domain([dateDimension.bottom(1)[0].date, dateDimension.top(1)[0].date]);

    // Configurando o gráfico
    compositeChart
        .width(800) // Largura
        .height(400) // Altura
        .margins({ top: 50, right: 50, bottom: 30, left: 40 }) // Margens
        .dimension(dateDimension) // Define a dimensão no Crossfilter
        .x(xScale) // Define a escala no eixo X
        .xUnits(d3.timeDays) // Define as unidades do eixo X como dias
        .renderHorizontalGridLines(true) // Linhas de grade horizontais
        .legend(dc.legend().x(700).y(10).itemHeight(13).gap(5)) // Configuração da legenda
        .brushOn(false) // Desabilita o brush (seleção)
        .compose([ // Adiciona os gráficos ao gráfico composto
            dc.lineChart(compositeChart)
                .group(openGroup, "Ações Abertas (Open)")
                .ordinalColors(["steelblue"]),
            dc.lineChart(compositeChart)
                .group(closeGroup, "Ações Fechadas (Close)")
                .ordinalColors(["darkorange"])
        ]);

    // Renderiza o gráfico
    dc.renderAll();
});
