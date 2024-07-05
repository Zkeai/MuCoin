import { NextRequest, NextResponse } from 'next/server';
import { RestClientV2 } from 'bitget-api'


export async function POST(req: NextRequest) {
  try {
    const { apiKey, secretKey, passphrase,coin,address,amount,chain } = await req.json();
    

    if (!apiKey || !secretKey || !passphrase) {
      return NextResponse.json({ error: '缺少API密钥或秘密键' }, { status: 400 });
    }

    const client = new RestClientV2({apiKey, apiSecret:secretKey, apiPass:passphrase });
    const response = await client.spotWithdraw({coin,address,amount,chain});
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}