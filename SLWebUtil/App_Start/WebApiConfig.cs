using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;

namespace SLWebUtil
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
               name: "ServiceApi",
               routeTemplate: "api/service/doaction/{service}/{act}/{obj}",
               defaults: new
               {
                   controller = "Service",
                   action = "DoAction",
                   service = RouteParameter.Optional,
                   act = RouteParameter.Optional,
                   obj = RouteParameter.Optional
               }
            );
            config.Routes.MapHttpRoute(
               name: "ServiceApi-Post",
               routeTemplate: "api/service/dopost",
               defaults: new
               {
                   controller = "Service",
                   action = "DoPost",                  
                   obj = RouteParameter.Optional
               }
            );
        }
    }
}
