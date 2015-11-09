
var doFilter = function (textNode) {
    var $node = $(textNode);
    var val = $node.text().trim();

    if ($node.parents("script, a, :input").length == 0 && typeof val != 'undefined' && val.trim() != '') {

        var newVal = val;

        //US		
        newVal = newVal.replace(Rules.patternUS, Rules.createMatchEvaluator('US'));

        //TW		
        newVal = newVal.replace(Rules.patternTW, Rules.createMatchEvaluator('TW'));

        //CN    		
        newVal = newVal.replace(Rules.patternCN, Rules.createMatchEvaluator('CN'));

        //JP		
        newVal = newVal.replace(Rules.patternJP, Rules.createMatchEvaluator('JP'));

        //KR		
        newVal = newVal.replace(Rules.patternKo, Rules.createMatchEvaluator('KR'));

        //WO   	
        newVal = newVal.replace(Rules.patternWO, Rules.createMatchEvaluator('WO'));

        //EP		
        newVal = newVal.replace(Rules.patternEP, Rules.createMatchEvaluator('EP'));

        if (val != newVal) {
            var $newEl = $("<span>" + newVal + "</span>");

            $(".patentNumber").filter(function () {
                return $(this).parents(".patentNumber").length > 0;
            }).each(function () {
                console.log(this);
                $(this).find('.warningIcon').remove();
                $(this).contents().unwrap();
            });

            $newEl.find(".patentNumber.EP").click({ site: "EP", country: "EP" }, doPop);
            $newEl.find(".patentNumber.WO").click({ site: "WO", country: "WO" }, doPop);
            $newEl.find(".patentNumber.KR").click({ site: "KO", country: "KR" }, doPop);
            $newEl.find(".patentNumber.JP").click({ site: "JP", country: "JP" }, doPop);
            $newEl.find(".patentNumber.CN").click({ site: "CN", country: "CN" }, doPop);
            $newEl.find(".patentNumber.US").click({ site: "US", country: "US" }, doPop);
            $newEl.find(".patentNumber.TW").click({ site: "TW", country: "TW" }, doPop);

            $node.replaceWith($newEl);

        }
    }
}

$(function () {

    $('html').click(function () {
        $('.patentWindows').css({ top: $(document).innerHeight() - 600, opacity: "0", visibility: "hidden" });
        $('.patentNumber').removeClass('popNumber');
        $('.warningIcon').removeClass('popHint');
    });
});


function processData(data, $target) {

    $ul = $target.html("<iframe></iframe>").find("iframe");
    $ul.attr("src", data);
}

function doPop(e) {


    e.preventDefault();
    e.stopPropagation();

    var $this = $(this);
    var site = e.data.site;
    var data = $this.text().trim();

    //PN FORM
    switch (e.data.site) {
        case 'TW':
            data = data.replace(/Ⅰ/g, "I");
            if (/Taiwan|ROC/.test(data)) {
                var pn = padLeft(data.replace(/[^\d]/g, ""), 8);
            } else {
                var pn = data;
            }
            break;
        case 'US':
            if (/D\d/.test(data)) {
                var pn = 'D' + padLeft(data.replace(/[^\d]/g, ""), 7);
            } else {
                var pn = padLeft(data.replace(/[^\d]/g, ""), 8);
            }

            break;
        case 'JP':
            var pn = data.replace(/[^\d]/g, "");
            break;
        case 'EP':
            var pn = e.data.country + padLeft(data.replace(/[^\d]/g, ""), 7);
            break;
        case 'WO':
            var pn = data.replace(/[^\d]/g, "");
            if (pn.length == 9) {
                //Month
                pn = splice(pn, 4, 0, '0');
                pn = e.data.country + pn;
            } else if (pn.length == 8) {
                //Year
                pn = splice(pn, 0, 0, '19') + ',' + splice(pn, 0, 0, '20');
                pn = e.data.country + pn;

            } else if (pn.length == 7) {
                //Year + Month
                pn = splice(pn, 2, 0, '0');
                pn = e.data.country + splice(pn, 0, 0, '19') + "," + e.data.country + splice(pn, 0, 0, '20');
            } else {
                pn = e.data.country + data.replace(/[^\d]/g, "");
            }
            break;
        case 'KO':
            var pn = e.data.country + data.replace(/[^\d]/g, "");
            break;
        case 'CN':
            var data = data.replace(/\．/g, ".").replace(/\s/g, "");
            if (/zl/i.test(data)) {
                //APN zl201230348517.1 ->201230348517.1
                var pn = data.replace(/zl/gi, "").replace(/zl\./gi, "");
            } else if (/CN/i.test(data)) {
                if (data.length > 10) {
                    //CN200810128623.1 ->200810128623.1
                    var pn = data.replace(/CN/gi, "");
                } else {
                    //PN CN1185844A
                    var pn = data;
                }
            } else {
                // *201230348517.1
                var pn = data.match(/\d*\../i)[0];
            }
            break;
        default:
    }

    var id = pn.toString().replace(/[^\w]/g, "");
    var p = $this.offset();
    var $pop = $("#" + id);

    var positionLeftMin = 500;
    var positionLeftMax = $(document).innerWidth() - 500;

    var itemLeft = p.left - 204;
    var itemtStyle = 'center';

    if (itemLeft < positionLeftMin) {
        itemLeft = p.left;
        itemtStyle = 'left';
    } else if (itemLeft > positionLeftMax) {
        itemLeft = positionLeftMax;
        itemtStyle = 'right';
    }
    itemLeft = Math.round(itemLeft);
    var url = "http://webpat.tw/WEBPAT/WebExtension/WebExtensionPatentView?PN=" + pn + "&site=" + site + "&itemtStyle=" + itemtStyle;

    $('.patentWindows').css({ top: $(document).innerHeight() - 600, opacity: "0", visibility: "hidden" });
    if ($pop.length == 0) {

        $newPop = $("<div class='patentWindows' style='top " + (p.top + 20) + "px; left: -" + itemLeft + "px opacity: 0; visibility: hidden;background-color:transparent;box-shadow:none;border:none'   id='" + id + "'><iframe style='background-color:transparent;box-shadow:none;border:none;'  width='500px' height='580px' allowTransparency='true' src = '" + url + "'></iframe></div>");

        $this.append($newPop);
        $this.addClass('popNumber');
        $this.find('.warningIcon').addClass('popHint');
        $("body").append($newPop);

        $("#" + id).css({ left: itemLeft, top: (p.top + 10 + "px"), opacity: "1", visibility: "visible" });

    }
    else {
        $this.addClass('popNumber');
        $("#" + id).find('iframe').attr('src', url);
        $this.find('.warningIcon').addClass('popHint');
        $pop.css({ left: itemLeft, top: (p.top + 10 + "px"), opacity: "1", visibility: "visible" });
        $pop.focusin();
    }

}

function splice(val, idx, rem, s) {
    return (val.slice(0, idx) + s + val.slice(idx + Math.abs(rem)));
};


function padLeft(str, len) {
    str = '' + str;
    return str.length >= len ? str : new Array(len - str.length + 1).join("0") + str;
}

function textNodesUnder(el) {
    var n, a = [], walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    while (n = walk.nextNode()) {
        a.push(n);
    }
    return a;
}

$(function () {
    if (location.protocol == "https:") {
        return;
    }
    var allTxtNodes = textNodesUnder(document.body);

    for (var i = 0; i < allTxtNodes.length; i++) {
        doFilter(allTxtNodes[i]);
    }
});

