
export default function jsonToCSV(jsonData) {
  const replacer = (key, value) => {
    return value === null ? '' : value
  }

  const header = Object.keys(jsonData[0])
  const csv = [
    header.join(','), 
    ...jsonData.map(row => header.map(fieldName => {
      const result = fieldName ==='price' ? parseInt(row[fieldName]).toLocaleString() : row[fieldName]
      return JSON.stringify(result, replacer)
    }).join(','))
  ].join('\r\n')

  console.log(csv)
  return csv
}