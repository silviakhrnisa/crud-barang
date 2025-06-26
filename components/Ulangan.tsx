import { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, FlatList, Modal } from 'react-native'
import axios from "axios";

const Ulangan = () => {
    type Barang = {
        id: number,
        nama: string,
        jumlah: number,
    }

    const [nama, setNama] = useState('');
    const [jumlah, setJumlah] = useState('');
    const [data, setData] = useState<Barang[]>([]);
    const [selectedItem, setSelectedItem] = useState<Barang | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleButton = () => {
        if (nama === "" && jumlah === "") {
            Alert.alert('ERROR', 'Format Harus Diisi seluruhnya!!');
            return;
        }

        axios
            .post("http://192.168.159.172/barang/add.php", { nama, jumlah })
            .then((response) => {
                Alert.alert("BERHASIL DISIMPAN KE DB", response.data.message);
                setNama("");
                setJumlah("");
                fetchData();
            })
            .catch(() => {
                Alert.alert("ERROR", "Data Tidak terkirim ke db");
            });
    }

    const fetchData = () => {
        axios
            .get(`http://192.168.159.172/barang/get.php`)
            .then((response) => {
                if (Array.isArray(response.data)) {
                    // Alert.alert('DATA', JSON.stringify(response.data));
                    setData(response.data);
                } else {
                    setData([]);
                }
            })
            .catch(() => {
                Alert.alert('Error', 'Gagal mengambil data dari database!');
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = () => {
        if (!selectedItem) return;
        axios
            .post("http://192.168.159.172/barang/edit.php", selectedItem)
            .then(() => {
                Alert.alert("Sukses", "Data berhasil diedit");
                fetchData();
                setModalVisible(false);
            })
            .catch(() => {
                Alert.alert("Error", "Data gagal diedit");
            });
    }

    const handleDelete = (itemId: number) => {
        Alert.alert(
            'Konfirmasi',
            'Yakin ingin menghapus item ini?',
            [
                { text: 'Batal', style: 'cancel' },
                {
                    text: 'Hapus',
                    style: 'destructive',
                    onPress: () => {
                        axios
                            .post("http://192.168.159.172/barang/delete.php", { id: itemId })
                            .then(() => {
                                Alert.alert("Sukses", "Data berhasil dihapus");
                                fetchData();
                            })
                            .catch(() => {
                                Alert.alert("Error", "Data gagal dihapus");
                            });
                    }
                }
            ]
        );
    }


    return (
        <View style={styles.background}>

            <View style={styles.container}>

                <View>
                    <Text style={styles.tema}>Daftar Barang</Text>
                </View>

                <View style={styles.inputan}>
                    <TextInput
                        placeholder='Masukkan nama barang'
                        style={styles.inputjudul}
                        value={nama}
                        onChangeText={setNama} />

                    <TextInput
                        placeholder='Masukkan jumlah stok'
                        style={styles.inputpenerbit}
                        value={jumlah}
                        onChangeText={setJumlah} />
                </View>

                <TouchableOpacity onPress={handleButton} style={styles.tombol}>
                    <Text style={styles.simpan}>SIMPAN</Text>
                </TouchableOpacity>

            </View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => {
                            setSelectedItem(item);
                            setModalVisible(true);
                        }}
                    >
                        <View style={styles.cardContent}>
                            <View>
                                <Text style={styles.itemtext}>Barang: {item.nama}</Text>
                                <Text style={styles.itemtext}>Jumlah: {item.jumlah}</Text>
                            </View>
                            <View style={styles.buttoncontainer}>
                                <TouchableOpacity
                                    style={styles.editbutton}
                                    onPress={() => {
                                        setSelectedItem(item);
                                        setModalVisible(true);
                                    }}>
                                    <Text style={{ color: 'black', alignSelf: 'center' }}>edit</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.deletebutton}
                                    onPress={() => handleDelete(item.id)
                                    }>
                                    <Text style={{ color: 'black', alignSelf: 'center' }}>Hapus</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View>
                    <View style={styles.modalcontent}>
                        <Text style={styles.title}>Edit Data</Text>
                        <TextInput
                            style={styles.inputbarang}
                            value={selectedItem?.nama}
                            onChangeText={(text) => setSelectedItem(prev => prev ? { ...prev, nama: text } : prev)}
                            placeholder="Nama Barang"
                        />

                        <TextInput
                            style={styles.inputjumlah}
                            value={selectedItem?.jumlah}
                            onChangeText={(text) => setSelectedItem(prev => prev ? { ...prev, jumlah: text } : prev)}
                            placeholder="Jumlah"
                        />
                        <TouchableOpacity 
                            onPress={handleEdit}
                        >
                            <Text style={{color:'white', textAlign:'center'}}>SIMPAN PERUBAHAN</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.tombol, {marginTop:10}]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={{color:'white', textAlign:'center'}}>BATAL</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    )
}

export default Ulangan;

const styles = StyleSheet.create({
    inputbarang:{
        borderWidth:1,
        borderRadius:20,
        width:300,
        alignSelf:'center',
        borderColor:'white'
    },

    inputjumlah:{
        borderWidth:1,
        borderRadius:20,
        width:300,
        alignSelf:'center',
        borderColor:'white'
    },

    title:{
        alignSelf:'center',
        fontSize:20,
        top:10,
        color:'white',
        fontWeight:'bold'
    },

    modalcontent: {
        backgroundColor:'orange',
        gap:30,
        margin:'auto',
        borderRadius:20,
        width:400,
        height:350
    },

    deletebutton: {

    },

    background: {
        backgroundColor: 'white',
        height: 9000
    },

    container: {
        margin: 'auto',
        top: 30,
        gap: 50,
    },

    tema: {
        fontWeight: 'bold',
        fontFamily: 'helvetica',
        alignSelf: 'center',
        fontSize: 30
    },

    inputpenerbit: {
        borderWidth: 1,
        width: 400,
        borderRadius: 20,
    },

    inputjudul: {
        borderWidth: 1,
        width: 400,
        borderRadius: 20,
    },

    inputan: {
        gap: 50,
        backgroundColor: 'white'
    },

    tombol: {
        backgroundColor: 'orange',
        width: 250,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 30,
    },

    simpan: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',

    },

    cardContent: {
        gap: 20,
    },

    card: {
        top: 50,
        borderWidth: 1,
        width: 300,
        marginLeft: 30,
        borderRadius: 10,
        justifyContent: 'center',
        gap: 20,
        margin: 20
    },

    buttoncontainer: {
        justifyContent:'space-around',
        flexDirection:'row',
        padding:5
    },

    itemtext: {
        padding:5
    },

    edit: {
        backgroundColor: 'red',
        width: 50,
        justifyContent: 'center',
        alignContent: 'center',
        marginLeft: 200,
        borderRadius: 10
    },

    editbutton: {

    }
})