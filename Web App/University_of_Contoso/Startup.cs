using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(University_of_Contoso.Startup))]

namespace University_of_Contoso
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // Any connection or hub wire up and configuration should go here
            app.MapSignalR();
        }
    }
}
