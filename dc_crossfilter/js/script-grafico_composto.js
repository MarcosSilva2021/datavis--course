d3.csv(
    "https://gist.githubusercontent.com/emanueles/d8df8d875edda71aa2e2365fae2ce225/raw/1e949d3da02ed6caa21fe3a7a12a4e5a611a4bab/stocks.csv"
).then(function (data){
    // formatando os dados
    let parseDate = d3.timeParse("%Y/%m/%d");
    data.forEach(function (d)  {
        d.date = parseDate(d.date);// formatando a base de dados - convertendo
        d.google = +d.google;
        d.facebook = +d.facebook;
    });

    // Criando uma instância de Crossfilter para filtrar e agrupar os dados
    let ndx = crossfilter(data);

    // Criando a dimensão para a data (o eixo X do gráfico)
    let dateDimension = ndx.dimension((d) => d.date);

    // Criando os grupos que somam os valores de ações do Google e do Facebook por dia
    let googleByDayGroup = dateDimension.group().reduceSum((d) => d.google);
    let facebookByDayGroup = dateDimension.group().reduceSum((d) => d.facebook);

    // Configuração do gráfico composto
    let compositeChart = dc.compositeChart("#chart2");  // Cria o gráfico composto

    // Definindo a escala do eixo X (escala de tempo baseada nas datas dos dados)
    let xScale = d3.scaleTime()
        .domain([dateDimension.bottom(1)[0].date, dateDimension.top(1)[0].date]);  // Define o intervalo de datas do eixo X

    // Configurando as propriedades do gráfico composto
    compositeChart
        .width(800)  // Largura do gráfico
        .height(400)  // Altura do gráfico
        .margins({ top: 50, right: 50, bottom: 25, left: 40 })  // Margens do gráfico
        .dimension(dateDimension)  // Relacionando o gráfico com a dimensão de data
        .x(xScale)  // Definindo a escala do eixo X
        .xUnits(d3.timeDays)  // Definindo a unidade do eixo X como dias
        .renderHorizontalGridLines(true)  // Ativando as linhas horizontais de grade
        .legend(dc.legend().x(700).y(5).itemHeight(13).gap(5))  // Configuração da legenda
        .brushOn(false)  // Desativa a seleção interativa (brush)
        .compose([  // Compondo o gráfico com as duas séries de dados (Google e Facebook)
            dc.lineChart(compositeChart)  // Gráfico de linha para as ações do Google
                .group(googleByDayGroup, "Google")  // Grupo de dados do Google
                .ordinalColors(["steelblue"]),  // Cor da linha do Google
            dc.lineChart(compositeChart)  // Gráfico de linha para as ações do Facebook
                .group(facebookByDayGroup, "Facebook")  // Grupo de dados do Facebook
                .ordinalColors(["darkorange"]),  // Cor da linha do Facebook
        ]);

    // Renderizando todos os gráficos configurados (no caso, só o gráfico composto)
    dc.renderAll();
});
