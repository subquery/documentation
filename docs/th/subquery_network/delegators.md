# Delegators

:::info Delegators in Kepler

To read more specifically about being an Delegator in SubQuery's Kepler Network, please head to [Kepler - Delegators](./kepler/delegators.md)

:::

## Delegators คืออะไร

Delegator เป็นบทบาทเครือข่ายที่ไม่ใช่ด้านเทคนิคในเครือข่าย SubQuery และเป็นวิธีที่ยอดเยี่ยมในการเริ่มเข้าร่วมในเครือข่าย SubQuery บทบาทนี้ช่วยให้ Delegators สามารถ "มอบหมาย" SQT ของตนให้กับผู้จัดทำดัชนีหนึ่งรายขึ้นไปและได้รับรางวัล (คล้ายกับการปักหลัก)

หากไม่มี Delegators ตัวสร้างดัชนีมักจะได้รับรางวัลน้อยลง เพราะพวกเขาจะมี SQT น้อยกว่าในการจัดสรร ดังนั้น นักทำดัชนีจึงแข่งขันกันเพื่อดึงดูด Delegators โดยเสนอส่วนแบ่งที่แข่งขันได้ของรางวัลของ Indexer

## ข้อกำหนดในการเป็นผู้มอบสิทธิ์

หนึ่งในสิ่งที่ดีที่สุดเกี่ยวกับการเป็น Delegator คือคุณไม่จำเป็นต้องมีนักพัฒนา การเขียนโปรแกรม หรือประสบการณ์ด้านเทคนิคใดๆ ความเข้าใจพื้นฐานเกี่ยวกับ SubQuery Network คือทั้งหมดที่จำเป็นในการเป็น Delegator.

## ประโยชน์ของการเป็นตัวแทน Delegator

มีประโยชน์หลายประการในการเป็นDelegator:

- **ง่ายต่อการเริ่มต้น**: ต้องการความรู้ด้านเทคนิคเพียงเล็กน้อย Delegators จะต้องได้รับโทเค็น SQT แล้วเรียนรู้กระบวนการมอบโทเค็นให้กับตัวสร้างดัชนีที่ต้องการ
- **มีส่วนร่วมในเครือข่าย**: การมอบสิทธิ์ให้กับตัวสร้างดัชนีเป็นวิธีสนับสนุนคำขอบริการงานของตัวสร้างดัชนีไปยังผู้ใช้งาน ในทางกลับกัน Delegators จะได้รับรางวัล SQT
- **รับรางวัล**: Delegators สามารถนำ SQT ของตนไปใช้งานได้โดยมอบหมาย SQT ให้กับตัวสร้างดัชนี และรับส่วนแบ่งจากกลุ่มรางวัล
- **ไม่มีจำนวนการมอบหมายขั้นต่ำ**: ไม่มีการมอบหมายขั้นต่ำที่จำเป็นในการเป็น Delegator. ซึ่งหมายความว่าทุกคนสามารถเข้าร่วมได้ไม่ว่าจะมี SQT เท่าใด

## Delegators จะได้รับผลตอบแทนอย่างไร?

เพื่อดึงดูด Delegators ให้สนับสนุนงานของพวกเขา Indexers เสนอ Delegators แบ่งรางวัลที่พวกเขาได้รับ ตัวทำดัชนีจะโฆษณาอัตราค่าคอมมิชชันตัวสร้างดัชนี โดยที่รายได้ที่เหลือจะถูกแบ่งปันภายในกลุ่มการมอบหมาย/การถือหุ้นทั้งหมดตามสัดส่วนกับมูลค่าที่ได้รับมอบหมาย/เดิมพันแต่ละรายการในกลุ่ม

_Indexer’s Commission Rate_: This is a percentage share of the fees earned from serving requests to Consumers. ตัวสร้างดัชนีมีอิสระที่จะกำหนดอัตรานี้เป็นค่าที่ต้องการ เปอร์เซ็นต์ที่สูงขึ้นบ่งชี้ว่าผู้จัดทำดัชนีสามารถทำกำไรได้มากกว่าขึ้น เปอร์เซ็นต์ที่ต่ำกว่าบ่งชี้ว่าผู้จัดทำดัชนีแบ่งปันผลกำไรกับ Delegators ของตนมากขึ้น

Delegators จะได้รับรายได้จากการปักหลัก Eras ที่พวกเขาเป็นส่วนหนึ่งของตลอดระยะเวลาเท่านั้น ตัวอย่างเช่น หากพวกเขาเข้าร่วมยุคการปักหลักในช่วงกลางของช่วงเวลาที่เกี่ยวข้อง พวกเขาจะไม่ได้รับรายได้จากค่าธรรมเนียมการค้นหาสำหรับยุคนั้น ๆ

หากผู้จัดทำดัชนีต้องการเพิ่มอัตราค่าคอมมิชชันผู้จัดทำดัชนีที่พวกเขาเสนอให้กับDelegatorsของตน พวกเขาต้องโฆษณาสิ่งนี้ตลอดยุคการปักหลัก Indexer จะสามารถลดค่าคอมมิชชั่นของ Indexer ได้ทุกเมื่อเพื่อเพิ่ม SQT ที่ได้รับมอบหมายมากขึ้นสำหรับการ stake ในระยะสั้น Delegators สามารถถอนหรือยกเลิกการมอบหมายจำนวน stake ของตนได้ตลอดเวลา แต่พวกเขาจะริบรางวัลใดๆ ที่ได้รับภายในยุคการปักหลัก (เนื่องจากพวกเขาไม่ได้เป็นส่วนหนึ่งของกลุ่มตัวแทนตลอดระยะเวลาของยุคการปักหลัก)

