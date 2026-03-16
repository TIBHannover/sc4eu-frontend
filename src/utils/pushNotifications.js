export const isPushSupported = () => {
  return 'serviceWorker' in navigator && 
         'PushManager' in window && 
         'Notification' in window;
}