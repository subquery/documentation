# Thuật ngữ

![terminology](/assets/img/terminology.png)

## **Phân bổ**

Hành động của Người lập chỉ mục gán SQT cho một dự án nhất định.

### **Tái phân bổ**

A combined operation of removing staked tokens from one project and immediately associating that with another project (comes into effect at the end of the next Era). This is represented/expressed as a percentage of the indexer’s bonded SQT.

## **Liên kết**

Hành động gửi SQT vào hợp đồng đặt cược toàn cầu được thực hiện bởi Người lập chỉ mục hoặc Người ủy quyền

### **Hủy liên kết**

Hành động của Người lập chỉ mục hoặc Người đại diện rút SQT khỏi hợp đồng đặt cược toàn cầu.

This is effectively a transfer of SQT from the global staking contract to the Indexer’s or Delegator’s wallet. In other words, this can be thought of as the Indexer or Delegator withdrawing part or all of their stake. Note that a lock period applies when tokens are unbonded.

## **Delegating**

Act of a Delegator assigning SQT into the global staking contract and then assigning SQT to an Indexer. Note that delegating and bonding are atomic operations.

### **Undelegating**

Act of withdrawing SQT from an Indexer at the end of an Era and then withdrawing that SQT from the global staking contract to a wallet address. This is subject to a lock period.

### **Redelegating**

Act of a Delegator reassigning SQT from one Indexer to another Indexer. Redelegating does not require tokens to be undelegated and is queued to take effect at the end of the Era.

## **Staking**

Act of an Indexer assigning tokens in a global staking contract and into the Indexer’s own contract.

### **Unstaking**

Act of an Indexer withdrawing their SQT. This triggers a 28 day “lock period”. Indexer can restake to cancel this process and return their lock period tokens to the staking contract.

### **Restaking**

Act of Indexer restaking SQT during the lock period to return locked period tokens to the staking contract.

---

## **Contract Ratio**

The sum of daily contracts value (defined as contract value/period) can not exceed a ratio with their total stake (indexer + delegator).

## **Era**

Một khoảng thời gian hoặc thời gian mà các cấu hình và cài đặt không đổi và các phép tính diễn ra. Ví dụ, trong một Chu kỳ:

- không thể thay đổi Tỷ lệ Hoa hồng của Người lập chỉ mục trong một Chu kỳ.

## **Indexer Delegation Ratio**

The amount an Indexer can “borrow” or leverage from Delegators. This ratio is yet to be determined.

## **Lock period**

A period where tokens are unbonded awaiting withdrawal. During this period, tokens do not earn any rewards. Currently, the lock period is defined as 28 days.
