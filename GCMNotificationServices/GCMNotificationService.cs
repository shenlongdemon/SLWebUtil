using PushSharp;
using PushSharp.Android;
using PushSharp.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utilities;

namespace Services
{
    public class GCMNotificationService
    {
        public GCMNotificationService() { }
        
        public async Task<int> AndroidSend(object data) // AppName & DeviceId % Message
        {
            return await Task.Run(() =>
            {
                try
                {
                    dynamic inData = data.ToDynamicObject();
                    string AppName = inData.AppName;
                    string DeviceId = inData.DeviceId;
                    string Message = inData.Message;


                    string apiKey = GetApiKey(AppName);
                    PushBroker push = new PushBroker();
                    #region events
                    push.OnNotificationSent += NotificationSent;
                    push.OnChannelException += ChannelException;
                    push.OnServiceException += ServiceException;
                    push.OnNotificationFailed += NotificationFailed;
                    push.OnDeviceSubscriptionExpired += DeviceSubscriptionExpired;
                    push.OnDeviceSubscriptionChanged += DeviceSubscriptionChanged;
                    push.OnChannelCreated += ChannelCreated;
                    push.OnChannelDestroyed += ChannelDestroyed;
                    #endregion
                    push.RegisterGcmService(new GcmPushChannelSettings(apiKey));
                    push.QueueNotification(new GcmNotification().ForDeviceRegistrationId(DeviceId)
                        .WithJson(@"{""message"":""" + Message + @"""}"));
                    push.StopAllServices();
                    return 1;
                }
                catch (Exception ex)
                {
                    return ex.HResult;
                }
            });
        }

        private string GetApiKey(string appName)
        {
            string apiKey = "";


            return apiKey;
        }


        #region For Android
        static void DeviceSubscriptionChanged(object sender,
        string oldSubscriptionId, string newSubscriptionId, INotification notification)
        {
            //Do something here
        }

        //this even raised when a notification is successfully sent
        static void NotificationSent(object sender, INotification notification)
        {
            //Do something here
        }

        //this is raised when a notification is failed due to some reason
        static void NotificationFailed(object sender,
        INotification notification, Exception notificationFailureException)
        {
            //Do something here
        }

        //this is fired when there is exception is raised by the channel
        static void ChannelException
            (object sender, IPushChannel channel, Exception exception)
        {
            //Do something here
        }

        //this is fired when there is exception is raised by the service
        static void ServiceException(object sender, Exception exception)
        {
            //Do something here
        }

        //this is raised when the particular device subscription is expired
        static void DeviceSubscriptionExpired(object sender,
        string expiredDeviceSubscriptionId,
            DateTime timestamp, INotification notification)
        {
            //Do something here
        }

        //this is raised when the channel is destroyed
        static void ChannelDestroyed(object sender)
        {
            //Do something here
        }

        //this is raised when the channel is created
        static void ChannelCreated(object sender, IPushChannel pushChannel)
        {
            //Do something here
        }
        #endregion
    }
}
