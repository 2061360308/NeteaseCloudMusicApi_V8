from bs4 import BeautifulSoup
from pprint import pprint
import json

def genderConfig():
    with open('README.html', 'r', encoding='utf-8') as f:
        html = f.read()

    soup = BeautifulSoup(html, 'html.parser')

    body = soup.body

    # 打印<body>标签的所有直接子节点

    apis = {}

    current_api = ''

    for child in body.children:
        # print(child)
        if child.name == 'h3':
            current_api = child.string
            apis[current_api] = {}

            # print(current_api)
            # print(api)

        if child.name == 'p':
            if child.string:
                if child.string.startswith('说明'):
                    # print(child.string)
                    apis[current_api]['explain'] = child.string
            elif len(child.contents) > 0:
                if child.contents[0].string:
                    if child.contents[0].string.startswith('调用例子'):
                        apis[current_api]['example'] = []
                        for example in child.contents[1:]:
                            if example.name == 'code':
                                # print(example.string)
                                apis[current_api]['example'].append(example.string)
                    elif child.contents[0].string.startswith('调用地址'):
                        # print(child.contents[0].string)
                        apis[current_api]['path'] = child.contents[2].string
                    elif child.contents[0].string.startswith('说明'):
                        apis[current_api]['explain'] = child.contents[0].string

    config = {}

    def praseQuery(example):
        example = example.split('?')

        if len(example) == 2:
            query = example[1]
            query = query.split('&')
            query = [q.split('=') for q in query]
            query = {q[0]: q[1] for q in query}
            return [example[0], query]
        else:
            return [example[0], {}]

    for api in apis:
        name = api
        api = apis[api]
        path = ''

        # print(api)
        example = []
        # print(api)

        if api.get('path'):
            path = api['path']

        if api.get('example'):
            for i in api['example']:
                path, query = praseQuery(i)
                example.append({'query': query, 'result': {}})

        # print(api)

        config[path] = {
            'name': name,
            'explain': api['explain'] if api.get("explain") else name,
            'example': example
        }
    
    config["settings"] = {
        "cookie": "MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/neapi/feedback; HTTPOnly;__csrf=f2479af05431c9fe000004d74b9eb43c; Max-Age=1296010; Expires=Wed, 20 Dec 2023 15:57:49 GMT; Path=/;;MUSIC_U=00F5809E26613FA34E24E56B87BB2D71C716ECA62F1D492FDDB5915792654A9C101BE0AFDDFB7A79A405394645D6A0BCCEF96AF99CD68BB226B3AD52F1A990A41E4D4E359E8FBE202B246A605453D0BA8EA9370E2CF943DC198B5ADF131DBD233495C69C0BA6B144FD3EB4A3D356B95B15FF8FA61D19A34DA56A980797377346706BD36CB666B2BA320AFF4E140BB208BBC6CBA15716BF7B98CB0A92EF1032735321FD39465B9E8B34E8C241A1BD5DA0C77501BF407AF6AA382C7B589AB18B92B856600EF1D81FC7A3E5B80339CC9DA04A0D32E85563B018CFDBEDC86F8972B6D78F6704AA10CEDBB7E43F3FC654D0D3EC885D09A503057B92912B28763893F0DDCE9995439D4E047867F8BDEB01C4B3C4C3717D3049C5A13BC16EF182455B02F3F9CA81185292BED1FD7493A07FCAB3B5676A7FD58F8BF4F5B09F752C6F235C034D297711FBE960A3CAF5504E62EF6547; Max-Age=15552000; Expires=Sun, 02 Jun 2024 15:57:39 GMT; Path=/; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_SNS=; Max-Age=0; Expires=Tue, 05 Dec 2023 15:57:39 GMT; Path=/;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/api/feedback; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/api/feedback; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/weapi/feedback; HTTPOnly",
        "updateResult": False
    }

    # 将一些不便于测试的接口保存到config.others.json中
    others = {}
    otehrs_path = ["/user/replacephone","","/rebind","/nickname/check","/activate/init/profile","/cellphone/existence/check","/register/cellphone","/captcha/verify",'/captcha/sent','/login/refresh','/logout','/comment',"/user/update","/avatar/upload","/pl/count","/playlist/update","/playlist/desc/update","/playlist/name/update","/playlist/tags/update","/playlist/cover/update","/event/forward","/event/del","/share/resource",'/send/text','/send/playlist','/playlist/create','/playlist/tracks','/daily_signin','/fm_trash']

    config.pop("{ \"/api/v2/banner/get\": {\"clientType\":\"pc\"} }")

    for path in otehrs_path:
        if config.get(path):
            others[path] = config.pop(path)

    # 一些特殊的接口需要特殊处理
    if config.get('/comment'):
        config['/comment']['example'] = [
            {
                "query": {
                    "action":1,
                    "type":1,
                    "id":5436712,
                    "content":"test"
                },
                "result": {}
            },{
                "query": {
                    "action":0,
                    "type":1,
                    "id":5436712,
                    "commentId":1535550516319
                },
                "result": {}
            }
        ]

    with open('config.json', 'w+', encoding='utf-8') as f:
        f.write(json.dumps(config, indent=4, ensure_ascii=False))
    
    with open('config.others.json', 'w+', encoding='utf-8') as f:
        f.write(json.dumps(others, indent=4, ensure_ascii=False))

    # pprint(config)

def genderTest():
    with open("example.test.cjs", "r", encoding="utf-8") as f:
        content = f.read()

    with open("config.json", "r", encoding="utf-8") as f:
        config = json.loads(f.read())

    config.pop("settings")
    
    for index in config:

        item = config[index]
        path = index
        name = item["name"]
        explain = item["explain"]

        lines = explain.split('\n')
        lines = [line if i == 0 else '// ' + line for i, line in enumerate(lines)]
        explain_format = '\n'.join(lines)
        

        file_name = path.replace("/","_")
        file_name = file_name[1:]
        file_name = f"../{file_name}.test.cjs"

        # print(f'file_name: {file_name}, path: {path}, name: {name}, explain: {explain}')

        testContent = content.replace("{{path}}",path)
        testContent = testContent.replace("{{name}}",name)
        testContent = testContent.replace("{{explain}}",explain_format)

        with open(file_name, "w+", encoding="utf-8") as f:
            f.write(testContent)

# genderConfig()
genderTest()