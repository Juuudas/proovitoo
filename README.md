# Proovitöö - Vestlusrobot

See projekt on loodud kasutades Verceli SDK-d ja OpenAI API-d. Rakendus võimaldab kasutajatel suhelda AI-ga ning lisada vestlusse ka faile. Allpool on toodud koodi struktuuri ja disainivalikute kirjeldus, samuti kasutajasõbralikkuse tagamise viisid ning võimalike ohtude ja riskide maandamise meetmed.

## Koodi Struktuur

Projekti koodi struktuur on korraldatud järgmiselt:

- **API Route**: `api/chat/route.ts` - API on paigutatud siia. See võimaldab kasutajatel suhelda vestlusrobotiga.
- **Komponendid**: Kõik komponendid on paigutatud `components` kausta, et hoida projekti struktuur korras ja loogilisena.
    - **UI komponendid**: ShadCN poolt pakutavad komponendid on eraldatud `components/ui` kausta.
    - **Chat Komponendid**:
        - `Chat` on põhiline konteiner, kus kuvatakse `ChatInput` ja `MessageItem`.
        - `ChatInput` kasutab `FilePreview` komponenti.
        - `FilePreview` kasutab `FileList` komponenti.

Antud struktuur tundus mulle loogiline ja muutis koodi kergesti hallatavaks. Kindlasti ei ole see ainuõige viis koodi struktureerimiseks, kuid see sobib hästi minu lähenemisviisiga.

## Kasutajasõbralikkus

Rakenduse kasutajasõbralikkus on tagatud järgmiste meetmetega:

- **Lihtne ja intuitiivne kasutajaliides**: Kasutajatel on võimalik saata sõnumeid, lisada faile ning saada manustatud failidest ülevaade.
- **Mugav sõnumite saatmine**: Sõnumite saatmine toimub nii Enteri vajutamisel kui ka "Saada" nupule klikkides. Samuti on võimalik kasutada `Shift + Enter` klahvikombinatsiooni, et lisada tekstiväljale reavahetus.
- **Kohandatavus**: Lihtne disain ja funktsionaalsus muudavad kasutajaliidese kergesti kohandatavaks erinevatele kasutajate vajadustele.
- **Markdown**: Sõnumid väljastatakse kasutajale kasutades Markdowni, mis muudab näiteks koodiplokid loetavamaks ning eristab need muust tekstist. 

## Värviskeem ja Tüpograafia

### Värviskeem

Valisin värviskeemi, mis mõjub futuristlikult ja innovaatiliselt. Lilla, roheline ja sinine kombinatsioon on levinud kaasaegsetes AI- ja infotehnoloogia veebilehtedes, mistõttu tundus see sobiv.

### Tüpograafia

Tüpograafia valikul lähtusin sellest, et tekst oleks hästi loetav ja mugavalt jälgitav. Oluline oli tagada, et kasutaja saaks sisu kiiresti ja selgelt mõista.

## Disaini Lähenemine

Kasutatud on järgmisi tööriistu ja raamistikke:

- **TailwindCSS**: Valisin TailwindCSS-i, kuna see on minu jaoks kõige mugavam viis stiilide lisamiseks. Mind isiklikult ei häiri vahepeal harva esinevad väga pikad 
klassinimed. Samuti eemaldab Tailwind CSS automaatselt ära CSS koodi, mida ei kasutata, suurendades lehe jõudlust.
- **ShadCN Komponendid**: Kasutasin ShadCN teegi komponente, et pakkuda kaasaegset ja kasutajasõbralikku kasutajaliidest .
- **Lucide Ikoonid**: Rakenduses kasutatud ikoonid pärinevad Lucide teegist, pakkudes visuaalselt atraktiivseid ja selgeid ikoone.

## Automaatne Testimine

Rakenduse testimiseks kasutasin järgmisi meetodeid:

- **Google Lighthouse**: Kiire ja ülevaatlik testimismeetod rakenduse jõudluse, kasutajasõbralikkuse ja muude oluliste aspektide hindamiseks.
- **WebPageTest**: Täiendav testimiskeskkond rakenduse jõudluse ja kasutajasõbralikkuse hindamiseks.
- **Verceli Testimisvahendid**: Plaanin tulevikus katsetada Verceli poolt soovitatavaid testimisvahendeid nagu ViTest, Jest, Playwright ja Cypress kui ka Verceli enda Speed Insights võimekust.

## Ohud ja Riskid

Rakenduse loomisel ja kasutamisel võivad ilmneda järgmised riskid:

1. **API Kulud**: Suuremate andmemahtude korral võib OpenAI API kasutamine muutuda kulukaks.
    - **Lahendus**: Rakenda kasutajatele piirangud. Näiteks võib piirata päringute arvu või päringu suurust.

2. **Jõudlusprobleemid**: Serverless-funktsioonide jõudlusprobleemid võivad tekkida kõrge koormuse korral.
    - **Lahendus**: Piirata kasutajate poolt tehtavate päringute arvu või kasutada Verceli tasulist plaani. 
   Loomulikult tuleb koodi võimalikult hästi optimeerida.

3. **Turvalisus**: OpenAI API võti on turvaliselt peidetud keskkonnamuutujasse, kuid tuleb jälgida, et võti ei lekiks.
Selles, et vestlusrobot ei saadaks soovimata vastuseid peame, kas usaldama OpenAi või ise täiendavalt API't kofigureerima.


## Võimalikud edasiarendused

1. **Kasutajate autentimine**: Lisada kasutajate autentimine, et tagada privaatsus ja turvalisus. Võimaldab kasutajatel oma vestlusi salvestada ja taastada.

2. **Parandada automaatne kerimine**: Hetkel kerib chat automaatselt alla, kuid poole Ai vastuse pealt üles kerides hakkab leht "värisema". 
    - **Lahendus**: Parandada automaatne kerimine nii, et see oleks sujuvam ja kasutajasõbralikum.

3. **Võimekus muuta eelmist sõnumit**: Sarnaselt ChatGPT'le võiks kasutajatel olla võimalus muuta mõnd eelmist sõnumit ning esitada päring uuesti.

Muidugi on edasiarendusi lõputult, kuid need on mõned esimesed mõtted, mis mulle pähe tulid.
