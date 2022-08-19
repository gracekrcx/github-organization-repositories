# Github Organization Repositories
串接 [List organization repositories](https://docs.github.com/en/rest/repos/repos#list-organization-repositories)


## Run
```
yarn
yarn build
yarn start
```
Open http://localhost:3000

## Demo site
https://gracekrcx.tw/

## Architecture

### Framework
Next.js

### Server
- API route
    - `/orgs/:keyword/repos`  

### Client
- React w/ Hooks 
- next/router
- useContext : manage global state
    - repos
- styled-components

## Feature
- Proxy API route : 
    - 如果有取得 GitHub access token 可以在 proxy 發 request 時將 access token 放入 header (此作業無實作取得 GitHub access token)
    - remove API response 中不需要的欄位 
- 自動搜尋 : 使用 lodash/debounce 延遲 automatically fetch repos API
- Infinite scroll and automatically fetch API : 使用 IntersectionObserver 偵測畫面是否已經 scroll 到底部
- 處理 API fetch loading 和 API response error or empty message


    



