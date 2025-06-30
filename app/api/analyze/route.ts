import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const form = await request.formData();
    const actors = form.getAll('actor')
    const imitators = form.getAll('imitator')
    const count = Math.min(actors.length, imitators.length)

    const scores = Array.from({ length: count }, () => ({
        leftArm: +(Math.random().toFixed(2)),
        rightArm:  +(Math.random()).toFixed(2),
        torso:     +(Math.random()).toFixed(2),
        rightLeg:  +(Math.random()).toFixed(2),
        leftLeg:   +(Math.random()).toFixed(2),
    }))

    return NextResponse.json({ scores });


}