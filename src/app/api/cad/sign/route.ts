import { NextRequest, NextResponse } from 'next/server';
import Caduceus from '@/job/cad/main';

export async function POST(req: NextRequest) {

    const { captchaId,captchaOutput,genTime,lotNumber,passToken,key} = await req.json();
    

    if (!passToken ) {
      return NextResponse.json({ error: '缺少参数' }, { status: 400 });
    }

    const cad = new Caduceus();

    const taskId = await cad.open_jy(
        captchaId,
        captchaOutput,
        genTime,
        lotNumber,
        passToken,
        key
      );

    return NextResponse.json(taskId, { status: 200 });

}
