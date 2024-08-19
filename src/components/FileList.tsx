import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";

interface FileListProps {
    files?: FileList | null; // List failidest (valikuline)
    handleDeleteFile: (index: number) => void; // Funktsioon faili kustutamiseks
}

// FileList komponent, mis kuvab üleslaetud failide nimekirja kasutades SchadCN Sheet komponenti
const FileList = ({files, handleDeleteFile}: FileListProps) => {
    // Tagasta null, kui faile pole
    if (!files || files.length === 0) return null;

    return (
        <Sheet>
            {/* Nupp, mis avab Sheeti */}
            <SheetTrigger asChild>
                <Button className={"w-16 h-16"} variant="outline">Kõik</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Üleslaetud failid</SheetTitle>
                </SheetHeader>
                <div className="p-4 space-y-4">
                    {/* Käime üle kõikide failide */}
                    {Array.from(files).map((file, index) => (
                        <div key={index} className="flex items-center justify-between space-x-4">
                            <div className="flex items-center space-x-4">
                                {/* Pildi puhul näitame eelvaadet */}
                                {file.type.startsWith('image/') ? (
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        className="w-16 h-16 rounded-lg object-cover"
                                    />
                                ) : (
                                    <div
                                        className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-lg">
                                        <span>{file.name.split('.').pop()}</span> {/* Näitame faililaiendit, kui tegu pole pildifailiga*/}
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <div
                                        className="text-sm font-medium text-gray-800 break-all">{file.name}</div> {/* Failinimi */}
                                    <div
                                        className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</div> {/* Faili suurus */}
                                </div>
                            </div>
                            {/* Faili eemaldamise nupp */}
                            <div>
                                <Button variant={"ghost"}
                                        className={"p-2 rounded-full text-red-500 hover:bg-red-50 hover:text-red-500"}
                                        onClick={() => handleDeleteFile(index)}>
                                    <Trash2/>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default FileList;