<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
include 'database.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id)) {
    echo json_encode(['status' => 'error', 'message' => 'ID tidak ditemukan']);
    exit;
}

$id = $data->id;

$query = "DELETE FROM barang WHERE id=$id";

if (mysqli_query($konek, $query)) {
    echo json_encode(['status' => 'success', 'message' => 'Data berhasil dihapus']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Data gagal dihapus']);
}
?>
