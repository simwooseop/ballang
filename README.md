# <img src="https://github.com/simwooseop/ballang/blob/develop/public/logo.png" width=70 height=70 /> BALLANG
### [발랑 사이트](https://ballang-eight.vercel.app/)


### 🚀 배포
- 프론트엔드 서버 - `Vercel`
- 백엔드 서버 - `AWS EC2`

### 📚 기술스택
- 언어 - `TypeScript & JavaScript`
- 프론트엔드 프레임워크 - `Next.js`
- 백엔드 프레임워크 - `Express.js`



|💾 DB|
|-|
|AWS RDS(mysql)|
|Supabase|


|📕 라이브러리|
|-|
|TanstackQuery|
|Zustand|
|TailwindCSS|
|Axios|
|Socket.io|

|🌐 API|
|-|
|TossPayments|

##

### 주요 기능
#### 홈페이지
- TanstackQuery로 InfiniteScroll 구현
- Supabase와 연동하여 로그인, 회원가입

#### 장바구니 페이지
- TossPayments으로 결제 (실제 요금은 발생하지 않음)

### 채팅 페이지
- Socket.io와 express, mysql을 활용하여 채팅 구현
- 고객과 관리자(상담사)의 1:1채팅
