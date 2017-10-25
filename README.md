# ColorManager
カラーコードに関するjavascriptのライブラリです。  
段階数と開始色コードを指定すると、開始色から指定した段階数でグラーデーションとなるようなカラーコードのリストを返します。

# 使い方

```
<script src="https://rawgit.com/michimani/ColorManager/master/src/color_manager.min.js"></script>
<script type="text/javascript">
    var c = new ColorManager();
    var gen_num = 10;
    var base_color_code = '#9ef442';
    var color_code_list = c.generateColorCode(gen_num, base_color_code);

    console.log(color_code_list);

    /*
     (10) [
            "#f4e042",
            "#f47642",
            "#f44278",
            "#f442e2",
            "#9c42f4",
            "#4252f4",
            "#42bcf4",
            "#42f4c2",
            "#42f458",
            "#96f442"
        ]
    */
</script>
```

※CDNとしての利用はサンプルでの利用を目的としていますので、利用される場合はダウンロードしてサーバに設置をして利用されることを推奨します。
