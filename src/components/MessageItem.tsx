import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import ReactMarkdown from 'react-markdown';
import {CircleX, Copy} from "lucide-react";
import {Message} from "ai";
import {formatDate, CopyMessage} from "@/lib/utils";

interface MessageItemProps {
    message: Message; // Message objekt
    handleDelete: (id: string) => void; // Funktsioon, mis kustutab sõnumi ID järgi
}

const MessageItem = ({message, handleDelete}: MessageItemProps) => {
    // Formaadime sõnumi kuupäeva ja kellaaja sõnumi saatmise hetkel
    const messageDate = new Date(message.createdAt ?? Date.now());
    const formattedDate = formatDate(messageDate);
    const formattedTime = messageDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

    return (
        <div key={message.id} className="pb-5 relative">
            {/* Sõnumi päis koos avatari pildi ja formaaditud kuupäevaga */}
            <div className="absolute top-0 left-4 transform -translate-y-1/2 z-10 flex items-center space-x-2">
                <Avatar className="shadow-lg">
                    <AvatarImage
                        alt={message.role === 'user' ? "Kasutaja avatar" : "AI avatar"}
                        src={message.role === 'user' ? "Mina.webp" : "Ai.webp"}/>
                </Avatar>
                <div className="text-gray-700 text-sm">
                    <div>{formattedDate}&nbsp;Kell:&nbsp;{formattedTime}</div>
                </div>
            </div>
            {/* Sõnumi sisu */}
            <div
                className="flex mb-1.5 items-start gap-1.5 pb-3 pl-16 mt-2 justify-between w-full bg-white bg-opacity-80 p-4 rounded-lg shadow-md relative z-0 overflow-hidden">
                <div className="flex-1 overflow-auto">
                    {/* Renderdame sõnumi kasutades Markdowni */}
                    <ReactMarkdown className="w-full text-gray-800 break-words">
                        {message.content}
                    </ReactMarkdown>
                    <div className="mt-2 pb-2">
                        {/* Kui kasutaja lisas pildi, siis näitame ka seda */}
                        {message.experimental_attachments
                            ?.filter(attachment => attachment.contentType?.startsWith('image/'))
                            .map((attachment, index) => (
                                <img
                                    key={`${message.id}-${index}`}
                                    src={attachment.url}
                                    alt={attachment.name}
                                    className="w-1/3 object-cover"
                                />
                            ))}
                    </div>
                </div>
                {/* Nupud sõnumi kopeerimiseks ning eemaldamiseks */}
                <div className="flex items-center space-x-2 ml-4">
                    <Button
                        aria-label={"Kopeeri sõnum"}
                        variant={"ghost"}
                        className={"rounded-full p-2 hover:bg-gray-300"}
                        onClick={() => CopyMessage(message.content)}
                    >
                        <Copy className={"text-gray-600"}/>
                    </Button>
                    <Button
                        aria-label={"Eemalda sõnum"}
                        variant={"ghost"}
                        className={"rounded-full p-2 hover:bg-red-50"}
                        onClick={() => handleDelete(message.id)}
                    >
                        <CircleX className={"text-red-500"}/>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MessageItem;