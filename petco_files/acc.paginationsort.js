ACC.paginationsort={downUpKeysPressed:false,bindAll:function()
{this.bindPaginationSort();},bindPaginationSort:function()
{with(ACC.paginationsort)
{bindSortForm($('#sortForm1'));bindSortForm($('#sortForm2'));}},bindSortForm:function(sortForm)
{sortForm.change(function()
{if(!ACC.paginationsort.downUpPressed)
{this.submit();}
ACC.paginationsort.downUpPressed=false;});},sortFormIEFix:function(sortOptions,selectedOption)
{sortOptions.keydown(function(e)
{if(e.keyCode===38||e.keyCode===40)
{ACC.paginationsort.downUpPressed=true;}
else if(e.keyCode===13&&selectedOption!==$(this).val())
{$(this).parent().submit();}
else
{ACC.paginationsort.downUpPressed=false;}});}};$(document).ready(function()
{ACC.paginationsort.bindAll();});