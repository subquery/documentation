# Berkontribusi Untuk SubQuery

Selamat datang dan terima kasih banyak telah mempertimbangkan untuk berkontribusi pada proyek SubQuery ini! Bersama-sama kita dapat membuka jalan menuju masa depan yang lebih terdesentralisasi.

::: tip Note This documentation is actively maintained by the SubQuery team. Kami juga menerima kontribusi. Anda dapat melakukannya dengan melakukan forking proyek GitHub kami dan membuat perubahan pada semua file markdown dokumentasi di bawah direktori `docs`. :::

Berikut ini adalah seperangkat pedoman (bukan aturan) untuk berkontribusi pada SubQuery. Mengikuti panduan ini akan membantu kami membuat proses kontribusi menjadi mudah dan efektif untuk semua orang yang terlibat. Ini juga menyampaikan bahwa Anda setuju untuk menghormati waktu dari developer yang mengelola dan mengembangkan proyek ini. Sebagai imbalannya, kami akan membalas rasa hormat itu dengan mengatasi masalah Anda, mempertimbangkan perubahan, berkolaborasi dalam peningkatan, dan membantu Anda menyelesaikan pull request Anda.

::: info Contributing to the SubQuery Network There are specific contribution guidelines for the SubQuery Network [here](../subquery_network/community.md#contributing-to-codebases). :::

## Kode Etik

We take our open source community projects and responsibility seriously and hold ourselves and other contributors to high standards of communication. By participating and contributing to this project, you agree to uphold our [Code of Conduct](https://github.com/subquery/subql/blob/main/CODE_OF_CONDUCT.md).

## Memulai

Contributions to our repositories are made through Issues and Pull Requests (PRs). A few general guidelines that cover both:

- Cari Issue and PR yang ada terlebih dahulu sebelum membuat milik Anda sendiri.
- We work hard to make sure issues are handled in promptly but, depending on the impact, it could take a while to investigate the root cause. Sebuah @ sebutan ramah di utas komentar kepada pengirim atau kontributor dapat membantu menarik perhatian jika issue Anda terblokir.

## Bagaimana Berkontribusi

### Melaporkan Bug

Bugs are tracked as GitHub issues. When logging an issue, explain the problem and include additional details to help maintainers reproduce the problem:

- Gunakan judul issue yang jelas dan deskriptif untuk mengidentifikasi masalah.
- Jelaskan langkah-langkah yang akurat untuk mereproduksi masalah.
- Describe the behaviour you observed after following the steps.
- Explain which behaviour you expected to see instead and why.
- Sertakan screenshot jika memungkinkan.

If it is a security issue, please review our documentation on [Vulnerability Reporting](./vulnerability-reporting.md)

### Mengirimkan Pull Request

In general, we follow the "fork-and-pull" Git workflow:

- Fork repositori ke akun Github Anda sendiri.
- Clone proyek ke mesin Anda.
- Buat branch secara lokal dengan nama yang ringkas namun deskriptif.
- Commit perubahan ke branch.
- Ikuti pedoman pemformatan dan testing apa pun yang khusus untuk repo ini.
- Push perubahan ke fork Anda.
- Buka sebuah PR di repositori kami.

## Konvensi Coding

### Pesan Git Commit

- Gunakan bentuk waktu kini ("Tambahkan fitur" bukan "Fitur yang ditambahkan").
- Gunakan suasana perintah ("Pindahkan kursor ke..." bukan "Memindahkan kursor ke...").
- Batasi baris pertama hingga 72 karakter atau kurang.

### JavaScript Styleguide

- Semua kode JavaScript diverifikasi dengan Prettier dan ESLint.
