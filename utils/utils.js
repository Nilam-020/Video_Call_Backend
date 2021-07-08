
const formatTime = (hour)=>{
    if(hour < 10)
    {
        hour = '0'+hour;
    }
    return hour;
}

const checkTime = (hour)=>{
    let timeStamp = hour<12? "AM":"PM";
    return timeStamp;
}

const formattedToday = (date)=>{
    return `${date.getFullYear()}-${formatTime(date.getMonth())}-${formatTime(date.getDate())}`;
}

const getFancyDate=(dates)=>{
    let months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
    let today=new Date(dates);
    var formatDated=`${today.getDate()} ${months[today.getMonth()]},${today.getFullYear()}`
    return formatDated;
}


module.exports = {formatTime,checkTime,formattedToday,getFancyDate};