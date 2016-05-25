$(document).ready(()=>{
    let idx=0;
    const imgs=[];

    $('.thumb').each(function(){
	let s=$(this).attr('src');
	s=s.split('/');
	imgs.push('images/gallery/pictures/'+s[s.length-1].replace('_thumb',''));
    });
    
    $('.thumb').on('click',function(){
	let s=$(this).attr('src');
	idx=$('.thumb').index($(this));
	s=s.split('/');
	s='images/gallery/pictures/'+s[s.length-1].replace('_thumb','');
	$('#modal-image').attr('src',s);
    });

    $(document).on('keyup',function(event){
	if (!$('#modal-image').is(':hidden')){
	    if (event.which==37){
		prev_img();
	    }
	    else if(event.which==39){next_img();}
	}
    });

    $('#next-img').on('click',function(){
	next_img(idx);
    });

    $('#prev-img').on('click',function(){
	prev_img();
    });
    
    function next_img(){
	idx=(idx+1)%imgs.length;
	change_img(idx);
    }

    function prev_img(){
	idx=(idx-1)%imgs.length;
	if (idx<0){idx=imgs.length-1;}
	change_img(idx);
    }

    function change_img(i){
	$('#modal-image').fadeTo(160,0.4,function(){
	    $('#modal-image').attr('src',imgs[i]);
	    $('#modal-image').fadeTo(160,1);
	});
    }
});
