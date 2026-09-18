# 把 MAZU 官网绑定到 mazuchair.com（GitHub + Vercel）

本目录是一个**纯静态站点**（HTML/CSS/JS + images/），无需构建步骤。
下面是从零把 `mazuchair.com` 指向本站的完整流程。所有命令在你**自己的电脑**终端里运行
（git 在当前 WorkBuddy 沙箱里不可用，但文件夹就在你本机 `mazu-alt` 下）。

---

## 第 0 步：确认你手上有这些
- ✅ 已注册域名 `mazuchair.com`（早期记录显示已注册）
- ✅ 已注册 GitHub 账号
- ✅ 已注册 Vercel 账号
- ✅ 本文件夹 `mazu-alt`（含 index.html、about.html、products.html、cases.html、blog.html、
  contact.html、product-detail.html、css/、js/、images/、robots.txt、sitemap.xml、site.webmanifest）

> 本站点**不依赖任何外部 CDN**：所有图片（logo、类目下拉图、12 个 SKU 图、工厂/案例/博客图）
> 都已自托管在 `images/`。已确认 `robots.txt`、`sitemap.xml` 里的域名统一为 `https://mazuchair.com`。

---

## 第 0.5 步：先装好 Git（第一次才需要，最关键的前提）

Git 是个“版本管理 + 上传工具”，必须装在你**自己电脑**上。注意：**WorkBuddy 的沙箱里装不了 Git**（连不上 GitHub 下载源），所以这一步你要用自己的浏览器和终端完成，只装这一次，以后都不用再装。

1. 用你**自己的浏览器**打开 https://git-scm.com/download/win （会自动下载 `Git-2.x.x-64-bit.exe`）
2. 双击运行安装包，**除了下面这一项，其余一路 Next（用默认）**即可：
   - 到 “Adjusting your PATH environment” 这一步，选 **“Git from the command line and also from 3rd-party software”**（让 Git 能在终端里直接用）
3. 安装完后，**关闭再重新打开**你的终端窗口（让 git 命令生效）

> 验证装好没：重新打开终端，输入 `git --version` 回车，能显示版本号就成功了。

---

## 第 1 步：本地初始化 Git 并提交

**用你自己电脑的终端**（Win 键 → 输入 “PowerShell” 或 “终端” → 回车；注意不是 WorkBuddy 里的 Bash）：

```bash
cd "C:\Users\28810\WorkBuddy\2026-08-19-15-04-06\mazu-alt"
git init
git config user.name "MAZU"
git config user.email "info@mazuchair.com"
git add .
git commit -m "MAZU corporate site - static, domain mazuchair.com"
```

**每条命令是什么意思（照顺序执行即可）：**
- `cd "..."` —— 进入网站文件夹。后面所有 git 命令都必须在这个文件夹里跑。
- `git init` —— 把这个文件夹变成“Git 仓库”（建一个隐藏的 `.git` 记录夹，用来记版本）。
- `git config user.name / user.email` —— 告诉 Git 你的身份（提交必须填，随便写也行；想让提交显示成你 GitHub 账号，就把邮箱填成你 GitHub 绑定的那个）。
- `git add .` —— 把当前文件夹里**所有网站文件**加入“待提交清单”（`.gitignore` 已排除 `_junk_cdn_errors/` 占位图 和 `.spark/` Miaoda 元数据，不会进来）。
- `git commit -m "..."` —— 正式拍一张“快照”存到本地，引号里是这次保存的说明文字。

> 如果回车后提示 `git: command not found`，说明上一步 Git 没装好或终端没重启，关掉重开终端再试。
> 看到 `xxx files changed` 之类提示就说明提交成功了。

---

## 第 2 步：在 GitHub 上建仓库并推送

1. 打开 https://github.com → 右上角 **+ → New repository**
2. Repository name 建议：`mazuchair-website`（随意）
3. 选 **Public**（Vercel 免费版可连公开或私有仓库均可；私有也行）
4. **不要**勾选 “Add a README / .gitignore / license”（我们已经有文件了）
5. 点 **Create repository**
6. 页面会显示推送命令，复制并执行（把 `<你的用户名>` 和仓库名替换好）：

```bash
git branch -M main
git remote add origin https://github.com/<你的用户名>/mazuchair-website.git
git push -u origin main
```

推送成功后，GitHub 仓库里就能看到全部站点文件。

---

