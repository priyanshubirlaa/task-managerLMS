import { NextResponse } from 'next/server';
import { tasksStore, type Task } from '@/app/lib/mock-data';

export async function GET() {
    return NextResponse.json(tasksStore);
}

export async function POST(request: Request) {
    const body = await request.json();
    const newTask: Task = {
        id: Date.now(),
        title: body.title,
        assignee: body.assignee,
        priority: body.priority || 'Medium',
        status: body.status || 'Pending',
        dueDate: body.dueDate,
        project: body.project,
        description: body.description || ''
    };

    tasksStore.unshift(newTask);
    return NextResponse.json(newTask, { status: 201 });
}
