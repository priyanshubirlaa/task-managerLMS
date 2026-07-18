"use client";

import { useEffect, useState } from 'react';

type ProjectSummary = {
    name: string;
    owner: string;
    focus: string;
    taskCount: number;
    completed: number;
};

export default function ProjectsPage() {
    const [projects, setProjects] = useState<ProjectSummary[]>([]);

    useEffect(() => {
        const load = async () => {
            const res = await fetch('/api/dashboard');
            const data = await res.json();
            setProjects(data.projects);
        };
        load();
    }, []);

    return (
        <main className="container">
            <section className="card">
                <h1 style={{ marginTop: 0 }}>Projects</h1>
                <p style={{ color: '#9ca3af' }}>Track the initiatives driving delivery and progress.</p>
            </section>

            <section className="grid grid-3" style={{ marginTop: 16 }}>
                {projects.map((project) => {
                    const progress = project.taskCount ? Math.round((project.completed / project.taskCount) * 100) : 0;
                    return (
                        <div key={project.name} className="card">
                            <h3 style={{ marginTop: 0 }}>{project.name}</h3>
                            <p style={{ color: '#9ca3af', marginTop: 0 }}>{project.focus}</p>
                            <div className="row" style={{ marginBottom: 8 }}>
                                <span className="badge secondary">Owner: {project.owner}</span>
                            </div>
                            <div>Tasks: {project.taskCount}</div>
                            <div>Completed: {project.completed}</div>
                            <div style={{ marginTop: 10 }}>
                                <div style={{ height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.1)' }}>
                                    <div style={{ width: `${progress}%`, height: '100%', borderRadius: 999, background: '#34d399' }} />
                                </div>
                                <div style={{ marginTop: 6, fontSize: 13 }}>{progress}% complete</div>
                            </div>
                        </div>
                    );
                })}
            </section>
        </main>
    );
}
