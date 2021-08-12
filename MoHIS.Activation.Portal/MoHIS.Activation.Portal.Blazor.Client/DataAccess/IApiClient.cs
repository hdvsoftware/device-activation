using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MoHIS.Activation.Shared.Data;
using MoHIS.Activation.Shared.Models;

namespace MoHIS.Activation.Portal.Blazor.Client.DataAccess {
    public interface IApiClient {
        void SetToken(string token);

        void ClearToken();

        Task<LoginResponse> LoginAsync(LoginRequest loginRequest);

        Task<IEnumerable<Customer>> GetCustomersAsync();

        Task<Customer> GetCustomerDetailAsync(int id);

        void AddDeviceAsync(Device device);

        void UpdateDeviceAsync(int id, Device device);

        Task<Device> GetDevice(string uuid);

        Task<IEnumerable<Device>> GetDevices(int environmentId);

        Task<Device> GetDeviceActivation(string uuid);
    }
}
