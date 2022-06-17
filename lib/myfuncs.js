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
    switch (filter) {
        case 'none':
            dataArr.forEach(row => {
                cols.push(row[colName])
            })
            break;
        //Gender
        case 'male':
            dataArr.forEach(row => {
                if (row['SEX'] === '1') {
                    cols.push(row[colName])
                }
            })
            break;
        case 'female':
            dataArr.forEach(row => {
                if (row['SEX'] === '2') {
                    cols.push(row[colName])
                }
            })
            break;
        //Race
        case 'hispanic':
            dataArr.forEach(row => {
                if (row['RACE'] === '1') {
                    cols.push(row[colName])
                }
            })
            break;
        case 'black':
            dataArr.forEach(row => {
                if (row['RACE'] === '2') {
                    cols.push(row[colName])
                }
            })
            break;
        case 'white':
            dataArr.forEach(row => {
                if (row['RACE'] === '3') {
                    cols.push(row[colName])
                }
            })
            break;
        //Political Party
        case 'democrat':
            dataArr.forEach(row => {
                if (row['PARTY'] === '1' || row['PARTY'] === '2' || row['PARTY'] === '3') {
                    cols.push(row[colName])
                }
            })
            break;
        case 'independent':
            dataArr.forEach(row => {
                if (row['PARTY'] === '4') {
                    cols.push(row[colName])
                }
            })
            break;
        case 'republican':
            dataArr.forEach(row => {
                if (row['PARTY'] === '5' || row['PARTY'] === '6' || row['PARTY'] === '7') {
                    cols.push(row[colName])
                }
            })
            break;
        //Income
        case 'lowerclass':
            dataArr.forEach(row => {
                if (row['INCOME'] === '1' || row['INCOME'] === '2') {
                    cols.push(row[colName])
                }
            })
            break;
        case 'middleclass':
            dataArr.forEach(row => {
                if (row['INCOME'] === '3' || row['INCOME'] === '4') {
                    cols.push(row[colName])
                }
            })
            break;
        case 'upperclass':
            dataArr.forEach(row => {
                if (row['INCOME'] === '5' || row['INCOME'] === '6') {
                    cols.push(row[colName])
                }
            })
            break;
        //Age
        case 'age_young':
            dataArr.forEach(row => {
                if (row['AGE'] === '1' || row['AGE'] === '2' || row['AGE'] === '3') {
                    cols.push(row[colName])
                }
            })
            break;
        case 'age_adult':
            dataArr.forEach(row => {
                if (row['AGE'] === '4' || row['AGE'] === '5' || row['AGE'] === '6') {
                    cols.push(row[colName])
                }
            })
            break;
        case 'age_old':
            dataArr.forEach(row => {
                if (row['AGE'] === '7' || row['AGE'] === '8' || row['AGE'] === '9') {
                    cols.push(row[colName])
                }
            })
            break;
        case 'age_elder':
            dataArr.forEach(row => {
                if (row['AGE'] === '10' || row['AGE'] === '11') {
                    cols.push(row[colName])
                }
            })
            break;
        //Employment
        case 'employed':
            dataArr.forEach(row => {
                if (row['EMPLOYMENT'] === '1' || row['EMPLOYMENT'] === '2') {
                    cols.push(row[colName])
                }
            })
            break;
        case 'unemployed':
            dataArr.forEach(row => {
                if (row['EMPLOYMENT'] === '3' || row['EMPLOYMENT'] === '4') {
                    cols.push(row[colName])
                }
            })
            break;
        case 'retired':
            dataArr.forEach(row => {
                if (row['EMPLOYMENT'] === '5') {
                    cols.push(row[colName])
                }
            })
            break;
        //Education
        case 'highschool':
            dataArr.forEach(row => {
                if (row['EDUCATION'] === '1') {
                    cols.push(row[colName])
                }
            })
            break;
        case 'college_some':
            dataArr.forEach(row => {
                if (row['EDUCATION'] === '2') {
                    cols.push(row[colName])
                }
            })
            break;
        case 'college_4':
            dataArr.forEach(row => {
                if (row['EDUCATION'] === '3') {
                    cols.push(row[colName])
                }
            })
            break;
        case 'postgrad':
            dataArr.forEach(row => {
                if (row['EDUCATION'] === '4') {
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

/*
    Input:
    (Array) arrColumns - An array of column names from the spreadsheet
    (Array) datasheet  - A refernece to the google sheet containing our data
    (string) filter    - A string that will be used to filter data  

    Output: dataset   - An array containing sets of values for rendering charts
*/
export const generateChartDatasets = (arrColumns, datasheet, filter = 'none') => {

    /*
    We will be creating an array of all possible responses due to the nature
    of the data, some data columns are only half full, thus creates a 
    situaution where there may not be a sinlge entry for a response and that
    will mess up the code in this function, so were counting all posisible 
    responses first, then processing data, then using this list of keys to
    ensure that all possible responses are accounted for.
    Get array of possible repsonses
    Iterates through all rows, looking at a specific column
    */

    //Get columns of data from spreadsheet using a filter, default is 'none'
    //There could be one or more columns in the array
    var dataset = []
    arrColumns.forEach(col => {

        //Get a column from spreadsheet with no filter
        var column = getColumn(datasheet, col, 'none')

        //create array of possible responses in the column
        var keys = column.filter(countUnique)

        //Get the column with a filter
        column = getColumn(datasheet, col, filter)

        //count unique values
        //returns object key-value = { response : count ... }
        var counts = countUnique(column)

        //Ensure each key is represented in the final count
        keys.forEach(key => {
            if (!(key in counts)) {
                counts[key] = 0 //If a count is missing, add it in as 0.
            }
        })

        //calculate the total of response counts
        var total = 0
        for (let response in counts) {
            total = total + counts[response]
        }

        //Remove the count of empty repsonses from counts and 
        //total, if they exist (Polling question was not asked or no response)
        if ('' in counts) {
            total = total - counts['']
            delete counts['']
        }

        var set = []

        var i = 0
        for (let response in counts) {
            //calculate the percentage of each repsonse count / total
            set[i] = (counts[response] / total * 100)
            i = i + 1
        }

        //Append the array of results to 
        dataset.push(set)

    })

    if (dataset.length == 1) return dataset[0] //Return the one set as an array 

    //Rearrange the data for a chart.js horizontal stacked bar chart
    let barDataset = [...Array(dataset[0].length)].map(e => Array(dataset.length))
    var j = 0
    dataset.forEach(set => {
        var i = 0
        set.forEach(e => {
            barDataset[i][j] = e
            i = i + 1
        })
        j = j + 1
    })

    return barDataset //return rearranged barchart dataset
}

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
    for (let i = 0; i < counts.length; i++) {
        //console.log("number of keys in counts[" + i + "] = " + Object.keys(counts[i]).length)
        let k = 0
        let total = 0
        //Get total of all counts 
        for (let key in counts[i]) {
            total = total + counts[i][key]
        }
        //check for empty cells and remove from total 
        if ('' in counts[i]) {
            total = total - counts[i]['']
        }
        //delete empty or '' values from each set of counts
        if ('' in counts[i]) {
            delete counts[i]['']
        }
        for (let key in counts[i]) {
            //console.log("k: " + k + " i: " + i)
            sets[k][i] = (counts[i][key] / total) * 100
            //console.log("sets["+k+"]["+i+"] = " + sets[k][i])

            k = k + 1
        }
    }
    return sets
}

export const simplePie = (question, datasheet, filter = 'none') => {
    let set = []
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
        if (!(key in counts)) {
            counts[key] = 0 //If a count is missing, add it in as 0.
        }
    })
    var total = 0
    //console.log(counts)
    //get total of all counts
    for (let key in counts) {
        total = total + counts[key]
    }
    //console.log("total before removing emptys: " + total)
    //check for empty cells and remove from total
    if ('' in counts) {
        total = total - counts['']
    }
    //console.log("total after removing emptys: " + total)
    //delete empty or '' values from each set of counts
    if ('' in counts) {
        delete counts['']
    }
    //console.log(counts)
    var i = 0
    for (let key in counts) {
        set[i] = (counts[key] / total) * 100
        //console.log("set["+i+"] = " + set[i])
        i = i + 1
    }
    //console.log(set)

    return set
}