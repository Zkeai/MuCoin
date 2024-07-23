# 使用官方的 Node.js 镜像作为基础镜像
FROM node:18-alpine

# 安装构建工具和 Python
RUN apk add --no-cache python3 make g++ 

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 到工作目录
COPY package.json package-lock.json ./

# 安装依赖
RUN npm install

# 复制项目文件到工作目录
COPY . .

# 构建 Next.js 应用
RUN npm run build

# 暴露应用运行端口
EXPOSE 3000

# 启动 Next.js 应用
CMD ["npm", "start"]