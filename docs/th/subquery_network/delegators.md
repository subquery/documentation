# Delegators

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

*อัตราค่าคอมมิชชันของผู้จัดทำดัชนี*: นี่คือส่วนแบ่งร้อยละของค่าธรรมเนียมที่ได้รับจากคำขอให้บริการแก่ผู้ใช้งาน ตัวสร้างดัชนีมีอิสระที่จะกำหนดอัตรานี้เป็นค่าที่ต้องการ เปอร์เซ็นต์ที่สูงขึ้นบ่งชี้ว่าผู้จัดทำดัชนีสามารถทำกำไรได้มากกว่าขึ้น เปอร์เซ็นต์ที่ต่ำกว่าบ่งชี้ว่าผู้จัดทำดัชนีแบ่งปันผลกำไรกับ Delegators ของตนมากขึ้น

Delegators จะได้รับรายได้จากการปักหลัก Eras ที่พวกเขาเป็นส่วนหนึ่งของตลอดระยะเวลาเท่านั้น ตัวอย่างเช่น หากพวกเขาเข้าร่วมยุคการปักหลักในช่วงกลางของช่วงเวลาที่เกี่ยวข้อง พวกเขาจะไม่ได้รับรายได้จากค่าธรรมเนียมการค้นหาสำหรับยุคนั้น ๆ

If an Indexer wishes to increase the Indexer Commission Rate that they offer to their Delegators, they must advertise this for an entire staking Era . The Indexer will be able to decrease their Indexer Commission Rate at any point to raise more delegated SQT for staking in the short term. Delegators can withdraw or undelegate their staked amount at any time, but they will forfeit any rewards earned within the staking Era (as they were not part of the delegation pool for the entire duration of the staking Era).

## Risks of being a Delegator

Even though it is not considered a risky role, being a Delegator includes a few risks to be aware of.

1. Market volatility risk: The constant fluctuations in the market is a risk that affects not just SQT, but all tokens in the general cryptocurrency marketplace. Taking a long term approach can reduce this type of risk.
2. Constant adjustments of staking parameters by Indexers and delegation fees can increase the risk to a Delegator. For example, a Delegator might miss a change in staking parameters resulting in a less than expected return. To reduce this risk, when Indexers decrease their stake parameters, it will only take effect after the next full Era has been completed, giving time for delegators to assess and make any changes.
3. Indexer poor performance: It is possible that Delegators can select Indexers that perform poorly and therefore provide a substandard return on investment to Delegators. Delegators are therefore encouraged to do Indexer due diligence on potential Indexers. A Reputation Index is also available to help Delegators compare Indexers to each other.

## How to select Indexers?

Delegators can select potential Indexers based on a *Reputation Index* or RI. This RI takes into account an Indexer’s uptime, indexer commission rate, slashing events, and Indexer parameter change frequency.

SubQuery will launch the official RI soon, but we expect other delegation applications to calculate and release their own.

## Non-reward period

Besides the period when Delegators can effectively earn money, a non-reward period also occurs. Delegators receive rewards for staking Eras that they were a part of for the entire duration. For example, if a Delegator joins a staking era halfway through, they will not earn any rewards for that particular era.

Delegators can change the indexer that their SQT is delegated to (called redelegating), this change will be queued to happen automatically at the end of the the Era and no thawing period will occur.

If a Delegator decides to undelegate their SQT, a 28 day thawing period starts. The tokens cannot be used during this period, no fees can be accrued or any reward gained.

## Indexer due diligence for Delegators

Once a preferred Indexer(s) is found, due diligence should be performed to check an Indexer’s reputation and reliability. Assessments could be performed to evaluate if the Indexer is active in the community, if the Indexer helps other members, if it is possible to get in touch with the Indexer, and if the Indexer is up-to-date with protocol and project updates.

## Delegation Lifecycle

Delegators delegate (deposit) SQT into an Indexer’s contract.

Delegators can then decide how much to redelegate to each Indexer of their choice.

Delegator can undelegate (withdraw) tokens back to their wallet. This will trigger a lock period of 28 days.

After the unlocking period has been completed, tokens become available for withdrawal/claim.
