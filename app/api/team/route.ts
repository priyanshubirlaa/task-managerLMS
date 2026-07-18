import { NextResponse } from 'next/server';
import { initialTeamMembers, type TeamMember } from '@/app/lib/mock-data';

let teamStore: TeamMember[] = initialTeamMembers.map((member) => ({ ...member }));

export async function GET() {
    return NextResponse.json(teamStore);
}

export async function POST(request: Request) {
    const body = await request.json();
    const newMember: TeamMember = {
        name: body.name,
        role: body.role,
        focus: body.focus,
        workload: Number(body.workload || 1)
    };

    teamStore = [newMember, ...teamStore];
    return NextResponse.json(newMember, { status: 201 });
}

export async function PUT(request: Request) {
    const body = await request.json();
    teamStore = teamStore.map((member) => member.name === body.name ? { ...member, ...body } : member);
    return NextResponse.json(teamStore);
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    if (!name) {
        return NextResponse.json({ error: 'Missing name' }, { status: 400 });
    }
    teamStore = teamStore.filter((member) => member.name !== name);
    return NextResponse.json({ success: true });
}
