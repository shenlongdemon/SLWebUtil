using LocSLRepository;
using SL.Infrastructure.Repository.EF.LocSL;
using System;
using System.Collections.Generic;
using System.Data.Entity.Spatial;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utilities;
namespace Services
{
    public class LocSLService
    {
        public ILocSLUnitOfWork UOW { get; set; }
        public LocSLService()
        {
            UOW = new EFLocSLUnitOfWork();
        }
        public async Task<object> Insert(object data) {
            return await Task.Run(() =>
            {
                dynamic inData = data.ToDynamicObject();

                MyPlace place = new MyPlace();

                place.ID = Guid.NewGuid();
                place.Name = inData.Name;
                place.UserAccountID = inData.UserAccountID;
                place.Location = UtilGeoGraph.Create((double)inData.Location.Latitude, (double)inData.Location.Longitude);

                UOW.MyPlacesRepository.Insert(place);
                UOW.Commit();

                return place;
            });
        }
        public async Task<object> Delete(object data)
        {
            return await Task.Run(() =>
            {
                dynamic inData = data.ToDynamicObject();

                string placeId = inData.ID;
                Guid ID = Guid.Parse(placeId);
                MyPlace place = UOW.MyPlacesRepository.Where(p => p.ID == ID).FirstOrDefault();

                UOW.MyPlacesRepository.Delete(place);
                UOW.Commit();

                return ID;
            });
        }
        public async Task<object> GetLocations(object data)
        {
            return await Task.Run(() =>
            {
                dynamic inData = data.ToDynamicObject();

                string userid = inData.UserAccountID;
                Guid userAccountId = Guid.Parse(userid);
                int page = inData.Paging.Page;
                int size = inData.Paging.Size;
                string order = inData.Paging.Order;

                var list = UOW.MyPlacesRepository
                            .Where(p => p.UserAccountID == userAccountId)
                            .OrderByExt<MyPlace>(order, true)
                            .Skip((page - 1) * size)
                            .Take(size)    
                            .Select(p=> new {
                                ID = p.ID,
                                Name = p.Name,
                                UserAccountID = p.UserAccountID,
                                Location = new {
                                    Latitude = p.Location.Latitude,
                                    Longitude = p.Location.Longitude
                                }
                            })                        
                            .ToList();

                return list;
            });
        }
    }
}
