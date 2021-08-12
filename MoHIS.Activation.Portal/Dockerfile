#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src
COPY ["MoHIS.Activation.API/MoHIS.Activation.API.csproj", "MoHIS.Activation.API/"]
COPY ["MoHIS.Activation.Shared/MoHIS.Activation.Shared.csproj", "MoHIS.Activation.Shared/"]
RUN dotnet restore "MoHIS.Activation.API/MoHIS.Activation.API.csproj"
COPY . .
WORKDIR "/src/MoHIS.Activation.API"
RUN dotnet build "MoHIS.Activation.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MoHIS.Activation.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MoHIS.Activation.API.dll"]