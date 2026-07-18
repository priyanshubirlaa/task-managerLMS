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

export async function PUT(request: Request) {
    const body = await request.json();
    const index = tasksStore.findIndex((task) => task.id === body.id);
    if (index === -1) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    tasksStore[index] = { ...tasksStore[index], ...body };
    return NextResponse.json(tasksStore[index]);
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));
    if (!id) {
        return NextResponse.json({ error: 'Missing task id' }, { status: 400 });
    }

    const filteredTasks = tasksStore.filter((task) => task.id !== id);
    filteredTasks.forEach((task, index) => {
        tasksStore[index] = task;
    });
    tasksStore.length = filteredTasks.length;
    return NextResponse.json({ success: true });
}
