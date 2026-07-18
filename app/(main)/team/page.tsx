"use client";

import { useEffect, useState } from 'react';

type TeamMember = {
    name: string;
    role: string;
    focus: string;
    workload: number;
};

export default function TeamPage() {
    const [members, setMembers] = useState<TeamMember[]>([]);

    useEffect(() => {
        const load = async () => {
            const res = await fetch('/api/dashboard');
            const data = await res.json();
            setMembers(data.team);
        };
        load();
    }, []);

    return (
        <main className="container">
            <section className="card">
                <h1 style={{ marginTop: 0 }}>Team</h1>
                <p style={{ color: '#9ca3af' }}>Understand workload and expertise across the delivery team.</p>
            </section>

            <section className="grid grid-3" style={{ marginTop: 16 }}>
                {members.map((member) => (
                    <div key={member.name} className="card">
                        <h3 style={{ marginTop: 0 }}>{member.name}</h3>
                        <p style={{ margin: '4px 0', color: '#9ca3af' }}>{member.role}</p>
                        <p style={{ margin: '0 0 8px' }}>Focus: {member.focus}</p>
                        <div className="badge secondary">Workload: {member.workload}/5</div>
                    </div>
                ))}
            </section>
        </main>
    );
}
