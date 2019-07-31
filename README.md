# JS-FileOD
Open local file or Download file to local.
require JQuery or zepto

   /**
     * 
     * @param {string} fileName 
     * @param {string|Blob} content 
     */
	FileOD.Save(fileName, content)


    /**
     * 
     * @param {string} acceptType  file postfix
     * @param {string} filetype  "text"/"Array​Buffer"
     * @param {function(data)} callback filetype text:string , filetype Array​Buffer:Array​Buffer
     */
    FileOD.Open = OpenFile(acceptType, filetype, callback);