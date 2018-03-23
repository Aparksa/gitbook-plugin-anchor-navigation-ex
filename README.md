# gitbook-plugin-anchor-navigation-ex

[![GitHub issues](https://img.shields.io/github/issues/zq99299/gitbook-plugin-anchor-navigation-ex.svg)](https://github.com/zq99299/gitbook-plugin-anchor-navigation-ex/issues) [![GitHub issues](https://img.shields.io/github/issues-closed/zq99299/gitbook-plugin-anchor-navigation-ex.svg)](https://github.com/zq99299/gitbook-plugin-anchor-navigation-ex/issues?q=is%3Aissue+is%3Aclosed) [![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://raw.githubusercontent.com/zq99299/gitbook-plugin-anchor-navigation-ex/master/LICENSE) [![npm](https://img.shields.io/npm/v/gitbook-plugin-anchor-navigation-ex.svg)](https://www.npmjs.com/package/gitbook-plugin-anchor-navigation-ex) [![npm](https://img.shields.io/npm/dt/gitbook-plugin-anchor-navigation-ex.svg)](https://www.npmjs.com/package/gitbook-plugin-anchor-navigation-ex)



===============	【DOC：中文，[English](https://github.com/zq99299/gitbook-plugin-anchor-navigation-ex/blob/master/doc/README_EN.md) 】================

===============	【UpdateRecord：[中文](https://github.com/zq99299/gitbook-plugin-anchor-navigation-ex/blob/master/doc/updateRecord.md)，[English](https://github.com/zq99299/gitbook-plugin-anchor-navigation-ex/blob/master/doc/updateRecord-en.md)】================



-----

:exclamation: Le plug-in n'est pas compatible avec V1.xV1.x

# Caractéristiques
- [x] Ajouter un effet d'ancrage à la page (H1-H6)
- [x] Mode de menu flottant
- [x] Mode de menu en haut de la page
- [x] Afficher l'icône de navigation devant le titre et affichage personnalisé de l'icône hiérarchique du H1-H3
- [x] plugins["theme-default"],Hiérarchie des titres de page par défaut`showLevel`et association hiérarchique
- [x] plugins["theme-default"],Prend en charge les styles du thème par défaut：White、Sepia、Night
- [x] Ajouter en haut de la page`<extoc></extoc>` pour générer le TOC
- [x] Ajouter`<!-- ex_nonav -->`pour ne pas ajouter de menu flottant
- [x] config.printLog=true,Imprimer la progression du traitement en cours, pour le dépannage
- [x] config.multipleH1=false

# Effet
* style minimaliste
* [Cliquez pour voir les rendus](https://github.com/Aparksa/gitbook-plugin-anchor-navigation-ex/blob/master/doc/effectScreenshot.md)


# Comment l'utiliser？

Dans votre `book.json` Ajouter le plugin：

```
{
  "plugins": [
       "anchor-navigation-ex"
  ]
}
```
Ensuite, installez le plugin:

```
$ gitbook install ./
```

et c'est prêt, configuration détaillée du plug-in，[cliquez ici pour voir](https://github.com/Aparksa/gitbook-plugin-anchor-navigation-ex/blob/master/doc/config.md)


Ou installez le plug-in séparément

```
$ npm install gitbook-plugin-anchor-navigation-ex --save
```

>open npm : https://www.npmjs.com/package/gitbook-plugin-anchor-navigation-ex


# Remerciements
Ce plug-in s'inspire des plug-ins suivants

1. https://github.com/zhangzq/gitbook-plugin-navigator
2. https://github.com/yaneryou/gitbook-plugin-anchor-navigation

