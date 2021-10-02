

class FileUtil {

    download(fileName: string, text: string) {
        const aTag = document.createElement("a");
        aTag.download = fileName;
        aTag.href = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
        aTag.dataset.downloadurl = ["text/plain", aTag.download, aTag.href].join(":");
        aTag.click();
    }
}

export default new FileUtil();