# Personnalisation de la fonction plug-in, paramètres détaillés
Ce plug-in prend en charge la configuration des paramètres suivants: La configuration présentée ici est la configuration par défaut
```json
{
    "showLevel": true,
    "associatedWithSummary": true,
    "printLog": false,
    "multipleH1": true,
    "mode": "float",
    "float": {
        "showLevelIcon": false,
        "level1Icon": "fa fa-hand-o-right",
        "level2Icon": "fa fa-hand-o-right",
        "level3Icon": "fa fa-hand-o-right"
    },
    "pageTop": {
        "showLevelIcon": false,
        "level1Icon": "fa fa-hand-o-right",
        "level2Icon": "fa fa-hand-o-right",
        "level3Icon": "fa fa-hand-o-right"
    }
}
```
## showLevel : TYPE:boolean。
   Si le titre affiche le numéro de la hiérarchie, le titre de la page et le titre de la navigation seront affichés dans une hiérarchie. (Contrôler si le titre de la page est écrasé)

```
---- xx.md ---
# h1
## h2
### h3

L'effet de la page après l'affichage de la hiérarchie est le suivant：
1. h1
1.1. h2
1.1.1 h3
```
## associatedWithSummary : TYPE:boolean
    Le numéro de séquence sur la page est-il égal dans summary.md  au numéro de série généré par le thème par défaut。
```
thème par défaut：
 "pluginsConfig": {
        "anchor-navigation-ex": {
           "associatedWithSummary":true
        },
        "theme-default": {
            "showLevel": true
        }
 }
 ou：

 ----- SUMMARY.md ------
 # Summary

* [Installation](chapter/install.md)
* [Commande](chapter/command.md)
* [Configuration](chapter/bookjson.md)
* [Plugin](chapter/plugin.md)
    * [Mise en évidence du code prismjs](chapter/plugin/prismjs.md)
    * [Code en surbrillance -ace](chapter/plugin/ace.md)
    * [navigator](chapter/plugin/navigator.md)
 ...
```
Le résultat final est le suivant：
  ![image](https://raw.githubusercontent.com/zq99299/gitbook-plugin-anchor-navigation-ex/master/doc/images/层级关联显示.png)

## printLog : TYPE:boolean （V1.0.6+）
是否打印处理日志,在排查生成book失败的时候很有用，能知道是哪一个文件出的错
如下图：使用了别的插件，但是只打印了出错的信息，不知道是哪一个文件。开启该选项，就能知道了
![image](https://raw.githubusercontent.com/zq99299/gitbook-plugin-anchor-navigation-ex/master/doc/images/printlog.png)

## multipleH1 : TYPE:boolean  （V1.0.6+）
是否是多h1模式？一般正常的书籍一个章节只有一个h1标签，也就是一个md文件一个标签。如果您的书籍是这种正常模式，请关闭该选项=false
最大的区别如下
```
---- multipleH1=true----
# 多H1标题1
## 子标题
# 多H1标题2
## 子标题
## 子标题

生成的标题如下：
1. 多H1标题1
1.1. 子标题
2. 多H1标题2
2.1. 子标题
2.2. 子标题

---- multipleH1=false----
# 多H1标题1
## 子标题
# 多H1标题2
## 子标题
## 子标题

生成的标题如下：
多H1标题1
1. 子标题
多H1标题2
1. 子标题
2. 子标题

看出区别了么？正常书籍模式，也就是只有一个h1的情况下，这个展示的排序序号更符合我们的需求。
```

## mode
导航模式：分为三种

1. float ：浮动导航
2. pageTop ：页面内部顶部导航
3. '' : 不显示导航

## float
mode = float的时候以下配置生效
```
    float: { //浮动导航设置
        showLevelIcon: false,  //是否显示层级图标
        level1Icon: "fa fa-hand-o-right", //层级的图标css
        level2Icon: "fa fa-hand-o-right",
        level3Icon: "fa fa-hand-o-right"
    }
```
图标使用官网默认主题引入的css `http://fontawesome.dashgame.com/`

## pageTop
mode = pageTop的时候以下配置生效
```
pageTop: {
           showLevelIcon: false,
           level1Icon: "fa fa-hand-o-right",
           level2Icon: "fa fa-hand-o-right",
           level3Icon: "fa fa-hand-o-right"
       }
```

# 额外功能支持

- 在页面中增加`<extoc></extoc>`标签，会在此处生成TOC目录。
- 在页面中增加`<!-- ex_nonav -->`标识，会让此页面不生成悬浮导航

    在首页、介绍页等地方可以使用该功能，能屏蔽一些代码，因为这些地方不能加载css
