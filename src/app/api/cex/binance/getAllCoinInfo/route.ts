import { NextRequest, NextResponse } from 'next/server';
import BinanceClient from '/src/lib/binanceClient';

export async function POST(req: NextRequest) {
  try {
    const { apiKey, secretKey,coins } = await req.json();
    

    if (!apiKey || !secretKey) {
      return NextResponse.json({ error: '缺少API密钥或秘密键' }, { status: 400 });
    }

    const client = new BinanceClient(apiKey, secretKey);
    const allCoinInfo = await client.getAllCoinInfo(coins);

    return NextResponse.json(allCoinInfo, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '获取所有币信息失败' }, { status: 500 });
  }
}
