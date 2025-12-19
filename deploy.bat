@echo off
REM NSR Population Tracker - Docker Deployment Script
REM Builds and pushes the image to Docker Hub as gabcat/nsr-population-tracker

setlocal enabledelayedexpansion

set IMAGE_NAME=gabcat/nsr-population-tracker
set TAG=latest

echo ========================================
echo NSR Population Tracker - Deploy Script
echo ========================================
echo.

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker is not running. Please start Docker Desktop and try again.
    exit /b 1
)

echo [1/2] Building Docker image: %IMAGE_NAME%:%TAG%
echo ----------------------------------------
docker build -t %IMAGE_NAME%:%TAG% .

if errorlevel 1 (
    echo.
    echo ERROR: Docker build failed!
    exit /b 1
)

echo.
echo [2/2] Pushing image to Docker Hub...
echo ----------------------------------------
docker push %IMAGE_NAME%:%TAG%

if errorlevel 1 (
    echo.
    echo ERROR: Docker push failed! Make sure you are logged in to Docker Hub.
    echo Run: docker login
    exit /b 1
)

echo.
echo ========================================
echo Deployment complete!
echo ========================================
echo.
echo Image pushed: %IMAGE_NAME%:%TAG%
echo.

endlocal
