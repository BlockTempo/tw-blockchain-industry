import json

def load_json_file(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data

def save_utf8_file(content, file_path):
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)

json_data = load_json_file("json/map-item.json")

url_base = "https://taiwan.blocktempo.com/"
content = url_base + "\n"

for value in json_data:
    content += url_base + "item.html?id=" + value["id"] + "\n"

save_utf8_file(content, "sitemap.txt")

