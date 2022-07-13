# Terminologi

![terminology](/assets/img/terminology.png)

## **Mengalokasikan**

Tindakan Pengindeks yang menugaskan SQT ke proyek tertentu.

### **Mengalokasikan kembali**

Operasi gabungan untuk menghapus token yang dipertaruhkan dari satu proyek dan segera mengaitkannya dengan proyek lain (mulai berlaku pada akhir Era berikutnya). Ini direpresentasikan/dinyatakan sebagai persentase dari SQT terikat pengindeks.

## **Ikatan**

Act of depositing SQT into a global staking contract performed by either an Indexer or a Delegator.

### **Tidak terikat**

Tindakan Pengindeks atau Delegator yang menarik SQT dari kontrak taruhan global.

Ini secara efektif merupakan transfer SQT dari kontrak taruhan global ke dompet Pengindeks atau Delegator. Dengan kata lain, ini dapat dianggap sebagai Pengindeks atau Delegator yang menarik sebagian atau seluruh saham mereka. Perhatikan bahwa periode penguncian berlaku ketika token tidak terikat.

## **Mendelegasikan**

Tindakan Delegator yang menugaskan SQT ke dalam kontrak taruhan global dan kemudian menugaskan SQT ke Pengindeks. Perhatikan bahwa mendelegasikan dan mengikat adalah operasi atom.

### **Membatalkan pendelegasian**

Tindakan menarik SQT dari Pengindeks di akhir Era dan kemudian menarik SQT itu dari kontrak taruhan global ke alamat dompet. Ini tunduk pada periode penguncian.

### **Pendelegasian ulang**

Tindakan Delegator menugaskan kembali SQT dari satu Pengindeks ke Pengindeks lain. Pendelegasian ulang tidak memerlukan token untuk didelegasikan dan diantrekan untuk berlaku di akhir Era.

## **Staking**

Tindakan Pengindeks yang menetapkan token dalam kontrak taruhan global dan ke dalam kontrak Pengindeks sendiri.

### **Unstaking**

Tindakan Pengindeks menarik SQT mereka. Ini memicu "periode penguncian" 28 hari. Pengindeks dapat mengambil kembali untuk membatalkan proses ini dan mengembalikan token periode kunci mereka ke kontrak taruhan.

### **Restaking**

Tindakan Pengindeks yang membuat ulang SQT selama periode penguncian untuk mengembalikan token periode terkunci ke kontrak taruhan.

---

## **Rasio Kontrak**

Jumlah nilai kontrak harian (didefinisikan sebagai nilai/periode kontrak) tidak boleh melebihi rasio dengan total sahamnya (pengindeks + delegator).

## **Era**

Periode atau durasi waktu di mana konfigurasi dan pengaturan tetap konstan dan perhitungan berlangsung. Misalnya, selama Era:

- tarif Komisi Pengindeks tidak dapat diubah selama Era.

## **Rasio Delegasi Pengindeks**

Jumlah yang dapat "dipinjam" atau dimanfaatkan oleh Pengindeks dari Delegator. Rasio ini masih belum ditentukan.

## **Periode kunci**

Periode di mana token tidak terikat menunggu penarikan. Selama periode ini, token tidak mendapatkan hadiah apa pun. Saat ini, periode penguncian didefinisikan sebagai 28 hari.
