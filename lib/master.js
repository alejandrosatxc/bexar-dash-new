import fs from 'fs'
import path from 'path'

async function fetchMasterData() {
  console.log('Fetching master data...')
  require('dotenv').config()
  const { GoogleSpreadsheet } = require('google-spreadsheet')
  let key = process.env.SHEETS_API_KEY
  let buff = new Buffer(key, 'base64')
  let string = buff.toString('ascii')
  const creds = JSON.parse(string)
  //const creds = require('./client_secret.json')

  const doc = new GoogleSpreadsheet('1m1jRRUXQTYv8MdTaXmzqzNxYYuHlwaX3CAzKrxsTqes')

  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });

  await doc.loadInfo(); // loads document properties and worksheets
  //console.log(doc.title);
  // const sheet = doc.sheetsByIndex[3]; // or use doc.sheetsById[id]
  // console.log(sheet.title);
  // console.log(sheet.rowCount);
  const master = []
  //console.log(doc.sheetsByIndex)

  // doc.sheetsByIndex.forEach(sheet => {
  for(const sheet of doc.sheetsByIndex) {
    const rows = await sheet.getRows({
      offset: 0
    })
    // console.log(rows)
    var GSdata = []
    rows.forEach(row => {
      let rowData = {}
      row._sheet.headerValues.forEach(header => {
        rowData[header] = row[header]
      })
      GSdata.push(rowData)
    })
    const sheetdata = { title : sheet.title, data: GSdata }
    master.push(sheetdata)
    }
    return master
}

const MASTER_CACHE_PATH = path.resolve('.master')

export default async function getMaster() {
  let cachedData
  console.log(MASTER_CACHE_PATH)
  try {
    cachedData = JSON.parse(
      fs.readFileSync(path.join(__dirname, MASTER_CACHE_PATH), 'utf8')
    )
  } catch (error) {
    console.log('Master cache not initialized')
  }

  if (!cachedData) {
    const data = fetchMasterData()
    try {
      fs.writeFileSync(
        path.join(__dirname, MASTER_CACHE_PATH),
        JSON.stringify(data),
        'utf8'
      )
      console.log('Wrote to Master cache')
    } catch (error) {
      console.log('(not a real error lol pls ignore)ERROR WRITING MASTER DATA CACHE TO FILE')
      //console.log(error)
    }

    cachedData = data
  }

  return cachedData
}