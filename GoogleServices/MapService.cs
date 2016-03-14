using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Utilities;
using WebApiUtility;
namespace Services
{
    public class MapService
    {
        public static readonly string MAP_ROUTE_API = System.Configuration.ConfigurationManager.AppSettings["Map_Route_Api"].ToString();
        /// <summary>
        /// Get list of router what route from location to another
        /// </summary>
        /// <param name="data">double FromLat, double FromLng, double ToLat, double ToLng</param>
        /// <returns></returns>
        public async Task<dynamic> GetRoutes(object data)
        {
            dynamic res = null;
            dynamic inData = data.ToDynamicObject();
            double FromLat = inData.From.Latitude;
            double FromLng = inData.From.Longitude;
            double ToLat = inData.To.Latitude;
            double ToLng = inData.To.Longitude;
            string url = GetRouteUrl(FromLat, FromLng, ToLat, ToLng);
            HttpResponseMessage response = await WebApiUtil.GetAsync(url);
            if (response.IsSuccessStatusCode == true)
            {
                string jsonString = await response.Content.ReadAsStringAsync();
                dynamic jsonObj = jsonString.ToDynamicObject();
                res = ParseRoutes(jsonObj);
                return res;
            }
            return res;
        }
        public string GetRouteUrl(double fromLat, double fromLng, double toLat, double toLng)
        {            
            string url = string.Format(MAP_ROUTE_API, fromLat, fromLng, toLat, toLng);
            return url;
        }


        public List<List<dynamic>> ParseRoutes(dynamic jObject)
        {

            List<List<dynamic>> routes = new List<List<dynamic>>();
            dynamic jRoutes = null;
            dynamic jLegs = null;
            dynamic jSteps = null;

            try
            {

                jRoutes = jObject.routes;

                /** Traversing all routes */
                for (int i = 0; i < jRoutes.Count; i++)
                {

                    jLegs = jRoutes[i].legs;
                    List<dynamic> path = new List<dynamic>();

                    ///** Traversing all legs */
                    for (int j = 0; j < jLegs.Count; j++)
                    {
                        jSteps = jLegs[j].steps;

                        //    /** Traversing all steps */
                        for (int k = 0; k < jSteps.Count; k++)
                        {
                            string polyline = "";
                            polyline = jSteps[k].polyline.points;
                            List<dynamic> list = DecodePoly(polyline);

                            //        /** Traversing all points */
                            for (int l = 0; l < list.Count; l++)
                            {
                                dynamic loc = new ExpandoObject();
                                loc.Latitude = list[l].Latitude;
                                loc.Longitude = list[l].Longitude;
                                path.Add(loc);
                            }
                        }
                        routes.Add(path);
                    }

                }

            }

            catch (Exception e)
            {
            }
            return routes;
        }
        public List<dynamic> DecodePoly(string encoded)
        {

            List<dynamic> poly = new List<dynamic>();
            int index = 0, len = encoded.Length;
            int lat = 0, lng = 0;

            while (index < len)
            {
                int b, shift = 0, result = 0;
                do
                {
                    b = encoded.ElementAt(index++) - 63;
                    result |= (b & 0x1f) << shift;
                    shift += 5;
                } while (b >= 0x20);
                int dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
                lat += dlat;

                shift = 0;
                result = 0;
                do
                {
                    b = encoded.ElementAt(index++) - 63;
                    result |= (b & 0x1f) << shift;
                    shift += 5;
                } while (b >= 0x20);
                int dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
                lng += dlng;

                dynamic p = new ExpandoObject();
                p.Latitude = (double)lat / 1E5;
                p.Longitude = (double)lng / 1E5;
                poly.Add(p);
            }
            return poly;
        }
    }

}
