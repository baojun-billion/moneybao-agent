@echo off
echo ========================================
echo   沃橙信息智能前台系统 - 构建部署
echo ========================================
echo.

echo 正在构建生产版本...
npm run build
if errorlevel 1 (
    echo [错误] 构建失败
    pause
    exit /b 1
)

echo.
echo [成功] 构建完成！
echo.
echo 生产文件位置: dist\
echo.
echo 正在启动本地服务器...
echo.
echo 访问地址: http://localhost:3000
echo.
echo 按 Ctrl+C 可停止服务器
echo.

python -m http.server 3000 --directory dist

pause
