export const Map = () => {
    return (
        <div style={{position: "relative", overflow: "hidden"}}>
            <a
                href="https://yandex.uz/maps/10330/bukhara/?utm_medium=mapframe&utm_source=maps"
                style={{color: "#eee", fontSize: "12px", position: "absolute", top: "0px"}}
            >
                Бухара
            </a>
            <a
                href="https://yandex.uz/maps/geo/1721139300/?ll=64.448435%2C39.780436&utm_medium=mapframe&utm_source=maps&z=12.43"
                style={{color: "#eee", fontSize: "12px", position: "absolute", top: "14px"}}
            >
                Бухара — Яндекс Карты
            </a>
            <iframe
                src="https://yandex.uz/map-widget/v1/?ll=64.448435%2C39.780436&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgoxNzIxMTM5MzAwEhRPyrt6YmVraXN0b24sIEJ1eG9ybyIKDfHggEIVZx0fQg%2C%2C&z=12.43"
                width="100%"
                height="400"
                allowFullScreen
                style={{position: "relative"}}
            ></iframe>
        </div>

    )
}
