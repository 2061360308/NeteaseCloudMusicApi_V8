# 生成标准测试结果

import os
import json
import requests
import time

with open('config.json', 'r', encoding='utf-8') as f:
    config = json.loads(f.read())

cookie = config['settings']['cookie']
config.pop('settings')

num = 0
all_num = len(config.keys())

erro = []

for api in config:
    num += 1
    print(f'{api} - {num} / {all_num}')

    path = api

    for item in config[api]['example']:
        index = config[api]['example'].index(item)

        query = item['query']
        url = 'http://localhost:3000' + path

        res = requests.get(url, params= {**query, 'cookie': cookie})
        try:
            json_data = res.json()
        except Exception as e:
            print(f'''错误:
                        api:   {api}
                        e:     {e} 
                        code:  {res.status_code}
                        text:  {res.text}''')
            erro.append(api)
            time.sleep(3)
            continue

        config[api]['example'][index]['result'] = json_data

        with open('config.json', 'w+', encoding='utf-8') as f:
            f.write(json.dumps(config, indent=4,ensure_ascii=False))

        time.sleep(0.5)

print('错误接口：')
num = 0
all_num = len(erro)

give_up = []

for api in erro:
    path = api

    print(f'{api} - {num} / {all_num}')

    for item in config[api]['example']:
        index = config[api]['example'].index(item)

        query = item['query']
        url = 'http://localhost:3000' + path

        res = requests.get(url, params={**query, 'cookie': cookie})
        try:
            json_data = res.json()
        except:
            give_up.append(api)
            time.sleep(3)
            continue

        config[api]['example'][index]['result'] = json_data

        with open('config.json', 'w+', encoding='utf-8') as f:
            f.write(json.dumps(config, indent=4,ensure_ascii=False))

        time.sleep(0.5)

# 补充settins
config["settings"] = {
        "cookie": "MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/neapi/feedback; HTTPOnly;__csrf=f2479af05431c9fe000004d74b9eb43c; Max-Age=1296010; Expires=Wed, 20 Dec 2023 15:57:49 GMT; Path=/;;MUSIC_U=00F5809E26613FA34E24E56B87BB2D71C716ECA62F1D492FDDB5915792654A9C101BE0AFDDFB7A79A405394645D6A0BCCEF96AF99CD68BB226B3AD52F1A990A41E4D4E359E8FBE202B246A605453D0BA8EA9370E2CF943DC198B5ADF131DBD233495C69C0BA6B144FD3EB4A3D356B95B15FF8FA61D19A34DA56A980797377346706BD36CB666B2BA320AFF4E140BB208BBC6CBA15716BF7B98CB0A92EF1032735321FD39465B9E8B34E8C241A1BD5DA0C77501BF407AF6AA382C7B589AB18B92B856600EF1D81FC7A3E5B80339CC9DA04A0D32E85563B018CFDBEDC86F8972B6D78F6704AA10CEDBB7E43F3FC654D0D3EC885D09A503057B92912B28763893F0DDCE9995439D4E047867F8BDEB01C4B3C4C3717D3049C5A13BC16EF182455B02F3F9CA81185292BED1FD7493A07FCAB3B5676A7FD58F8BF4F5B09F752C6F235C034D297711FBE960A3CAF5504E62EF6547; Max-Age=15552000; Expires=Sun, 02 Jun 2024 15:57:39 GMT; Path=/; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_SNS=; Max-Age=0; Expires=Tue, 05 Dec 2023 15:57:39 GMT; Path=/;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/api/feedback; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/api/feedback; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/weapi/feedback; HTTPOnly",
        "updateResult": True
    }

with open('config.json', 'w+', encoding='utf-8') as f:
    f.write(json.dumps(config, indent=4,ensure_ascii=False))

print('放弃接口：', give_up)


