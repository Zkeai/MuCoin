import { ethers } from "ethers";
import { generateRandomString } from "../../lib/utils";

interface LoginData {
  hostname: string;
  message: string;
  signature?: string;
}

interface LoginResponse {
  ok: boolean;
  data: {
    is_login: boolean;
    login_type: string;
    id: string;
    hostname: string;
    bounded_wallet: string;
    username: string;
    avatar_url: string | null;
    referral_code: string;
    referral_user_id: string | null;
  };
}

interface PointResponse {
  ok: boolean;
  points: number;
  experience: number;
}
interface UpdateResponse {
  ok: boolean;
}

class Newland {
  private baseUrl: string;
  private walletFromPrivateKey: ethers.Wallet;

  constructor(privateKey: string) {
    this.baseUrl = "https://www.newland.club/api";
    this.walletFromPrivateKey = new ethers.Wallet(privateKey);
  }

  async signMessage(message: string): Promise<string> {
    try {
      const signature = await this.walletFromPrivateKey.signMessage(message);
      return signature;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error signing message: " + error.message);
      } else {
        throw new Error("Unknown error signing message");
      }
    }
  }

  async getNonce(): Promise<string> {
    const response = await fetch(`${this.baseUrl}/user/fetch_nonce_api`, {
      method: "POST",
      credentials: "include", // Ensure cookies are included in the request
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.text();
    return responseData;
  }

  async login(nonce: string): Promise<LoginResponse | undefined> {
    const address = this.walletFromPrivateKey.address;
    const issuedAt = new Date().toISOString();
    const messageData = `www.newland.club wants you to sign in with your Ethereum account:\n${address}\n\nSign in your wallet to new-land \n\nURI: https://www.newland.club\nVersion: 1\nChain ID: 1\nNonce: ${nonce}\nIssued At: ${issuedAt}`;

    try {
      const signature = await this.signMessage(messageData);
      const data: LoginData = {
        hostname: "https://www.newland.club",
        message: messageData,
        signature: signature,
      };

      const response = await fetch(`${this.baseUrl}/user/wallet_login_api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const responseData: LoginResponse = await response.json();
      return responseData;
    } catch (error) {
      if (error instanceof Error) {

      } else {

      }
    }
  }

  // 签到
  async dailyCheck(year: string, month: string): Promise<PointResponse | undefined> {
    try {
      const response = await fetch(`${this.baseUrl}/missions/daily_check_api`, {
        method: "POST",
        credentials: "include",
      });
      const responseData: PointResponse = await response.json();
      return responseData;
    } catch (error) {
      if (error instanceof Error) {

      } else {
  
      }
    }
  }

  // 修改名字
  async updateName(userid: string): Promise<UpdateResponse> {
    const name = generateRandomString(12);
    const response = await fetch(`${this.baseUrl}/user/update_username_api`, {
      body: `{\"username\":\"${name}\",\"user_id\":\"${userid}\"}`,
      method: "POST",
      credentials: "include",
    });
    const responseData: UpdateResponse = await response.json();
    return responseData;
  }

  // 修改头像
  async updateAvatar(userid: string): Promise<UpdateResponse> {
    const response = await fetch(`${this.baseUrl}/user/update_avatar_api`, {
      headers: {
        accept: "*/*",
        "accept-language": "zh,zh-CN;q=0.9,en;q=0.8",
        "cache-control": "no-cache",
        "content-type": "text/plain;charset=UTF-8",
        pragma: "no-cache",
        priority: "u=1, i",
        "sec-ch-ua": '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      referrer: "https://www.newland.club/user/pts",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: `{\"avatar_url\":\"https://guneiblzlyekrxabkgmk.supabase.co/storage/v1/object/public/avatars/95504a6d-3049-4fc1-8d9a-2bb313ace47c/643e2f7e-468f-419b-97f0-a8b68faec135avatarProfile.png\",\"user_id\":\"${userid}\"}`,
      method: "POST",
      mode: "cors",
      credentials: "include",
    });
    const responseData: UpdateResponse = await response.json();
    return responseData;
  }

  // 查询积分
  async getReward(userid: string): Promise<PointResponse> {
    const response = await fetch(`${this.baseUrl}/reward/get_user_reward_api`, {
      body: `{\"user_id\":\"${userid}\"}`,
      method: "POST",
      credentials: "include",
    });
    const responseData: PointResponse = await response.json();
    return responseData;
  }
}

export default Newland;