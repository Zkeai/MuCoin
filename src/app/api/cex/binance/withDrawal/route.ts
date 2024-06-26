import { NextRequest, NextResponse } from 'next/server';
import BinanceClient from '/src/lib/binanceClient';

export async function POST(req: NextRequest) {
  const { apiKey, secretKey, coin, address, amount, network} = await req.json();

  try {

    

    if (!apiKey || !secretKey || !coin || !amount || !address) {
      return NextResponse.json({ error: '缺少参数' }, { status: 400 });
    }

    const client = new BinanceClient(apiKey, secretKey);
    const accountInfo = await client.getWithDrawa(coin,address,amount,network);
 
    return NextResponse.json(accountInfo, { status: 200 });
  } catch (error) {
    
    return NextResponse.json({ error: error }, { status: 500 });
  }
}