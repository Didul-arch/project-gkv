fetch('./data/fertilizer_recommendation_dataset.csv')
  .then(response => response.text())
  .then(csvData => {
    const result = Papa.parse(csvData, {
      dynamicTyping: true
    });

    const data = result.data;
    console.log(data)
  })
  .catch(err => console.error("error: ", err.message));

  const plotData = [{
    mode: 'markers',
    type: 'heatmap',
    marker: {
      size: 8,
      color: 'blue',
      opacity: 0.6
    }
  }];

var layout = {
  font: {size: 18},
  title: 'perbandingan nitrogen vs phospor',
  xaxis: {title: 'nitrogen'},
  yaxis: {title: 'phosporus'}
};
var config = {responsive: true};

const heatMap = document.getElementById('root');
Plotly.newPlot(heatMap, plotData, layout, config);
