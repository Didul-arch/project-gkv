var data = [{
  x: [0, 10, 20, 30, 40, 50],
  y: [0, 10, 20, 30, 40, 50]
}];

var layout = {font: {size: 18}};
var config = {responsive: true};

const heatMap = document.getElementById('root');
Plotly.newPlot(heatMap, data, layout, config);
