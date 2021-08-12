using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MoHIS.Activation.Portal.Blazor.Client.DataAccess;
using MoHIS.Activation.Portal.Blazor.Client.Utils;

namespace MoHIS.Activation.Portal.Blazor.Client {
    public class AppState {
        //private readonly IApiClient api;
        private string token;
        //public AppState(IApiClient api) {
        //    this.api = api;
        //}


        //public event Action UserLoggedIn;
        //public event Action UserLoggedOff;
        //public event Action UserChange;

        public bool IsSignedIn => !string.IsNullOrEmpty(token);

        public async Task CheckIfSignedInAsync() {
            token = await JavascriptInterop.GetStoredToken();
        }
        

        public async Task<bool> SignIn(string token) {
            this.token = token;
            return await JavascriptInterop.SaveToken(token);
        }

        public async Task<bool> SignOut() {
            this.token = null;
            return await JavascriptInterop.DeleteStoredToken();
        }        
    }
}
