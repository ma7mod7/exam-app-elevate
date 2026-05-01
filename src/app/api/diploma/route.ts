import { NextRequest, NextResponse } from "next/server";
import { getDiplomas } from "../../api/diploma/diploma.api";

export async function GET(req: NextRequest) {
    try {
        const payload = await getDiplomas(req);
        return NextResponse.json(payload, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { status: false, message: error.message || "Unauthorized" },
            { status: 401 } 
        );
    }
}