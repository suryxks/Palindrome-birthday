var inputEl=document.querySelector("#input-element");
function reverseStr(str){

var charList=str.split("");
charList.reverse();
var reversedStr=charList.join('');
return reversedStr;
}
var date={
    day:"",
    month:"",
    year:"",
}
function dateToString(date1){
    var date="";
    var mnth="";
    var yer=date1.year.toString();

    if(date1.day<10){
      date="0"+date1.day;
    }
    else
      {date=date1.day.toString();}
      if(date1.month<10)
      { 
          month="0"+date1.month;
         }else{
             month=date1.month.toString();
         }
         return date+month+yer;
    
}
function dateformatsArr(inputDate){
    var ddmmyyyy;
    var mmddyyyy;
    var yyyymmdd;
    var ddmmyy;
    var mmddyy;
    var yymmdd;
   
     ddmmyyyy=dateToString(inputDate);
     mmddyyyy=dateToString(inputDate).slice(2,4)+dateToString(inputDate).slice(0,2)+dateToString(inputDate).slice(4);
     yyyymmdd=dateToString(inputDate).slice(4)+dateToString(inputDate).slice(2,4)+dateToString(inputDate).slice(0,2);
     ddmmyy=ddmmyyyy.slice(0,4)+ddmmyyyy.slice(-2);
     mmddyy=mmddyyyy.slice(0,4)+mmddyyyy.slice(-2);
     yymmdd=yyyymmdd.slice(2);
     var dateArr=[ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
     return dateArr;

}
function checkPalindromeAllFormats(input){
    var arr=dateformatsArr(input);
    
    var isPalindrome=false;
    for(let index=0;index<arr.length;index++){
        if(arr[index]==reverseStr(arr[index]))
        {
        isPalindrome= true;
        break;
        }
    }
    return isPalindrome;
}
console.log(checkPalindromeAllFormats( { day: 22, month: 11, year:2022}));