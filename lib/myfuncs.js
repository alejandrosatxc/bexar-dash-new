export function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
  
export function countUnique(arr) {
    const counts = {};
     for (var i = 0; i < arr.length; i++) {
        counts[arr[i]] = 1 + (counts[arr[i]] || 0);
     };
     return counts
}

export function getColumn(dataArr, colName, filter = 'none') {

    const cols = []
    switch(filter) {
        case 'none':
            dataArr.forEach(row => {
                cols.push(row[colName])
            })
            break;
        //Gender
        case 'male':
            dataArr.forEach(row => {
                if(row['SEX'] === '1') {
                    cols.push(row[colName])
                }
            })
            break;
        case 'female':
            dataArr.forEach(row => {
                if(row['SEX'] === '2') {
                    cols.push(row[colName])
                }
            })
            break;
        //Race
        case 'hispanic':
            dataArr.forEach(row => {
                if(row['RACE'] === '1') {
                    cols.push(row[colName])
                }
            })
            break;
        case 'black':
            dataArr.forEach(row => {
                if(row['RACE'] === '2') {
                    cols.push(row[colName])
                }
            })
            break;
        case 'white':
            dataArr.forEach(row => {
                if(row['RACE'] === '3') {
                    cols.push(row[colName])
                }
            })
            break;
        //Political Party
        case 'democrat':
            dataArr.forEach(row => {
                if(row['PARTY'] === '1' || row['PARTY'] === '2' || row['PARTY'] === '3') {
                    cols.push(row[colName])
                }
            })
            break;
        case 'independent':
            dataArr.forEach(row => {
                if(row['PARTY'] === '4') {
                    cols.push(row[colName])
                }
            })
            break;
        case 'republican':
            dataArr.forEach(row => {
                if(row['PARTY'] === '5' || row['PARTY'] === '6' || row['PARTY'] === '7') {
                    cols.push(row[colName])
                }
            })
            break;
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
    //Get array of possible repsonses
    let arrayForKeys = []
    datasheet.forEach(row => {
        arrayForKeys.push(row[question])
    })
    let keys = arrayForKeys.filter(onlyUnique)

    //Get data applying a filter
    let col = getColumn(datasheet, question, filter)
    let counts = countUnique(col)

    //Ensure each key is represented in the final count
    keys.forEach(key => {
        if(!(key in counts)) {
            counts[key] = 0 //If a count is missing, add it in as 0.
        }
    })
    var total = 0
    //console.log(counts)
    //get total of all counts
    for(let key in counts) {
        total = total + counts[key]
    }
    //console.log("total before removing emptys: " + total)
    //check for empty cells and remove from total
    if('' in counts) {
        total = total - counts['']
    }
    //console.log("total after removing emptys: " + total)
    //delete empty or '' values from each set of counts
    if('' in counts) {
        delete counts['']
    }
    //console.log(counts)
    var i = 0
    for(let key in counts) {
        set[i] = (counts[key] / total) * 100
        //console.log("set["+i+"] = " + set[i])
        i = i + 1
    }
    //console.log(set)

    return set
}