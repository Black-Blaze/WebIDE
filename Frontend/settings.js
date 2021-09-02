ace.edit(document.querySelector('.editor-window').id).session.setUseWrapMode(("true" === getCookie("cw")))
document.getElementById("toggle-cw").checked = ("true" === getCookie("cw"))
ace.edit(document.querySelector('.editor-window').id).renderer.setShowGutter(("true" === getCookie("g")));
document.getElementById("toggle-g").checked = ("true" === getCookie("cw"))
ace.edit(document.querySelector('.editor-window').id).session.setOption("enableEmmet", "true" === getCookie("e"));
document.getElementById("toggle-g").checked = ("true" === getCookie("cw"))


document.getElementById("toggle-cw").addEventListener('change', () => {
    ace.edit(document.querySelector('.editor-window').id).session.setUseWrapMode(document.getElementById("toggle-cw").checked);
    document.cookie ="cw=" + encodeURIComponent(String(document.getElementById("toggle-cw").checked)) + "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
})

document.getElementById("toggle-g").addEventListener('change', () => {
    ace.edit(document.querySelector('.editor-window').id).renderer.setShowGutter(document.getElementById("toggle-g").checked);
    document.cookie ="g=" + encodeURIComponent(String(document.getElementById("toggle-g").checked)) + "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
})

document.getElementById("toggle-e").addEventListener('change', () => {
    ace.edit(document.querySelector('.editor-window').id).setOption("enableEmmet", document.getElementById("toggle-e").checked);
    document.cookie ="e=" + encodeURIComponent(String(document.getElementById("toggle-e").checked)) + "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
})

