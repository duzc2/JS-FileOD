(function () {

    var openFileInputId = 0;
    var openFileInputIdPrefix = "dj9ej0fj09ejfiosv0931jhcio139fhq";

    /**
     * 
     * @param {string} fileName 
     * @param {string} content 
     */
    function SaveFile(fileName, content) {
        var aLink = document.createElement('a');
        var blob = new Blob([content]);
        aLink.download = fileName;
        aLink.innerHTML = "download";
        aLink.href = URL.createObjectURL(blob);
        document.body.appendChild(aLink);
        var r = aLink.click();
        $(aLink).remove();
    }
    var openFileInput = null;

    /**
     * 
     * @param {string} acceptType  file postfix
     * @param {string} filetype  "text"/"Array​Buffer"
     * @param {function(data)} callback filetype text:string , filetype Array​Buffer:Array​Buffer
     */
    function createOpenFileInput(acceptType, filetype, callback) {
        $('body').append('<input type="file" style="display:none" id="openFileInput' +
            openFileInputIdPrefix + (openFileInputId++) +
            '" accept="' + acceptType + '" /> ');
        openFileInput = $('#openFileInput');
        openFileInput.change(function () {
            var openFileInputDom = openFileInput[0];
            if (openFileInputDom.files.length === 0) {
                return;
            }
            var reader = new FileReader();
            reader.onload = function (e) {
                callback(reader.result);
            };
            switch (filetype) {
                case 'text':
                    reader.readAsText(openFileInputDom.files[0]);
                    break;
                case 'Array​Buffer':
                    reader.readAsArrayBuffer(openFileInputDom.files[0]);
                    break;
            }
            openFileInput.remove();
            createOpenFileInput();
        });
    }

    /**
     * 
     * @param {string} acceptType  file postfix
     * @param {string} filetype  "text"/"Array​Buffer"
     * @param {function(data)} callback filetype text:string , filetype Array​Buffer:Array​Buffer
     */
    function OpenFile(acceptType, filetype, callback) {
        createOpenFileInput(acceptType, filetype, callback);
        openFileInput.click();
    }

    var FileOD = {};
    /**
     * 
     * @param {string} acceptType  file postfix
     * @param {string} filetype  "text"/"Array​Buffer"
     * @param {function(data)} callback filetype text:string , filetype Array​Buffer:Array​Buffer
     */
    FileOD.Open = OpenFile;
    /**
     * 
     * @param {string} fileName 
     * @param {string} content 
     */
    FileOD.Save = SaveFile;
    window.FileOD = FileOD;
})();