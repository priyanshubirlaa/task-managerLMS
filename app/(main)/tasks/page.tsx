"use client";

import { useEffect, useMemo, useState } from 'react';
import type { Task, TaskPriority, TaskStatus } from '@/app/lib/mock-data';

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [statusFilter, setStatusFilter] = useState<'All' | TaskStatus>('All');
    const [priorityFilter, setPriorityFilter] = useState<'All' | TaskPriority>('All');
    const [form, setForm] = useState({
        title: '',
        assignee: '',
        priority: 'Medium' as TaskPriority,
        status: 'Pending' as TaskStatus,
        dueDate: '',
        project: '',
        description: ''
    });

    useEffect(() => {
        const load = async () => {
            const res = await fetch('/api/tasks');
            const data = await res.json();
            setTasks(data);
        };
        load();
    }, []);

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
            const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
            return matchesStatus && matchesPriority;
        });
    }, [tasks, statusFilter, priorityFilter]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });
        const createdTask = await res.json();
        setTasks((current) => [createdTask, ...current]);
        setForm({ title: '', assignee: '', priority: 'Medium', status: 'Pending', dueDate: '', project: '', description: '' });
    };

    return (
        <main className="container">
            <section className="card">
                <div className="row" style={{ justifyContent: 'space-between' }}>
                    <div>
                        <h1 style={{ margin: '0 0 6px' }}>Task Planner</h1>
                        <p style={{ margin: 0, color: '#9ca3af' }}>Create new work and keep priorities in view.</p>
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
            </section>

            <section className="grid grid-2" style={{ marginTop: 16 }}>
                <div className="card">
                    <h3 style={{ marginTop: 0 }}>Add a New Task</h3>
                    <form onSubmit={handleSubmit} className="form-grid">
                        <input placeholder="Task title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                        <input placeholder="Assignee" value={form.assignee} onChange={(e) => setForm({ ...form, assignee: e.target.value })} required />
                        <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value as TaskPriority })}>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as TaskStatus })}>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                        <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} required />
                        <input placeholder="Project" value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} required />
                        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
                        <button type="submit">Create Task</button>
                    </form>
                </div>

                <div className="card">
                    <h3 style={{ marginTop: 0 }}>Current Tasks</h3>
                    <div className="stack">
                        {filteredTasks.map((task) => (
                            <div key={task.id} className="task-item">
                                <div style={{ fontWeight: 700 }}>{task.title}</div>
                                <div style={{ color: '#9ca3af', fontSize: 14 }}>{task.assignee} • {task.project}</div>
                                <div className="row" style={{ marginTop: 8 }}>
                                    <span className={`badge ${task.status === 'Done' ? 'done' : task.status === 'In Progress' ? 'progress' : 'pending'}`}>{task.status}</span>
                                    <span className="badge secondary">{task.priority}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
