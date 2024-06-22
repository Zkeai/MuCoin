import fs from 'fs';
import path from 'path';


const getJsonData = ()=>{
    const filePath = path.join(process.cwd(), 'src','config', 'header.josn');
    try {
        const jsonData = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(jsonData);
        return data;
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return null;
    }
      
}


export default getJsonData;