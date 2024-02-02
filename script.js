"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function reorderAndAddMissingKeys(originalFile, translatedFile, outputFile) {
    var originalData = JSON.parse(fs.readFileSync(originalFile, { encoding: 'utf-8' }));
    var translatedData = JSON.parse(fs.readFileSync(translatedFile, { encoding: 'utf-8' }));
    var reorderedData = {};
    for (var _i = 0, _a = Object.keys(originalData); _i < _a.length; _i++) {
        var key = _a[_i];
        reorderedData[key] = key in translatedData ? translatedData[key] : "";
    }
    for (var _b = 0, _c = Object.entries(translatedData); _b < _c.length; _b++) {
        var _d = _c[_b], key = _d[0], value = _d[1];
        if (!(key in reorderedData)) {
            reorderedData[key] = value;
        }
    }
    fs.writeFileSync(outputFile, JSON.stringify(reorderedData, null, 4), 'utf-8');
}
var args = process.argv.slice(2);
if (args.length !== 3) {
    console.log('Usage: ts-node script.ts <originalFile> <translatedFile> <outputFile>');
    process.exit(1);
}
var originalFile = args[0], translatedFile = args[1], outputFile = args[2];
reorderAndAddMissingKeys(originalFile, translatedFile, outputFile);
