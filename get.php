<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include 'database.php';

// Hapus echo "terhubung" di bawah ini jika ada
// echo "terhubung"; ❌ HAPUS BARIS INI

$sql = "SELECT * FROM barang ";
$hasil = $konek->query($sql);

$data = [];

if ($hasil->num_rows > 0) {
    while ($row = $hasil->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data); // hanya ini yang harus tampil

$konek->close();
?>
