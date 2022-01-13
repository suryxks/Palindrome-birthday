let inputEl = document.querySelector("#input-element");
let LoadingImage=document.querySelector("#image");
const reverseStr=str=>{

    let charList = str.split("");
    charList.reverse();
    let reversedStr = charList.join('');
    return reversedStr;
}
let date = {
    day: "",
    month: "",
    year: "",
}

const dateToString=date=>{
    let dateStr = {
        day: '',
        month: '',
        year: ''
    };


    if (date.day < 10) {
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;

}

const dateformatsArr=inputDate=>{
    let dateStr = dateToString(inputDate);
    let ddmmyyyy;
    let mmddyyyy;
    let yyyymmdd;
    let ddmmyy;
    let mmddyy;
    let yymmdd;

    ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    ddmmyy = ddmmyyyy.slice(0, 4) + ddmmyyyy.slice(-2);
    mmddyy = mmddyyyy.slice(0, 4) + mmddyyyy.slice(-2);
    yymmdd = yyyymmdd.slice(2);
    let dateArr = [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
    return dateArr;

}

const checkPalindromeAllFormats=input=>{
    let arr = dateformatsArr(input);

    let isPalindrome = false;
    for (let index = 0; index < arr.length; index++) {
        if (arr[index] == reverseStr(arr[index])) {
            isPalindrome = true;
            break;
        }
    }
    return isPalindrome;
}
const checkLeapYear=year=>{
    if(year%400===0){
        return true;
    }
    if(year%100==0){
        return false;
    }
if(year%4===0){
    return true;
}
return false;
     
}
const nextDate=date=>{
    let day=date.day+1;
    let month=date.month;
    let year=date.year;

    let daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31,30];
    if(month===2){
        if(checkLeapYear(year)){
            if(day>29){
                day=1;
                month=month+1;
            }
        }else{
            if(day>28){
                day=1;
                month++;
            }
        }
    }else{
        if(day>daysInMonth[month-1]){
            day=1;
            month++;
        }
    }
    if(month>12){
        month=1;
        year++;
    }
    return{
        day,month,year
    }
}
const prevDate=date=>{
    let day=date.day-1;
    let month=date.month;
    let year=date.year;

    let daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31,30];
    if(month===3){
        if(checkLeapYear(year)){
            if(day<1){
                day=29;
                month=month-1;
            }
        }else{
            if(day<1){
                day=28;
                month--;
            }
        }
    }else{
        if(day<=1){
            if(month===1){
                day=daysInMonth[daysInMonth.length-1]
            }else{
            day=daysInMonth[month-2];
            }
            month--;
        }
    }
    if(month<1){
        month=12;
        year--;
    }
    return{
        day,month,year
    }
}
const findNextPalindrome=date=>{
    let nextCount=0;
    let prevCount=0;
    let nextdate=nextDate(date);
    let prevdate=prevDate(date);
    while(1){
        nextCount++;
        if(checkPalindromeAllFormats(nextdate)){
            break;
        }
        nextdate=nextDate(nextdate);

    }
    while(1){
        prevCount++;
        if(checkPalindromeAllFormats(prevdate)){
            break;
        }
        prevdate=prevDate(prevdate);
    }
    return [nextCount,nextdate,prevCount,prevdate];
}
const clickHandler=()=>{
    let ipDate=inputEl.value;
    let ipArr=ipDate.split("-");
    let date={
        day:Number(ipArr[2]),
        month:Number(ipArr[1]),
        year:Number(ipArr[0])
    }
    LoadingImage.style.display="block";
    setTimeout(function displayAfterLoading(){
    let isPalindrome=checkPalindromeAllFormats(date);
    LoadingImage.style.display="none";
    if(isPalindrome){
        message.innerText="You Date of birth is a palindrome😀";
    }else{
        let nextPrevDates=findNextPalindrome(date);
        let nextDate=nextPrevDates[1].day+'/'+nextPrevDates[1].month+'/'+nextPrevDates[1].year;
        let prevDate=nextPrevDates[3].day+'/'+nextPrevDates[3].month+'/'+nextPrevDates[3].year;
        message.innerText=`you have missed the next palindrome by ${nextPrevDates[0]} days which is on ${nextDate} and the previous palindrome by ${nextPrevDates[2]} days which is on ${prevDate}`;
    }
},3000);
    
    
}
LoadingImage.style.display="none";
let checkButton=document.querySelector("#check-btn");
let inpuEl=document.querySelector("#input-element");
let message=document.querySelector("#message");
checkButton.addEventListener("click",clickHandler);