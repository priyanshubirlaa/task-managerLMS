import Link from 'next/link';

const links = [
    { href: '/', label: 'Dashboard' },
    { href: '/tasks', label: 'Tasks' },
    { href: '/projects', label: 'Projects' },
    { href: '/team', label: 'Team' }
];

export function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="shell">
            <header className="topbar">
                <div>
                    <h2 style={{ margin: 0 }}>TaskFlow</h2>
                    <p style={{ margin: '4px 0 0', color: '#9ca3af' }}>A modern task manager experience</p>
                </div>
                <nav className="nav">
                    {links.map((link) => (
                        <Link key={link.href} href={link.href} className="nav-link">
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </header>
            {children}
        </div>
    );
}
