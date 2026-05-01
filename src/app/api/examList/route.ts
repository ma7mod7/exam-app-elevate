import { NextRequest, NextResponse } from "next/server";
import { getExamList } from "./examlist.api";

export async function GET(req: NextRequest) {
    try {
        const payload = await getExamList(req);
        return NextResponse.json(payload, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { status: false, message: error.message || "Unauthorized" },
            { status: 401 } 
        );
    }
}