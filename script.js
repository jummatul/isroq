document.getElementById('calculateBtn').addEventListener('click', function() {
    const latitude = parseFloat(document.getElementById('latitude').value);
    const date = new Date(document.getElementById('date').value);
  
    if (isNaN(latitude) || isNaN(date.getTime())) {
      document.getElementById('result').textContent = "Harap masukkan lintang dan tanggal yang valid.";
      return;
    }
  
    // Menghitung hari ke-n dalam tahun tersebut
    const n = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  
    // Menghitung deklinasi matahari
    const delta = 23.44 * Math.sin((360 / 365) * (n - 81) * (Math.PI / 180)); // Deklinasi dalam derajat
  
    // Menghitung lintang dalam radian
    const phi = latitude * (Math.PI / 180);
    const deltaRad = delta * (Math.PI / 180); // Deklinasi dalam radian
  
    // Menghitung durasi siang dalam jam
    const H = (2 / 15) * Math.acos(-Math.tan(phi) * Math.tan(deltaRad)) * (180 / Math.PI);
  
    // Durasi malam
    const nightDuration = 24 - H;
  
    // Menampilkan hasil
    document.getElementById('result').textContent = `
      Durasi siang pada tanggal ${date.toDateString()} di lintang ${latitude}° adalah ${H.toFixed(2)} jam.
      Durasi malam adalah ${nightDuration.toFixed(2)} jam.
    `;
  });
  