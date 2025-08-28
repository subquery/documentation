# Network Fair Use Principles

This is a non-exhaustive list of “fair use” rules and polices that all participants in the SubQuery Network should abide by. It shall be applied with impartial judgement by the SubQuery Council, and it is intended that these rules and polices are applied evenly and fairly to all participants.

Any changes to these rules and policies require a SMP proposal from the SubQuery Council to be ratified.

## Rule 1 - No Unfair Collusion

Participants should not work together or collude in a way that:

1. Is designed to get around restrictions or other fair use policies; or
2. Reduces the competitiveness of the network as a whole or in terms of an individual project deployment.

## Rule 2 - All Projects Should be Publicly Indexable

SubQuery Network ideally runs public projects, where the source RPC dataset is open-source and in most cases there is a publicly available RPC that any indexer can sync from. In addition, SubQuery’s indexing SDK is designed to be deterministic, that is any indexer can sync it using a publicly available RPC endpoint and have an exact mirror of the data to be able to serve to the network.

In summary, indexing a project should be permissionless.

Although the SubQuery Network supports non-deterministic or non-public project, the Foundation reserves the right to remove projects that don’t meet both of these criteria if:

1. These projects are being boosted or run in a way that results in significant network allocation rewards; or
2. There is evidence of collusion on these projects (see [Rule 1](#rule-1---no-unfair-collusion)).

## Rule 3 - Falsifying Project Health Checks

Node Operators should never falsify [Proof of Indexing](./introduction/proof-of-index.md), health checks or responses to common request (e.g. project metadata requests or current block height). These requests and health checks should always reach the actual node and represent the true state of the node.

If the Foundation detects that Node Operator is falsifying [PoI](./introduction/proof-of-index.md), request data, health checks, or any other commonly requested data to make their endpoint perform in a deceiving way, penalties will be severe.

## Rule 4 - No Unfair Project Boosting

The purpose of boosting a project is mainly for two reasons

1. Increase allocation rewards to a given project and so the reward is large enough to attract Node Operators to service it; or
2. Receive boost query rewards and so consumers can later query the project for free.

Node Operators should not boost projects that they are syncing, or collude with others to boost their projects unfairly (see [Rule 1](#rule-1---no-unfair-collusion)).

Boosters should not boost outsized amounts of tokens towards a single project, more than what a reasonable boost amount should be (compared to other projects).

## Rule 5 - Public RPC Endpoint

Usage of the Public RPC endpoints is subject to the terms described in [Terms of Service of SubQuery Network Public RPCs](https://subquery.foundation/public-rpc-terms). The Foundation may amend these Terms from time to time by posting the updated policy on our Website and/or Platform. Any changes that the Foundation makes will be posted on [this](https://subquery.foundation/public-rpc-terms) page and, where appropriate, notified to to end users by e-mail or post.

## Changelog

1. 2023-07-14 Initial commit from [SMP-2](https://forum.subquery.network/t/smp-2-draft-subquery-network-fair-use-policy/544)
