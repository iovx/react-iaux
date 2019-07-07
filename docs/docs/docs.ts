import {loadMarkdown} from "../utils";

export function getDocsList() {
	const result = {};
	result['dialog/dialog'] = loadMarkdown('dialog/dialog');
	result['example'] = loadMarkdown('example');
	result['getStarted'] = loadMarkdown('getStarted');
	result['http/intro'] = loadMarkdown('http/intro');
	result['panel/form'] = loadMarkdown('panel/form');
	result['panel/imageCard'] = loadMarkdown('panel/imageCard');
	result['panel/loading'] = loadMarkdown('panel/loading');
	result['panel/pagination'] = loadMarkdown('panel/pagination');
	result['panel/picList'] = loadMarkdown('panel/picList');
	result['panel/progressbar'] = loadMarkdown('panel/progressbar');
	result['panel/slider'] = loadMarkdown('panel/slider');
	result['panel/wall'] = loadMarkdown('panel/wall');
	return result;
}