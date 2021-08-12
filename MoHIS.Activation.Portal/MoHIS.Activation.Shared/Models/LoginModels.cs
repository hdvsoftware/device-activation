
namespace MoHIS.Activation.Shared.Models
{
    public class LoginRequest
    {
        //public string Username { get; set; }
        //public string Password { get; set; }

        public string username { get; set; }
        public string password { get; set; }
    }

    public class LoginResponse
    {
        public bool Succes { get; set; }
        public string ErrorMessage { get; set; }
        public string Token { get; set; }
        public string[] Rules { get; set; }
    }
}
