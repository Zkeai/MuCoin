import { NextRequest, NextResponse } from 'next/server';
import Mu from '@/job/Mu/main';

export async function POST(req: NextRequest) {

    const { damaKey } = await req.json();
    

    if (!damaKey ) {
      return NextResponse.json({ error: '缺少参数' }, { status: 400 });
    }

    const mu = new Mu(damaKey, "1001", "d355d3bf29d3c17c463aafb0e0a5748b");

    const resultid = await mu.createTask();
    return NextResponse.json(resultid, { status: 200 });

}
