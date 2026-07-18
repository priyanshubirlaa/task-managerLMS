export type TaskStatus = 'Done' | 'In Progress' | 'Pending';
export type TaskPriority = 'High' | 'Medium' | 'Low';

export type Task = {
    id: number;
    title: string;
    assignee: string;
    priority: TaskPriority;
    status: TaskStatus;
    dueDate: string;
    project: string;
    description: string;
};

export type Project = {
    name: string;
    owner: string;
    focus: string;
};

export type TeamMember = {
    name: string;
    role: string;
    focus: string;
    workload: number;
};

export const initialTasks: Task[] = [
    {
        id: 1,
        title: 'Finalize onboarding flow',
        assignee: 'Ava',
        priority: 'High',
        status: 'In Progress',
        dueDate: '2026-07-22',
        project: 'Website Redesign',
        description: 'Polish onboarding copy and flow validation.'
    },
    {
        id: 2,
        title: 'Prepare sprint review',
        assignee: 'Noah',
        priority: 'Medium',
        status: 'Pending',
        dueDate: '2026-07-24',
        project: 'Operations',
        description: 'Gather sprint metrics for leadership review.'
    },
    {
        id: 3,
        title: 'Ship mobile dashboard',
        assignee: 'Mia',
        priority: 'High',
        status: 'Done',
        dueDate: '2026-07-18',
        project: 'Mobile App',
        description: 'Release the first version of the dashboard.'
    },
    {
        id: 4,
        title: 'Refine analytics charts',
        assignee: 'Liam',
        priority: 'Low',
        status: 'Pending',
        dueDate: '2026-07-27',
        project: 'Website Redesign',
        description: 'Improve chart readability and responsiveness.'
    },
    {
        id: 5,
        title: 'QA release candidate',
        assignee: 'Sophia',
        priority: 'Medium',
        status: 'In Progress',
        dueDate: '2026-07-21',
        project: 'Mobile App',
        description: 'Run regression suite and capture defects.'
    }
];

export const initialProjects: Project[] = [
    { name: 'Website Redesign', owner: 'Ava', focus: 'User experience' },
    { name: 'Mobile App', owner: 'Mia', focus: 'Performance' },
    { name: 'Operations', owner: 'Noah', focus: 'Delivery planning' }
];

export const initialTeamMembers: TeamMember[] = [
    { name: 'Ava', role: 'Product Lead', focus: 'Design system', workload: 3 },
    { name: 'Noah', role: 'Operations Manager', focus: 'Planning', workload: 2 },
    { name: 'Mia', role: 'Mobile Engineer', focus: 'App stability', workload: 4 },
    { name: 'Liam', role: 'Data Analyst', focus: 'Insights', workload: 2 },
    { name: 'Sophia', role: 'QA Specialist', focus: 'Test automation', workload: 3 }
];

export let tasksStore: Task[] = initialTasks.map((task) => ({ ...task }));
