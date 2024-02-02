package main

import (
    "encoding/json"
    "flag"
    "fmt"
    "io/ioutil"
    "os"
)

func main() {
    var originalFile, translatedFile, outputFile string

    // args
    flag.StringVar(&originalFile, "original", "", "Path to the original JSON file")
    flag.StringVar(&translatedFile, "translated", "", "Path to the translated JSON file")
    flag.StringVar(&outputFile, "output", "", "Path to the output JSON file")
    flag.Parse()

    if originalFile == "" || translatedFile == "" || outputFile == "" {
        fmt.Println("All arguments (original, translated, output) are required")
        os.Exit(1)
    }

    // original file
    originalData := make(map[string]interface{})
    readJsonFile(originalFile, &originalData)

    // translate file
    translatedData := make(map[string]interface{})
    readJsonFile(translatedFile, &translatedData)

    // output data
    reorderedData := make(map[string]interface{})
    for key := range originalData {
        if value, exists := translatedData[key]; exists {
            reorderedData[key] = value
        } else {
            reorderedData[key] = ""
        }
    }
    for key, value := range translatedData {
        if _, exists := reorderedData[key]; !exists {
            reorderedData[key] = value
        }
    }

    // output file
    writeJsonFile(outputFile, reorderedData)
}

func readJsonFile(filePath string, data *map[string]interface{}) {
    fileContent, err := ioutil.ReadFile(filePath)
    if err != nil {
        fmt.Printf("Error reading file: %s\n", err)
        os.Exit(1)
    }

    if err := json.Unmarshal(fileContent, data); err != nil {
        fmt.Printf("Error parsing JSON: %s\n", err)
        os.Exit(1)
    }
}

func writeJsonFile(filePath string, data map[string]interface{}) {
    fileContent, err := json.MarshalIndent(data, "", "    ")
    if err != nil {
        fmt.Printf("Error marshalling JSON: %s\n", err)
        os.Exit(1)
    }

    if err := ioutil.WriteFile(filePath, fileContent, 0644); err != nil {
        fmt.Printf("Error writing file: %s\n", err)
        os.Exit(1)
    }
}
