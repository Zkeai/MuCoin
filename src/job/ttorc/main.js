class Ttorc {
  constructor(appkey) {
    this.appkey = appkey;
    this.devkey = "e5cf8ccc7e40a0cf260aea741978f5e9";
    this.itemid = "42";
    this.captcha_id = "d355d3bf29d3c17c463aafb0e0a5748b";
  }

  async createTask() {
    try {
      const url = "http://api.ttocr.com/api/recognize";
      const data = {
        appkey: this.appkey,
        gt: this.captcha_id,
        itemid: this.itemid,
        devkey: this.devkey,
      };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      const resultid = result.resultid;
      if (resultid) {
        return resultid;
      } else {
      }
    } catch (error) {}
  }

  async getResponse(resultid) {
    let times = 0;
    while (times < 120) {
      try {
        const url = "http://api.ttocr.com/api/results";
        const data = {
          appkey: this.appkey,
          resultid: resultid,
        };
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        if (
          result.status === 4016 ||
          result.status === 4026 ||
          result.status === 4039
        ) {
          return "识别失败";
        }
        const jy_rep = result.data;
        if (jy_rep) {
          return jy_rep;
        } else {
        }
      } catch (error) {}
      times += 3;
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 等待3秒钟
    }
  }
}

export default Ttorc;
