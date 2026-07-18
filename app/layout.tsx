import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from './components/app-shell';

export const metadata: Metadata = {
    title: 'TaskFlow Manager',
    description: 'A full task manager experience with dashboard, tasks, projects, and team pages.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <AppShell>{children}</AppShell>
            </body>
        </html>
    );
}
