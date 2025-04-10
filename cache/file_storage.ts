export const File_Storage = {
    _files: new Map<string, File>(),
    _blobUrls: new Map<string, string>(),

    storeFile: function (id: string, file: File) {
        this._files.set(id, file);
    },

    getFile: function (id: string) {
        return this._files.get(id);
    },

    getBlobUrl: function (id: string) {
        if (this._blobUrls.has(id)) {
            return this._blobUrls.get(id);
        }

        const file = this._files.get(id);
        if (file) {
            const url = URL.createObjectURL(file);
            this._blobUrls.set(id, url);
            return url;
        }

        return null;
    },

    removeFile: function (id: string) {
        if (this._blobUrls.has(id)) {
            const file_url = this._blobUrls.get(id);

            if(file_url) {
                URL.revokeObjectURL(file_url);
                this._blobUrls.delete(id);
            } 
            else {
                console.error(`File with id [${id}] not found.`);
            }
        }
        this._files.delete(id);
    },

    cleanup: function () {
        this._blobUrls.forEach(url => URL.revokeObjectURL(url));
        this._blobUrls.clear();
        this._files.clear();
    }
};