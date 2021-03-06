
let thiagoPadawan = {
    table: document.querySelector('table'),
    thead: document.querySelector('table thead'),
    tbody: document.querySelector('table tbody'),
    tfoot: document.querySelector('table tfoot'),
    anterior: document.querySelector('table tfoot button#prev'),
    proximo: document.querySelector('table tfoot button#next'),
    paginationNumber: document.querySelector('table tfoot td.pages'),
    limit: 19,
    paginas: 0,
    page: 0,
    min: 0,
    max: 20,
    totalData: 0,
    json: null,
    ajax(url) {
        fetch(url)
            .then(response => response.json())
            .then((json) => {
                thiagoPadawan.json = json;
                thiagoPadawan.totalData = json.length;
                thiagoPadawan.rendertable(0, 20);
                thiagoPadawan.clickNext();
                thiagoPadawan.clickPrev();
            });

    },
    limitContentPages(min, max) {
        return thiagoPadawan.json.filter((v, i) => {
            return i >= min && i < max;
        })
    },
    insertColunsTable(data, newTR) {
        let newTD = newTR.insertCell();
        let newText = document.createTextNode(data);
        newTD.appendChild(newText);

    },
    clickNext() {
        thiagoPadawan.proximo.onclick = (e) => {
            if (thiagoPadawan.page >= (thiagoPadawan.paginas - 1)) {
                return;
            }
            thiagoPadawan.page += 1;
            thiagoPadawan.min += 20;
            thiagoPadawan.max += 20;
            thiagoPadawan.rendertable(thiagoPadawan.min, thiagoPadawan.max);

        };
    },
    clickPrev() {
        thiagoPadawan.anterior.onclick = (e) => {
            if (thiagoPadawan.page < 1) {
                return;
            }
            thiagoPadawan.page -= 1;
            thiagoPadawan.min -= 20;
            thiagoPadawan.max -= 20;
            thiagoPadawan.rendertable(thiagoPadawan.min, thiagoPadawan.max);

        };
    },
    putThead(data) {
        thiagoPadawan.thead.innerHTML = "";
        let newTR = thiagoPadawan.thead.insertRow();
        for (let index = 0; index < data.length; index++) {
            thiagoPadawan.insertColunsTable(data[index], newTR);
        }
    },
    rendertable(min, max) {
        this.tbody.innerHTML = "";
        this.paginas = thiagoPadawan.json.length / 20;
        let newJSON = thiagoPadawan.limitContentPages(min, max);
        let keys = Object.keys(newJSON[0]);
        this.putThead(keys);
        newJSON.forEach((dados, indice) => {
            let newTR = thiagoPadawan.tbody.insertRow();
            for (let index = 0; index < keys.length; index++) {
                thiagoPadawan.insertColunsTable(dados[keys[index]], newTR);
            }
        });
        this.putPages();

    },
    putPages() {
        thiagoPadawan.paginationNumber.innerText = (thiagoPadawan.page + 1) + " de " + thiagoPadawan.paginas;
    },
    init(url) {

        this.ajax(url);
    }

}


