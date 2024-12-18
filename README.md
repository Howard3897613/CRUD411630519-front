# StudentHub 專案
這是一個基於MVC架構、前後端分離的專案。具備完整 CRUD 功能的全端應用程式，整合前端與後端，並串接資料庫進行資料操作。

前端網址：https://github.com/Howard3897613/CRUD411630519-front

後端網址：https://github.com/Howard3897613/CRUD411630519-end

### 功能
* Create: 新增資料 insertOne
* Read: 查詢資料 findAll
* Update: 更新資料 updateNameById
* Delete: 刪除資料 deleteById

### 安裝與執行指引
#### 環境需求
* 前端開發 : React + ts
* 後端開發 : Node.js + Express
* 資料庫 : MongoDB
* API測試 : PostMan
* 安裝套件 : npm

#### 瀏覽應用
執行npm run dev後，Ctrl+左鍵點擊 http://localhost:5173 來使用應用。

### API 規格說明
#### API 基本資訊
* Base URL : /api/v1/user/
* 格式 : JSON
#### 查詢學生資料(Read)
* GET 方法
* 描述 : 根據學生的缺席次數、姓名或座號查詢資料。

#### 新增學生資料(Create)
* POST

Body :
```typescript
{
    "userName": "tkuim0425",
    "name": "王大明",
    "sid": "51",
    "department": "資訊管理學系",
    "grade": "3",
    "class": "C",
    "Email": "411630519@o365.tku.edu.tw"
}
```

(回應)
* 成功 : 
```typescript
{
    "code": 200,
    "message": "",
    "body": {
        "userName": "tkuim0425",
        "name": "王大明",
        "sid": "51",
        "department": "資訊管理學系",
        "grade": "3",
        "class": "C",
        "Email": "411630519@o365.tku.edu.tw"
        "_id": "6759b6c52927e07a0ddeb599",
        "__v": 0
    }
}
```

* 失敗 : 
```typescript
{
  "code": 403,
  "message": "student list is full"
}
```
* 或是 : 
```typescript
{
  "code": 500,
  "message": "server error"
}
```
#### 刪除學生資料(Delete)
* DELETE

Body :
```typescript
{
  "userName": "tkuim0425"
}
```

(回應)
* 成功 : 
```typescript
{
  "code": 200,
  "message": "success",
  "body": {
    "userName": "tkuim0425"
  }
}
```

* 失敗 : 
```typescript
{
  "code": 500,
  "message": ""
}
```

#### 更新學生資料(Update)
* PUT

Body :
```typescript
{
  "userName": "tkuim0425",
  "name": "陳庭浩"
}
```

(回應)
* 成功 : 
```typescript
{
  "code": 200,
  "message": "update success",
  "body": {
    "userName": "tkuim0425",
    "name": "陳庭浩"
  }
}
```

* 失敗 : 
```typescript
{
  "code": 404,
  "message": "user not found"
}
```

### 架構圖 : 展示前端、後端、資料庫及其互動
![架構圖](pic.png)

### 流程圖：描述 CRUD 功能的操作流程。

* 查詢學生: GET=> /api/v1/user/findAll
* 新增學生: POST=> /api/v1/user/insertOne
* 刪除學生: DELETE=> /api/v1/user/deleteById
* 更新學生: PUT=> /api/v1/user/updateNameById

#### 流程解說

1. 用戶操作前端界面：用戶在 React 前端界面上提交表單或點擊按鈕（新增、查詢、更新或刪除學生資料）。

2. 前端處理請求：前端透過 Fetch，向後端 Express 伺服器發送 HTTP 請求（如 POST、GET、PUT、DELETE）。

3. 後端路由匹配：後端根據請求的路徑和方法，在路由層 (Route) 找到對應的控制器方法。

4. 控制器處理請求邏輯：控制器 (Controller) 接收請求，調用服務層 (Service)，執行業務邏輯（如驗證學生資料、格式化數據等）。

5. 服務層與數據模型交互：服務層負責與數據模型 (Model) 交互，進行資料庫操作（如新增、查詢、更新或刪除）。

6. 數據模型與 MongoDB 交互：數據模型 (Model) 使用 Mongoose 與 MongoDB 進行資料交互，完成對數據庫的增、刪、改、查操作。

7. 結果返回：最終結果從數據庫返回給控制器，再經由路由層返回給前端。

8. 前端界面更新：前端接收後端的回應數據，更新界面顯示或彈出提示。