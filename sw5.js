/*En todas las estrategias, el primer paso es subir a cache archivos
elegidos como necesarios, la elección depende del proyecto y sus necesidades
de carga sin conexión a interner*/ 

//CONSTANTES DE ALMACENAMIENTO CACHE
const CACHE ='cache-1';
const CACHE_DINAMICO ='dinamico-1';
const CACHE_ESTATICO ='estatico-1';
const CACHE_INMUTABLE ='inmutable-1';


/***********************INSTALACIÓN ************************
Indicamos que durante el proceso de instalación se registren 
los archivos base en cache acorde a su tipo
************************************************************/

self.addEventListener('install', evento=>{
    /*Promesa que crea el proceso de creación del espacio 
    en cache y agrega los archivos necesarios para cargar nuestra
    aplicación*/
    const cacheBase =caches.open(CACHE)
        .then(cache=>{
            return cache.addAll([
                '/',
                '/index.html',
                '/css/style.css',
                '/img/main.jpg',
                '/js/app.js',
                '/img/no-img.jpeg'

            ]);
        });

        //Separamos los archivos que no se modificarán en un espacio de cache inmutable
        const cacheInmutable =  caches.open(CACHE_INMUTABLE)
            .then(cache=>{
                cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');
            });
       
            //Indicamos que la instalación espere hasta que las promesas se cumplan
        evento.waitUntil(Promise.all([cacheBase, cacheInmutable]));
});


/******************* FUNCIÓN DE LIMPIEZA DE CACHE ********************
/*Debemos mantener un número limitado e archivos para no sobrepasar el
espacio de almacenamiento cache, por ello se crea está función.
**********************************************************************/

//recibimos el nombre del espacio de cache a limpiar y el número de archivos permitido
function limpiarCache(nombreCache, numeroItems){
    //abrimos el cache
    caches.open(nombreCache)
        .then(cache=>{
            //recuperamos el arreglo de archivos existentes en el espacio de cache
            return cache.keys()
                .then(keys=>{
                    //si el número de archivos supera el limite permitido
                    if (keys.length>numeroItems){
                        //eliminamos el más antiguo y repetimos el proceso
                        cache.delete(keys[0])
                            .then(limpiarCache(nombreCache, numeroItems));
                    }
                });
        });
}


/************************ ESTRATEGÍA 5  *****************************
                     CACHE Y NETWORK RACE
Retorna lo que responda más rápido (cache o red).  Es importante tomar
en cuenta que al emplear este mecanismo la respuesta puede ser un 
error.
***********************************************************************/

self.addEventListener('fetch', evento =>{

    //Estrategia 5 CACHE WITH NETWORK UPDATE

    const respuesta = new Promise( (resolve, reject) =>{
        let rechazada = false;

        //si ninguna de las dos puede responder en lugar de retornar
        // el error 404 o el dinosaurio del navegador, retornaremos una imagen
        //o el texto de rechazo
        const falloUnaVez = () => {
            if ( rechazada ) {
                if ( /\.(png|jpg)$/i.test( evento.request.url ) ) {
                    resolve( caches.match('/img/no-img.jpeg')  );
                } else { 
                    reject('No se encontro respuesta');
                }
            } else {
                rechazada = true;
            }
        };

        //respuesta de la web
        fetch( evento.request ).then( res => {
            res.ok ? resolve(res) : falloUnaVez();
        }).catch( falloUnaVez );

        //respuesta de cache
        caches.match( evento.request ).then( res => {
            res ? resolve( res ) : falloUnaVez();
        }).catch( falloUnaVez );


    });
    evento.respondWith( respuesta );
});