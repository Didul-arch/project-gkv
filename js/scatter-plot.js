// Kode untuk scatter plot Nitrogen vs Phosphorous berdasarkan jenis pupuk
function createScatterPlot() {
  fetch('./data/fertilizer_recommendation_dataset.csv')
    .then(response => response.text())
    .then(csvData => {
      const result = Papa.parse(csvData, {
        header: true,
        dynamicTyping: true
      });

      const data = result.data;
      
      // Cari pupuk yang paling banyak direkomendasikan (top 5)
      const fertilizerCounts = {};
      data.forEach(row => {
        if (row.Fertilizer) {
          fertilizerCounts[row.Fertilizer] = (fertilizerCounts[row.Fertilizer] || 0) + 1;
        }
      });
      
      // Urutkan dan ambil 5 pupuk teratas
      const topFertilizers = Object.keys(fertilizerCounts)
        .sort((a, b) => fertilizerCounts[b] - fertilizerCounts[a])
        .slice(0, 5);
      
      // Filter data hanya untuk pupuk teratas
      const filteredData = data.filter(row => topFertilizers.includes(row.Fertilizer));
      
      // Buat objek data untuk setiap jenis pupuk
      const traces = topFertilizers.map(fertilizer => {
        const fertilizerData = filteredData.filter(row => row.Fertilizer === fertilizer);
        
        return {
          x: fertilizerData.map(row => row.Nitrogen),
          y: fertilizerData.map(row => row.Phosphorous),
          mode: 'markers',
          type: 'scatter',
          name: fertilizer,
          text: fertilizerData.map(row => `Crop: ${row.Crop}<br>Soil: ${row.Soil}<br>pH: ${row.PH}`),
          hoverinfo: 'text+name'
        };
      });

      const layout = {
        title: 'Perbandingan Nitrogen vs Phosphorous untuk Berbagai Pupuk',
        xaxis: { title: 'Nitrogen Level' },
        yaxis: { title: 'Phosphorous Level' },
        hovermode: 'closest',
        height: 600,
        width: 900
      };

      Plotly.newPlot('scatter-plot', traces, layout);
    })
    .catch(error => console.error('Error loading scatter plot data:', error));
}

// Jalankan fungsi saat document ready
document.addEventListener('DOMContentLoaded', createScatterPlot);