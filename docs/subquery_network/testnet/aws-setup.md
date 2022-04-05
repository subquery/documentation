# Launch AWS EC2 Instance

## Preparations
### Create AWS account
Create at https://aws.amazon.com/ if you don't have aws account.

## Launch Instance

### Summary

|                |                                                                                 |     |
|----------------|---------------------------------------------------------------------------------|-----|
| Region         | ap-southeast-2 (Sydney)                                                         |     |
| Node Type      | t3.medium                                                                       |     |
| AMI            | Community AMIs: ami-0ba91a7aa45470a3e                                           |     |
| Security Group | port: 8000 & 22 accessible from local ip only<br/> port 80 & 443 open to public |     |
| Disk           | 30 GB type: gp3                                                                 |     |


Recommend t3.medium or larger that should support two subquery projects running.
