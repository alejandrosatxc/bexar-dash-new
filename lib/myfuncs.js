export function countUnique(arr) {
    const counts = {};
     for (var i = 0; i < arr.length; i++) {
        counts[arr[i]] = 1 + (counts[arr[i]] || 0);
     };
     return counts;
}

export function getColumn(dataArr, colName, filter = 'none') {
    const cols = []
    if(filter === 'none') {
        dataArr.forEach(row => {
        cols.push(row[colName])
        })
    } else if(filter === 'male'){
        dataArr.forEach(row => {
            if(row['SEX'] === '1') {
                cols.push(row[colName])
            }
        })
    } else if(filter === 'female') {
        dataArr.forEach(row => {
            if(row['SEX'] === '2') {
                cols.push(row[colName])
            }
        })
    } else if(filter === 'hispanic') {
        dataArr.forEach(row => {
            if(row['RACE'] === '1') {
                cols.push(row[colName])
            }
        })
    } else if(filter === 'black') {
        dataArr.forEach(row => {
            if(row['RACE'] === '2') {
                cols.push(row[colName])
            }
        })
    }
    else if(filter === 'white') {
        dataArr.forEach(row => {
            if(row['RACE'] === '3') {
                cols.push(row[colName])
            }
        })
    }
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

export const memes = (arrQuestions, dataSheet, filter = 'none') => {
    //console.log(arrQuestions)
    var cols = []
    arrQuestions.forEach(q => {
        cols.push(getColumn(dataSheet, q, filter)) //get data from poll 7
    })
    var counts = []
    cols.forEach(col => {
        counts.push(countUnique(col)) //array of objects
    })
    var sets = [...Array(counts.length)].map(e => Array(counts[0].length))
    //console.log(sets)
    //console.log(counts)
    for(let i = 0; i < counts.length; i++) {
        //console.log("number of keys in counts[" + i + "] = " + Object.keys(counts[i]).length)
        let k = 0
        let total = 0
        //Get total of all counts 
        for(let key in counts[i]) {
            total = total + counts[i][key]
        }
        //check for empty cells and remove from total 
        if('' in counts[i]) {
            total = total - counts[i]['']
        }
        //delete empty or '' values from each set of counts
        if('' in counts[i]) {
            delete counts[i]['']
        }
        for(let key in counts[i]) {
            //console.log("k: " + k + " i: " + i)
            sets[k][i] = (counts[i][key] / total) * 100
            //console.log("sets["+k+"]["+i+"] = " + sets[k][i])

            k = k + 1
        }
    }
    return sets
}

export const simplePie = (question, datasheet, filter ='none') => {
    let set = []
    let col = getColumn(datasheet, question, filter)
    let counts = countUnique(col)
    var total = 0
    //get total of all counts
    for(let key in counts) {
        total = total + counts[key]
    }
    //check for empty cells and remove from total
    if('' in counts) {
        total = total - counts['']
    }
    //delete empty or '' values from each set of counts
    if('' in counts) {
        delete counts['']
    }
    var i = 0
    for(let key in counts) {
        set[i] = (counts[key] / total) * 100
        i = i + 1
    }

    return set
}