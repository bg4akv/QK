

function setArea(area)
{
	var input = document.getElementById("area");
	input.value = area;

	document.getElementById("roomList").submit();
}

function clearAreaInput()
{
	var inputText = document.getElementById("area");
	inputText.value = "";
}


function fetchAreas(frameIds, outFrameId)
{
	var doc = getDocInFrameRecursive(document, frameIds);
	var sel = doc.getElementById("dll_Area_server");
	var opts = sel.options;

	doc = getDocInFrame(document, outFrameId);
	clearDoc(doc);

	for (var i = 0; i < opts.length; i++) {
		var opt = opts[i];

		var area = opt.value;

		doc.write("<button type=\"button\" onclick=disabled=true;window.parent.setArea(\"" + area + "\")>");
		doc.write(opt.value + "-" + opt.text);
		doc.write("</button>");
	}
}

function generateCSV(frameIds, outFrameId)
{
	var doc = getDocInFrameRecursive(document, frameIds);
	var sel = doc.getElementById("dll_Area_server");
	sel.selectedIndex;
	var opt = sel.options[sel.selectedIndex];

	var total = doc.getElementById("MyPager1_lblRsCount").innerHTML;

	var csv = opt.value + "," + opt.text + "," + total;

	doc = getDocInFrame(document, outFrameId);
	doc.writeln(csv + "<br>");

	doc = getDocInFrame(document, "curr");
	clearDoc(doc);
	doc.writeln(csv);
}




