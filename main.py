import json

def reorder_and_add_missing_keys(original_file, translated_file, output_file):
    with open(original_file, 'r', encoding='utf-8') as file:
        original_data = json.load(file)

    with open(translated_file, 'r', encoding='utf-8') as file:
        translated_data = json.load(file)

    # Reorder keys according to the original file and add missing keys from the translated file
    reordered_data = {key: translated_data.get(key, "") for key in original_data}
    for key, value in translated_data.items():
        if key not in reordered_data:
            reordered_data[key] = value

    with open(output_file, 'w', encoding='utf-8') as file:
        json.dump(reordered_data, file, ensure_ascii=False, indent=4)


original_file = './original_input.json'
translated_file = './translation.json'
output_file = './output.json'

reorder_and_add_missing_keys(original_file, translated_file, output_file)

