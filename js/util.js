
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