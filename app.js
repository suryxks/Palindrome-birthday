var inputEl = document.querySelector("#input-element");

function reverseStr(str) {

    var charList = str.split("");
    charList.reverse();
    var reversedStr = charList.join('');
    return reversedStr;
}
var date = {
    day: "",
    month: "",
    year: "",
}

function dateToString(date) {
    var dateStr = {
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

function dateformatsArr(inputDate) {
    var dateStr = dateToString(inputDate);
    var ddmmyyyy;
    var mmddyyyy;
    var yyyymmdd;
    var ddmmyy;
    var mmddyy;
    var yymmdd;

    ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    ddmmyy = ddmmyyyy.slice(0, 4) + ddmmyyyy.slice(-2);
    mmddyy = mmddyyyy.slice(0, 4) + mmddyyyy.slice(-2);
    yymmdd = yyyymmdd.slice(2);
    var dateArr = [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
    return dateArr;

}

function checkPalindromeAllFormats(input) {
    var arr = dateformatsArr(input);

    var isPalindrome = false;
    for (let index = 0; index < arr.length; index++) {
        if (arr[index] == reverseStr(arr[index])) {
            isPalindrome = true;
            break;
        }
    }
    return isPalindrome;
}
function checkLeapYear(year){
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
function nextDate(date){
    var day=date.day+1;
    var month=date.month;
    var year=date.year;

    var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31,30];
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
function prevDate(date){
    var day=date.day-1;
    var month=date.month;
    var year=date.year;

    var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31,30];
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
function findNextPalindrome(date){
    var nextCount=0;
    var prevCount=0;
    var nextdate=nextDate(date);
    var prevdate=prevDate(date);
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
function clickHandler(){
    var ipDate=inputEl.value;
    var ipArr=ipDate.split("-");
    var date={
        day:ipArr[2],
        month:ipArr[1],
        year:ipArr[0]
    }
    var isPalindrome=checkPalindromeAllFormats(date);
    if(isPalindrome){
        message.innerText="You Date of birth is a palindrome😀";
    }else{
        var nextPrevDates=findNextPalindrome(date);
        var nextDate=nextPrevDates[1].day+'/'+nextPrevDates[1].month+'/'+nextPrevDates[1].year;
        var prevDate=nextPrevDates[3].day+'/'+nextPrevDates[3].month+'/'+nextPrevDates[3].year;
        message.innerText=`you have missed the next palindrome by ${nextPrevDates[0]} days which is on ${nextDate} and the previous palindrome by ${nextPrevDates[2]} days which is on ${prevDate}`;
    }
    
    
}
var checkButton=document.querySelector("#check-btn");
var inpuEl=document.querySelector("#input-element");
var message=document.querySelector("#message");
checkButton.addEventListener("click",clickHandler);