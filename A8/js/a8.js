

function setAffairIds(affairId)
{
	//var input = document.getElementById("affairId");
	//input.value = affairId;
	$("#affairId").val(affairId);
	
	document.getElementById("collaboration").submit();
	
	//var doc = getDocInFrame(document, "origin");

}

function generateCSVAuto(frameIds, outFrameId, fields)
{
	var doc = getDocInFrame(document, "affairIds");
	var buttons = doc.getElementsByTagName("button");

	for (var i in buttons) {
		buttons[i].click();
		doc = getDocInFrame(document, "origin");
		$(doc).ready(function() {

			generateCSV(frameIds, outFrameId, fields);
		});
	}
}

function clearAffairIdInput()
{
	var inputText = document.getElementById("affairId");
	inputText.value = "";
}

function copyCSVToClipboard(csvFrameId)
{
	var docCSV = getDocInFrame(document, csvFrameId);
	var body = docCSV.body;
	//alert(body.innerHTML);
}

function fetchAffairIds(frameIds, tableId, outFrameId)
{
	var doc = getDocInFrameRecursive(document, frameIds);

	var table = doc.getElementById(tableId);
	var tbody = table.tBodies[0];
	var rows = tbody.rows;

	doc = getDocInFrame(document, outFrameId);
	clearDoc(doc);

	for (var i = 0; i < rows.length; i++) {
		var cell = rows[i].cells[1];
		var afId = cell.innerHTML.match(/affairId=(\-)?[0-9]+/)[0].match(/(\-)?[0-9]+/)[0];

		doc.write("<button type=\"button\" onclick=disabled=true;window.parent.setAffairIds(\"" + afId + "\")>");
		doc.write(afId);
		doc.write("</button>");
	}
}

function generateCSV(frameIds, outFrameId, fields)
{
	var doc = getDocInFrameRecursive(document, frameIds);

	var csv = "";
	for (var i in fields) {
		if (i > 0) {
			csv += ",";
		}
		csv += doc.getElementById(fields[i]).value;
	}

	doc = getDocInFrame(document, outFrameId);
	doc.writeln(csv + "<br>");

	doc = getDocInFrame(document, "curr");
	clearDoc(doc);
	doc.writeln(csv);
}




