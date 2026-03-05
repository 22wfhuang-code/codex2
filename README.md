# Amazon / 电商店铺数据诊断器

## npm install 出现 403？先执行这两条（Windows PowerShell）

```powershell
npm config set registry https://registry.npmjs.org/
# 若官方源受限可切换镜像
npm config set registry https://registry.npmmirror.com/
# 清理代理配置（很多 403 根因）
npm config delete proxy
npm config delete https-proxy
npm config delete http-proxy
```

如果仍然 403，请检查并临时重命名**项目目录**或**用户目录**下的 `.npmrc`（常见问题项：私服 `@scope:registry`、`_authToken`、代理 `proxy/http-proxy/https-proxy`），避免把安装请求重定向到无权限私服。

---

一个可直接部署到 Vercel 的 Next.js 14 应用。用户上传 CSV/XLSX 后，后端自动完成解析、字段映射、指标计算、诊断和 7 天计划生成。

## 功能

- 解析 CSV/XLSX（自动跳过空行）
- 智能字段映射（中英文同义词 + 模糊匹配）
- 核心指标计算（缺字段时优雅降级）
- 可解释规则诊断（>=10 条）
- 自动生成 Day1-Day7 执行计划
- 中英文切换（前端即时切换）
- Markdown 报告导出
- 无数据库，全部在 Next.js API 路由服务端执行

## 本地运行

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`

## 验证命令

```bash
npm run lint
npm run test
npm run build
```

## Vercel 一键部署

1. 把仓库推送到 GitHub。
2. 在 Vercel 中选择 **Import Project**。
3. Framework 识别为 Next.js，保持默认构建命令：`npm run build`。
4. 点击 Deploy。

> 无需必填环境变量即可运行。

## 可选 AI 配置

- `OPENAI_API_KEY`（可选）：配置后可以在 `/api/report` 接入更深入 AI 总结。
- 不配置时自动使用模板报告，不影响部署与使用。

## 数据格式示例

可直接点击上传页的“使用示例数据”按钮，读取 `public/sample.csv`。

支持字段示例：

- orders / 订单 / order count
- gmv / revenue / sales / 销售额
- ad spend / ads cost / 广告花费
- sessions / traffic / 访问量
- profit / cogs / returns / clicks / impressions / units

## 常见问题

### 为什么字段识别不完整？

请尽量确保表头包含关键字段：orders、gmv、ad spend、sessions。系统会在报告中提示缺失字段。

### Amazon 报表如何导出更准确？

建议至少导出：订单数、销售额、广告花费、访问量、点击、曝光、退货、成本、利润等列；并保留首行为表头。
