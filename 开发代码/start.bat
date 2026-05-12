@echo off
chcp 65001 > nul
echo ========================================
echo   沃橙信息智能前台 - 快速启动
echo ========================================
echo.

cd /d "%~dp0"

echo 当前目录: %CD%
echo.

echo [1/4] 检查 Node.js...
node --version > nul 2>&1
if errorlevel 1 (
    echo [错误] 未检测到 Node.js
    echo 请访问: https://nodejs.org 下载安装
    pause
    exit /b 1
)
echo [成功] Node.js 版本:
node --version
echo.

echo [2/4] 检查依赖...
if not exist "node_modules\" (
    echo [提示] 首次运行，需要安装依赖...
    echo.
    call npm install
    if errorlevel 1 (
        echo [错误] 依赖安装失败
        echo.
        echo 请检查:
        echo 1. 网络连接是否正常
        echo 2. npm 镜像源是否可用
        echo 3. 尝试运行: npm config set registry https://registry.npmmirror.com
        pause
        exit /b 1
    )
    echo [成功] 依赖安装完成
) else (
    echo [成功] 依赖已安装
)
echo.

echo [3/4] 检查 .env 文件...
if not exist ".env" (
    echo [警告] .env 文件不存在，可能影响功能
) else (
    echo [成功] .env 文件存在
)
echo.

echo [4/4] 启动开发服务器...
echo.
echo ========================================
echo  浏览器将自动打开: http://localhost:5173
echo  按 Ctrl+C 可停止服务器
echo ========================================
echo.

call npm run dev

if errorlevel 1 (
    echo.
    echo [错误] 启动失败
    echo.
    echo 常见解决方案:
    echo 1. 检查端口 5173 是否被占用
    echo 2. 尝试删除 node_modules 重新安装
    echo 3. 查看 npm 版本: npm --version
    pause
    exit /b 1
)

pause
