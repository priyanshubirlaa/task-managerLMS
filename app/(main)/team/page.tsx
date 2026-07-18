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
    const [form, setForm] = useState({ name: '', role: '', focus: '', workload: '1' });
    const [editingName, setEditingName] = useState<string | null>(null);

    const loadMembers = async () => {
        const res = await fetch('/api/team');
        const data = await res.json();
        setMembers(data);
    };

    useEffect(() => {
        loadMembers();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const method = editingName ? 'PUT' : 'POST';
        const res = await fetch('/api/team', {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...form, name: editingName || form.name })
        });
        if (res.ok) {
            setForm({ name: '', role: '', focus: '', workload: '1' });
            setEditingName(null);
            loadMembers();
        }
    };

    const handleRemove = async (name: string) => {
        const res = await fetch(`/api/team?name=${encodeURIComponent(name)}`, { method: 'DELETE' });
        if (res.ok) {
            loadMembers();
        }
    };

    const startEdit = (member: TeamMember) => {
        setEditingName(member.name);
        setForm({ name: member.name, role: member.role, focus: member.focus, workload: String(member.workload) });
    };

    return (
        <main className="container">
            <section className="card">
                <h1 style={{ marginTop: 0 }}>Team</h1>
                <p style={{ color: '#9ca3af' }}>Manage team members, roles, and workload.</p>
            </section>

            <section className="grid grid-2" style={{ marginTop: 16 }}>
                <div className="card">
                    <h3 style={{ marginTop: 0 }}>{editingName ? 'Edit Team Member' : 'Add Team Member'}</h3>
                    <form onSubmit={handleSubmit} className="form-grid">
                        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                        <input placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
                        <input placeholder="Focus" value={form.focus} onChange={(e) => setForm({ ...form, focus: e.target.value })} required />
                        <input type="number" min="1" max="5" value={form.workload} onChange={(e) => setForm({ ...form, workload: e.target.value })} required />
                        <button type="submit">{editingName ? 'Save Changes' : 'Add Member'}</button>
                        {editingName && <button type="button" onClick={() => { setEditingName(null); setForm({ name: '', role: '', focus: '', workload: '1' }); }}>Cancel</button>}
                    </form>
                </div>

                <div className="card">
                    <h3 style={{ marginTop: 0 }}>Current Team</h3>
                    <div className="stack">
                        {members.map((member) => (
                            <div key={member.name} className="card" style={{ padding: 12 }}>
                                <div style={{ fontWeight: 700 }}>{member.name}</div>
                                <div style={{ color: '#9ca3af', fontSize: 14 }}>{member.role}</div>
                                <div style={{ marginTop: 6 }}>Focus: {member.focus}</div>
                                <div className="row" style={{ marginTop: 8 }}>
                                    <span className="badge secondary">Workload: {member.workload}/5</span>
                                    <button type="button" onClick={() => startEdit(member)}>Edit</button>
                                    <button type="button" onClick={() => handleRemove(member.name)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
