# 我的餐廳清單 資料庫版
本專案是以[我的餐廳清單](https://github.com/av124773/restaurant_list)專案為基礎，加入 MongoDB 資料庫管理網頁上的餐廳資訊。本專案繼承之前專案的功能外，另外新增了瀏覽餐廳詳細資訊、新增一筆餐廳資訊、修改餐廳資訊和刪除餐廳等功能。

## 產品功能
### 基處專案功能
- 使用者可以在主要頁面查看餐廳名稱、類型及評分
- 使用者可以點選任一餐廳，查看地址、電話、餐廳簡述等詳細資訊
- 使用者可以在搜尋欄中輸入中、英文店名或餐廳類型等關鍵字來尋找餐廳
- 使用者可以點選網頁頂部的 "我的餐廳清單" 返回主要頁面

### 資料庫版專案新增功能
- 使用者可以點選餐廳資訊卡下方的 Detail，進入餐廳詳細資訊頁面
- 使用者可以點選餐廳資訊卡下方的 Edit，進入指定餐廳的資訊編輯頁面
- 使用者可以點選餐廳資訊卡下方的 Delete，刪除指定餐廳
- 使用者可以點選固定在首頁右下角的 "新增餐廳" 按鈕來新增餐廳
- 使用者可以在餐廳詳細資訊頁面，執行 Edit 和 Delete 的功能

## 使用工具
1. Node.js v12.22.12
2. Express v4.16.4
3. Express-Handlebars v3.0.0
4. Bootstrap v5.1.3
5. Visual Studio Code
6. Robo 3T v1.4
7. Mongoose v5.9.7
8. dotenv v16.0.3
9. MongoDB Atlas

## 安裝流程
1. 開啟終端機(Terminal)，使用指令 `cd` 移動到想安裝檔案的位置
```
cd <想安裝檔案的路徑>
```
2. 執行 `git clone` 指令，下載檔案
```
git clone https://github.com/av124773/restaurantListUseMongoDB.git
```
3. 下載完成後，移動至專案資料夾內，使用 `npm install` 安裝需要的套件
```
cd restaurantListUseMongoDB

npm install
```
4. 完成後輸入指令執行專案
```
npm run start
```
5. 專案啟動後，打開瀏覽器輸入網址[http://localhost:3001](http://localhost:3001)
### 執行錯誤解決方法
如果執行後發生以下錯誤
```
Error [MongooseError]: The `uri` parameter to `openUri()` must be a string, 
got "undefined". Make sure the first parameter to `mongoose.connect()` or 
`mongoose.createConnection()` is a string.

```
可能是因為沒有將資料庫連結設定至環境變數，這時請在專案資料夾中新增檔案 `.env`
```
touch .env
```
使用 VScode 或記事本開起，在該檔案中加入資料庫連結，例如：
```
MONGODB_URI=mongodb+srv://<帳號>:<密碼>@cluster0.n3idk03.mongodb.net/<資料庫名稱>?retryWrites=true&w=majority
```

