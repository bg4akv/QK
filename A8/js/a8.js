

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

	doc = getDocInFrame(document, "origin");
	var iframe = document.getElementById("origin");

	for (var i in buttons) {
		if (!buttons[i].disabled) {
			iframe.src = "www.google.com"; 

			$(doc).ready(function() {
				setTimeout(function() {
					generateCSV(frameIds, outFrameId, fields);
				}, 800);
			});
			
			buttons[i].click();
			buttons[i].style.color = "red";
			break;
		}
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

		doc.write("<button type=\"button\" style=\"width:80px;height:50px;\" onclick=disabled=true;window.parent.setAffairIds(\"" + afId + "\")>");
		doc.write(i + 1);
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




