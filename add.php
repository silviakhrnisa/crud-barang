<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include 'database.php';
$data = json_decode(file_get_contents('php://input'));

if (isset($data->nama) && isset($data->jumlah)) {
    $nama = $data->nama;
    $jumlah = $data->jumlah;

    $sql = "INSERT INTO barang (nama, jumlah) VALUES ('$nama', '$jumlah')";

    if ($konek->query($sql) === TRUE) {
        echo json_encode('Data berhasil disimpan');
    } else {
        echo json_encode('Data tidak berhasil disimpan: ' . $konek->error);
    }

} else {
    echo json_encode('Data tidak lengkap');
}
?>
