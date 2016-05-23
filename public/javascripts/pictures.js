$(document).ready(()=>{
    $('.thumb').on('click',function(){
	let s=$(this).attr('src');
	s=s.split('/');
	s='images/gallery/pictures/'+s[s.length-1].replace('_thumb','');
	$('#modal-image').attr('src',s);
    });
});
