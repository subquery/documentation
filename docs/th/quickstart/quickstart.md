# 1. สร้างโครงการใหม่

เป้าหมายของคู่มือเริ่มต้นฉบับย่อนี้คือ เพื่อให้คุณมีการตั้งค่าการพัฒนาที่สมบูรณ์ และเข้าใจแนวทางการสร้างโครงการ SubQuery blockchain แรกของคุณ It is targeted towards experienced developers right through to those just beginning their blockchain journey.

This quick start guide should take around 10-15 minutes.

After completing this quick start guide, you will have a working SubQuery project that will run on a SubQuery node. You will be able to adapt the standard starter project and index transfers from your favourite blockchain network such as Polkadot, Avalanche, Cosmos, etc.

เริ่มกระบวนการสร้างโปรเจคแรกของ Subquery blockchain

## Prerequisites

ก่อนที่คุณจะเริ่มสร้างโปรเจ็กต์ Subquery กรุณาตรวจสอบให้แน่ใจว่าคุณได้ติดตั้งแอพพลิเคชั่นซอฟต์แวร์ที่จำเป็น These are:

- [Node](https://nodejs.org/en/): ติดตั้ง node ที่ทันสมัย (เช่น LTS version)
- [Docker](https://docker.com/): This tutorial will use the required Docker.

Now, you are all set to start with the first step, which is the installation of the SubQuery CLI.

## 1. การติดตั้ง SubQuery CLI

ติดตั้ง SubQuery CLI แบบ Global บนเทอมินัลของคุณโดยใช้ NPM

```shell
# NPM
npm install -g @subql/cli
```

::: danger We **DO NOT** encourage the use of `yarn global` for installing `@subql/cli` due to its poor dependency management. มันอาจจะทำให้เกิดการ Error หลายรอบ :::

Take a look at all available commands and their use. Run the given below command in the CLI:

```shell
subql help
```

## 2. เริ่มต้น SubQuery Starter Project

Run the following command inside the directory you want to create a SubQuery project:

```shell
subql init
```

::: warning Important

**สำหรับผู้ใช้งาน Cosmos**

Cosmos is not yet supported in SubQuery's CLI (`subql`). Hence, if you are using Cosmos, you must start with a Juno clone or fork this [starter project](https://github.com/subquery/cosmos-subql-starter).

To initialise your project with Cosmos, refer to these 4 steps shown in this [link](https://github.com/subquery/juno-subql-starter#readme). Once you complete these 4 steps, **jump** to the [Make Changes to Your Project](../quickstart/quickstart.md#_3-make-changes-to-your-project) section. :::

You'll be asked certain questions as you proceed ahead:

- **Project name**: A project name for your SubQuery project.
- **Network family**: The layer-1 blockchain network family that this SubQuery project will index. ใช้ลูกศร เพื่อเลือก ตัวเลือกที่มีให้ For example, Polkadot, Avalanche, Cosmos, or any other supported network.
- **Network**: The specific network that this SubQuery project will index. ใช้ลูกศร เพื่อเลือก ตัวเลือกที่มีให้ For example, Polkadot, Avalanche, or any other supported network.
- **Template project**: Select a SubQuery template project that will provide a starting point in the development. We suggest selecting the _"subql-starter"_ project.
- **RPC endpoint**: Provide an HTTPS URL to a running RPC endpoint, which will be used by default for this project. You can quickly access public endpoints for different networks, create your own private dedicated node using [OnFinality](https://app.onfinality.io), or just use the default endpoint. RPC node นี้ต้องเป็น archive node (มีสถานะ full chain state) We will use the default value for this guide. Based on the network you have chosen, the default value may be:
  - For Polkadot - _"https://polkadot.api.onfinality.io"_,
  - For Avalanche - _"https://avalanche.api.onfinality.io"_,
  - For Terra - _“https://terra-columbus-5.beta.api.onfinality.io”_ and likewise for other networks. <br/>
- **Git repository**: Provide a Git URL to a repo that this SubQuery project will be hosted in (when hosted in SubQuery Explorer) or accept the provided default.
- **Authors**: Enter the owner of this SubQuery project here (e.g. your name!) or accept the provided default.
- **Description**: Provide a short paragraph about your project that describes what data it contains and what users can do with it, or accept the provided default.
- **Version**: Enter a custom version number or use the default (`1.0.0`).
- **License**: Provide the software license for this project or accept the default (`MIT`).

มาดูตัวอย่าง:

```shell
$ subql init
Project name [subql-starter]: HelloWorld
? Select a network family Substrate
? Select a network Polkadot
? Select a template project subql-starter     Starter project for subquery
RPC endpoint: [wss://polkadot.api.onfinality.io/public-ws]:
Git repository [https://github.com/subquery/subql-starter]:
Fetching network genesis hash... done
Author [Ian He & Jay Ji]: Sean
Description [This project can be used as a starting po...]:
Version [1.0.0]:
License [MIT]:
Preparing project... done
HelloWorld is ready
```

After you complete the initialisation process, you will see a folder with your project name created inside the directory. Please note that the contents of this directory should be identical to what's listed in the [Directory Structure](../build/introduction.md#directory-structure).

Finally, run the following command to install the new project’s dependencies from within the new project's directory.

::: code-tabs @tab:active yarn `shell cd PROJECT_NAME yarn install `
@tab npm `shell cd PROJECT_NAME npm install ` :::

ตอนนี้คุณได้เริ่มต้นโปรเจคแรกของ SubQuery ด้วยขั้นตอนง่ายไม่กี่ขั้นตอน Let’s now customise the standard template project for a specific blockchain of interest.

You may want to refer to the [command line arguments](../run_publish/references.md) used in SubQuery. มันช่วยให้คุณเข้าใจคำสั่งได้ดีขึ้น.

## 3. สร้างความเปลี่ยนแปลงให้กับโปรเจคของคุณ

มี 3 ไฟล์ที่สำคัญที่จำเป็นต้องถูกแก้ไข These are:

1. The GraphQL Schema in `schema.graphql`.
2. The Project Manifest in `project.yaml`.
3. The Mapping functions in `src/mappings/` directory.

SubQuery supports various blockchain networks and provides a dedicated guide for each of them. Select your preferred blockchain under 2. Specific Chains and continue the quick start guide.
