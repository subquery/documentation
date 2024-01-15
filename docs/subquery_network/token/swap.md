# Swap kSQT for USDC

Swaps allows users to swap USDC to kSQT and vice versa.

:::info

Please note that airdropped kSQT will not be swappable by the swap contract, only kSQT received as indexing or delegation rewards can be swapped for USDC.

:::

While kSQT will not have transfer restrictions, we do not envision it as a free-float token, hence will not provide or support liquidity. kSQT will have a controlled supply that is intended to be just enough for the minimum viable network running with limited capabilities.

SubQuery will offer a basic swap mechanism for kSQT rewards (but not the airdrop itself). You will be able to use this swap mechanism to convert rewards earned via indexing and delegation into USDC at a predetermined rate. The swap contract will be seeded with just enough USDC to purchase all reward emissions over the lifetime of Kepler. This is done with the sole purpose of reimbursing infrastructure costs incurred by the Node Operators, hopefully at a profit - this exercise will allow us to calibrate reward emissions in conditions close to the real market.

The reward tokens acquired by the swap contract become available for release to potential delegators, who wish to get hold of kSQT and participate in the Kepler Network. The swap contract will also have a spread between the acquiring and releasing rates discouraging idle swapping and speculation.

## How to Swap

:::info

Only participants that have been KYC’d and registered can participate in the SubQuery Kepler Swap. You check if your account has been KYC'd and registered, please enter `/kepler-ksqt-swap-kyc <your_wallet_address>` in the `#kepler-swap-support` channel in our Discord.

If you’re new here, check out [this article](https://blog.subquery.network/kepler-milestone-your-invitation-to-join) and follow the instructions on how to join.

If you need any help, you can reach out on the `#kepler-swap-support` channel in our Discord.

:::

To swap your kSQT token rewards (note that you are not able to swap airdropped tokens), navigate to `Swap`. You can then switch between `USDC → kSQT` and `kSQT → USDC`.

![Swap UI](/assets/img/network/swap.png)

Enter your desired swap amount and click `Swap` before confirming the transaction in Metamask.

![Confirming a swap](/assets/img/network/swap_confirm.png)
