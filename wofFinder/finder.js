if (true) { //Date.now() < 1583010000000
    function getJSONP(url, success) {

        var ud = '_' + +new Date,
            script = document.createElement('script'),
            head = document.getElementsByTagName('head')[0]
                || document.documentElement;

        window[ud] = function (data) {
            head.removeChild(script);
            success && success(data);
        };

        script.src = url.replace('callback=?', 'callback=' + ud);
        head.appendChild(script);

    }
    nextAct();

    function openMap(x,z,server) {
        if (server){
            window.open("http://51.83.233.92:6841/index.html?worldname=earth&mapname=flat&zoom=7&x="  + x  + "&y=64&z=" + z, "_blank");
        } else{
            window.open("http://51.83.233.92:6841/index.html?worldname=earth&mapname=flat&zoom=7&x="  + x  + "&y=64&z=" + z, "_blank");
        }

    }


    function nextAct(){
        let targetPlace = document.getElementById('targetPlace');
        let cantFind = document.getElementById('cantFind');
        console.log(info);
        let btn = document.getElementById('findBtn');
        let input = document.getElementById('name_field');
        let table = document.getElementById('table');
        btn.addEventListener('click', function () {
            targetPlace.textContent = "";
            let unpackedCords;
            let server;
            unpackedCords = info.sets.factions_markerset.areas;
            server = 1;
            cantFind.innerText = "Can't find anything";
            table.innerHTML = '';
            let target = input.value.toUpperCase();
            let i = 1;
            let name;

            for (let [key, value] of Object.entries(unpackedCords)) {
                if (value.label.toUpperCase().substr(0,target.length) == target){
                    name = value.label;
                }
            }
            console.log("End: ", name);
            target = name;

            for (let [key, value] of Object.entries(unpackedCords)) {





                if (value.label.toUpperCase() == target.toUpperCase()) {
                    if (i == 1) {
                        targetPlace.innerText = target;
                        cantFind.innerText = "";
                        table.style.display = 'table';
                        let newThread = document.createElement("thead");
                        let newTr = document.createElement('tr');
                        let newTh = document.createElement('th');
                        newTh.textContent = "   #  ";
                        newTr.appendChild(newTh);
                        newTh = document.createElement('th');
                        newTh.textContent = "  x  ";
                        newTr.appendChild(newTh);
                        newTh = document.createElement('th');
                        newTh.textContent = "  z  ";
                        newTr.appendChild(newTh);
                        newThread.appendChild(newTr);
                        newTh = document.createElement('th');
                        newTh.textContent = "link";
                        newTr.appendChild(newTh);
                        newThread.appendChild(newTr);
                        table.appendChild(newThread);

                    }

                    let newThread = document.createElement("thead");
                    let newTr = document.createElement('tr');
                    let newTd = document.createElement('td');
                    newTd.textContent = i;
                    newTr.appendChild(newTd);
                    newTd = document.createElement('td');
                    newTd.textContent = value.x[0];
                    newTr.appendChild(newTd);
                    newTd = document.createElement('td');
                    newTd.textContent = value.z[0];
                    newTr.appendChild(newTd);

                    newTd = document.createElement('td');
                    newTd.textContent = 'On map';
                    newTd.style.color = "#E27D60";
                    newTd.setAttribute('onclick', "openMap(" + value.x[0]+"," + value.z[0] + "," + server + ")" );
                    newTr.appendChild(newTd);

                    newThread.appendChild(newTr);
                    table.appendChild(newThread);


                    i += 1

                }

            }

        });
    }

}