## 第 3 步：用 Vercel 导入并部署

1. 打开 https://vercel.com → 登录
2. 点 **Add New → Project**
3. 在 **Import Git Repository** 下找到 `mazuchair-website`，点 **Import**
   - 若没看到仓库，点 **Configure GitHub App** 授权 Vercel 访问你的 GitHub
4. 配置项（本项目已自带 `vercel.json`，基本会自动填好）：
   - **Framework Preset**：选 `Other`（纯静态）
   - **Root Directory**：`.`（即用仓库根目录，因为站点文件就在根）
   - **Build Command**：留空（无需构建）
   - **Output Directory**：`.`
5. 点 **Deploy**。几十秒后会出现 “Congratulations” 和一个 `*.vercel.app` 的预览地址
   （例如 `mazuchair-website.vercel.app`）。先打开它，确认页面、图片、下拉菜单都正常。

---

## 第 4 步：绑定自定义域名 mazuchair.com

1. 在 Vercel 项目页 → 顶部 **Settings → Domains**
2. 输入框填 `mazuchair.com`，回车
3. Vercel 会让你再添加 `www.mazuchair.com`（建议同时加，避免用户输入 www 时打不开）
4. 添加后，Vercel 会显示**该域名需要的 DNS 记录**（见下一步，以页面上显示的值为准）

---

## 第 5 步：在域名注册商处配置 DNS

登录你购买 `mazuchair.com` 的注册商后台（阿里云/万网、腾讯云、Namecheap、GoDaddy 等），
找到 **域名解析 / DNS 管理**，添加以下记录（**以 Vercel 页面显示的值为最终准**）：

### 主域名（apex）mazuchair.com
| 类型 | 主机记录 | 记录值 | 说明 |
|------|----------|--------|------|
| A    | @        | `76.76.21.21` | Vercel 标准 apex 地址 |

### www 子域名
| 类型 | 主机记录 | 记录值 | 说明 |
|------|----------|--------|------|
| CNAME | www   | `cname.vercel-dns.com` | 指向 Vercel |

> 如果注册商不支持 apex 的 A 记录（极少数），可改用 **CNAME 扁平化 / ALIAS** 记录指向
> `cname.vercel-dns.com`；具体以 Vercel 在你账号里给出的记录为准。
> 若 Vercel 要求额外验证（例如已有冲突记录时给一条 TXT），按页面提示补一条 TXT 即可。

---

## 第 6 步：等待生效并验证

1. DNS 生效通常需要 **几分钟到 24 小时**（TTL 内一般 10–30 分钟）
2. 在 Vercel **Domains** 页面，状态会从 `Invalid Configuration` 变成 **Valid Configuration**，
   并自动签发 **HTTPS 证书**（小绿锁）
3. 浏览器访问：
   - `https://mazuchair.com`  ✅
   - `https://www.mazuchair.com`  ✅（会自动跳转到主域名或正常打开）
4. 验证要点：首页 Hero/Showcase 图、导航 Products 下拉 5 张图、products 页 12 个 SKU 图、
   contact 页地址（MAZU TECH Co., Ltd., Tianjin, China, Postcode: 300000）、
   页脚联系方式（info@mazuchair.com / +8618526872467 / wa.me）均正确。

---

## 收尾与可选优化

- **强制 HTTPS + www 跳转**：Vercel 默认会给 apex 和 www 都签发证书；建议在 Domains 里把
  `www.mazuchair.com` 设为**重定向到** `mazuchair.com`（避免两个地址内容重复影响 SEO）。
- **Canonical / og:url**：当前页面没有写死绝对域名，部署后建议给每个 HTML 加
  `<link rel="canonical" href="https://mazuchair.com/xxx.html">` 和
  `<meta property="og:url" content="https://mazuchair.com/">`，利于搜索引擎归一。需要的话我可以帮你加。
- **邮件已统一**：联系邮箱已统一为 `info@mazuchair.com`（contact.html 与 js/main.js 两处），与网站域名完全一致。
- **建厂地**：已按你要求保留为 “Founded in 2010 in Hebei”；当前总部/工厂地址为 Tianjin（按你清单要求）。

---

## 以后如何更新网站
改完文件后，在 `mazu-alt` 目录：
```bash
git add .
git commit -m "update: ..."
git push
```
Vercel 会**自动重新部署**，无需再到 Vercel 手动操作。
