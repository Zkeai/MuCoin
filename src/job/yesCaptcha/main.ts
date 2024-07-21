class YesCaptch {
  clientKey: string;
  websiteKey: string;
  websiteUrl: string;
  taskType: string;

  constructor(clientKey: string, websiteKey: string, websiteUrl: string, taskType: string) {
    this.clientKey = clientKey;
    this.websiteKey = websiteKey;
    this.websiteUrl = websiteUrl;
    this.taskType = taskType;
  }

  async createTask(): Promise<string | undefined> {
    try {
      const url = "https://api.yescaptcha.com/createTask";
      const data = {
        clientKey: this.clientKey,
        task: {
          websiteURL: this.websiteUrl,
          websiteKey: this.websiteKey,
          type: this.taskType,
        },
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      const taskId = result.taskId;
      if (taskId) {
        return taskId;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getResponse(taskID: string): Promise<string | undefined> {
    let times = 0;
    while (times < 120) {
      try {
        const url = "https://api.yescaptcha.com/getTaskResult";
        const data = {
          clientKey: this.clientKey,
          taskId: taskID,
        };
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        const solution = result.solution;
        if (solution) {
          const response = solution.gRecaptchaResponse;
          if (response) {
            return response;
          }
        }
      } catch (error) {
        console.log(error);
      }
      times += 3;
      await new Promise(resolve => setTimeout(resolve, 3000)); // 等待3秒钟
    }
  }
}

export default YesCaptch;