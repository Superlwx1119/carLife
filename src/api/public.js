export function formattingTime(time){
    if(time==''||!time){
        return ''
    }
    let y=time.substring(0,4)
    let m=time.substring(4,6)
    let d=time.substring(6,8)
    let h=time.substring(8,10)
    let mm=time.substring(10,12)
    let s=time.substring(12,14)
    let newTime=y+'-'+m+'-'+d+' '+h+':'+mm+':'+s
    // let newTime=y+'-'+m+'-'+d
    newTime.toString()
    return newTime
}

export function getQueryVariable(variable){//获取url参数
    var str = window.location.hash.indexOf('?');
    var query=window.location.hash.substring(str+1,window.location.hash.length)
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
    }
    return(false);
}
export function formattingDate(time){
    if(time==''||!time){
        return ''
    }
    let y=time.substring(0,4)
    let m=time.substring(4,6)
    let d=time.substring(6,8)
    let h=time.substring(8,10)
    let mm=time.substring(10,12)
    let s=time.substring(12,14)
    let newTime={
        y:Number(y),
        m:Number(m)-1,
        d:Number(d)
    }
    return newTime
}
export function formattingYear(time){
    if(time==''||!time){
        return ''
    }
    let y=time.substring(0,4)
    let m=time.substring(4,6)
    let d=time.substring(6,8)
    let h=time.substring(8,10)
    let mm=time.substring(10,12)
    let s=time.substring(12,14)
    let newTime=y+'-'+m+'-'+d
    newTime.toString()
    return newTime
}