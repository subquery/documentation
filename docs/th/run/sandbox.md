# The Sandbox

ในสถานการณ์การใช้งานที่คาดการณ์ไว้ โหนด SubQuery มักจะถูกเรียกใช้โดยโฮสต์ที่เชื่อถือได้ และรหัสของโปรเจ็กต์ SubQuery ที่ผู้ใช้ส่งไปยังโหนดนั้นไม่น่าเชื่อถือโดยสิ้นเชิง

Some malicious code is likely to attack the host or even compromise it, and cause damage to the data of other projects in the same host. Therefore, we use the [VM2](https://www.npmjs.com/package/vm2) sandbox secured mechanism to reduce risks. This:

- Runs untrusted code securely in an isolated context and malicious code will not access the network and file system of the host unless through the exposed interface we injected into the sandbox.

- Securely calls methods and exchanges data and callbacks between sandboxes.

- Is immune to many known methods of attack.


## Restriction

- To limit access to certain built-in modules, only `assert`, `buffer`, `crypto`,`util` and `path` are whitelisted.

- We support [3rd party modules](../create/mapping.md#third-party-libraries) written in **CommonJS** and **hybrid** libraries like `@polkadot/*` that use ESM as default.

- Any modules using `HTTP` and `WebSocket` are forbidden.
