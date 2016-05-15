$(document).ready(()=>{
    align();
    $(window).resize(()=>{
	align();
    });
});

function align(){
    const p=parseInt($('.footer').css('height'))+50;
    $('.content').css('padding-bottom',p);
}
