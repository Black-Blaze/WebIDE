directory = {
    "public1" : {
        indexjs  : "index.js",
        indexhtml: "index.html",
        "public2" : {
            indexjs  : "index.js",
            indexhtml: "index.html"
        }
    },
    test:"test"
}

function showFiles(dir) {
    tar = document.getElementById("FMBody");
    rv = [];
    getFile(dir,0,rv).forEach(span => {
        tar.appendChild(span)
    })
}

function getFile(dir,depth,rv) {
    index = rv.length;
    for(const [key,value] of Object.entries(dir)){
        if(typeof value === "string") {
            rv[index] = document.createElement("div")
            rv[index].innerHTML = "-".repeat(depth) + value;
            console.log({dir,key,value});
            console.log(rv);
            console.log(rv[index].innerHTML);
        } else {
            rv[index] = document.createElement("div")
            console.log({dir,key,value});
            console.log(rv[index]);
            rv[index].innerHTML = key + "(Folder)";
            getFile(value,depth+1,rv);
            index = rv.length;
        }
    }
    return rv
}



showFiles(directory);