// Kode untuk heatmap distribusi pupuk berdasarkan jenis tanah
function createHeatmap() {
  fetch('./data/fertilizer_recommendation_dataset.csv')
    .then(response => response.text())
    .then(csvData => {
      const result = Papa.parse(csvData, {
        header: true,
        dynamicTyping: true
      });

      const data = result.data;
      
      // Hitung distribusi pupuk berdasarkan jenis tanah
      const distribution = {};
      const soilTypes = [...new Set(data.map(row => row.Soil))];
      const fertilizerTypes = [...new Set(data.map(row => row.Fertilizer))];
      
      soilTypes.forEach(soil => {
        distribution[soil] = {};
        fertilizerTypes.forEach(fert => {
          distribution[soil][fert] = data.filter(row => row.Soil === soil && row.Fertilizer === fert).length;
        });
      });
      
      // Buat matriks untuk heatmap
      const z = soilTypes.map(soil => fertilizerTypes.map(fert => distribution[soil][fert]));
      
      const heatmapData = [{
        z: z,
        x: fertilizerTypes,
        y: soilTypes,
        type: 'heatmap',
        colorscale: 'Viridis'
      }];
      
      const layout = {
        title: 'Distribusi Rekomendasi Pupuk Berdasarkan Jenis Tanah',
        height: 500,
        width: 900,
        xaxis: {
          title: 'Jenis Pupuk',
          tickangle: -45
        },
        yaxis: {
          title: 'Jenis Tanah'
        }
      };
      
      Plotly.newPlot('heatmap-plot', heatmapData, layout);
    })
    .catch(error => console.error('Error loading heatmap data:', error));
}

// Jalankan fungsi saat document ready
document.addEventListener('DOMContentLoaded', createHeatmap);