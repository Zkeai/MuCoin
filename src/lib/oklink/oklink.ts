import httpService from '/src/http/httpService';

class oklink {
    constructor(api_key) {
        this.apiKey = api_key
        this.baseUrl="https://www.oklink.com/api/v5/explorer"
        
    }
    //获取地址数据
    async getAddressSummary(endpoint,params={}){
        const url = new URL(`${this.baseUrl}/${endpoint}`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        const options = {
            headers: {
                "Accept": "*/*",
                "Ok-Access-Key": this.apiKey,
            }
        };

        try {
            const response = await httpService.get(url, options);
            return response.data;
        } catch (error) {
            console.error('Error making GET request:', error);
            throw error;
        }

    }




}
export default oklink;