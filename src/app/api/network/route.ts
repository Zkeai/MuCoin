import { NextRequest, NextResponse } from 'next/server';
import dns from 'dns';


export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    
    dns.lookup(url,(err)=>{
        if (err && err.code === 'ENOTFOUND') {
          return NextResponse.json({ isConnected: false }, { status: 200 });
      } else {
        return NextResponse.json({ isConnected: true }, { status: 200 });
      }
    })
    
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}