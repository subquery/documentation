# Tutorial & Contoh

Di sini kami akan memberikan daftar tutorial dan menunjukkan berbagai contoh untuk membantu anda memulai secara cepat dan mudah.

## Contoh SubQuery



## SubQuery Example Projects

| Contoh                                                                                        | Deskripsi                                                                                                                                   | Topik                                                                                                                |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| [extrinsic-finalized-block](https://github.com/subquery/tutorials-extrinsic-finalised-blocks) | Mengindeks ekstrinsik sehingga itu bisa di-query dengan hash-nya                                                                            | Contoh paling simpel dengan fungsi **block handler**                                                                 |
| [block-timestamp](https://github.com/subquery/tutorials-block-timestamp)                      | Mengindeks catatan waktu untuk setiap block yang selesai                                                                                    | Fungsi **call handler** sederhana                                                                                    |
| [validator-threshold](https://github.com/subquery/tutorials-validator-threshold)              | Mengindeks jumlah staking (jaminan) minimum agar validator dapat dipilih.                                                                   | Fungsi **block handler** lebih rumit yang membuat **external calls** ke `@polkadot/api` untuk data on-chain tambahan |
| [sum-reward](https://github.com/subquery/tutorials-sum-reward)                                | Mengindeks staking bond, hadiah, dan slash dari terjadinya block yang selesai                                                               | **event handlers** lebih rumit dengan hubungan **one-to-many**                                                       |
| [entity-relation](https://github.com/subquery/tutorials-entity-relations)                     | Mengindeks transfer saldo antara akun, juga mengindeks utilitas batchAll untuk mencari tahu isi dari panggilan ekstrinsik (extrinsic calls) | Hubungan **One-to-many** dan **many-to-many** dan **extrinsic handling** yang rumit                                  |
| [kitty](https://github.com/subquery/tutorials-kitty-chain)                                    | Mengindeks info kelahiran Kitty.                                                                                                            | **call handlers** kompleks dan **event handlers**, dengan data diindeks dari **custom chain**                        |
