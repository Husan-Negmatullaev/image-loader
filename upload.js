import watermark from "watermarkjs";


function bytesToSize(bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (!bytes) return "0 Bytes";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

    return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
} 

export function upload(selector, options = {}) {
    let files = [];
    const input = document.querySelector(selector);
    const wrapperPreview = document.createElement("div");

    wrapperPreview.className = "wrapper-preview"

    const openButton = document.createElement("button");
    openButton.className = "btn";
    openButton.textContent = "Открыть";

    if (options.multi) {
        input.setAttribute("multiple", true)
    }

    if (options.accept && Array.isArray(options.accept)) {
        input.setAttribute("accept", options.accept.join(","))
    }

    input.insertAdjacentElement("afterend", wrapperPreview);
    input.insertAdjacentElement("afterend", openButton);

    const inputTrigger = () => input.click();

    const changeTrigger = (event) => {
        if (!event.target.files.length) return;

        files = Array.from(event.target.files);

        // wrapperPreview.innerHTML = '';
        files.forEach((file, index) => {
            if (!file.type.match("image")) return;

            const reader = new FileReader();

            reader.onload = ev => {
                const src = ev.target.result;
                // console.log(ev.target.result);
                // wrapperPreview.insertAdjacentHTML("afterbegin", `
                //     <div class="wrapper-preview__image">
                //         <div class="wrapper-preview__remove" data-name="${file.name}">&times;</div>
                        
                //         <!-- <img src="${src}" alt="${file.name}" class="wrapper-preview__source" /> -->
                //         <div class="wrapper-preview__info">
                //             <span class="wrapper-preview__file-name">${file.name}</span>
                //             ${bytesToSize(file.size)}
                //         </div>
                //     </div>
                //     `)
                // console.log(src);
                // console.log(ev);
                watermark([src, 'small.png'])
                    .image(watermark.image.lowerRight(1))
                    .then(img => {
                        const imagePreview = `
                            <div class="wrapper-preview__image">
                                <div class="wrapper-preview__remove" data-name="${file.name}">&times;</div>
                                <img src="${img.src}" alt="${file.name}" class="wrapper-preview__source" />
                                <div class="wrapper-preview__info">
                                   <span class="wrapper-preview__file-name">${file.name}</span>
                                    ${bytesToSize(file.size)}
                                </div>
                            </div>
                        `
                        wrapperPreview.insertAdjacentHTML("afterbegin", imagePreview)
                    })
                }

                // wmark.init({
                //     position: "bottom-left", // default "bottom-right"
                //     opacity: 70, // default 50
                //     className: "wrapper-preview__source", // default "watermark"
                //     path: "./qr.png"
                // });


            reader.readAsDataURL(file);
        })
    }

    function removeImage(event) {
        const tergetItem = event.target;

        if (!tergetItem.dataset.name) return;

        const name = tergetItem.dataset.name;
        files = files.filter(file => file.name !== name);

        const block = wrapperPreview
            .querySelector(`[data-name="${name}"]`)
            .closest(".wrapper-preview__image");

        block.classList.add("_removing");
        const inteerval = setInterval(function () {
            block.remove()
            clearInterval(inteerval)
        }, 300)
    }

    wrapperPreview.addEventListener("click", removeImage)
    openButton.addEventListener("click", inputTrigger);
    input.addEventListener("change", changeTrigger)
}