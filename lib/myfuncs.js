export function countUnique(arr) {
    const counts = {};
     for (var i = 0; i < arr.length; i++) {
        counts[arr[i]] = 1 + (counts[arr[i]] || 0);
     };
     return counts;
}

export function getColumn(dataArr, colName) {
    const cols = []
    dataArr.forEach(row => {
      cols.push(row[colName])
    })
    return cols
}

export const printDatasetAtEvent = (dataset) => {
    if (!dataset.length) return;
    const datasetIndex = dataset[0].datasetIndex;
    console.log(data.datasets[datasetIndex].label);
};

export const printElementAtEvent = (element) => {
    if (!element.length) return;
    const { datasetIndex, index } = element[0];
    console.log(data.labels[index], data.datasets[datasetIndex].data[index]);
};

export const printElementsAtEvent = (elements) => {
    if (!elements.length) return;
    console.log(elements.length);
};

export const memes = (arrQuestions, dataSheet) => {
    var cols = []
    arrQuestions.forEach(q => {
        cols.push(getColumn(dataSheet, q)) //get data from poll 7
    })
    var counts = []
    cols.forEach(col => {
        counts.push(countUnique(col)) //array of objects
    })
    var sets = [...Array(counts.length)].map(e => Array(counts[0].length))
    for(let i = 0; i < counts.length; i++) {
        let k = 0
        let total = 0
        for(let key in counts[i]) {
            total = total + counts[i][key]
        }
        if('' in counts[i]) {
            total = total - counts[i]['']
        }
        for(let key in counts[i]) {
            sets[k][i] = (counts[i][key] / total) * 100
            k = k + 1
        }
    }
    return sets
}

export const simplePie = (question, datasheet) => {
    let set = []
    let col = getColumn(datasheet, question)
    let counts = countUnique(col)
    var total = 0
    for(let key in counts) {
        total = total + counts[key]
    }
    if('' in counts) {
        total = total - counts['']
    }
    var i = 0
    for(let key in counts) {
        set[i] = (counts[key] / total) * 100
        i = i + 1
    }

    return set
}