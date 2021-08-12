using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace MoHIS.Activation.Portal.Blazor.Client.Utils {
    public class JavascriptInterop {
        public static Task<bool> SaveToken(string token) {
            return JSRuntime.Current.InvokeAsync<bool>(
                "interopFunctions.saveToken",
                token);
        }

        public static Task<string> GetStoredToken() {
            return JSRuntime.Current.InvokeAsync<string>(
                "interopFunctions.getStoredToken");
        }

        public static Task<bool> DeleteStoredToken() {
            return JSRuntime.Current.InvokeAsync<bool>(
                "interopFunctions.deleteStoredToken");
        }

        public static Task<bool> ShowRawHtml(string elementId, string html) {
            return JSRuntime.Current.InvokeAsync<bool>(
                "interopFunctions.showRawHtml", elementId, html);
        }

        public static Task<bool> logToJavascript(string log) {
            return JSRuntime.Current.InvokeAsync<bool>(
                "interopFunctions.logToJavascript",
                log);
        }

    }
}
