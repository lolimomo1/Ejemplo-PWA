self.addEventListener('install', evento=>{
    console.log("sw: instalando Service Worker");
    const instalacion=new Promise((resolve,reject)=>{
        setTimeout(()=>{
        console.log("sw:instalacion terminada")
         self.skipWaiting();//para actualizacion automatica del  service worker
         resolve();
    },5000)
    })
    evento.waitUntil(instalacion);//para que la activacion espere hasta que se haga la instalacion
})

self.addEventListener('activate', evento =>{
    console.log("sw: Activado y listo para controlar la app")
})
