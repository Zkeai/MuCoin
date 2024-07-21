import { ethers } from "ethers";
import Web3 from "web3";

class Cad {
  private baseUrl: string;
  private web3: Web3;

  constructor() {
    this.baseUrl = "https://mint.caduceus.foundation/api/v2";
    this.web3 = new Web3("https://pegasus.rpc.caduceus.foundation");
  }

  async signInviteMessage(inviteAddress: string, address: string): Promise<string> {
    try {
      const msg = b(inviteAddress + address);
      const RZ = "0x73eafab85f7c58cebf8fda3a77933f086cba5ac42f63182934622e85cba078d5";

      const sigObj = await this.web3.eth.accounts.sign(msg, RZ);
      const signature = sigObj.signature;
      return signature;
    } catch (error) {
      throw new Error("Error signing message: " + (error as Error).message);
    }
  }

  async signMessageOpen(privateKey: string, timestamp: number): Promise<string> {
    try {
      const wallet = this.web3.eth.accounts.privateKeyToAccount(privateKey);
      const address = wallet.address.toLowerCase();
      const re = `userAddress=${address}&timestamp=${timestamp}`;
      const J = await this.web3.eth.accounts.sign(re, privateKey);
      return J.signature;
    } catch (error) {
      throw new Error("Error signing message: " + (error as Error).message);
    }
  }

  async open(token: string, privateKey: string): Promise<string | undefined> {
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const signature = await this.signMessageOpen(privateKey, timestamp);
      const wallet = this.web3.eth.accounts.privateKeyToAccount(privateKey);
      const address = wallet.address.toLowerCase();

      const data = {
        userAddress: address,
        timestamp: timestamp,
        signature: signature,
      };

      const response = await fetch("https://mint.caduceus.foundation/api/v2/lottery", {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "zh,zh-CN;q=0.9,en;q=0.8",
          "cache-control": "no-cache",
          "content-type": "application/json",
          pragma: "no-cache",
          priority: "u=1, i",
          "r-token": token,
          cookie: "selectWallet=OKX",
          Referer: "https://mint.caduceus.foundation/",
          "Referrer-Policy": "origin",
        },
        body: JSON.stringify(data),
        method: "POST",
      });

      const responseData = await response.json();
      return responseData.taskId;
    } catch (error) {
      console.error("Error during login:", (error as Error).message);
      return undefined;
    }
  }

  async task(taskId: string): Promise<string | undefined> {
    let times = 0;
    while (times < 120) {
      try {
        const response = await fetch("https://mint.caduceus.foundation/api/v2/lottery/status?taskId=" + taskId, {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "zh,zh-CN;q=0.9,en;q=0.8",
            "cache-control": "no-cache",
            pragma: "no-cache",
            priority: "u=1, i",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            cookie: "selectWallet=OKX",
            Referer: "https://mint.caduceus.foundation/",
            "Referrer-Policy": "origin",
          },
          body: null,
          method: "GET",
        });

        const result = await response.json();

        if (result.data.status === 2) {
          return "[木鱼提示]签到成功";
        }
      } catch (error) {
        console.log(error);
      }
      times += 2;
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 等待2秒钟
    }
    return undefined;
  }

  async invite(token: string, inviter: string, privateKey: string): Promise<any> {
    const wallet = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    const invitee = wallet.address.toLowerCase();

    try {
      const signature = await this.signInviteMessage(inviter, invitee);

      const data = {
        inviter: inviter,
        invitee: invitee,
        signature: signature,
      };

      const response = await fetch("https://mint.caduceus.foundation/api/v1/user/invite", {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "zh,zh-CN;q=0.9,en;q=0.8",
          "cache-control": "no-cache",
          "content-type": "application/json",
          pragma: "no-cache",
          priority: "u=1, i",
          "r-token": token,
          "sec-ch-ua": '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          cookie: "selectWallet=OKX",
          Referer: "https://mint.caduceus.foundation/",
          "Referrer-Policy": "origin",
        },
        body: JSON.stringify(data),
        method: "POST",
      });

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error during invite:", (error as Error).message);
      return undefined;
    }
  }
}

function b(T: string): string {
  const I: string[] = [];
  for (let S = 0; S < T.length; S++) I.push(T[S]);
  let k = "";
  while (I.length > 0) k += I.pop();
  return k;
}

export default Cad;