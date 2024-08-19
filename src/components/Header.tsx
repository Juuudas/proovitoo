import React from 'react';
import Link from 'next/link';
import {Github} from "lucide-react";
import {Button} from "@/components/ui/button";

// Päise komponent, mis kuvatakse lehe ülaosas
const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-sm rounded-b-xl fixed left-0 right-0 top-0 z-20">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* "Logo" */}
                <Link href="/">
                    <h1 className="text-2xl font-bold text-gray-800">
                        ChatBot
                    </h1>
                </Link>

                {/* GitHubi link, mis suunab antud projekti repositooriumisse */}
                <Button variant={"ghost"} className={"rounded-full p-2"}>
                    <Link href="https://github.com/Juuudas/proovitoo" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                        <Github aria-hidden="true" />
                    </Link>
                </Button>
            </div>
        </header>
    );
};

export default Header;