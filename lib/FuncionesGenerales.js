
// FILES

export const fnGetFileExtension = (filename)=> {
    return filename.split('.').pop();
}

export const fnGetFileName = (filename) => {
    return filename.replace(/^.*[\\\/]/, '')
}

export const fnGetDate = ()=>{
    var d = new Date;

    var month = String(d.getMonth() + 1);
    var day = String(d.getDate());
    var year = String(d.getFullYear());

    var hour = String(d.getHours());
    var minute = String(d.getMinutes());

    return {month,day,year,hour,minute};
}