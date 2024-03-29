import axios from "axios";

const BACKEND_URL = 'https://carpark-497d8-default-rtdb.asia-southeast1.firebasedatabase.app'


export function storeReport(reportData){
    axios.post(BACKEND_URL+'/reports.json',reportData);
}

export async function fetchReports(email){
    const response = await axios.get(BACKEND_URL+'/reports.json');
    const reports = [];

    for (const key in response.data){
        if(response.data[key].user_id === email){
            const reportObject = {
                id: key,
                email: response.data[key].user_id,
                carpark: response.data[key].carpark_no,
                description: response.data[key].description,
                severity: response.data[key].severity,
                fault: response.data[key].fault_type,
            }
            reports.push(reportObject);
        }
    }
    return reports;
}