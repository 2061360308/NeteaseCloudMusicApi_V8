import os

original_path = "./original"
original_module_path = os.path.join(original_path, "module")
original_util_path = os.path.join(original_path, "util")

exclude = ["apicache.js","memory-cache.js","request_reference.js","avatar_upload.js","cloud.js","playlist_cover_update.js","voice_upload.js","register_anonimous.js","verify_getQr.js"]

special = ["login_cellphone.js","login_qr_create.js","register_cellphone.js","dj_program.js"]

if not os.path.exists("module"):
    os.makedirs("module")

if not os.path.exists("util"):
    os.makedirs("util")

def import_statement_conversion(content):
    content = content.replace("module.exports = ", "export default ")
    return content

def require_statement_conversion(content):
    content = content.replace("const { resourceTypeMap } = require('../util/config.json')", "import config from '../util/config.json';const resourceTypeMap = config.resourceTypeMap;")
    content = content.replace("const crypto = require('crypto')", "")
    content = content.replace("const pkg = require('../package.json')", "import pkg from '../package.json'")
    content = content.replace("const config = require('../util/config.json')", "import config from '../util/config.json'")
    return content

for file in os.listdir(original_module_path):

    if file in exclude:
        continue

    if file in special:
        with open(os.path.join("special/",file), 'r', encoding='utf-8') as f:
            content = f.read()

        with open(os.path.join("module/",file), 'w+', encoding='utf-8') as f:
            f.write(content)

        continue

    path = os.path.join(original_module_path, file)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 转换所有module.exports 语句为 export default
    content = import_statement_conversion(content)
    content = require_statement_conversion(content)

    with open(os.path.join("module/",file), 'w+', encoding='utf-8') as f:
        f.write(content)

for file in os.listdir(original_util_path):

    if file in exclude:
        continue

    if file in special:
        with open(os.path.join("special/",file), 'r', encoding='utf-8') as f:
            content = f.read()

        with open(os.path.join("util/",file), 'w+', encoding='utf-8') as f:
            f.write(content)
        
        continue

    path = os.path.join(original_util_path, file)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 转换所有module.exports 语句为 export default
    content = import_statement_conversion(content)
    content = require_statement_conversion(content)

    with open(os.path.join("util/",file), 'w+', encoding='utf-8') as f:
        f.write(content)

# 检查

key_words = ["module.exports", "require"]
for file in os.listdir("module"):

    if file in exclude:
        continue

    path = os.path.join("module", file)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for key_word in key_words:
        if key_word in content:
            print("Error: " + key_word + " in " + path)
            continue

for file in os.listdir("util"):

    if file in exclude:
        continue

    path = os.path.join("util", file)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for key_word in key_words:
        if key_word in content:
            print("Error: " + key_word + " in " + path)
            continue

# 导入所有模块
def import_api():
    api_index = ""
    api_name = []
    for file in os.listdir("module"):
        name = file[:-3]
        api_name.append(name)
        api_index += f"import {name} from './module/{file}'\n"

    api_index += "\nexport default {\n"
    for name in api_name:
        api_index += f"    '{name}':{name},\n"
    api_index += "}"

    with open("api.js", 'w+', encoding='utf-8') as f:
        f.write(api_index)
    
import_api()