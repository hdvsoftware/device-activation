using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Blazor;
using MoHIS.Activation.Shared.Data;
using MoHIS.Activation.Shared.Models;

namespace MoHIS.Activation.Portal.Blazor.Client.DataAccess {
    public class ApiClient : IApiClient {
        //const string BaseUrl = "https://conduit.productionready.io/api";
        //const string BaseUrl = "http://localhost:50001";
        const string BaseUrl = "http://localhost/MoHIS/Activation/API";
        private readonly HttpClient httpClient;

        public ApiClient(HttpClient httpClient) {
            this.httpClient = httpClient;
        }

        public void SetToken(string token) {
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        }

        public void ClearToken() {
            httpClient.DefaultRequestHeaders.Authorization = null;
        }

        //[AllowAnonymous]
        //[HttpPost("login")]
        public async Task<LoginResponse> LoginAsync(LoginRequest loginRequest) {
            string url = $"{BaseUrl}/user/login";
            return await httpClient.PostJsonAsync<LoginResponse>(url, loginRequest);
        }

        //[HttpGet]
        public async Task<IEnumerable<Customer>> GetCustomersAsync() {
            string url = $"{BaseUrl}/customer/";

            return await httpClient.GetJsonAsync<IEnumerable<Customer>>(url);
        }

        public async Task<Customer> GetCustomerDetailAsync(int id) {
            string url = $"{BaseUrl}/customer/detail/{id}";
            return await httpClient.GetJsonAsync<Customer>(url);
        }

        //[HttpPost("adddevice")]
        public async void AddDeviceAsync(Device device) {
            string url = $"{BaseUrl}/device/adddevice";
            await httpClient.PostJsonAsync(url, device);

            //await portalDbContext.Devices.AddAsync(device);
        }

        //[HttpPut("updatedevice/{id}")]
        public async void UpdateDeviceAsync(int id, Device device) {
            string url = $"{BaseUrl}/device/updatedevice/{id}";

            await httpClient.PutJsonAsync(url, device);

        }

        //[HttpGet("getdevice")]
        public async Task<Device> GetDevice(string uuid) {
            string url = $"{BaseUrl}/getdevice/{uuid}";
            return await httpClient.GetJsonAsync<Device>(url);
        }

        //[HttpGet("getdevicesbyenvironment")]
        public async Task<IEnumerable<Device>> GetDevices(int environmentId) {
            string url = $"{BaseUrl}/device/getdevicesbyenvironment/{environmentId}";
            return await httpClient.GetJsonAsync<IEnumerable<Device>>(url);
        }

        //[AllowAnonymous]
        //[HttpGet("getdeviceactivation")]
        public async Task<Device> GetDeviceActivation(string uuid) {
            string url = $"{BaseUrl}/getdeviceactivation/{uuid}";
            return await httpClient.GetJsonAsync<Device>(url);
        }

    }
}
