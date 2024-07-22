import { NextRequest, NextResponse } from 'next/server';
import Caduceus from '@/job/cad/main';

export async function POST(req: NextRequest) {
  try {
    const { captchaId,captchaOutput,genTime,lotNumber,passToken,inviter,key} = await req.json();
    

    if (!passToken ) {
      return NextResponse.json({ error: '缺少参数' }, { status: 400 });
    }

    const cad = new Caduceus();

    const taskId = await cad.invite_jy(
        captchaId,
        captchaOutput,
        genTime,
        lotNumber,
        passToken,
        inviter,
        key
      );

    return NextResponse.json(taskId, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '获取账户信息失败' }, { status: 500 });
  }
}
