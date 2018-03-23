var cheerio = require('cheerio');
var slug = require('github-slugid');
var Config = require('./config.js');


/**
 * Traitement du toc relatif, traitement des titres et id
 * @param $
 * @param option
 * @param page
 * @returns {Array} Renvoi les tocs traités
 */
function handlerTocs($, page) {
    var config = Config.config;
    var tocs = [];
    var count = {
        h1: 0,
        h2: 0,
        h3: 0
    };
    var titleCountMap = {}; // enregistre le nombre de fois que le titre apparaît
    var h1 = 0, h2 = 0, h3 = 0;
    $(':header').each(function (i, elem) {
        var header = $(elem);
        var id = addId(header, titleCountMap);

        if (id) {
            switch (elem.tagName) {
                case "h1":
                    handlerH1Toc(config, count, header, tocs, page.level);
                    break;
                case "h2":
                    handlerH2Toc(config, count, header, tocs, page.level);
                    break;
                case "h3":
                    handlerH3Toc(config, count, header, tocs, page.level);
                    break;
                default:
                    titleAddAnchor(header, id);
                    break;
            }
        }
    });
    // La réécriture du titre n'a aucun effet, si vous n'appelez pas cette phrase à l'extérieur
    page.content = $.html();
    return tocs;
}

/**
 * gestion des ancres
 * @param header
 * @param titleCountMap - enregistre le nombre de fois que le titre apparaît
 * @returns {string}
 */
function addId(header, titleCountMap) {
    var id = header.attr('id') || slug(header.text());
    var titleCount = titleCountMap[id] || 0;
    titleCountMap[id] = titleCount + 1;
    // console.log('id:', id, 'n:', titleCount, 'hashmap:', titleCountMap)
    if (titleCount) {//Ce titre existe déjà - null/undefined/0/NaN/ Lorsque les expressions sont toutes interprétées comme:false
        id = id + '_' + titleCount;
    }
    header.attr("id", id);
    return id;
}

/**
 * LIndentation des ancres
 * @param header
 * @param id
 */
function titleAddAnchor(header, id) {
    header.prepend('<a name="' + id + '" class="anchor-navigation-ex-anchor" '
        + 'href="#' + id + '">'
        + '<i class="fa fa-link" aria-hidden="true"></i>'
        + '</a>');
}

/**
 * Ancre h1
 * @param count - decompte
 * @param header
 * @param tocs 
 */
function handlerH1Toc(config, count, header, tocs, pageLevel) {
    var title = header.text();
    var id = header.attr('id');
    var level = ''; //Hiérarchie

    if (config.showLevel) {
        //L'affichage hiérarchique est uniquement traité si besoin 
        count.h1 += 1;
        count.h2 = 0;
        count.h3 = 0;
        if(config.multipleH1){
            level = count.h1 + '. ';
        }else{
            level = ' ';
        }
        // Indique s'il est associé au numéro par défaut du summary.md
        if (config.associatedWithSummary && config.themeDefault.showLevel) {
            level = pageLevel + '.' + level;
        }
        header.text(level + title); //Réécriture de l'en-tête
    }
    titleAddAnchor(header, id);
    tocs.push({
        name: title,
        level: level,
        url: id,
        children: []
    });
}
/**
 * ancre h2
 * @param count - décompte
 * @param header
 */
function handlerH2Toc(config, count, header, tocs, pageLevel) {
    var title = header.text();
    var id = header.attr('id');
    var level = ''; //Hiérarchie

    if (tocs.length <= 0) {
        titleAddAnchor(header, id);
        return;
    }

    var h1Index = tocs.length - 1;
    var h1Toc = tocs[h1Index];
    if (config.showLevel) {
        count.h2 += 1;
        count.h3 = 0;
        if(config.multipleH1){
            level = (count.h1 + '.' + count.h2 + '. ');
        }else{
            level = (count.h2 + '. ');
        }
        if (config.associatedWithSummary && config.themeDefault.showLevel) {
            level = pageLevel + '.' + level;
        }
        header.text(level + title); //Réécriture de l'en-tête
    }
    titleAddAnchor(header, id);
    h1Toc.children.push({
        name: title,
        level: level,
        url: id,
        children: []
    });
}
/**
 * ancre h3
 * @param count - décompte
 * @param header
 */
function handlerH3Toc(config, count, header, tocs, pageLevel) {
    var title = header.text();
    var id = header.attr('id');
    var level = ''; //Hiérarchie

    if (tocs.length <= 0) {
        titleAddAnchor(header, id);
        return;
    }
    var h1Index = tocs.length - 1;
    var h1Toc = tocs[h1Index];
    var h2Tocs = h1Toc.children;
    if (h2Tocs.length <= 0) {
        titleAddAnchor(header, id);
        return;
    }
    var h2Toc = h1Toc.children[h2Tocs.length - 1];

    if (config.showLevel) {
        count.h3 += 1;
        if(config.multipleH1){
            level = (count.h1 + '.' + count.h2 + '.' + count.h3 + '. ');
        }else{
            level = (count.h2 + '.' + count.h3 + '. ');
        }
        if (config.associatedWithSummary && config.themeDefault.showLevel) {
            level = pageLevel + "." + level;
        }
        header.text(level + title); //Réécriture de l'en-tête
    }
    titleAddAnchor(header, id);
    h2Toc.children.push({
        name: title,
        level: level,
        url: id,
        children: []
    });
}

