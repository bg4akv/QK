

function setAffairIds(affairId)
{
	var input = document.getElementById("affairId");
	input.value = affairId;

	document.getElementById("collaboration").submit();
	
	var doc
	do {
		doc = getDocInFrame(document, "origin");
	} while (doc.readyState != "complete");
}

function generateCSVAuto(frameIds, outFrameId, fields)
{
	var doc = getDocInFrame(document, "affairIds");
	var buttons = doc.getElementsByTagName("button");

	for (var i in buttons) {
		buttons[i].click();
		//do {
			//doc = getDocInFrame(document, "origin");
		//} while (doc.readyState != "interactive");
		generateCSV(frameIds, outFrameId, fields);
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
		if (i > 0 && i % 5 == 0) {
			doc.write("<br>");
		}
	
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

function clearDocInFrame(doc, frameId)
{
	clearDoc(getDocInFrame(doc, frameId));
}

function clearDoc(doc)
{
	doc.body.innerText = "";
}

function getDocInFrameRecursive(doc, frameIds)
{
	for (var i in frameIds) {
		doc = getDocInFrame(doc, frameIds[i]);
	}
	return doc;
}

function getDocInFrame(doc, frameId)
{
	return doc.getElementById(frameId).contentWindow.document;
}



