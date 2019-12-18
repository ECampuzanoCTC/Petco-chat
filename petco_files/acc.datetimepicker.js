ACC.datetimepicker={datePicker:function()
{var todayDate=moment();var maxDatecalendar=$("#maxDatecalendar").val();$('#datetimepicker1').datetimepicker({defaultDate:new Date(),locale:'es',format:'L',minDate:todayDate,maxDate:moment(maxDatecalendar,"DD/MM/YYYY"),ignoreReadonly:true});$("#datetimepicker1").on("dp.change",function(e){if(!moment(e.oldDate).isSame(e.date,'day')){var r=confirm($('#messageChangeDate').val()+' '+$('#textNextdate').val());if(r==true){$('#updateShippingDateRepeatForm').submit();}}});}};$(document).ready(function()
{with(ACC.datetimepicker)
{datePicker();}});