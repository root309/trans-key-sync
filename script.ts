import * as fs from 'fs';

function reorderAndAddMissingKeys(originalFile: string, translatedFile: string, outputFile: string): void {
    const originalData = JSON.parse(fs.readFileSync(originalFile, { encoding: 'utf-8' }));
    const translatedData = JSON.parse(fs.readFileSync(translatedFile, { encoding: 'utf-8' }));

    const reorderedData: { [key: string]: any } = {};

    for (const key of Object.keys(originalData)) {
        reorderedData[key] = key in translatedData ? translatedData[key] : "";
    }
    for (const [key, value] of Object.entries(translatedData)) {
        if (!(key in reorderedData)) {
            reorderedData[key] = value;
        }
    }

    fs.writeFileSync(outputFile, JSON.stringify(reorderedData, null, 4), 'utf-8');
}

const args = process.argv.slice(2);
if (args.length !== 3) {
    console.log('Usage: ts-node script.ts <originalFile> <translatedFile> <outputFile>');
    process.exit(1);
}

const [originalFile, translatedFile, outputFile] = args;
reorderAndAddMissingKeys(originalFile, translatedFile, outputFile);
