var Rules = {};

Rules.createMatchEvaluator = function createMatchEvaluator(name) {
	return function (entry) {
		if (entry.trim().length > 5) {
			return "<span class='patentNumber " + name + "' href='#' >" + entry + "<div class='warningIcon'></div></span>";
		}
	}
}

Rules.patternUS = /US[\s\d\,\-]{6,12}|美國[^\d]{0,20}專利[^\d]{0,20}[\d\,\s]{6,14}|美国[^\d]{0,20}专利[^\d]{0,20}[\d\,\s]{6,14}|USD[\s\d\,]{6,12}|US\sPatent\sNo.[\d\,\s]{6,12}|U.S.\sPatent\sNo.[\d\,\s]{6,12}|U.S.[^\d]{0,20}Patent[^\d]{0,20}[\d\,\s]{6,14}/gi;

Rules.patternTW = /[I|M|D|Ⅰ|Ｍ|Ｄ][\d]{6}|[I|M|D|Ⅰ|Ｍ|Ｄ][\d\s]{6,10}|Taiwan\sPatent[^\d]{0,20}[\d\,\s\-]{6,14}|ROC\sPatent\sNO.[\d\,\s\-]{6,14}/gi;

Rules.patternCN = /ZL.\d{8,12}[\.\．][\w\s]{1,2}|ZL\d{8,12}[\.\．][\w\s]{1,2}|中國[^\d]{0,20}專利[^\d]{0,20}[\d\,\s]{6,14}[\.\．][\w\s]{1,2}|大陸[^\d]{0,20}專利[^\d]{0,20}[\d\,\s]{6,14}[\.\．][\w\s]{1,2}|CN[\d\s]{7,20}.\w|CN[\d\s]{7,20}|ZL[\d\s]{8,24}[\.\．][\w\s]{1,2}|专利号[^\d]\d{8,12}[\.\．][\w\s]{1,2}|Chinese\sPatent\sNo.[\d\,\s]{6,14}|China\sPatent\sNo.[\d\,\s]{6,14}[\.\．][\w\s]{1,2}/gi;

Rules.patternJP = /特平[^\d]{0,20}[\d\,\s\-]{7,14}|特許[^\d]{0,20}[\d\,\s\-]{7,14}|特開[^\d]{0,20}[\d\,\s\-]{7,14}|JP\sPatent[^\d]{0,20}[\d\,\s\-]{7,14}|Japan\sPatent[^\d]{0,20}[\d\,\s\-]{7,14}|日本專利\s[\(]專利證書號.\d{7}[\)]|日本發明第\d{7}號|JP[\d\s]{7,20}|Japanese\sPatent[^\d]{0,20}[\d\,\s\-]{7,14}|日本[^\d]{0,20}特許[^\d]{0,20}[\d\,\s]{7,14}|JP[^\d]{0,20}特許[^\d]{0,20}[\d\,\s]{7,14}/gi;

Rules.patternKo = /KR\sPatent\sApplication\sNo[\d\-]{7,21}|KR\d{7,20}|Korea[^\d]{0,20}Patent[^\d]{0,20}[\d\,\s\-]{6,14}/gi;

Rules.patternWO = /WO[\S]\d{4,10}[\S]\d{6,10}|WO\sApplication\sNo.{7,21}|WO[\d\s]{7,20}|WO\d{7}|WO[^\d]{0,20}\d{4}[/][\d\,\-\s]{6,14}|WO[^\d]{0,20}patent[^\d]{0,20}[\d\,\s]{6,14}/gi;

Rules.patternEP = /Europe\sPatents:\sEP[\d\,\s\:\.]{7,20}|歐洲第\d{7}號|European\sPatent\sNo[\d\,\s\:\.]{7,20}|Europe\sPatent\sNo[\d\,\s\:\.]{7,20}|EP[\d\s\,]{7,20}|EP\d{7}|EP\sPatent[^\d]{0,20}[\d\,\s\-]{7,14}|European[^\d]{0,20}Patent[^\d]{0,20}[\d\,\s]{6,14}/gi;

if (typeof module != 'undefined')
{
	module.exports = Rules;
}