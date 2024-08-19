"use client"
import {useChat} from "ai/react";
import {useEffect, useRef, useState} from "react";
import {toast} from "@/components/ui/use-toast";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MessageItem from "./MessageItem";
import ChatInput from "./ChatInput";
import {ToastAction} from "@/components/ui/toast";

export default function Chat() {

    // Hook, mis haldab vestluse olekut, sealhulgas sõnumeid, sisendit ja veateadete käsitlemist
    const {messages, setMessages, input, handleInputChange, handleSubmit, isLoading, stop, error, reload} = useChat({
        keepLastMessageOnError: true, // Retain the last message in case of an error
    });

    const [files, setFiles] = useState<FileList | undefined>(undefined); // Üleslaetud failide oleku haldamine
    const chatContainerRef = useRef<HTMLDivElement>(null); // Ref vestluse konteineri jaoks

    // Funktsioon sõnumi kustutamiseks
    const handleDelete = (id: string) => {
        setMessages(messages.filter(message => message.id !== id));
    };

    // Effect veateadete kuvamiseks Toasti näol
    useEffect(() => {
        if (error) {
            toast({
                title: error.name,
                description: error.message,
                variant: "destructive",
                action: (
                    <ToastAction altText={"Proovi uuesti"} onClick={async () => await reload()}>
                        Proovi uuesti
                    </ToastAction>
                ),
            });
        }
    }, [error, reload]);

    // Effect, mis kerib vestluse konteineri lõppu, kui uus sõnum lisatakse
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // Effect, mis kuvab tervitussõnumi, kui vestlus on tühi
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([{
                id: "welcome",
                role: "assistant",
                content: "Tere! 👋 Mina olen sinu **isiklik abiline**. Sa võid minult küsida igasuguseid küsimusi ja lausa faile üles laadida! 📁\n" +
                    "\n" +
                    "*Vihjeks:* Praegu saan ma tegeleda **ainult piltide ja tekstifailidega**. Aga hei, see on alles algus! 😎\n" +
                    "\n" +
                    "**Kuidas saan sind täna aidata?** 🚀",
                createdAt: new Date(),
            }]);
        }
    }, [setMessages]);

    return (
        <MaxWidthWrapper>
            {/* Konteiner sõnumite kuvamiseks */}
            <div
                ref={chatContainerRef}
                className="flex flex-col py-24 mx-auto stretch pb-[120px] overflow-y-auto max-h-screen hide-scrollbar"
            >
                {/* Kuvame iga sõnumi */}
                {messages.map((message, i) => (
                    <MessageItem
                        key={i}
                        message={message}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>

            {/* Sisend, kasutajatel käsu saatmiseks ja failide üleslaadmiseks */}
            <ChatInput
                input={input}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                stop={stop}
                files={files}
                setFiles={setFiles}
            />
        </MaxWidthWrapper>
    );
}