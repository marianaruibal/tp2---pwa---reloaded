if ('serviceWorker' in navigator){
    navigator.serviceWorker.register("../service-worker.js").then((message) => {
        console.log("Service Worker is ready");
    });
} else {
    console.log('Service Worker is not supported');
}
