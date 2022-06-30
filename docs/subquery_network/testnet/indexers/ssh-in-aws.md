# How to SSH into Your AWS Instance?

It’s a quick two-step process. Follow the steps given below:

## Step 1: Get a public address

Once your AWS instance is up to date and running, click on the Instance ID and look for your Public IPv4 address. <br />

![Getting a Public Address Screen](/assets/img/public_address_running_ssh.png)


We will use this address to SSH into our instance via our command line terminal. <br />

![Instance Summary Screen_Public Address](/assets/img/instance_summary_pubad_ssh.png) <br />

## Step 2: SSH 

Run the following command

```jsx
ssh i <path_to_pem_or_cer_private_key> ec2-user@<public_address>

eg:

ssh -i sean.cer ec2-user@ec2-54-153-196-193.ap-southeast-2.compute.amazonaws.com
```
<br />

![Running Command Line](/assets/img/command_line_ssh.png)

---

### **Next Steps:**

After finishing SSH, continue to the [next step of setting up your indexer](../indexers/install-indexer-aws.html#_1-10-ssh-to-your-ec2-instance).