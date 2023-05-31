# Swap kSQT for USDC

Swaps allows users to swap USDC to kSQT and vice versa.

:::info
Please note that airdropped kSQT will not be swappable by the swap contract, only kSQT received as indexing or delegation rewards can be swapped for USDC.
:::

While kSQT will not have transfer restrictions, we do not envision it as a free-float token, hence will not provide or support liquidity. kSQT will have a controlled supply that is intended to be just enough for the minimum viable network running with limited capabilities.

SubQuery will offer a basic swap mechanism for kSQT rewards (but not the airdrop itself). You will be able to use this swap mechanism to convert rewards earned via indexing and delegation into USDC at a predetermined rate. The swap contract will be seeded with just enough USDC to purchase all reward emissions over the lifetime of Kepler. This is done with the sole purpose of reimbursing infrastructure costs incurred by the indexers, hopefully at a profit - this exercise will allow us to calibrate reward emissions in conditions close to the real market.

The reward tokens acquired by the swap contract become available for release to potential delegators, who wish to get hold of kSQT and participate in the Kepler Network. The swap contract will also have a spread between the acquiring and releasing rates discouraging idle swapping and speculation.

## How to Swap

To swap your kSQT token rewards (note that you are not able to swap airdropped tokens), navigate to `Swap`. You can then switch between `USDC → kSQT` and `kSQT → USDC`.

![Swap UI](/assets/img/swap1.png)

Enter your desired swap amount and click `Swap` before confirming the transaction in Metamask.

![Confirming a swap](/assets/img/swap2.png)
