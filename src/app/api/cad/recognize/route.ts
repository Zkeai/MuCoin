import { NextRequest, NextResponse } from 'next/server';
import Ttorc from '@/job/ttorc/main';

export async function POST(req: NextRequest) {
  try {
    const { damaKey } = await req.json();
    

    if (!damaKey ) {
      return NextResponse.json({ error: '缺少参数' }, { status: 400 });
    }

    const client = new Ttorc(damaKey);

    const resultid = await client.createTask();
    return NextResponse.json(resultid, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '获取账户信息失败' }, { status: 500 });
  }
}
