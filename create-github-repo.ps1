# Script para crear repositorio en GitHub
# Instrucciones: Ejecutar en PowerShell como administrador

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername,
    
    [Parameter(Mandatory=$false)]
    [string]$RepoName = "sistema-posts-ant-design"
)

Write-Host "🚀 Configurando repositorio de GitHub..." -ForegroundColor Green

# Verificar si git está instalado
try {
    git --version | Out-Null
    Write-Host "✅ Git está instalado" -ForegroundColor Green
} catch {
    Write-Host "❌ Git no está instalado. Por favor instala Git primero." -ForegroundColor Red
    exit 1
}

# Cambiar a la rama main
Write-Host "📝 Cambiando a rama main..." -ForegroundColor Yellow
git branch -M main

# Agregar repositorio remoto
$repoUrl = "https://github.com/$GitHubUsername/$RepoName.git"
Write-Host "🔗 Agregando repositorio remoto: $repoUrl" -ForegroundColor Yellow

try {
    git remote add origin $repoUrl
    Write-Host "✅ Repositorio remoto agregado" -ForegroundColor Green
} catch {
    Write-Host "⚠️  El repositorio remoto ya existe o hay un error" -ForegroundColor Yellow
    git remote set-url origin $repoUrl
}

# Hacer push al repositorio
Write-Host "⬆️  Subiendo archivos a GitHub..." -ForegroundColor Yellow
try {
    git push -u origin main
    Write-Host "✅ Archivos subidos exitosamente!" -ForegroundColor Green
    Write-Host "🎉 Repositorio creado en: https://github.com/$GitHubUsername/$RepoName" -ForegroundColor Green
} catch {
    Write-Host "❌ Error al subir archivos. Verifica que:" -ForegroundColor Red
    Write-Host "   1. El repositorio existe en GitHub" -ForegroundColor Red
    Write-Host "   2. Tienes permisos de escritura" -ForegroundColor Red
    Write-Host "   3. Tu username es correcto: $GitHubUsername" -ForegroundColor Red
}

Write-Host "`n📋 Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. Ve a: https://github.com/$GitHubUsername/$RepoName" -ForegroundColor White
Write-Host "2. Verifica que todos los archivos se subieron correctamente" -ForegroundColor White
Write-Host "3. Configura GitHub Pages si deseas publicar la aplicación" -ForegroundColor White

# Información del proyecto
Write-Host "`n📊 Resumen del proyecto:" -ForegroundColor Cyan
Write-Host "- Tecnologías: React + TypeScript + Ant Design + Vite" -ForegroundColor White
Write-Host "- Características: Dashboard, CRUD Posts, Estadísticas" -ForegroundColor White
Write-Host "- Archivos incluidos: 26 archivos con colección de Postman" -ForegroundColor White
