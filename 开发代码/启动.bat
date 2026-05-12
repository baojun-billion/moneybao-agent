@echo off
echo ========================================
echo   沃橙信息智能前台系统 - 快速启动
echo ========================================
echo.

echo 正在检查 Node.js 环境...
node --version
if errorlevel 1 (
    echo [错误] 未检测到 Node.js，请先安装 Node.js
    echo 下载地址: https://nodejs.org
    pause
    exit /b 1
)

echo.
echo [成功] Node.js 环境正常
echo.

echo 正在检查依赖...
if not exist "node_modules" (
    echo 首次运行，正在安装依赖...
    npm install
    if errorlevel 1 (
        echo [错误] 依赖安装失败
        pause
        exit /b 1
    )
    echo [成功] 依赖安装完成
) else (
    echo [成功] 依赖已安装
)

echo.
echo ========================================
echo   正在启动开发服务器...
echo ========================================
echo.
echo 浏览器将自动打开: http://localhost:5173
echo.
echo 按 Ctrl+C 可停止服务器
echo.

npm run dev

pause
