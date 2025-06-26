<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
include 'database.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id) || !isset($data->nama) || !isset($data->jumlah)) {
    echo json_encode(['status' => 'error', 'message' => 'Data tidak lengkap']);
    exit;
}

$id = $data->id;
$nama = $data->nama;
$jumlah = $data->jumlah;

$query = "UPDATE barang SET nama='$nama', jumlah='$jumlah'WHERE id=$id";

if (mysqli_query($konek, $query)) {
    echo json_encode(['status' => 'success', 'message' => 'Data berhasil diupdate']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Data gagal diupdate']);
}
?>
