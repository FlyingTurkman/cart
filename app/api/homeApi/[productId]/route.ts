import { NextRequest, NextResponse } from "next/server";









export async function GET(req: NextRequest) {

    return NextResponse.json('true')
}




// update for cart
export async function POST(req: NextRequest, { params }: { params: Promise<{ productId: string }> }) {

    try {
        

        const body = await req.json()

        const { productId } = await params
        
        console.log('req', body.count, productId)

        return NextResponse.json(JSON.stringify(null), { status: 200 })
    } catch (error) {
        console.log('Error: ', error)

        return NextResponse.json(JSON.stringify(null), { status: 400, statusText: 'test' })
    }
}