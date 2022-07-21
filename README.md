# ⛅️ Dear today Server ⛅️

### SOPT 30th APPJAM
- ☀️ [Dear today Server Notion](https://coordinated-vein-c40.notion.site/60340220edf4415b9b9622b04a400915)  
- 🌤 [API 명세서](https://coordinated-vein-c40.notion.site/API-2085dad05f504e36b9f532e0e272c696)  
- ⛅️ [DB 설계 - Collection 구조](https://coordinated-vein-c40.notion.site/DB-887bd4b3b852447296ebfe34eb52ee47)  
- 🌥 [Code Convention](https://github.com/TeamDearToday/Deartoday-Server/wiki/Coding-Convention)  
- ☁️ [Git Flow 전략 / Commit Convention](https://github.com/TeamDearToday/Deartoday-Server/wiki/Git-flow)  

<br>

![1](https://user-images.githubusercontent.com/63235947/178440217-bac8e37b-fa27-4ddd-b448-0d346ed6881e.png)
![2](https://user-images.githubusercontent.com/63235947/178440518-79ddc1ec-d7eb-42e4-b04d-52fbc399278e.png)
![Dear today 4](https://user-images.githubusercontent.com/63235947/180295067-b3bd57c9-8d50-4270-9c2a-06bb5c4da387.png)
|서비스 핵심 기능 한 줄 소개|
|:-|
|메인에서 '시간여행 나와의 대화방 기능'을 통해 과거의 나와 대화를 나누고 나눈 대화와 과거의 나에게 보낸 마지막 메세지를 모아볼 수 있습니다.    보낸 메세지는 푸쉬알림을 통해 받을 수 있습니다.|


<br>

# 🌤 Hoonie & Huree
|![tape+pic](https://user-images.githubusercontent.com/63235947/178444419-1e14c0a4-25e7-4bfa-9d3d-fdfc4bb34255.png)|![루희님](https://user-images.githubusercontent.com/63235947/178444351-6389d87f-2321-4d05-8b43-ade596421824.png)
|:-:|:-:|
|[🍺 후니팍 🍺](https://github.com/shb03323)|[🥳 후리킴 🥳](https://github.com/heerucan)|
|프로젝트 세팅<br>DB설계<br>Api 생성/배포<br>소셜로그인/푸쉬알림<br>테스트 구축|DB설계<br>Api 생성<br>AWS 배포/s3<br>슬랙 웹훅 연동 |

<br>

# ⛅️ Git Flow
![6](https://user-images.githubusercontent.com/63235947/178440528-16819a8a-2712-47a3-b40e-c766ca2a5b04.png)

<br>

# ☁️ Foldering
![26](https://user-images.githubusercontent.com/63235947/178440533-fe268c68-d925-4679-9d5c-f39a0b3831e3.png)
![28](https://user-images.githubusercontent.com/63235947/178440541-349250f2-f2d2-474b-83fe-b5e13def2db7.png)

<br>

# ☀️ Server architecture
![1](https://user-images.githubusercontent.com/63235947/180306606-22b7748d-3127-4f6d-b322-00711ec39574.png)

<br>

# 🌦 API
| Route  | URI                             | HTTP 메서드 |           했나요?            |
| :----: | :------------------------------ | :------------: | :-----------------------: |
|  `Auth`  | /auth/login/:social             |     `POST`     |    yes     |
|        | /auth/logout                       |     `PATCH`    |    yes     |
| `TimeTravel` | /timeTravel/count        |    `GET`     |    yes     |
|        | /timeTravel |     `POST`      |    yes     |
|        | /timeTravel/oldMedia?year=연도           |    `GET`     |    yes     |
|        | /timeTravel/question             |     `GET`      |    yes     |
|        | /timeTravel/answers               |    `GET`     |    yes     |
|        | /timeTravel               |    `GET`    |    yes     |
|        | /timeTravel/:timeTravel           |     `GET`      |    yes     |
#

<br>

# 🌩 Package.json

<details>
<summary> ☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️ </summary>
<div markdown="1">        

```

{
  "name": "Deartoday-Server",
  "version": "1.0.0",
  "main": "index.js",
  "repository": "https://github.com/TeamDearToday/Deartoday-Server.git",
  "author": "jeonghoon, ruhee",
  "license": "MIT",
  "scripts": {
    "dev": "nodemon",
    "build": "tsc && node dist",
    "test": "mocha -r ts-node/register src/test/*.spec.ts -exit",
    "lint": "./node_modules/.bin/eslint .",
    "lint-staged": "lint-staged",
    "prepare": "husky install"
  },
  "lint-staged": {
    "**/*.ts": [
      "eslint --fix"
    ]
  },
  "dependencies": {
    "aws-sdk": "^2.1174.0",
    "axios": "^0.27.2",
    "bcryptjs": "^2.4.3",
    "dayjs": "^1.11.4",
    "dotenv": "^16.0.1",
    "express": "^4.18.1",
    "express-validator": "^6.14.2",
    "firebase-admin": "^11.0.0",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.4.2",
    "multer": "^1.4.2",
    "multer-s3": "^2.10.0",
    "ts-config": "^20.10.0"
  },
  "devDependencies": {
    "@types/chai": "^4.3.1",
    "@types/express": "^4.17.13",
    "@types/jest": "^28.1.6",
    "@types/jsonwebtoken": "^8.5.8",
    "@types/mocha": "^9.1.1",
    "@types/mongoose": "^5.11.97",
    "@types/multer": "^1.4.7",
    "@types/multer-s3": "^2.0.0",
    "@types/node": "^18.0.3",
    "@types/supertest": "^2.0.12",
    "@typescript-eslint/eslint-plugin": "^5.30.3",
    "@typescript-eslint/parser": "^5.30.3",
    "chai": "^4.3.6",
    "eslint": "^8.19.0",
    "husky": "^8.0.1",
    "lint-staged": "^13.0.3",
    "mocha": "^10.0.0",
    "nodemon": "^2.0.18",
    "prettier": "^2.7.1",
    "supertest": "^6.2.4",
    "ts-node": "^10.8.2",
    "typescript": "^4.7.4"
  }
}

```

</div>
</details>


<br>
