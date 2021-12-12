# การมีส่วนร่วมใน SubQuery

ยินดีต้อนรับและขอขอบคุณเป็นอย่างยิ่งที่สนใจที่จะเข้าร่วมในโปรเจ็กต์ SubQuery นี้! ด้วยความร่วมมือกัน เราจะสามารถปูทางไปสู่อนาคตที่มีการกระจายอำนาจมากขึ้น

> This documentation is actively maintained by the SubQuery team. เอกสารนี้ได้รับการดูแลอย่างกระตือรือร้นโดยทีม SubQuery เรายินดีรับความช่วยเหลือของคุณ คุณสามารถทำได้โดย fork โปรเจ็กต์ GitHub ของเรา และทำการเปลี่ยนแปลงไฟล์ markdown ของเอกสารทั้งหมดภายใต้ไดเร็กทอรี `docs`

What follows is a set of guidelines (not rules) for contributing to SubQuery. Following these guidelines will help us make the contribution process easy and effective for everyone involved. It also communicates that you agree to respect the time of the developers managing and developing this project. In return, we will reciprocate that respect by addressing your issue, considering changes, collaborating on improvements, and helping you finalise your pull requests.

## Code of Conduct

เราให้ความสำคัญกับโปรเจ็กต์โอเพนซอร์สและความรับผิดชอบของชุมชนอย่างจริงจัง และยึดถือตนเองและผู้มีส่วนร่วมอื่นๆให้มีมาตรฐานระดับสูงในการสื่อสาร การเข้าร่วมและมีส่วนร่วมในโปรเจ็กต์นี้แสดงว่าคุณตกลงที่จะรักษา [Code of Conduct](https://github.com/subquery/subql/blob/contributors-guide/CODE_OF_CONDUCT.md) ของเรา By participating and contributing to this project, you agree to uphold our [Code of Conduct](https://github.com/subquery/subql/blob/contributors-guide/CODE_OF_CONDUCT.md).

## เริ่มต้น

การมีส่วนร่วมใน repositories ของเราถูกดำเนินการผ่าน Issues และ Pull Requests (PRs) หลักเกณฑ์ทั่วไปบางประการซึ่งครอบคลุมทั้ง: A few general guidelines that cover both:

* ค้นหา Issues และ PR ที่มีอยู่ก่อนสร้าง Issues ของคุณเอง
* เราทำงานอย่างหนักเพื่อให้แน่ใจว่า issues จะได้รับการจัดการโดยทันที แต่อาจใช้เวลาสักครู่ในการตรวจสอบหาสาเหตุ ทั้งนี้ขึ้นอยู่กับต้นเหต การใช้ @ mention ที่เป็นมิตรในชุดข้อความความคิดเห็นถึงผู้ส่งหรือผู้ร่วมให้ข้อมูลสามารถช่วยดึงดูดความสนใจได้หาก issue ของคุณยังไม่ได้รับการแก้ไข้ A friendly @ mention in the comment thread to the submitter or a contributor can help draw attention if your issue is blocking.

## วิธีการมีส่วนร่วม

### การรายงานข้อบกพร่อง

Bugs are tracked as GitHub issues. มีการติดตาม bugs ด้วย GitHub issues ในขณะที่บันทึก issue ให้อธิบายปัญหาและใส่รายละเอียดเพิ่มเติมต่างๆ เพื่อช่วยผู้ดูแลในการจำลองการเกิดปัญหาขึ้นมาใหม่:

* ตั้งชื่อ issue ที่ชัดเจนและสื่อความหมายเพื่อระบุปัญหา
* อธิบายขั้นตอนที่แน่นอนในการทำให้เกิดปัญหานี้ซ้ำ
* อธิบายอาการที่คุณสังเกตเห็นหลังจากทำตามขั้นตอนต่างๆ
* อธิบายว่าคุณคาดว่าจะเห็นผลลัพธ์ใดแทนและเพราะเหตุใด
* รวมภาพหน้าจอด้วย ถ้าเป็นไปได้

### การส่ง Pull Requests

โดยทั่วไปแล้ว เราปฏิบัติตามเวิร์กโฟลว์ Git "fork-and-pull"

* fork repository ไปยังบัญชี Github ของคุณเอง
* clone โปรเจ็กต์มายังเครื่องของคุณ
* สร้าง branch แบบ local ด้วยชื่อที่กระชับแต่สื่อความหมาย
* commit changes ไปยัง branch
* ปฏิบัติตาม format และแนวทางการทดสอบเฉพาะสำหรับ repo นี้
* push changes ไปที่ที่คุณ fork มา
* เปิด PR ใน repository ของเรา

## ข้อตกลงในการเขียนโค้ด

### ข้อความในการทำ Git Commit

* ใช้ present tense ("Add feature" ไม่ใช่ "Added feature")
* ใช้ประโยคแบบ imperative ("Move cursor to..." Moves cursor to...")
* จำกัดบรรทัดแรกไม่เกิน 72 ตัวอักษร

### แนวทางรูปแบบสำหรับ JavaScript

* โค้ด JavaScript ทั้งหมดถูกครอบด้วย Prettier และ ESLint
