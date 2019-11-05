/**
 * Anchor duzc2dtw#gmail.com
 * https://github.com/duzc2/JS-FileOD
 */
(function () {

    var openFileInputId = 0;
    var openFileInputIdPrefix = "dj9ej0fj09ejfiosv0931jhcio139fhq";

    /**
     * 
     * @param {string} fileName 
     * @param {string|Blob} content 
     */
    function SaveFile(fileName, content) {
        var aLink = document.createElement('a');
        var blob = typeof (content) === 'string' ? new Blob([content]) : content;
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
     * @param {string} filetype  "text"/"Array​Buffer/File"
     * @param {function(data)} callback filetype text:string , filetype Array​Buffer:Array​Buffer , File File
     */
    function createOpenFileInput(acceptType, filetype, callback, multiple) {
        let id = 'openFileInput' + openFileInputIdPrefix + (openFileInputId++);
        $('body').append('<input type="file" style="display:none" id="' + id +
            '" accept="' + acceptType + '" ' + (multiple ? 'multiple' : '') + ' /> ');
        openFileInput = $('#' + id);
        openFileInput.change(function () {
            var openFileInputDom = openFileInput[0];
            if (openFileInputDom.files.length === 0) {
                return;
            }
            if (filetype == 'File') {
                if (multiple) {
                    let files = [];
                    for(let i = 0;i<openFileInputDom.files.length;i++){
                        files.push(openFileInputDom.files[i]);
                    }
                    callback(files);
                } else {
                    callback(openFileInputDom.files[0]);
                }
                return;
            }
            if (multiple) {
                let files = [];
                let f = function () {
                    files.push(this.result);
                    if (files.length == openFileInputDom.files.length) {
                        callback(files);
                    }
                };
                for (let i = openFileInputDom.files.length - 1; i >= 0; i--) {
                    let reader;
                    switch (filetype) {
                        case 'text':
                            reader = new FileReader();
                            reader.onloadend = f.bind(reader);
                            reader.readAsText(openFileInputDom.files[i]);
                            break;
                        case 'Array​Buffer':
                            reader = new FileReader();
                            reader.onloadend = f.bind(reader);
                            reader.readAsArrayBuffer(openFileInputDom.files[i]);
                            break;
                    }
                }
            } else {
                let r = function (f) {
                    var reader = new FileReader();
                    reader.onloadend = function (e) {
                        callback(reader.result);
                    };
                    switch (filetype) {
                        case 'text':
                            reader.readAsText(f);
                            break;
                        case 'Array​Buffer':
                            reader.readAsArrayBuffer(f);
                            break;
                    }
                }
                r(openFileInputDom.files[0]);
            }
            openFileInput.remove();
            createOpenFileInput(acceptType, filetype, callback, multiple);
        });
    }

    /**
     * 
     * @param {string} acceptType  file postfix
     * @param {string} filetype  "text"/"Array​Buffer/File"
     * @param {function(data)} callback filetype text:string , filetype Array​Buffer:Array​Buffer , File File
     * @param {bool} multiple allow mutiple files
     */
    function OpenFile(acceptType, filetype, callback, multiple) {
        createOpenFileInput(acceptType, filetype, callback, !!multiple);
        openFileInput.click();
    }

    var FileOD = {};

    /**
     * 
     * @param {string} acceptType  file postfix
     * @param {string} filetype  "text"/"Array​Buffer/File"
     * @param {function(data)} callback filetype text:string , filetype Array​Buffer:Array​Buffer , File File
     * @param {bool} multiple allow mutiple files
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