## จะเลือกตัวสร้างดัชนีได้อย่างไร

You need to assess a few things when deciding on what Indexer to choose.

Indexers set an Indexer’s Commission Rate (ICR) which is the percentage Indexers earn. The remaining is then shared amongst the Indexer and all Delegators propotionally by staked/delegated amount. Therefore, a lower ICR will be more attractive for Delegators as a larger percentage of rewards is shared between Delegators.

For example, Indexer A has set an ICR of 80% and has received SQT from 8 Delegators. This means that the 8 Delegators plus the Indexer itself, will be rewarded a share of the remaining 20% of what the Indexer has earned. The share will be split proportionally between them based on the amount staked/delegated. Alternatively, if Indexer A had an ICR of 30%, then the 8 delegators and indexer would share propotionally rewwards from the remaining 70% of rewards. In short, the lower the ICR - the better it is for Delegators.

Note that Delegators must have delegated their tokens for the entire Era to be eligible for these rewards (note [Non-reward period](#non-reward-period)).

Additionally, we've made it easier for you to see other data about all indexers in our app. Navigate to `Delegator` > `Indexers` and view the [leaderboard](https://kepler.subquery.network/delegator/indexers/top) which shows various scores and details that we think are important to you when deciding what indexer to choose. The Indexer Score takes into account an Indexer’s uptime, slashing events, and other parameters.

## Non-reward period

Besides the period when Delegators can effectively earn money, a non-reward period also occurs. Delegators receive rewards for staking Eras that they were a part of for the entire duration. For example, if a Delegator joins a staking era halfway through, they will not earn any rewards for that particular era.

Delegators can change the indexer that their SQT is delegated to (called redelegating), this change will be queued to happen automatically at the end of the the Era and no thawing period will occur.

If a Delegator decides to undelegate their SQT, a 28 day thawing period starts. The tokens cannot be used during this period, no fees can be accrued or any reward gained.

## วัฏจักรการ Delegation

Delegators มอบหมาย (ฝาก) SQT เข้าสู่สัญญาของ Indexe

จากนั้น Delegators สามารถตัดสินใจว่าจะมอบสิทธิ์ให้ผู้จัดทำดัชนีแต่ละคนจำนวนเท่าใดก็ได้ตามที่ตนเลือก

Delegator สามารถยกเลิกการมอบหมาย (ถอน) โทเค็นกลับไปที่กระเป๋าเงินของพวกเขา การดำเนินการนี้จะทริกเกอร์ระยะเวลาล็อก 28 วัน

หลังจากสิ้นสุดระยะเวลาการปลดล็อกแล้ว โทเค็นจะสามารถถอนออก/รับสิทธิ์ได้

## ความเสี่ยงของการเป็น Delegator

แม้ว่าจะไม่ถือว่าเป็นบทบาทที่เสี่ยง แต่การเป็นDelegatorก็มีความเสี่ยงบางประการที่ต้องระวัง

1. ความเสี่ยงจากความผันผวนของตลาด: ความผันผวนอย่างต่อเนื่องในตลาดเป็นความเสี่ยงที่ส่งผลกระทบไม่เพียงแค่ SQT แต่รวมถึงโทเค็นทั้งหมดในตลาดสกุลเงินดิจิทัลทั่วไป การใช้แนวทางระยะยาวสามารถลดความเสี่ยงประเภทนี้ได้
2. การปรับค่าพารามิเตอร์การ stake อย่างต่อเนื่องโดยตัวสร้างดัชนีและค่าธรรมเนียมการมอบหมายสามารถเพิ่มความเสี่ยงให้กับ Delegator ตัวอย่างเช่น Delegator อาจพลาดการเปลี่ยนแปลงในพารามิเตอร์การปักหลักส่งผลให้ได้ผลตอบแทนน้อยกว่าที่คาดไว้ เพื่อลดความเสี่ยงนี้ เมื่อผู้จัดทำดัชนีลดพารามิเตอร์สเตคของตน จะมีผลก็ต่อเมื่อสิ้นสุด Era ถัดไปเต็มเท่านั้น โดยให้เวลา Delegators ในการประเมินและทำการเปลี่ยนแปลงใดๆ
3. ตัวสร้างดัชนีมีประสิทธิภาพต่ำ: เป็นไปได้ที่ Delegators สามารถเลือกตัวสร้างดัชนีที่ทำงานได้ไม่ดี ดังนั้นจึงให้ผลตอบแทนจากการลงทุนที่ต่ำกว่ามาตรฐานแก่ Delegators Delegators จึงได้รับการสนับสนุนให้ทำตัวทำดัชนีมีความขยันหมั่นเพียรเพื่องานที่มีศักยภาพ นอกจากนี้ยังมีดัชนีชื่อเสียงเพื่อช่วย Delegators เปรียบเทียบ Indexers ซึ่งกันและกัน

เมื่อพบตัวทำดัชนีที่ต้องการแล้ว ควรทำการตรวจสอบสถานะเพื่อตรวจสอบชื่อเสียงและความน่าเชื่อถือของตัวทำดัชนี การประเมินสามารถทำได้เพื่อประเมินว่าตัวสร้างดัชนีมีการใช้งานอยู่ในชุมชนหรือไม่ ถ้าตัวทำดัชนีช่วยสมาชิกคนอื่น ๆ หากเป็นไปได้ที่จะติดต่อกับตัวสร้างดัชนี และตัวสร้างดัชนีมีการอัปเดตโปรโตคอลและโครงการล่าสุดหรือไม่ The aforementioned Reputation Index can also serve as a primary selection indicator.
