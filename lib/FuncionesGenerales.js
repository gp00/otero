
// FILES

export const fnGetFileExtension= (filename)=> {
    return filename.split('.').pop();
}

export const fnGetFileName = (filename) => {
    return filename.replace(/^.*[\\\/]/, '')
}