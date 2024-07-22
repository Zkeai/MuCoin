import { NextRequest, NextResponse } from 'next/server';
import Caduceus from '@/job/cad/main';

export async function POST(req: NextRequest) {
  try {
    const {taskid} = await req.json();
    

    if (!taskid ) {
      return NextResponse.json({ error: '缺少参数' }, { status: 400 });
    }

    const cad = new Caduceus();

    const taskId = await cad.task(taskid);

    return NextResponse.json(taskId, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '签到失败' }, { status: 500 });
  }
}
