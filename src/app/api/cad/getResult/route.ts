import { NextRequest, NextResponse } from 'next/server';
import Ttorc from '@/job/ttorc/main';

export async function POST(req: NextRequest) {
  try {
    const { damaKey,resultid } = await req.json();
    

    if (!damaKey || !resultid ) {
      return NextResponse.json({ error: '缺少参数' }, { status: 400 });
    }

    const client = new Ttorc(damaKey);

    const res = await client.getResponse(resultid);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '打码失败' }, { status: 500 });
  }
}
