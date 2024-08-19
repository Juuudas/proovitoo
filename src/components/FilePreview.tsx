import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import React from "react";

interface FilePreviewProps {
    file: File; // Faili objekt
    index: number; // Faili indeks
    handleDeleteFile: (index: number) => void; // Funktsioon faili kustutamiseks
}

// FilePreview komponent faili eelvaate kuvamiseks
const FilePreview: React.FC<FilePreviewProps> = ({ file, index, handleDeleteFile }) => {
    const fileURL = URL.createObjectURL(file); // Faili URL
    const isImage = file.type.startsWith("image/"); // Boolean väärtus, kas fail on pilt
    const key = `${file.name}-${file.size}-${file.lastModified}`; // Unikaalne võti

    return (
        <div key={key} className="relative">
            {/* Näitame pildi eelvaadet, kui fail on pilt */}
            {isImage ? (
                <img
                    src={fileURL}
                    alt={file.name}
                    className="w-16 h-16 object-cover rounded-lg"
                />
            ) : (
                // Näitame faili nime, kui fail pole pilt
                <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-lg">
                    <span className="text-sm">{file.name}</span>
                </div>
            )}
            {/* Nupp faili eemaldamiseks */}
            <Button
                variant="ghost"
                className="absolute top-0 right-0 p-0 -m-2 w-5 h-5 flex items-center justify-center rounded-full text-red-500 hover:text-red-600 hover:bg-transparent"
                onClick={() => handleDeleteFile(index)}>
                <XCircle className="w-5 h-5" />
            </Button>
        </div>
    );
};

export default FilePreview;