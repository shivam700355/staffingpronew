import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

type Props = {
    currentPage: string;
    setCurrentPage: (p: string) => void;
    currentUser: any;
    onLogout: () => void;
};

export default function MainLayout({ currentPage, setCurrentPage, currentUser, onLogout }: Props) {
    return (
        <div className="flex flex-col min-h-screen bg-sp-bg font-sans">
            <Header currentPage={currentPage} setCurrentPage={setCurrentPage} currentUser={currentUser} onLogout={onLogout} />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer setCurrentPage={setCurrentPage} />
        </div>
    );
}
