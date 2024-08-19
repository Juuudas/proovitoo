import Header from "@/components/Header";
import Chat from "@/components/Chat";

export default function Home() {
    return (
        <div className={"min-h-screen bg-gradient-to-tr from-purple-500 via-green-400 to-blue-500"}>
            <Header/>
            <Chat/>
        </div>
    );
}