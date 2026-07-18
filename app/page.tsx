"use client";

import { useEffect, useMemo, useState } from 'react';

type Task = {
    id: number;
    title: string;
    assignee: string;
    priority: 'High' | 'Medium' | 'Low';
    status: 'Done' | 'In Progress' | 'Pending';
    dueDate: string;
    project: string;
};

type DashboardData = {
    summary: { totalTasks: number; completed: number; inProgress: number; pending: number; };
    tasks: Task[];
};

export default function HomePage() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [statusFilter, setStatusFilter] = useState<'All' | Task['status']>('All');
    const [priorityFilter, setPriorityFilter] = useState<'All' | Task['priority']>('All');

    useEffect(() => {
        const load = async () => {
            const res = await fetch('/api/dashboard');
            const json = await res.json();
            setData(json);
        };
        load();
    }, []);

    const filteredTasks = useMemo(() => {
        if (!data) return [];
        return data.tasks.filter((task) => {
            const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
            const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
            return matchesStatus && matchesPriority;
        });
    }, [data, statusFilter, priorityFilter]);

    if (!data) return <main className="container"><div className="card">Loading dashboard…</div></main>;

    return (
        <main className="container">
            <section className="card">
                <div className="row" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
                    <div>
                        <h1 style={{ margin: '0 0 6px' }}>Task Manager Dashboard</h1>
                        <p style={{ margin: 0, color: '#9ca3af' }}>Visual overview of task progress, priorities, and ownership.</p>
                    </div>
                    <div className="row">
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)}>
                            <option value="All">All Status</option>
                            <option value="Done">Done</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Pending">Pending</option>
                        </select>
                        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value as any)}>
                            <option value="All">All Priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                </div>

                <div className="stats" style={{ marginBottom: 16 }}>
                    <div className="stat"><strong>{data.summary.totalTasks}</strong><div>Total Tasks</div></div>
                    <div className="stat"><strong>{data.summary.completed}</strong><div>Completed</div></div>
                    <div className="stat"><strong>{data.summary.inProgress}</strong><div>In Progress</div></div>
                    <div className="stat"><strong>{data.summary.pending}</strong><div>Pending</div></div>
                </div>

                <div className="grid grid-2">
                    <div className="card">
                        <h3 style={{ marginTop: 0 }}>Projects Overview</h3>
                        <ul>
                            {['Website Redesign', 'Mobile App', 'Operations'].map((project, index) => (
                                <li key={project} style={{ marginBottom: 8 }}>
                                    {project} — {data.tasks.filter((task) => task.project === project).length} task(s)
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="card">
                        <h3 style={{ marginTop: 0 }}>Priority Breakdown</h3>
                        <ul>
                            {['High', 'Medium', 'Low'].map((priority) => (
                                <li key={priority} style={{ marginBottom: 8 }}>
                                    {priority}: {data.tasks.filter((task) => task.priority === priority).length}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="card" style={{ marginTop: 16 }}>
                <h2 style={{ marginTop: 0 }}>Task List</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Assignee</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Due</th>
                            <th>Project</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.title}</td>
                                <td>{task.assignee}</td>
                                <td>{task.priority}</td>
                                <td><span className={`badge ${task.status === 'Done' ? 'done' : task.status === 'In Progress' ? 'progress' : 'pending'}`}>{task.status}</span></td>
                                <td>{task.dueDate}</td>
                                <td>{task.project}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}
