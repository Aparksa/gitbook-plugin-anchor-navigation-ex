require('./log');

const defaultConfig = {
    // Si le titre montre le numéro de niveau
    showLevel: true,
    // Le numéro de séquence de summary.md est-il égal à au numéro de série généré par le thème officiel par défaut
    associatedWithSummary: true,
    printLog: false,  
    multipleH1: true, // Plus qu'un H1? Normalement, un article n'a qu'un seul en-tête H1 pour un fichier md, désactiver cette option et le titre sera généré qu'une fois.
    // Mode: divisé en trois types: float: menu flottant、pageTop：menu en haut de page、null:Ne pas afficher la navigation
    mode: "float",
    float: { //Paramètres du menu flottant
        showLevelIcon: false,  //Indique si l'icône de niveau doit apparaître
        level1Icon: "fa fa-hand-o-right",
        level2Icon: "fa fa-hand-o-right",
        level3Icon: "fa fa-hand-o-right"
    },
    pageTop: {
        showLevelIcon: false,  //Indique si l'icône de niveau doit apparaître
        level1Icon: "fa fa-hand-o-right",
        level2Icon: "fa fa-hand-o-right",
        level3Icon: "fa fa-hand-o-right"
    },
    // Thème par défaut - Interrupteur de niveau
    themeDefault: {
        showLevel: false
    }
}

/**
 * Traitement des paramètres par défaut
 * @param defaultConfig
 * @param config
 */
function handler(defaultConfig, config) {
    if (config) {
        for (var item in defaultConfig) {
            if (item in config) {
                defaultConfig[item] = config[item];
            }
        }
    }
}
/**
 * Traitement de tous les paramètres de configuration
 * @param bookIns
 */
function handlerAll(bookIns) {
    var config = bookIns.config.get('pluginsConfig')['anchor-navigation-ex'];
    var themeDefaultConfig = bookIns.config.get('pluginsConfig')['theme-default'];
    handler(defaultConfig, config);
    handler(defaultConfig.themeDefault, themeDefaultConfig);

    if (config.isRewritePageTitle) {
        console.error("error:".error +
            "plugins[anchor-navigation-ex]：isRewritePageTitle Configuration supporte uniquement la version 0.3.x ，" +
            "Vérifiez ici https://github.com/Aparksa/gitbook-plugin-anchor-navigation-ex pour la dernière version de la configuration");
        console.log("");
        console.error("error:".error +
            "plugins[anchor-navigation-ex]：isRewritePageTitle Configuration only supports 0.3.x version，" +
            "Please check here https://github.com/Aparksa/gitbook-plugin-anchor-navigation-ex  for the latest version of the configuration item");
    }
}
/**
 * Partie config - Partage singleton
 * @type {{config: {showLevel: boolean, associatedWithSummary: boolean, mode: string, float: {showLevelIcon: boolean, level1Icon: string, level2Icon: string, level3Icon: string}, top: {showLevelIcon: boolean, level1Icon: string, level2Icon: string, level3Icon: string}, themeDefault: {showLevel: boolean}}, handler: handler, handlerAll: handlerAll}}
 */
module.exports = {
    config: defaultConfig,
    handler: handler,
    handlerAll: handlerAll
}
