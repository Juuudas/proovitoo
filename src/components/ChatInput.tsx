import React, {useRef} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Paperclip, SendHorizontal, CircleStop} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";
import FileList from "@/components/FileList";
import FilePreview from "@/components/FilePreview";
import {handleEnterKeyPress} from "@/lib/utils";

interface ChatInputProps {
    input: string; // Sisendtekst
    handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void; // Funktsioon sisendi jälgimiseks
    handleSubmit: (
        event: React.FormEvent<HTMLFormElement>,
        data: { experimental_attachments?: FileList } // Andmete objekt failide üleslaadimiseks
    ) => void; // Funktsioon vormi/käsu saatmiseks
    isLoading: boolean; // Boolean väärtus laadimise oleku jälgimiseks
    stop: () => void; // Funktsioon vastamise katkestamiseks
    files: FileList | undefined; // List kasutaja sisendfailidest
    setFiles: React.Dispatch<React.SetStateAction<FileList | undefined>>; // Funktsioon failide oleku määramiseks
}

// ChatInput komponent kasutaja sisendi/käsu saatmiseks ja failide üleslaadimiseks
const ChatInput: React.FC<ChatInputProps> = ({input, handleInputChange, handleSubmit, isLoading, stop, files, setFiles,}) => {

    const fileInputRef = useRef<HTMLInputElement>(null); // Ref faili sisendi jaoks

    // Funktsioon vormi saatmiseks
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSubmit(event, {experimental_attachments: files});
        resetFileInput(); // Lähtesta faili sisend
    };

    // Funktsioon failisisendi lähtestamiseks
    const resetFileInput = () => {
        setFiles(undefined);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // Funktsioon faili eemaldamiseks
    const handleDeleteFile = (indexToRemove: number) => {
        if (!files) return;

        const updatedFiles = Array.from(files).filter((_, index) => index !== indexToRemove);
        const dataTransfer = new DataTransfer();
        updatedFiles.forEach((file) => dataTransfer.items.add(file));
        setFiles(dataTransfer.files);
    };

    // Funktsioon failisisendi muutmiseks
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles(event.target.files);
        }
    };

    // Funktsioon failisisendi eelvaadete kuvamiseks
    const renderFilePreviews = () => {
        if (!files || files.length === 0) return null;

        return (
            <div className="flex gap-2 mb-2">
                {/* List kõikidest üleslaetud failidest võimalusega neid vaadata ja kustutada */}
                <FileList files={files} handleDeleteFile={handleDeleteFile}/>
                {/* Näitame iga faili eelvaadet */}
                {Array.from(files).map((file, index) => (
                    <FilePreview
                        key={file.name}
                        file={file}
                        index={index}
                        handleDeleteFile={handleDeleteFile}
                    />
                ))}
            </div>
        );
    };

    return (
        <form
            onSubmit={handleFormSubmit} // Vormi saatmise funktsioon
            className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex flex-col gap-2 w-full z-10"
        >
            {renderFilePreviews()} {/* Kui on faile üles laetud, siis näitame eelvaadet */}

            <div className="relative w-full flex items-center gap-2">
                {/* Nupp, mis avab kasutajale failide üleslaadmise akna */}
                <Button
                    aria-label={"Lisa fail"}
                    variant="outline"
                    className="flex items-center justify-center p-2 hover:bg-gray-100"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Paperclip/>
                    <Input
                        type="file"
                        accept="image/*,text/plain" // Aktsepteerime ainult pilte ja tekstifaile
                        onChange={handleFileChange}
                        multiple // Lubame mitme faili üleslaadimise
                        ref={fileInputRef}
                        className="hidden" // Peidame failisisendi välja
                    />
                </Button>

                {/* Tekstiala kasutaja sisendi jaoks */}
                <Textarea
                    className="min-h-[50px] resize-none rounded-lg flex-grow focus:outline-none focus:ring-0 focus:border-transparent"
                    value={input}
                    placeholder="Kirjuta siia..." // Placeholder tekst
                    disabled={isLoading} // Keelame sisendi muutmise laadimise (Boti vastamise) ajal
                    onChange={handleInputChange} // Funktsioon sisendi muutmise jägimiseks
                    rows={1}
                    onKeyDown={handleEnterKeyPress} /*Funktsioon, mis lubab sisendi saatmist Enter klahviga, kuid ka reavahetust
                    shift + enter klahvikombinatsiooniga.*/

                />

                {/* Näitame stop nuppu kui Ai vastab, vastasel juhul näitame päringu saatmise nuppu */}

                {isLoading ? (
                    <Button
                        aria-label={"Peata vastamine"}
                        type="button"
                        variant="secondary"
                        onClick={stop} // Peatab vastamise
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full p-2 text-red-500 hover:text-red-600"
                    >
                        <CircleStop/>
                    </Button>
                ) : (
                    <Button
                        aria-label={"Saada päring"}
                        type="submit"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full p-2 bg-gray-800 hover:bg-gray-700 text-white shadow-lg"
                    >
                        <SendHorizontal/>
                    </Button>
                )}
            </div>
        </form>
    );
};

export default ChatInput;