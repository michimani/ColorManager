# ColorManager
カラーコードに関するjavascriptのライブラリです。
段階数と開始色コードを指定すると、開始色から指定した段階数でグラーデーションとなるようなカラーコードのリストを返します。

# 使い方

```
<script type="text/javascript" src="./src/color_manager.js"></script>
    <script type="text/javascript">
        var cm = new ColorManager();
        console.log(JSON.stringify(cm.generateGradationColorListByHex(10, '#ff8975'), null, "\t"));

        /*****
            [
                "#ffb375",
                "#f9ff75",
                "#a7ff75",
                "#75ff95",
                "#75ffe7",
                "#75c5ff",
                "#7775ff",
                "#c975ff",
                "#ff75e3",
                "#ff7591"
            ]
        *****/
```

