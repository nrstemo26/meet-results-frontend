import aofCSV from './aof_2019_csv';

const csvToObject = (csv) => {
    const rows = csv.split('\n');
    const keys = rows[0].split(', ');
    const data = rows.slice(1).map(row => {
      const values = row.split(', ');
      return keys.reduce((obj, key, index) => {
        obj[key] = values[index];
        return obj;
      }, {});
    });
    return data;
  }
  
const meetData = csvToObject(aofCSV);

export { meetData }