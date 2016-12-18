module.exports = function() {
    return {
        namespace: "test",
        container : "scene",
        defaultAttributes: {
            video: {
                src: "",
                type: "video/mp4",
                controls: "true",
                muted: "true",
                loop: "true",
                preload: "true",
                "webkit-playsinline": "true"
            },
            img: {
                src: ""
            },
            iframe: {
                src: ""
            },
            form: {
                name: ""
            },
            input: {
                name: ""
            },
            audio: {
                src: ""
            }
        }
    };
}