/**
 * menu flottant
 * @param option
 * @param tocs
 * @param page
 */
function handlerFloatNavbar($, tocs, page) {
    var config = Config.config;
    var float = config.float;
    var level1Icon = '';
    var level2Icon = '';
    var level3Icon = '';
    if (float.showLevelIcon) {
        level1Icon = float.level1Icon;
        level2Icon = float.level2Icon;
        level3Icon = float.level3Icon;
    }

    var html = "<div id='anchor-navigation-ex-navbar'><i class='fa fa-anchor'></i><ul>";
    for (var i = 0; i < tocs.length; i++) {
        var h1Toc = tocs[i];
        html += "<li><span class='title-icon " + level1Icon + "'></span><a href='#" + h1Toc.url + "'><b>" + h1Toc.level + "</b>" + h1Toc.name + "</a></li>";
        if (h1Toc.children.length > 0) {
            html += "<ul>"
            for (var j = 0; j < h1Toc.children.length; j++) {
                var h2Toc = h1Toc.children[j];
                html += "<li><span class='title-icon " + level2Icon + "'></span><a href='#" + h2Toc.url + "'><b>" + h2Toc.level + "</b>" + h2Toc.name + "</a></li>";
                if (h2Toc.children.length > 0) {
                    html += "<ul>";
                    for (var k = 0; k < h2Toc.children.length; k++) {
                        var h3Toc = h2Toc.children[k];
                        html += "<li><span class='title-icon " + level3Icon + "'></span><a href='#" + h3Toc.url + "'><b>" + h3Toc.level + "</b>" + h3Toc.name + "</a></li>";
                    }
                    html += "</ul>";
                }
            }
            html += "</ul>"
        }
    }

    html += "</ul></div><a href='#" + tocs[0].url + "' id='anchorNavigationExGoTop'><i class='fa fa-arrow-up'></i></a>";

    page.content = html + $.html();
}

function handlerPageTopNavbar($, tocs, page) {
    var html = buildTopNavbar($, tocs, page);
    html += "<a href='#" + tocs[0].url + "' id='anchorNavigationExGoTop'><i class='fa fa-arrow-up'></i></a>";
    page.content = html + $.html();
}

function buildTopNavbar($, tocs, page) {
    var config = Config.config;
    var pageTop = config.pageTop;
    var level1Icon = '';
    var level2Icon = '';
    var level3Icon = '';
    if (pageTop.showLevelIcon) {
        level1Icon = pageTop.level1Icon;
        level2Icon = pageTop.level2Icon;
        level3Icon = pageTop.level3Icon;
    }

    var html = "<div id='anchor-navigation-ex-pagetop-navbar'><ul>";
    for (var i = 0; i < tocs.length; i++) {
        var h1Toc = tocs[i];
        html += "<li><span class='title-icon " + level1Icon + "'></span><a href='#" + h1Toc.url + "'><b>" + h1Toc.level + "</b>" + h1Toc.name + "</a></li>";
        if (h1Toc.children.length > 0) {
            html += "<ul>"
            for (var j = 0; j < h1Toc.children.length; j++) {
                var h2Toc = h1Toc.children[j];
                html += "<li><span class='title-icon " + level2Icon + "'></span><a href='#" + h2Toc.url + "'><b>" + h2Toc.level + "</b>" + h2Toc.name + "</a></li>";
                if (h2Toc.children.length > 0) {
                    html += "<ul>";
                    for (var k = 0; k < h2Toc.children.length; k++) {
                        var h3Toc = h2Toc.children[k];
                        html += "<li><span class='title-icon " + level3Icon + "'></span><a href='#" + h3Toc.url + "'><b>" + h3Toc.level + "</b>" + h3Toc.name + "</a></li>";
                    }
                    html += "</ul>";
                }
            }
            html += "</ul>"
        }
    }

    html += "</ul></div>";

    return html;
}

function start(bookIns, page) {
    var $ = cheerio.load(page.content);
    var tocs = handlerTocs($, page);

    if (tocs.length == 0) {
        page.content = $.html();
        return;
    }
    if(!/<!--[ \t]*ex_nonav[ \t]*-->/.test(page.content)){
        var config = Config.config;
        var mode = config.mode;
        if (mode == 'float') {
            handlerFloatNavbar($, tocs, page);
        } else if (mode == 'pageTop') {
            handlerPageTopNavbar($, tocs, page);
        }
    }

    var $x = cheerio.load(page.content);
    $x('extoc').replaceWith($x(buildTopNavbar($, tocs, page)));
    page.content = $x.html();
}

module.exports = start;
