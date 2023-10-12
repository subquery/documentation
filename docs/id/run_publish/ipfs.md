# Migrating from GitHub to IPFS

Untuk mempermudah penyebaran proyek pada Layanan Terkelola, kami tidak lagi menggunakan penyebaran GitHub untuk mendukung IPFS.

Menggunakan IPFS memberikan pengalaman yang lebih baik bagi para pengembang dalam beberapa cara:

- Unlike with GitHub deployments, projects are built locally on your machine. This means that you can have full control over the environment. Resolving any issues with version compatibility such as node.js version or other dependencies is much faster and easier.
- You can share your projects CID and ensure that everyone will be able to run the same project with the same results.
- It’s decentralised, so that you don’t have to rely on a centralised party like GitHub to store your code.
- And on top of this, you can deploy the same project to the SubQuery Network!

## How to prepare your project?

1. Update your project's dependencies.
   - Update `@subql/cli` to the latest version: you can do this by running `yarn add -D @subql/cli@latest` or `npm i -dev @subql/cli@latest`
   - We also recommend updating other dependencies at this time
   - Pay attention to this issue: [926](https://github.com/subquery/subql/discussions/926)
2. `package.json`: Update the build command to `subql build`. It should look like [this](https://github.com/subquery/subql-starter/blob/418440f09226694a0063c939ff3332530f3047c4/package.json#L7).
3. `src/index.ts`: For Substrate based projects, if updating from `@polkadot/api` v6 (or earlier), update your `src/index.ts` to include [this line](https://github.com/subquery/subql-starter/blob/418440f09226694a0063c939ff3332530f3047c4/src/index.ts#L3).
4. `project.ts`:

   - Make sure your project is using manifest version 1.0.0. You can check this by looking at the `specVersion` field in `project.ts`. If it is below 1.0.0, then run `subql migrate` and follow the [migration steps to upgrade](../build/manifest/polkadot.md#migrating-to-v100-badge-textupgrade-typewarning).

   - Check that the `datasources: mapping: file:` references your code entrypoint correctly. Usually this is `./dist/index.js`

   - If you're using a datasource processor (any `processor:` in the `project.ts`) we need to ensure that it gets bundled during build and publish. Untuk melakukannya, silakan perbarui ke versi terbaru dari paket yang sekarang menyertakan versi bundel. Anda dapat melakukan ini dengan menambahkan ekspor ke `package.json` Anda.

   ```json
   ...
   "exports": {
     "processorName": "./node_modules/path/to/processor.js"
     // "frontierEvm": "./node_modules/@subql/frontier-evm-processor/dist/index.js"
     // "acalaEvm": "./node_modules/@subql/acala-evm-processor/dist/index.js",
     // "ethermintEVM": "./node_modules/@subql/ethermint-evm-processor/dist/index.js"
     // "chaintypes": "./src/chaintypes.ts" // jenis rantai jika diperlukan
   }
   ```

   We need to update the reference to the bundle in your `project.ts`. Untuk melakukan ini, Anda dapat memperbarui jalur file prosesor apa pun ke `file: ./node_modules/@subql/@subql/<processor-name>/dist/bundle.js` dan ganti `<processor-name>` dengan prosesor yang Anda gunakan. Jika Anda menggunakan `@subql/datasource-processors` paket ini sekarang sudah tidak digunakan lagi, Anda dapat menemukan penggantinya yang relevan dari repositori [datasource-processors](https://github.com/subquery/datasource-processors/tree/main/packages) yang baru.

   - Jika proyek Anda menggunakan [Substrate Chain Types](../build/manifest/polkadot.md#custom-chains) berbasis js/ts, Anda perlu mengulangi langkah-langkah di atas, tetapi dengan referensi ke chain types Anda.

5. `docker-compose.yaml`: Perbarui ke versi [docker compose terbaru](https://github.com/subquery/subql-starter/blob/main/Polkadot/Polkadot-starter/docker-compose.yml) dan tambahkan [direktori ini](https://github.com/subquery/subql-starter/tree/main/Polkadot/Polkadot-starter/docker) ke repo Anda. Untuk mengujinya, kami sarankan untuk menjalankan proyek Anda secara lokal.

:::peringatan Sekarang bangun ulang dan jalankan proyek Anda secara lokal untuk menguji perubahan ini sebelum melanjutkan menggunakan `yarn`, `yarn codegen`, `yarn build`, dan kemudian `yarn start:docker`. :::

Proyek Anda sekarang harus siap untuk disebarkan melalui IPFS ke SubQuery Managed Service atau jaringan SubQuery. Anda dapat mengikuti panduan [di sini](./publish.md#publish-your-subquery-project-to-ipfs) untuk menyebarkan ke IPFS dan kemudian mempublikasikan ke Managed Service.
