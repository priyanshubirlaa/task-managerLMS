import { NextResponse } from 'next/server';
import { initialProjects, initialTeamMembers, tasksStore } from '@/app/lib/mock-data';

export async function GET() {
    const summary = {
        totalTasks: tasksStore.length,
        completed: tasksStore.filter((task) => task.status === 'Done').length,
        inProgress: tasksStore.filter((task) => task.status === 'In Progress').length,
        pending: tasksStore.filter((task) => task.status === 'Pending').length
    };

    const projects = initialProjects.map((project) => {
        const projectTasks = tasksStore.filter((task) => task.project === project.name);
        return {
            ...project,
            taskCount: projectTasks.length,
            completed: projectTasks.filter((task) => task.status === 'Done').length
        };
    });

    const team = initialTeamMembers;

    return NextResponse.json({ summary, tasks: tasksStore, projects, team });
}
