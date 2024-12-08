document.getElementById('calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    document.getElementById('loading').style.display = 'block';  // Tampilkan animasi loading

    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const latitude = parseFloat(document.getElementById('latitude').value);
    const longitude = parseFloat(document.getElementById('longitude').value);

    // Simulasi perhitungan dengan delay
    setTimeout(() => {
        const sunPosition = calculateSunPosition(date, time, latitude, longitude);

        // Tampilkan hasil perhitungan
        document.getElementById('sun-position').innerText = `Posisi Matahari: ${sunPosition.azimuth}°, ${sunPosition.altitude}°`;

        // Update grafik dengan data baru
        updateChart(sunPosition.altitude);

        // Sembunyikan animasi loading
        document.getElementById('loading').style.display = 'none';
    }, 1000);  // Delay 1 detik
});

function calculateSunPosition(date, time, latitude, longitude) {
    // Menghitung posisi matahari berdasarkan tanggal, waktu, dan lokasi geografis
    const d = new Date(`${date}T${time}:00`);  // Menggabungkan tanggal dan waktu menjadi objek Date
    const hour = d.getHours();
    const minutes = d.getMinutes();

    // Menghitung azimut
    const azimuth = (hour * 15) + (minutes * 0.25) + longitude / 15; // Adjust azimuth with longitude

    // Menghitung altitude
    const altitude = 90 - Math.abs((hour - 12) * 7.5) - Math.abs(latitude / 2);  // Adjust altitude with latitude

    // Menjamin nilai altitude tidak negatif
    return { azimuth: azimuth, altitude: Math.max(altitude, 0) };
}

let sunChart;

function updateChart(altitude) {
    const ctx = document.getElementById('sun-chart').getContext('2d');
    // Jika chart sudah ada, update datanya
    if (sunChart) {
        sunChart.data.datasets[0].data = [altitude];
        sunChart.update();
    } else {
        // Buat chart baru jika belum ada
        sunChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Posisi Matahari'],
                datasets: [{
                    label: 'Posisi Matahari',
                    data: [altitude],
                    borderColor: '#FF5733',
                    fill: false
                }]
            }
        });
    }
}
