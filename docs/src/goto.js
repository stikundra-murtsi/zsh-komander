export function togo(a) {
	location.href = `${a}`;
}

document.getElementById("site_general").onclick = () => togo("index.html");
document.getElementById("goto_download").onclick = () => togo("download.html");
