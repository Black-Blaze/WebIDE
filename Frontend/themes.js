oldBGC = null;
oldPNC = null;

fetch("https://api.github.com/repos/ajaxorg/ace/git/trees/e8fc7fc8b9e23fa67b506a0f12da0d6805586188?recursive=1")
.then((response) => {
    response.json().then((data) => {
        themes = []
        for (var i = 0; i < data.tree.length; i++) {
            if(i % 2 === 0) {
                themes.push(data.tree[i].path.substring(0,data.tree[i].path.length - 4).replace("_", " ").replace("theme-",""));
            }
        }

        themes.forEach((name) => {
            themeEntry = document.createElement("span")
            themeEntry.innerHTML = name
            themeEntry.setAttribute("onclick","setTheme(\"" + name + "\")")
            document.querySelector("#theme-dropdown").appendChild(themeEntry);
        })
    })
});

function themesButton(inp) {
  if(inp === null || inp === undefined){
    document.getElementById("theme-dropdown").classList.toggle("show");
  }else{
    if(inp)
    document.getElementById("theme-dropdown").classList.add("show");
    else if(!inp)
    document.getElementById("theme-dropdown").classList.remove("show");
  }
}
  
  function filterFunction() {
    var input, filter, ul, li, span, i;
    input = document.getElementById("theme-search-input");
    filter = input.value.toUpperCase();
    div = document.getElementById("theme-dropdown");
    span = div.getElementsByTagName("span");
    for (i = 0; i < span.length; i++) {
      txtValue = span[i].textContent || span[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        span[i].style.display = "";
      } else {
        span[i].style.display = "none";
      }
    }
}

function setTheme(themeName,toggle) {
    ace.edit(document.querySelector('#main-editor').id).setTheme("ace/theme/" + themeName.replace(" ", "_"));
    themesButton(toggle)
    document.querySelector(".dropbtn").innerHTML = themeName;
    document.cookie ="theme=" + encodeURIComponent(themeName) + "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
    patchBodyColors()
}

function setTheme(themeName,toggle) {
    oldBGC = getStyle(document.querySelector(".ace_editor"),"background-color")
    oldPNC = getStyle(document.querySelector(".ace_gutter"),"background-color")
    ace.edit(document.querySelector('#main-editor').id).setTheme("ace/theme/" + themeName.replace(" ", "_"));
    themesButton(toggle)
    document.querySelector(".dropbtn").innerHTML = themeName;
    document.cookie ="theme=" + encodeURIComponent(themeName) + "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
    patchBackgroundColor()
    patchPaneColor()
}

function patchBackgroundColor() {
    if (!(getStyle(document.querySelector(".ace_editor"),"background-color") === oldBGC)) {
        document.documentElement.style.setProperty('--background-color', 
        getStyle(document.querySelector(".ace_editor"),"background-color"));
        oldBGC = getStyle(document.querySelector(".ace_editor"),"background-color")
    }else {
        setTimeout(patchBackgroundColor, 10);
    }
}

function patchPaneColor() {
    if (!(getStyle(document.querySelector(".ace_gutter"),"background-color") === oldPNC)) {
        document.documentElement.style.setProperty('--pane-color', 
        getStyle(document.querySelector(".ace_gutter"),"background-color"));
        document.documentElement.style.color = getStyle(document.querySelector(".ace_gutter"),"color");
        oldPNC = getStyle(document.querySelector(".ace_gutter"),"background-color")
        document.querySelector("iframe").contentWindow.postMessage({
            pane_color: oldPNC,
            background_color: oldBGC,
            color: document.documentElement.style.color
        }, "*")
    }else {
        setTimeout(patchPaneColor, 10);
    }
}

if(!document.documentElement.style.getPropertyValue('--background-color')){
  document.documentElement.style.setProperty('--background-color', "rgb(32, 32, 32)");
  document.documentElement.style.setProperty('--pane-color', "rgb(32, 32, 32)");
}
function getStyle(el,styleName)
{
    if (el.currentStyle)
        return el.currentStyle[styleName];
    return document.defaultView.getComputedStyle(el,null)[styleName];
}

if(getCookie("theme")) setTheme(getCookie("theme"))
else setTheme("ambiance")

document.querySelector("iframe").contentWindow.postMessage({
    pane_color: oldPNC,
    background_color: oldBGC,
    color: document.documentElement.style.color
}, "*")