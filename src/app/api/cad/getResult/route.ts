import { NextRequest, NextResponse } from 'next/server';
import Mu from '@/job/mu/main';

export async function POST(req: NextRequest) {
 
    const { damaKey,resultid } = await req.json();
    

    if (!damaKey || !resultid ) {
      return NextResponse.json({ error: '缺少参数' }, { status: 400 });
    }

    const mu = new Mu(damaKey, "1001", "d355d3bf29d3c17c463aafb0e0a5748b");

    const res = await mu.getResponse(resultid);
    return NextResponse.json(res, { status: 200 });
 
}
