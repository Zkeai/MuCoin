import { NextRequest, NextResponse } from 'next/server';
import BinanceClient from '@/lib/binanceClient';

export async function POST(req: NextRequest) {
  try {
    const { apiKey, secretKey } = await req.json();
    

    if (!apiKey || !secretKey) {
      return NextResponse.json({ error: '缺少API密钥或秘密键' }, { status: 400 });
    }

    const client = new BinanceClient(apiKey, secretKey);
    const accountInfo = await client.getAccountInfo();
    return NextResponse.json(accountInfo, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '获取账户信息失败' }, { status: 500 });
  }
}
