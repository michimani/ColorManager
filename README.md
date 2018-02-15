# ColorManager
カラーコードに関するjavascriptのライブラリです。
段階数と開始色コードを指定すると、開始色から指定した段階数でグラーデーションとなるようなカラーコードのリストを返します。

# 使い方

1. color_manager.js を読み込みます

    ```javascript
    <script type="text/javascript" src="./dist/color_manager.js"></script>
    ```

2. オブジェクトを生成します

    ```javascript
    const cm = new ColorManager();
    ```

3. 実行します

    1. ランダムでカラーコードを生成

        ```javascript
        let rand_hex = cm.randColor(); // 16進数 #fe125b
        let rand_agb = cm.randColor(true); // RGB [254, 18, 91]
        ```

    2. グラデーションカラーコードリストを生成

        ```javascript
        let gradHexList = cm.generateGradationColorListByHex(10, '#ff8975');
        let gradRgbList = cm.generateGradationColorListByRgb(10, [255,137,117]);
        ```

