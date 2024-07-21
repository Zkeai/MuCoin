import { NextRequest, NextResponse } from 'next/server';
import BinanceClient from '@/lib/binanceClient';

export async function POST(req: NextRequest) {
  
  try {
    const { apiKey, secretKey, asset } = await req.json();
    

    if (!apiKey || !secretKey) {
      return NextResponse.json({ error: '缺少API密钥或秘密键' }, { status: 400 });
    }

    const client = new BinanceClient(apiKey, secretKey);
    const response = await client.getAssetDetail(asset)
    return NextResponse.json(response, { status: 200 });
  } catch (error) {

    return NextResponse.json({ error: '获取上架资产详情失败' }, { status: 500 });
  }
}
