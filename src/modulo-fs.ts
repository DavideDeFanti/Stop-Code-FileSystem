import fileSystem from "node:fs";
import path from "node:path";
import { DateTime } from "luxon";

export default () => {
    const documentiPath: string = "C:\\Users\\Admin\\Desktop\\StopECode-FileSystem\\documenti";

    try {
        const names = fileSystem.readdirSync(documentiPath);
        console.log("|--", path.basename(documentiPath));
        stampaAlberatura(documentiPath, names, 1);
    } catch (error) {
        console.log("Errore nella lettura");
    }
};


function stampaAlberatura(directory: string, names: string[], livello: number) {
    for (const name of names) {
        const stat = fileSystem.statSync(path.join(directory, name));
        const ultimaModifica = DateTime.fromMillis(stat.mtimeMs);
        const tempoTrascorso = ultimaModifica.toRelative();

        if (stat.isDirectory()) {
            console.log(" ".repeat(livello * 2) + "|--", name);
            const sottocartelle = fileSystem.readdirSync(path.join(directory, name));
            stampaAlberatura(path.join(directory, name), sottocartelle, livello + 1);
        } else {
            console.log(" ".repeat(livello * 2) + "|--", name, `(${tempoTrascorso})`);
        }
    }
}