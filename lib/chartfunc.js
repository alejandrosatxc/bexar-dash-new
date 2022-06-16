export const getChartData = (arrQuestions, datasheet, filter = 'none') => {

    //Get columns of data from spreadsheet using a filter, default is 'none'
    var cols = []
    arrQuestions.forEach(q => {
        cols.push(getColumn(dataSheet, q, filter)) 
    })

    //Get a count of all the unique values in each column
    var counts = []
    cols.forEach(col => {
        counts.push(countUnique(col)) //array of objects
    })
}