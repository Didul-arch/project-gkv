// Kode untuk parallel coordinates plot
function createParallelPlot() {
  fetch('./data/fertilizer_recommendation_dataset.csv')
    .then(response => response.text())
    .then(csvData => {
      const result = Papa.parse(csvData, {
        header: true,
        dynamicTyping: true
      });

      // Filter data untuk menghindari nilai yang tidak valid
      const data = result.data.filter(row => 
        row.Temperature && row.Moisture && row.PH && 
        row.Nitrogen && row.Phosphorous && row.Potassium && 
        row.Fertilizer
      );
      
      // Batasi jumlah data untuk performa yang lebih baik (opsional)
      const sampleData = data.slice(0, 300);
      
      // Kelompokkan data berdasarkan jenis pupuk untuk memberi warna yang berbeda
      const fertilizerTypes = [...new Set(sampleData.map(row => row.Fertilizer))];
      const colorScale = fertilizerTypes.map((_, i) => 
        Math.floor(255 * i / (fertilizerTypes.length - 1))
      );
      
      const colors = sampleData.map(row => 
        fertilizerTypes.indexOf(row.Fertilizer)
      );
      
      const parallelData = [{
        type: 'parcoords',
        line: {
          color: colors,
          colorscale: 'Jet'
        },
        dimensions: [
          {label: 'Temperature', values: sampleData.map(row => row.Temperature)},
          {label: 'Moisture', values: sampleData.map(row => row.Moisture)},
          {label: 'Rainfall', values: sampleData.map(row => row.Rainfall)},
          {label: 'pH', values: sampleData.map(row => row.PH)},
          {label: 'Nitrogen', values: sampleData.map(row => row.Nitrogen)},
          {label: 'Phosphorous', values: sampleData.map(row => row.Phosphorous)}, 
          {label: 'Potassium', values: sampleData.map(row => row.Potassium)},
          {label: 'Carbon', values: sampleData.map(row => row.Carbon)}
        ]
      }];
      
      const layout = {
        title: 'Analisis Parallel Coordinates untuk Rekomendasi Pupuk',
        height: 600,
        width: 1200
      };
      
      Plotly.newPlot('parallel-plot', parallelData, layout);
      
      // Tambahkan legenda untuk jenis pupuk
      const legendDiv = document.createElement('div');
      legendDiv.style.padding = '10px';
      legendDiv.innerHTML = '<h4>Jenis Pupuk:</h4>';
      
      fertilizerTypes.forEach((fert, i) => {
        const color = getColorFromScale(i / (fertilizerTypes.length - 1), 'jet');
        legendDiv.innerHTML += `
          <div style="display:flex; align-items:center; margin-bottom:5px">
            <div style="width:20px; height:20px; background-color:${color}; margin-right:10px"></div>
            <div>${fert}</div>
          </div>
        `;
      });
      
      document.getElementById('parallel-plot').appendChild(legendDiv);
    })
    .catch(error => console.error('Error loading parallel plot data:', error));
}

// Helper function untuk mendapatkan warna dari skala
function getColorFromScale(value, scale) {
  // Simplifikasi - untuk implementasi lengkap, gunakan library untuk color mapping
  const jetScale = ['#00007F', '#0000FF', '#007FFF', '#00FFFF', '#7FFF7F', '#FFFF00', '#FF7F00', '#FF0000', '#7F0000'];
  const index = Math.floor(value * (jetScale.length - 1));
  return jetScale[index];
}

// Jalankan fungsi saat document ready
document.addEventListener('DOMContentLoaded', createParallelPlot);