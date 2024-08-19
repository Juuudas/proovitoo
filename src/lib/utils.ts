import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {toast} from "@/components/ui/use-toast";

// Funktsioon, mis ühendab Tailwind CSS klassid
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Funktsioon, mis vormindab kuupäeva ja kellaaja loetavaks sõneks
export const formatDate = (date: Date, locale: string = 'et-EE') => {
  const day = date.getDate();
  const month = date.toLocaleString(locale, { month: 'long' });
  const year = date.getFullYear();
  return `${day}. ${month} ${year}`;
};

// Funktsioon, mis kopeerib sõnumi lõikelauale ja kuvab selle kohta teavituse
export const CopyMessage = (content: string) => {
  navigator.clipboard.writeText(content).then(() => {
    toast({
      title: "Sõnum kopeeritud!", // Teavituse pealkiri
      description: "Sõnum on kopeeritud sinu lõikelauale.", // Teavituse kirjeldus
    });
  });
};

// Funktsioon, mis haldab Enter klahvi vajutamist tekstiväljal
export const handleEnterKeyPress = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
) => {
  if (e.key === "Enter") { // Kas vajutati Enter klahvi
    if (e.shiftKey) { // Kas vajutati samaaegselt Shift klahvi, kui jah, siis lisame reavahetuse
      const { selectionStart, selectionEnd } = e.currentTarget;
      e.currentTarget.selectionStart = e.currentTarget.selectionEnd = selectionStart + 1;
    } else {
      e.preventDefault(); // Takistame vaikimisi käitumist
      e.currentTarget.form?.requestSubmit(); // Saadame päringu
    }
  }
};